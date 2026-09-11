import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.trim() || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://ub-engine.urbanbullet.in';

    const formData = new URLSearchParams();
    formData.append('user_login', trimmedEmail);
    formData.append('wp-submit', 'Get New Password');

    const wpResponse = await fetch(`${wpUrl}/wp-login.php?action=lostpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      cache: 'no-store',
    });

    const html = await wpResponse.text();

    if (html.includes('id="login_error"') || html.includes('login_error')) {
      const match = html.match(/<div id="login_error"[^>]*>([\s\S]*?)<\/div>/i);
      let errorMsg = 'There is no account with that email address.';
      if (match) {
        let extractedText = match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        extractedText = extractedText.replace(/^(Error|ERROR):\s*/i, '');
        if (extractedText) {
          errorMsg = extractedText;
        }
      }
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'If an account exists for that email, a reset link has been dispatched.',
    });
  } catch (error: any) {
    console.error('Password reset API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process password reset request. Please try again later.' },
      { status: 500 }
    );
  }
}
