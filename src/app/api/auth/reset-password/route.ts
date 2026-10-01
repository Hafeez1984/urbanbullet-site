import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function POST(request: Request) {
  return NextResponse.json({
    success: true,
    message: 'If an account exists for that email, a reset link has been dispatched.',
  });
}
