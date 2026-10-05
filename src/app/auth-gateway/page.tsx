'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function AuthGatewayContent() {
  const searchParams = useSearchParams();
  const [csrfToken, setCsrfToken] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const submittedRef = useRef<boolean>(false);

  const callbackUrl = searchParams.get('callbackUrl') || 'https://urbanbullet.in/account';

  useEffect(() => {
    fetch('/api/auth/csrf')
      .then((res) => res.json())
      .then((data) => {
        if (data?.csrfToken) {
          setCsrfToken(data.csrfToken);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch CSRF token:', err);
      });
  }, []);

  useEffect(() => {
    if (csrfToken && formRef.current && !submittedRef.current) {
      submittedRef.current = true;
      formRef.current.submit();
    }
  }, [csrfToken]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07070A] text-white">
      <div className="text-center font-mono">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#D4FF3F] border-t-transparent" />
        <p className="text-sm uppercase tracking-widest text-zinc-400">Redirecting to Google...</p>
      </div>

      <form ref={formRef} action="/api/auth/signin/google" method="POST" className="hidden">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
      </form>
    </div>
  );
}

export default function AuthGatewayPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#07070A] text-white">
          <div className="text-center font-mono">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#D4FF3F] border-t-transparent" />
            <p className="text-sm uppercase tracking-widest text-zinc-400">Redirecting to Google...</p>
          </div>
        </div>
      }
    >
      <AuthGatewayContent />
    </Suspense>
  );
}
