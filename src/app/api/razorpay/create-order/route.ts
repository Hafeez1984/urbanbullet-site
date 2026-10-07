import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR' } = body;

    const parsedAmount = typeof amount === 'number' ? amount : parseFloat(amount);

    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid or missing amount parameter' },
        { status: 400 }
      );
    }

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim();
    const key_secret = process.env.RAZORPAY_KEY_SECRET?.trim();

    if (!key_id || !key_secret) {
      return NextResponse.json(
        { error: 'Razorpay API credentials not configured in environment' },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: key_id,
      key_secret: key_secret,
    });

    const options = {
      amount: Math.round(parsedAmount * 100),
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error('Error in /api/razorpay/create-order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create Razorpay order' },
      { status: 500 }
    );
  }
}
