import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { wcApi } from '@/lib/woocommerce-client';

export const dynamic = 'force-dynamic';

async function getOrCreateCustomerId(
  email?: string,
  name?: string,
  providedCustomerId?: number | string
): Promise<number | null> {
  if (providedCustomerId && Number(providedCustomerId) > 0) {
    return Number(providedCustomerId);
  }
  if (!email || !email.trim()) {
    return null;
  }

  const normalizedEmail = email.trim().toLowerCase();

  // 1. Search for an existing customer_id matching the NextAuth email
  try {
    const searchRes = await wcApi.get('customers', { search: normalizedEmail, role: 'all' });
    if (searchRes.data && Array.isArray(searchRes.data)) {
      const existing = searchRes.data.find(
        (c: any) => c.email && c.email.toLowerCase() === normalizedEmail
      );
      if (existing && existing.id) {
        return existing.id;
      }
    }
  } catch (err: any) {
    console.error('Error searching for WooCommerce customer:', err?.response?.data || err.message);
  }

  // 2. If not found, create a customer record in WooCommerce first
  const nameParts = (name || '').trim().split(' ');
  const firstName = nameParts[0] || normalizedEmail.split('@')[0];
  const lastName = nameParts.slice(1).join(' ') || '';

  try {
    const createRes = await wcApi.post('customers', {
      email: normalizedEmail,
      first_name: firstName,
      last_name: lastName,
      billing: {
        first_name: firstName,
        last_name: lastName,
        email: normalizedEmail,
      },
    });
    if (createRes.data && createRes.data.id) {
      return createRes.data.id;
    }
  } catch (createErr: any) {
    console.error('Error creating WooCommerce customer record:', createErr?.response?.data || createErr.message);
    // If creation failed (e.g. existing email/user conflict), fallback search
    try {
      const fallbackSearch = await wcApi.get('customers', { search: normalizedEmail, role: 'all' });
      if (fallbackSearch.data && Array.isArray(fallbackSearch.data)) {
        const existing = fallbackSearch.data.find(
          (c: any) => c.email && c.email.toLowerCase() === normalizedEmail
        );
        if (existing && existing.id) {
          return existing.id;
        }
      }
    } catch (err) {
      console.error('Error in fallback customer search:', err);
    }
  }

  return null;
}

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
      name,
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

    // Signature is valid! Get or create customer ID matching NextAuth session email
    const finalCustomerId = await getOrCreateCustomerId(email, name, customer_id);

    // Build billing payload with NextAuth session email and name injected
    const nameParts = (name || '').trim().split(' ');
    const defaultFirstName = nameParts[0] || '';
    const defaultLastName = nameParts.slice(1).join(' ') || '';

    const billingPayload = {
      first_name: billing?.first_name || defaultFirstName,
      last_name: billing?.last_name || defaultLastName,
      email: billing?.email || email || '',
      ...(billing || {}),
    };

    let wcOrder = null;

    const paymentMetaData = [
      { key: '_razorpay_payment_id', value: razorpay_payment_id },
      { key: 'razorpay_order_id', value: razorpay_order_id },
      { key: 'razorpay_payment_id', value: razorpay_payment_id },
    ];

    if (wc_order_id) {
      try {
        const updatePayload: any = {
          status: 'processing',
          set_paid: true,
          payment_method: 'razorpay',
          payment_method_title: 'Razorpay',
          meta_data: paymentMetaData,
          billing: billingPayload,
        };
        if (finalCustomerId) {
          updatePayload.customer_id = finalCustomerId;
        }

        const updateRes = await wcApi.put(`orders/${wc_order_id}`, updatePayload);
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
          billing: billingPayload,
        };

        if (finalCustomerId) {
          newOrderData.customer_id = finalCustomerId;
        }

        if (lineItems.length > 0) {
          newOrderData.line_items = lineItems;
        }

        if (shipping) {
          newOrderData.shipping = shipping;
        } else if (billingPayload) {
          newOrderData.shipping = {
            first_name: billingPayload.first_name,
            last_name: billingPayload.last_name,
            address_1: billingPayload.address_1 || '',
            city: billingPayload.city || '',
            state: billingPayload.state || '',
            postcode: billingPayload.postcode || '',
            country: billingPayload.country || '',
          };
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
      customer_id: wcOrder?.customer_id || finalCustomerId || null,
    });
  } catch (error: any) {
    console.error('Error in /api/razorpay/verify:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
