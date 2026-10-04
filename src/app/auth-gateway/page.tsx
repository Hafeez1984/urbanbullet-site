'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

function AuthGatewayContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl') || 'https://urbanbullet.in/account';
    signIn('google', { callbackUrl });
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07070A] text-white">
      <div className="text-center font-mono">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#D4FF3F] border-t-transparent" />
        <p className="text-sm uppercase tracking-widest text-zinc-400">Redirecting to Google...</p>
      </div>
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
