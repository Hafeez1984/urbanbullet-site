import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { wcApi } from '@/lib/woocommerce-client';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      wc_order_id,
      cart_items,
      billing,
      shipping,
      customer_id,
      email,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required Razorpay parameters (order_id, payment_id, or signature)' },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET?.trim();
    if (!secret) {
      return NextResponse.json(
        { error: 'RAZORPAY_KEY_SECRET not set in environment' },
        { status: 500 }
      );
    }

    // Verify the signature using Node's crypto module:
    // HMAC SHA256 of razorpay_order_id + "|" + razorpay_payment_id hashed with the RAZORPAY_KEY_SECRET
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.error('Razorpay signature mismatch:', {
        expected: expectedSignature,
        received: razorpay_signature,
      });
      return NextResponse.json(
        { error: 'Invalid Razorpay signature', success: false },
        { status: 400 }
      );
    }

    // Signature is valid! Update or create the order in WooCommerce
    let wcOrder = null;

    const paymentMetaData = [
      { key: '_razorpay_payment_id', value: razorpay_payment_id },
      { key: 'razorpay_order_id', value: razorpay_order_id },
      { key: 'razorpay_payment_id', value: razorpay_payment_id },
    ];

    if (wc_order_id) {
      try {
        const updateRes = await wcApi.put(`orders/${wc_order_id}`, {
          status: 'processing',
          set_paid: true,
          payment_method: 'razorpay',
          payment_method_title: 'Razorpay',
          meta_data: paymentMetaData,
        });
        wcOrder = updateRes.data;
      } catch (err: any) {
        console.error(`Failed to update existing WooCommerce order ${wc_order_id}:`, err?.response?.data || err.message);
      }
    }

    if (!wcOrder) {
      try {
        const lineItems = (cart_items || []).map((item: any) => ({
          product_id: Number(item.databaseId || item.id) || undefined,
          name: item.name,
          quantity: item.quantity || 1,
          price: String(item.price),
        }));

        const newOrderData: any = {
          payment_method: 'razorpay',
          payment_method_title: 'Razorpay',
          set_paid: true,
          status: 'processing',
          meta_data: paymentMetaData,
        };

        if (customer_id) {
          newOrderData.customer_id = customer_id;
        }

        if (lineItems.length > 0) {
          newOrderData.line_items = lineItems;
        }

        if (billing) {
          newOrderData.billing = billing;
        } else if (email) {
          newOrderData.billing = { email };
        }

        if (shipping) {
          newOrderData.shipping = shipping;
        }

        const createRes = await wcApi.post('orders', newOrderData);
        wcOrder = createRes.data;
      } catch (err: any) {
        console.error('Failed to create WooCommerce order:', err?.response?.data || err.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order processed successfully',
      wc_order_id: wcOrder?.id || wc_order_id || null,
      razorpay_payment_id,
      razorpay_order_id,
    });
  } catch (error: any) {
    console.error('Error in /api/razorpay/verify:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
