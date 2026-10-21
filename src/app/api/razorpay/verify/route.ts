import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { wcApi } from '@/lib/woocommerce-client';

export const dynamic = 'force-dynamic';

interface CustomerDbData {
  customerId: number | null;
  customerShipping: Record<string, any>;
  customerBilling: Record<string, any>;
  orderShipping: Record<string, any>;
  orderBilling: Record<string, any>;
  email: string;
  firstName: string;
  lastName: string;
}

/**
 * Extract user details and saved shipping/billing addresses from WooCommerce customer
 * record and recent order history in the database.
 */
async function getCustomerAndAddress(
  email?: string,
  name?: string,
  providedCustomerId?: number | string
): Promise<CustomerDbData> {
  const normalizedEmail = (email || '').trim().toLowerCase();
  let foundCustomer: any = null;

  // 1. If customerId provided, query directly
  if (providedCustomerId && Number(providedCustomerId) > 0) {
    try {
      const custRes = await wcApi.get(`customers/${Number(providedCustomerId)}`);
      if (custRes?.data && custRes.data.id) {
        foundCustomer = custRes.data;
      }
    } catch (err: any) {
      console.warn(`Could not fetch WooCommerce customer by ID ${providedCustomerId}:`, err?.message || err);
    }
  }

  // 2. Query WooCommerce customers by email if not found yet
  if (!foundCustomer && normalizedEmail) {
    try {
      const searchRes = await wcApi.get('customers', { search: normalizedEmail, role: 'all' });
      if (searchRes.data && Array.isArray(searchRes.data)) {
        const match = searchRes.data.find(
          (c: any) => c.email && c.email.toLowerCase() === normalizedEmail
        );
        if (match && match.id) {
          foundCustomer = match;
        }
      }
    } catch (err: any) {
      const errData = err?.response?.data || err?.message || err;
      console.error('Error searching WooCommerce customer by email:', JSON.stringify(errData, null, 2));
    }
  }

  const customerShipping = foundCustomer?.shipping || {};
  const customerBilling = foundCustomer?.billing || {};

  let orderShipping: Record<string, any> = {};
  let orderBilling: Record<string, any> = {};

  // 3. Fallback: Query past orders from WooCommerce database to extract address if customer address is empty
  const hasIncompleteAddress =
    !customerShipping.address_1 || !customerShipping.postcode || !customerShipping.phone;

  if (hasIncompleteAddress && (foundCustomer?.id || normalizedEmail)) {
    try {
      const orderSearchParams: any = { per_page: 5 };
      if (foundCustomer?.id) {
        orderSearchParams.customer = foundCustomer.id;
      } else {
        orderSearchParams.search = normalizedEmail;
      }

      const pastOrdersRes = await wcApi.get('orders', orderSearchParams);
      if (pastOrdersRes?.data && Array.isArray(pastOrdersRes.data) && pastOrdersRes.data.length > 0) {
        // Find newest order with a non-empty shipping or billing address
        const orderWithAddress = pastOrdersRes.data.find(
          (o: any) =>
            (o.shipping && (o.shipping.address_1 || o.shipping.postcode || o.shipping.phone)) ||
            (o.billing && (o.billing.address_1 || o.billing.postcode || o.billing.phone))
        );
        if (orderWithAddress) {
          if (orderWithAddress.shipping) {
            orderShipping = orderWithAddress.shipping;
          }
          if (orderWithAddress.billing) {
            orderBilling = orderWithAddress.billing;
          }
        }
      }
    } catch (orderErr: any) {
      console.warn('Error querying past orders for address fallback:', orderErr?.message || orderErr);
    }
  }

  return {
    customerId: foundCustomer?.id || null,
    customerShipping,
    customerBilling,
    orderShipping,
    orderBilling,
    email: foundCustomer?.email || normalizedEmail,
    firstName: foundCustomer?.first_name || '',
    lastName: foundCustomer?.last_name || '',
  };
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
      address,
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

    // Require authenticated session email
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

    // Signature verified! Extract user shipping and billing address from frontend state or database
    const dbData = await getCustomerAndAddress(email, name, customer_id);
    let finalCustomerId = dbData.customerId;

    const frontendShipping = shipping || {};
    const frontendBilling = billing || {};
    const frontendAddress = address || {};
    const dbCustomerShipping = dbData.customerShipping;
    const dbCustomerBilling = dbData.customerBilling;
    const dbOrderShipping = dbData.orderShipping;
    const dbOrderBilling = dbData.orderBilling;

    const nameParts = (name || '').trim().split(' ').filter(Boolean);
    const defaultFirstName = nameParts[0] || dbData.firstName || 'Urban';
    const defaultLastName = nameParts.slice(1).join(' ') || dbData.lastName || 'Bullet';

    const pickFirstNonEmpty = (...candidates: any[]): string => {
      for (const val of candidates) {
        if (typeof val === 'string' && val.trim().length > 0) {
          return val.trim();
        }
        if (typeof val === 'number') {
          return String(val);
        }
      }
      return '';
    };

    // Strictly resolve first and last names
    const resolvedFirstName = pickFirstNonEmpty(
      frontendShipping.first_name,
      frontendBilling.first_name,
      frontendAddress.firstName,
      frontendAddress.first_name,
      frontendAddress.name ? frontendAddress.name.trim().split(' ')[0] : null,
      dbCustomerShipping.first_name,
      dbCustomerBilling.first_name,
      dbOrderShipping.first_name,
      dbOrderBilling.first_name,
      defaultFirstName
    );

    const resolvedLastName = pickFirstNonEmpty(
      frontendShipping.last_name,
      frontendBilling.last_name,
      frontendAddress.lastName,
      frontendAddress.last_name,
      frontendAddress.name ? frontendAddress.name.trim().split(' ').slice(1).join(' ') : null,
      dbCustomerShipping.last_name,
      dbCustomerBilling.last_name,
      dbOrderShipping.last_name,
      dbOrderBilling.last_name,
      defaultLastName
    );

    // Strictly resolve address_1 and address_2
    const resolvedAddress1 = pickFirstNonEmpty(
      frontendShipping.address_1,
      frontendShipping.address1,
      frontendBilling.address_1,
      frontendBilling.address1,
      frontendAddress.address_1,
      frontendAddress.address1,
      frontendAddress.line1,
      frontendAddress.address,
      dbCustomerShipping.address_1,
      dbCustomerBilling.address_1,
      dbOrderShipping.address_1,
      dbOrderBilling.address_1
    );

    const resolvedAddress2 = pickFirstNonEmpty(
      frontendShipping.address_2,
      frontendShipping.address2,
      frontendBilling.address_2,
      frontendBilling.address2,
      frontendAddress.address_2,
      frontendAddress.address2,
      frontendAddress.line2,
      frontendAddress.nearestLandmark,
      dbCustomerShipping.address_2,
      dbCustomerBilling.address_2,
      dbOrderShipping.address_2,
      dbOrderBilling.address_2
    );

    // Strictly resolve city and state
    const resolvedCity = pickFirstNonEmpty(
      frontendShipping.city,
      frontendBilling.city,
      frontendAddress.city,
      dbCustomerShipping.city,
      dbCustomerBilling.city,
      dbOrderShipping.city,
      dbOrderBilling.city
    );

    const resolvedState = pickFirstNonEmpty(
      frontendShipping.state,
      frontendBilling.state,
      frontendAddress.state,
      dbCustomerShipping.state,
      dbCustomerBilling.state,
      dbOrderShipping.state,
      dbOrderBilling.state
    );

    // Strictly resolve postcode (strictly required by Qikink)
    const resolvedPostcode = pickFirstNonEmpty(
      frontendShipping.postcode,
      frontendShipping.post_code,
      frontendShipping.pin,
      frontendBilling.postcode,
      frontendBilling.post_code,
      frontendBilling.pin,
      frontendAddress.postcode,
      frontendAddress.post_code,
      frontendAddress.pin,
      dbCustomerShipping.postcode,
      dbCustomerBilling.postcode,
      dbOrderShipping.postcode,
      dbOrderBilling.postcode
    );

    // Strictly resolve country
    const resolvedCountry = pickFirstNonEmpty(
      frontendShipping.country,
      frontendBilling.country,
      frontendAddress.country,
      dbCustomerShipping.country,
      dbCustomerBilling.country,
      dbOrderShipping.country,
      dbOrderBilling.country,
      'IN'
    ).toUpperCase();

    // Strictly resolve phone number (strictly required by Qikink)
    const resolvedPhone = pickFirstNonEmpty(
      frontendShipping.phone,
      frontendShipping.contactNumber,
      frontendBilling.phone,
      frontendBilling.contactNumber,
      frontendAddress.phone,
      frontendAddress.contactNumber,
      dbCustomerShipping.phone,
      dbCustomerBilling.phone,
      dbOrderShipping.phone,
      dbOrderBilling.phone
    );

    const resolvedEmail = pickFirstNonEmpty(
      frontendBilling.email,
      frontendShipping.email,
      frontendAddress.email,
      email,
      dbCustomerBilling.email,
      dbData.email
    ).toLowerCase();

    // Map strictly to WooCommerce schema for shipping object
    const shippingPayload: {
      first_name: string;
      last_name: string;
      address_1: string;
      address_2: string;
      city: string;
      state: string;
      postcode: string;
      country: string;
      phone: string;
    } = {
      first_name: resolvedFirstName,
      last_name: resolvedLastName,
      address_1: resolvedAddress1,
      address_2: resolvedAddress2,
      city: resolvedCity,
      state: resolvedState,
      postcode: resolvedPostcode,
      country: resolvedCountry || 'IN',
      phone: resolvedPhone,
    };

    // Map strictly to WooCommerce schema for billing object
    const billingPayload: {
      first_name: string;
      last_name: string;
      address_1: string;
      address_2: string;
      city: string;
      state: string;
      postcode: string;
      country: string;
      email: string;
      phone: string;
    } = {
      first_name: pickFirstNonEmpty(frontendBilling.first_name, resolvedFirstName),
      last_name: pickFirstNonEmpty(frontendBilling.last_name, resolvedLastName),
      address_1: pickFirstNonEmpty(frontendBilling.address_1, frontendBilling.address1, resolvedAddress1),
      address_2: pickFirstNonEmpty(frontendBilling.address_2, frontendBilling.address2, resolvedAddress2),
      city: pickFirstNonEmpty(frontendBilling.city, resolvedCity),
      state: pickFirstNonEmpty(frontendBilling.state, resolvedState),
      postcode: pickFirstNonEmpty(frontendBilling.postcode, frontendBilling.pin, resolvedPostcode),
      country: pickFirstNonEmpty(frontendBilling.country, resolvedCountry, 'IN').toUpperCase(),
      email: resolvedEmail,
      phone: pickFirstNonEmpty(frontendBilling.phone, frontendBilling.contactNumber, resolvedPhone),
    };

    // Ensure phone and postcode are synchronized across both objects so Qikink never rejects
    if (!shippingPayload.phone && billingPayload.phone) {
      shippingPayload.phone = billingPayload.phone;
    }
    if (!billingPayload.phone && shippingPayload.phone) {
      billingPayload.phone = shippingPayload.phone;
    }
    if (!shippingPayload.postcode && billingPayload.postcode) {
      shippingPayload.postcode = billingPayload.postcode;
    }
    if (!billingPayload.postcode && shippingPayload.postcode) {
      billingPayload.postcode = shippingPayload.postcode;
    }

    // Persist or create WooCommerce customer record in database with resolved addresses
    if (!finalCustomerId) {
      try {
        const createRes = await wcApi.post('customers', {
          email: resolvedEmail,
          first_name: shippingPayload.first_name,
          last_name: shippingPayload.last_name,
          billing: billingPayload,
          shipping: shippingPayload,
        });
        if (createRes.data && createRes.data.id) {
          finalCustomerId = createRes.data.id;
        }
      } catch (createErr: any) {
        console.error('Failed to create WooCommerce customer record:', createErr?.message || createErr);
      }
    } else if (
      finalCustomerId &&
      shippingPayload.address_1 &&
      shippingPayload.postcode &&
      shippingPayload.phone &&
      (!dbCustomerShipping.address_1 || !dbCustomerShipping.postcode || !dbCustomerShipping.phone)
    ) {
      try {
        await wcApi.put(`customers/${finalCustomerId}`, {
          shipping: shippingPayload,
          billing: billingPayload,
        });
      } catch (updateErr: any) {
        console.warn('Could not persist updated address to WooCommerce customer:', updateErr?.message || updateErr);
      }
    }

    // Format line_items strictly: ONLY pass product_id, variation_id, and quantity.
    // DO NOT pass custom SKUs or names from frontend, preserving raw WooCommerce catalog data for print-on-demand sync.
    const lineItems = await Promise.all(
      (cart_items || []).map(async (item: any) => {
        let numericProductId = Number(item.databaseId || item.productId || item.product_id || item.id);
        let hasValidProductId = Number.isInteger(numericProductId) && numericProductId > 0;

        if (!hasValidProductId && item.slug) {
          try {
            const prodSearch = await wcApi.get('products', { slug: item.slug });
            if (prodSearch.data && Array.isArray(prodSearch.data) && prodSearch.data[0]?.id) {
              numericProductId = prodSearch.data[0].id;
              hasValidProductId = true;
            }
          } catch (e) {}
        }

        if (!hasValidProductId) {
          console.warn('Skipping cart item without valid numeric product_id:', item);
          return null;
        }

        let variationId = Number(item.variation_id || item.variationId) || 0;

        // If variable product in WooCommerce and variationId is missing or 0, resolve from catalog variations
        if (!variationId || variationId <= 0) {
          try {
            const prodRes = await wcApi.get(`products/${numericProductId}`);
            const wcProd = prodRes?.data;
            if (
              wcProd &&
              (wcProd.type === 'variable' ||
                (Array.isArray(wcProd.variations) && wcProd.variations.length > 0))
            ) {
              const varRes = await wcApi.get(`products/${numericProductId}/variations`, {
                per_page: 100,
              });
              const variations = varRes?.data || [];
              if (variations.length > 0) {
                const itemSize = (item.size || '').toLowerCase().trim();
                const itemColor = (item.color || '').toLowerCase().trim();

                const match = variations.find((v: any) => {
                  return (v.attributes || []).every((attr: any) => {
                    const attrName = (attr.name || '').toLowerCase();
                    const attrOpt = (attr.option || '').toLowerCase().trim();
                    if (!attrOpt) return true;
                    if (attrName.includes('size')) {
                      return itemSize && attrOpt === itemSize;
                    }
                    if (attrName.includes('color') || attrName.includes('colour')) {
                      return itemColor && attrOpt === itemColor;
                    }
                    return true;
                  });
                });

                if (match) {
                  variationId = match.id;
                } else {
                  variationId = variations[0].id;
                }
              }
            }
          } catch (lookupErr: any) {
            console.error(
              `Error resolving variation for product ${numericProductId}:`,
              lookupErr?.message || lookupErr
            );
          }
        }

        const quantity = Math.max(1, Number(item.quantity) || 1);

        // Strictly ONLY include product_id, variation_id (if applicable), and quantity
        const lineItemObj: {
          product_id: number;
          quantity: number;
          variation_id?: number;
        } = {
          product_id: numericProductId,
          quantity,
        };

        if (variationId && variationId > 0) {
          lineItemObj.variation_id = variationId;
        }

        return lineItemObj;
      })
    );

    const validLineItems = lineItems.filter(Boolean);

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
        if (validLineItems.length > 0) {
          updatePayload.line_items = validLineItems;
        }
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
        const newOrderData: any = {
          payment_method: 'razorpay',
          payment_method_title: 'Razorpay',
          set_paid: true,
          status: 'processing',
          meta_data: paymentMetaData,
          billing: billingPayload,
          shipping: shippingPayload,
          line_items: validLineItems,
        };

        if (finalCustomerId) {
          newOrderData.customer_id = finalCustomerId;
        }

        console.log('Creating WooCommerce order with payload:', JSON.stringify(newOrderData, null, 2));

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
