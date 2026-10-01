import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { wcApi } from '@/lib/woocommerce-client';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const queryEmail = searchParams.get('email');

    // Determine target user email from session or query param
    const userEmail = session?.user?.email || queryEmail;

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Unauthorized. No active session or email provided.' },
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
      console.warn("WooCommerce API keys (WC_CONSUMER_KEY, WC_CONSUMER_SECRET) not set in environment.");
      return NextResponse.json({
        orders: [],
        addresses: [],
        customer: null,
        message: "WooCommerce REST API credentials not configured in .env",
      });
    }

    let customerData = null;
    let ordersData: any[] = [];
    const addressesData: any[] = [];

    // 1. Fetch Customer details from WooCommerce REST API
    try {
      const customerRes = await wcApi.get("customers", { email: userEmail });
      if (customerRes.data && Array.isArray(customerRes.data) && customerRes.data.length > 0) {
        customerData = customerRes.data[0];
      }
    } catch (err) {
      console.error("Error fetching WooCommerce customer by email:", err);
    }

    // 2. Extract Saved Addresses from Customer record if available
    if (customerData) {
      if (customerData.billing && (customerData.billing.address_1 || customerData.billing.city || customerData.billing.first_name)) {
        addressesData.push({
          id: 'billing',
          type: 'Billing Address',
          isDefault: true,
          firstName: customerData.billing.first_name || customerData.first_name || '',
          lastName: customerData.billing.last_name || customerData.last_name || '',
          company: customerData.billing.company || '',
          address1: customerData.billing.address_1 || '',
          address2: customerData.billing.address_2 || '',
          city: customerData.billing.city || '',
          state: customerData.billing.state || '',
          postcode: customerData.billing.postcode || '',
          country: customerData.billing.country || '',
          email: customerData.billing.email || customerData.email || userEmail,
          phone: customerData.billing.phone || '',
        });
      }

      if (customerData.shipping && (customerData.shipping.address_1 || customerData.shipping.city || customerData.shipping.first_name)) {
        addressesData.push({
          id: 'shipping',
          type: 'Shipping Address',
          isDefault: addressesData.length === 0,
          firstName: customerData.shipping.first_name || customerData.first_name || '',
          lastName: customerData.shipping.last_name || customerData.last_name || '',
          company: customerData.shipping.company || '',
          address1: customerData.shipping.address_1 || '',
          address2: customerData.shipping.address_2 || '',
          city: customerData.shipping.city || '',
          state: customerData.shipping.state || '',
          postcode: customerData.shipping.postcode || '',
          country: customerData.shipping.country || '',
          email: userEmail,
          phone: customerData.shipping.phone || '',
        });
      }
    }

    // 3. Fetch User Orders from WooCommerce
    try {
      let wcOrders: any[] = [];

      if (customerData?.id) {
        const orderRes = await wcApi.get("orders", { customer: customerData.id, per_page: 50 });
        if (orderRes.data && Array.isArray(orderRes.data)) {
          wcOrders = orderRes.data;
        }
      }

      // Fallback search by billing email if customer ID returned no orders
      if (wcOrders.length === 0) {
        const orderSearchRes = await wcApi.get("orders", { search: userEmail, per_page: 50 });
        if (orderSearchRes.data && Array.isArray(orderSearchRes.data)) {
          wcOrders = orderSearchRes.data.filter(
            (o: any) => o.billing?.email?.toLowerCase() === userEmail.toLowerCase()
          );
        }
      }

      ordersData = wcOrders.map((order: any) => {
        const formattedDate = order.date_created
          ? new Date(order.date_created).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : 'Unknown Date';

        const itemNames = (order.line_items || [])
          .map((item: any) => `${item.name}${item.quantity > 1 ? ` (x${item.quantity})` : ''}`)
          .join(', ');

        const statusCapitalized = order.status
          ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
          : 'Processing';

        return {
          id: String(order.id),
          orderNumber: `#UB-${order.number || order.id}`,
          date: formattedDate,
          status: statusCapitalized,
          total: order.total ? `₹${parseFloat(order.total).toFixed(2)}` : '₹0.00',
          itemsCount: (order.line_items || []).reduce((acc: number, item: any) => acc + (item.quantity || 1), 0),
          itemsSummary: itemNames || 'Streetwear Gear',
          lineItems: (order.line_items || []).map((item: any) => ({
            id: String(item.id),
            name: item.name,
            quantity: item.quantity,
            total: item.total ? `₹${parseFloat(item.total).toFixed(2)}` : '₹0.00',
          })),
          billing: order.billing,
          shipping: order.shipping,
        };
      });

      // 4. Fallback: extract address from latest order if no saved address was in customer record
      if (addressesData.length === 0 && wcOrders.length > 0) {
        const latestOrder = wcOrders[0];
        if (latestOrder.shipping && (latestOrder.shipping.address_1 || latestOrder.shipping.city)) {
          addressesData.push({
            id: 'shipping',
            type: 'Shipping Address',
            isDefault: true,
            firstName: latestOrder.shipping.first_name || '',
            lastName: latestOrder.shipping.last_name || '',
            company: latestOrder.shipping.company || '',
            address1: latestOrder.shipping.address_1 || '',
            address2: latestOrder.shipping.address_2 || '',
            city: latestOrder.shipping.city || '',
            state: latestOrder.shipping.state || '',
            postcode: latestOrder.shipping.postcode || '',
            country: latestOrder.shipping.country || '',
            email: userEmail,
            phone: latestOrder.shipping.phone || '',
          });
        }
        if (latestOrder.billing && (latestOrder.billing.address_1 || latestOrder.billing.city)) {
          const isDefaultBilling = addressesData.length === 0;
          addressesData.push({
            id: 'billing',
            type: 'Billing Address',
            isDefault: isDefaultBilling,
            firstName: latestOrder.billing.first_name || '',
            lastName: latestOrder.billing.last_name || '',
            company: latestOrder.billing.company || '',
            address1: latestOrder.billing.address_1 || '',
            address2: latestOrder.billing.address_2 || '',
            city: latestOrder.billing.city || '',
            state: latestOrder.billing.state || '',
            postcode: latestOrder.billing.postcode || '',
            country: latestOrder.billing.country || '',
            email: latestOrder.billing.email || userEmail,
            phone: latestOrder.billing.phone || '',
          });
        }
      }
    } catch (err) {
      console.error("Error fetching WooCommerce orders:", err);
    }

    return NextResponse.json({
      orders: ordersData,
      addresses: addressesData,
      customer: customerData,
    });
  } catch (error: any) {
    console.error("Error in /api/account route:", error);
    return NextResponse.json(
      { error: "Failed to fetch account data", details: error.message },
      { status: 500 }
    );
  }
}
