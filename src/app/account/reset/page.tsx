"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function PasswordResetPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API request to backend
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus('success');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glow matching Street Revolution aesthetic */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl backdrop-blur-xl relative z-10">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors mb-6 group font-mono"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Account
        </Link>

        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-1">
            [ SECURITY PROTOCOL // RESET ]
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono uppercase">
            Reset Password
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Enter your registered email address below to receive password recovery instructions.
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-sans">
            If an account exists for that email, a reset link has been dispatched.
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="reset-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2 font-mono">
                Email Address
              </label>
              <input
                type="email"
                id="reset-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                placeholder="e.g. alex@streetrevolution.com"
                className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 text-sm uppercase tracking-wider font-mono cursor-pointer disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
