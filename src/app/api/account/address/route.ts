import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Helper to interact with WooCommerce REST API using native fetch
 * with `{ cache: 'no-store' }` to prevent stale responses.
 */
async function fetchWC(endpoint: string, params: Record<string, any> = {}, method: string = 'GET', bodyData?: any) {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://ub-engine.urbanbullet.in';
  const consumerKey = process.env.WC_CONSUMER_KEY || '';
  const consumerSecret = process.env.WC_CONSUMER_SECRET || '';

  const url = new URL(`${baseUrl}/wp-json/wc/v3/${endpoint}`);
  if (method === 'GET') {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        url.searchParams.append(key, String(val));
      }
    });
  }

  const authHeader = 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

  const options: RequestInit = {
    method,
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  };

  if (bodyData && method !== 'GET') {
    options.body = JSON.stringify(bodyData);
  }

  const res = await fetch(url.toString(), options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`WooCommerce API error ${res.status}: ${errorText}`);
  }

  const data = await res.json();
  return { data };
}

async function findCustomerByEmail(email: string) {
  try {
    const customerRes = await fetchWC('customers', { search: email.toLowerCase(), role: 'all' });
    if (customerRes.data && Array.isArray(customerRes.data)) {
      const match = customerRes.data.find(
        (c: any) => c.email && c.email.toLowerCase() === email.toLowerCase()
      );
      if (match) {
        return match;
      }
    }
  } catch (err) {
    console.error('Error finding WooCommerce customer:', err);
  }
  return null;
}

const emptyAddress = {
  first_name: '',
  last_name: '',
  company: '',
  address_1: '',
  address_2: '',
  city: '',
  state: '',
  postcode: '',
  country: '',
  phone: '',
};

const emptyBilling = {
  ...emptyAddress,
  email: '',
};

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to update address.' },
        { status: 401 }
      );
    }

    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;
    const hasCredentials =
      Boolean(consumerKey) &&
      Boolean(consumerSecret) &&
      consumerKey !== 'INSERT_KEY_HERE' &&
      consumerSecret !== 'INSERT_SECRET_HERE';

    if (!hasCredentials) {
      return NextResponse.json(
        { error: 'WooCommerce credentials not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { name, address, nearestLandmark, pin, email, contactNumber, clear } = body;

    const customer = await findCustomerByEmail(userEmail);
    let customerId = customer?.id || null;
    let customerData = customer;

    // Handle wipe/clear request via PUT
    if (clear === true || (!name && !address && !pin)) {
      if (customerId) {
        const updateRes = await fetchWC(`customers/${customerId}`, {}, 'PUT', {
          shipping: emptyAddress,
          billing: emptyBilling,
          meta_data: [{ key: 'ub_address_deleted', value: 'true' }],
        });
        customerData = updateRes.data;
      } else {
        const createRes = await fetchWC('customers', {}, 'POST', {
          email: userEmail.toLowerCase(),
          first_name: session?.user?.name?.split(' ')[0] || '',
          last_name: session?.user?.name?.split(' ').slice(1).join(' ') || '',
          shipping: emptyAddress,
          billing: emptyBilling,
          meta_data: [{ key: 'ub_address_deleted', value: 'true' }],
        });
        customerData = createRes.data;
      }

      return NextResponse.json({
        success: true,
        message: 'Address cleared successfully.',
        customer: customerData,
      });
    }

    // Strict validation for saving address
    if (!name || !address || !pin || !email || !contactNumber) {
      return NextResponse.json(
        { error: 'All mandatory fields (Name, Address, PIN, E-mail ID, Contact Number) are required.' },
        { status: 400 }
      );
    }

    // Split Name into first_name and last_name
    const nameParts = String(name).trim().split(' ').filter(Boolean);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Prepare address payloads
    const shippingPayload: Record<string, any> = {
      first_name: firstName,
      last_name: lastName,
      address_1: address.trim(),
      address_2: (nearestLandmark || '').trim(),
      postcode: pin.trim(),
      phone: contactNumber.trim(),
      country: 'IN', // Default country India
    };

    const billingPayload: Record<string, any> = {
      first_name: firstName,
      last_name: lastName,
      address_1: address.trim(),
      address_2: (nearestLandmark || '').trim(),
      postcode: pin.trim(),
      email: email.trim(),
      phone: contactNumber.trim(),
      country: 'IN',
    };

    if (!customerId) {
      const createRes = await fetchWC('customers', {}, 'POST', {
        email: userEmail.toLowerCase(),
        first_name: firstName,
        last_name: lastName,
        shipping: shippingPayload,
        billing: billingPayload,
        meta_data: [{ key: 'ub_address_deleted', value: 'false' }],
      });
      customerData = createRes.data;
    } else {
      const updateRes = await fetchWC(`customers/${customerId}`, {}, 'PUT', {
        shipping: shippingPayload,
        billing: billingPayload,
        meta_data: [{ key: 'ub_address_deleted', value: 'false' }],
      });
      customerData = updateRes.data;
    }

    return NextResponse.json({
      success: true,
      message: 'Address saved successfully.',
      customer: customerData,
    });
  } catch (error: any) {
    console.error('Error in PUT /api/account/address:', error);
    return NextResponse.json(
      { error: 'Failed to update address', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to clear address.' },
        { status: 401 }
      );
    }

    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;
    const hasCredentials =
      Boolean(consumerKey) &&
      Boolean(consumerSecret) &&
      consumerKey !== 'INSERT_KEY_HERE' &&
      consumerSecret !== 'INSERT_SECRET_HERE';

    if (!hasCredentials) {
      return NextResponse.json(
        { error: 'WooCommerce credentials not configured.' },
        { status: 500 }
      );
    }

    const customer = await findCustomerByEmail(userEmail);
    let customerId = customer?.id || null;
    let customerData = customer;

    if (customerId) {
      const updateRes = await fetchWC(`customers/${customerId}`, {}, 'PUT', {
        shipping: emptyAddress,
        billing: emptyBilling,
        meta_data: [{ key: 'ub_address_deleted', value: 'true' }],
      });
      customerData = updateRes.data;
    } else {
      const createRes = await fetchWC('customers', {}, 'POST', {
        email: userEmail.toLowerCase(),
        first_name: session?.user?.name?.split(' ')[0] || '',
        last_name: session?.user?.name?.split(' ').slice(1).join(' ') || '',
        shipping: emptyAddress,
        billing: emptyBilling,
        meta_data: [{ key: 'ub_address_deleted', value: 'true' }],
      });
      customerData = createRes.data;
    }

    return NextResponse.json({
      success: true,
      message: 'Address wiped successfully.',
      customer: customerData,
    });
  } catch (error: any) {
    console.error('Error in DELETE /api/account/address:', error);
    return NextResponse.json(
      { error: 'Failed to clear address', details: error.message },
      { status: 500 }
    );
  }
}
