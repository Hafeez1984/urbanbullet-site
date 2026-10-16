export interface TurnstileVerificationResult {
  success: boolean;
  errorCodes?: string[];
  challengeTs?: string;
  hostname?: string;
}

/**
 * Validates a Cloudflare Turnstile token against Cloudflare siteverify endpoint.
 *
 * @param token - The response token from Turnstile widget onSuccess callback
 * @param remoteip - Optional client IP address
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  remoteip?: string
): Promise<TurnstileVerificationResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error('[Turnstile] Missing TURNSTILE_SECRET_KEY environment variable.');
    return {
      success: false,
      errorCodes: ['missing-secret-key'],
    };
  }

  if (!token || typeof token !== 'string' || !token.trim()) {
    return {
      success: false,
      errorCodes: ['missing-input-response'],
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token.trim());
    if (remoteip) {
      formData.append('remoteip', remoteip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`[Turnstile] Cloudflare siteverify HTTP error: ${response.status} ${response.statusText}`);
      return {
        success: false,
        errorCodes: [`http-status-${response.status}`],
      };
    }

    const data = await response.json();

    if (!data.success) {
      console.warn('[Turnstile] Cloudflare siteverify rejected token:', data['error-codes'] || data);
      return {
        success: false,
        errorCodes: data['error-codes'] || ['verification-failed'],
      };
    }

    return {
      success: true,
      challengeTs: data.challenge_ts,
      hostname: data.hostname,
    };
  } catch (error: unknown) {
    console.error('[Turnstile] Error during Cloudflare siteverify fetch:', error);
    return {
      success: false,
      errorCodes: ['network-error'],
    };
  }
}
