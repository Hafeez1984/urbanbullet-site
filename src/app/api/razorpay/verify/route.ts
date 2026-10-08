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
    const errData = err?.response?.data || err?.message || err;
    console.error('Error searching for WooCommerce customer:', JSON.stringify(errData, null, 2));
  }

  // 2. Format name with safe fallbacks ('Urban', 'Bullet') if missing from NextAuth session
  const nameParts = (name || '').trim().split(' ').filter(Boolean);
  const firstName = nameParts[0] || 'Urban';
  const lastName = nameParts.slice(1).join(' ') || 'Bullet';

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
    const errData = createErr?.response?.data || createErr?.message || createErr;
    console.error('Failed to create WooCommerce customer record:', JSON.stringify(errData, null, 2));

    // If creation failed (e.g. existing email/user conflict), attempt fallback search
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
    } catch (err: any) {
      const fallbackErrData = err?.response?.data || err?.message || err;
      console.error('Error in fallback customer search:', JSON.stringify(fallbackErrData, null, 2));
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

    // Require authenticated session email (no hardcoded test email fallback allowed)
    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Unauthorized. Authenticated session email is required to process order.' },
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

    // Verify signature using HMAC SHA256
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

    // Signature verified! Get or create customer ID matching NextAuth session email
    const finalCustomerId = await getOrCreateCustomerId(email, name, customer_id);

    // Format first and last names with safe fallbacks ('Urban', 'Bullet') if missing
    const nameParts = (name || '').trim().split(' ').filter(Boolean);
    const defaultFirstName = nameParts[0] || 'Urban';
    const defaultLastName = nameParts.slice(1).join(' ') || 'Bullet';

    const billingPayload = {
      first_name: billing?.first_name || defaultFirstName,
      last_name: billing?.last_name || defaultLastName,
      email: billing?.email || email,
      phone: billing?.phone || '',
      address_1: billing?.address_1 || '',
      address_2: billing?.address_2 || '',
      city: billing?.city || '',
      state: billing?.state || '',
      postcode: billing?.postcode || '',
      country: billing?.country || 'IN',
    };

    const shippingPayload = shipping ? {
      first_name: shipping.first_name || billingPayload.first_name,
      last_name: shipping.last_name || billingPayload.last_name,
      address_1: shipping.address_1 || billingPayload.address_1,
      address_2: shipping.address_2 || billingPayload.address_2,
      city: shipping.city || billingPayload.city,
      state: shipping.state || billingPayload.state,
      postcode: shipping.postcode || billingPayload.postcode,
      country: shipping.country || billingPayload.country,
    } : {
      first_name: billingPayload.first_name,
      last_name: billingPayload.last_name,
      address_1: billingPayload.address_1,
      address_2: billingPayload.address_2,
      city: billingPayload.city,
      state: billingPayload.state,
      postcode: billingPayload.postcode,
      country: billingPayload.country,
    };

    let wcOrder = null;

    const paymentMetaData = [
      { key: '_razorpay_payment_id', value: razorpay_payment_id },
      { key: 'razorpay_order_id', value: razorpay_order_id },
      { key: 'razorpay_payment_id', value: razorpay_payment_id },
    ];

    // If existing order ID was provided, update order
    if (wc_order_id) {
      try {
        const updatePayload: any = {
          status: 'processing',
          set_paid: true,
          payment_method: 'razorpay',
          payment_method_title: 'Razorpay',
          meta_data: paymentMetaData,
          billing: billingPayload,
          shipping: shippingPayload,
        };
        if (finalCustomerId) {
          updatePayload.customer_id = finalCustomerId;
        }

        const updateRes = await wcApi.put(`orders/${wc_order_id}`, updatePayload);
        wcOrder = updateRes.data;
      } catch (err: any) {
        const errData = err?.response?.data || err?.message || err;
        console.error(`Failed to update existing WooCommerce order ${wc_order_id}:`, JSON.stringify(errData, null, 2));
      }
    }

    // If order was not updated, create a new WooCommerce order
    if (!wcOrder) {
      try {
        // Strictly format line_items to ensure WooCommerce product reference (product_id or SKU) is never empty/undefined
        const lineItems = (cart_items || []).map((item: any) => {
          const numericId = Number(item.databaseId || item.id);
          const hasValidNumericId = Number.isInteger(numericId) && numericId > 0;

          if (hasValidNumericId) {
            return {
              product_id: numericId,
              name: item.name || 'Streetwear Item',
              quantity: Number(item.quantity) || 1,
              price: String(item.price),
            };
          }

          // Fallback to SKU for non-numeric product IDs (e.g. mock items like 'prod_1')
          return {
            sku: String(item.sku || item.id || 'UB-STREETWEAR'),
            name: item.name || 'Streetwear Item',
            quantity: Number(item.quantity) || 1,
            price: String(item.price),
          };
        });

        const newOrderData: any = {
          payment_method: 'razorpay',
          payment_method_title: 'Razorpay',
          set_paid: true,
          status: 'processing',
          meta_data: paymentMetaData,
          billing: billingPayload,
          shipping: shippingPayload,
          line_items: lineItems,
        };

        if (finalCustomerId) {
          newOrderData.customer_id = finalCustomerId;
        }

        const createRes = await wcApi.post('orders', newOrderData);
        wcOrder = createRes.data;
      } catch (err: any) {
        const errData = err?.response?.data || err?.message || err;
        console.error('Failed to create WooCommerce order:', JSON.stringify(errData, null, 2));
      }
    }

    if (!wcOrder) {
      return NextResponse.json(
        { error: 'Payment verified, but WooCommerce order creation failed. See server logs for details.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and WooCommerce order processed successfully',
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
