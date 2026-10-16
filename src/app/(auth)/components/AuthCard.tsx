'use client';

import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';

type Mode = 'login' | 'signup';

export default function AuthCard() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notificationsAccepted, setNotificationsAccepted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const turnstileRef = useRef<TurnstileInstance>(null);

  const isLogin = mode === 'login';
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setTurnstileToken(null);
    setError(null);
    turnstileRef.current?.reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    if (!turnstileToken) {
      setError('Please complete the Cloudflare security verification.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        turnstileToken,
        isSignup: isLogin ? 'false' : 'true',
        redirect: false,
        callbackUrl: '/account',
      });

      if (res?.error) {
        setError(res.error);
        turnstileRef.current?.reset();
        setTurnstileToken(null);
        setIsSubmitting(false);
      } else if (res?.ok) {
        if (typeof window !== 'undefined') {
          window.location.href = '/account';
        } else {
          router.push('/account');
          router.refresh();
        }
      } else {
        setError('Authentication failed. Please try again.');
        turnstileRef.current?.reset();
        setTurnstileToken(null);
        setIsSubmitting(false);
      }
    } catch (err: any) {
      console.error('Sign-in error:', err);
      setError(err?.message || 'An unexpected authentication error occurred.');
      turnstileRef.current?.reset();
      setTurnstileToken(null);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070A] px-4 py-24 font-sans text-zinc-200">
      {/* ambient cyber background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#D4FF3F]/10 blur-[120px]" />
        <div className="absolute -bottom-44 -right-28 h-[460px] w-[460px] rounded-full bg-fuchsia-600/10 blur-[130px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4FF3F]/60 to-transparent" />
      </div>

      <div className="relative w-full max-w-[26.5rem]">
        {/* brand */}
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
            <span className="h-1 w-1 bg-[#D4FF3F]" /> print · on · demand
          </div>
          <h1 className="text-[1.9rem] font-black uppercase leading-none tracking-[-0.02em] text-white sm:text-4xl">
            URBAN<span className="text-[#D4FF3F]">BULLET</span>
          </h1>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            wear the signal
          </p>
        </div>

        {/* card */}
        <section className="relative border border-white/10 bg-white/[0.035] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <span className="pointer-events-none absolute -left-px -top-px h-3.5 w-3.5 border-l-2 border-t-2 border-[#D4FF3F]" />
          <span className="pointer-events-none absolute -right-px -top-px h-3.5 w-3.5 border-r-2 border-t-2 border-[#D4FF3F]" />
          <span className="pointer-events-none absolute -bottom-px -left-px h-3.5 w-3.5 border-b-2 border-l-2 border-[#D4FF3F]" />
          <span className="pointer-events-none absolute -bottom-px -right-px h-3.5 w-3.5 border-b-2 border-r-2 border-[#D4FF3F]" />

          <div className="p-6 sm:p-7">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-lg font-bold uppercase tracking-tight text-white">
                {isLogin ? 'Log In' : 'Sign Up'}
              </h2>
              <span className="font-mono text-[10px] text-zinc-600">/01</span>
            </div>

            {/* Google OAuth — Native NextAuth signIn */}
            <button
              type="button"
              onClick={() => signIn('google', { callbackUrl: '/account' })}
              className="group flex w-full items-center justify-center gap-3 border border-white/15 bg-white/[0.04] px-4 py-3.5 text-[13px] font-semibold text-zinc-100 transition hover:border-[#D4FF3F]/50 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4FF3F]/60"
            >
              <svg className="h-[18px] w-[18px]" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C41.1 35.6 44 30.2 44 24c0-1.2-.1-2.3-.4-3.5z" />
              </svg>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                {isLogin ? 'Log in with Google' : 'Sign up with Google'}
              </span>
              <svg
                className="h-3.5 w-3.5 text-zinc-500 transition group-hover:translate-x-0.5 group-hover:text-[#D4FF3F]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            {/* divider */}
            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                or
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
            </div>

            {/* Email & Password Credentials Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500"
                >
                  Enter your email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@urbanbullet.co"
                  className="w-full border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-[#D4FF3F]/70 focus:bg-black/70 focus:ring-1 focus:ring-[#D4FF3F]/40"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500"
                >
                  Enter your password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••• (min. 6 characters)"
                  className="w-full border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-[#D4FF3F]/70 focus:bg-black/70 focus:ring-1 focus:ring-[#D4FF3F]/40"
                />
              </div>

              {!isLogin && (
                <div className="space-y-2.5 pt-1">
                  <label className="flex cursor-pointer items-start gap-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
                    <input
                      type="checkbox"
                      required
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-px h-3.5 w-3.5 shrink-0 rounded-none border border-white/20 bg-black/60 accent-[#D4FF3F]"
                    />
                    <span>I accept the Terms of Service & Privacy Policy</span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
                    <input
                      type="checkbox"
                      checked={notificationsAccepted}
                      onChange={(e) => setNotificationsAccepted(e.target.checked)}
                      className="mt-px h-3.5 w-3.5 shrink-0 rounded-none border border-white/20 bg-black/60 accent-[#D4FF3F]"
                    />
                    <span>Receive drop notifications & updates</span>
                  </label>
                </div>
              )}

              {error && (
                <div className="border border-red-500/40 bg-red-500/10 px-3.5 py-2.5 font-mono text-xs text-red-400">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Real Cloudflare Turnstile Widget */}
              <div className="flex justify-center pt-2 min-h-[65px]">
                <Turnstile
                  key={mode}
                  ref={turnstileRef}
                  siteKey={siteKey}
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    setError(null);
                  }}
                  onExpire={() => {
                    setTurnstileToken(null);
                  }}
                  onError={() => {
                    setTurnstileToken(null);
                    setError('Turnstile verification failed. Please try again.');
                  }}
                  options={{
                    theme: 'dark',
                    size: 'normal',
                  }}
                />
              </div>

              {/* Submit Button - Disabled until Turnstile onSuccess provides a valid token */}
              <button
                type="submit"
                disabled={!turnstileToken || isSubmitting}
                className="mt-3 w-full border border-[#D4FF3F] bg-[#D4FF3F] px-4 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-black transition hover:bg-[#E6FF6B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4FF3F]/60 active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#D4FF3F]"
              >
                {isSubmitting
                  ? (isLogin ? 'Authenticating...' : 'Registering...')
                  : (isLogin ? 'Continue' : 'Sign Up')}
              </button>
            </form>

            {/* Toggle Login/Signup */}
            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeChange('signup')}
                    className="text-[#D4FF3F] underline decoration-dotted underline-offset-4 transition hover:text-[#E6FF6B]"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeChange('login')}
                    className="text-[#D4FF3F] underline decoration-dotted underline-offset-4 transition hover:text-[#E6FF6B]"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>

          <div className="border-t border-white/10 bg-black/40 px-4 py-2 text-center font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-600">
            printed on demand · zero deadstock
          </div>
        </section>

        <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600">
          © {new Date().getFullYear()} URBANBULLET — all drops reserved
        </p>
      </div>
    </main>
  );
}
