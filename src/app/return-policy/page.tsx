import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Return & Refund Policy | Urban Bullet',
  description: 'Review our return, refund, and replacement policies for custom-made print-on-demand cyberpunk apparel at Urban Bullet.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white gradient-bg flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-6 pt-32 pb-20 flex-grow max-w-4xl">
        {/* Page Header */}
        <div className="mb-12 border-b border-zinc-800 pb-8">
          <span className="text-xs font-mono tracking-widest text-zinc-600 block mb-2 uppercase">
            [ SECTION // 01 // RETURN & REFUND POLICY ]
          </span>
          <h1 className="text-4xl md:text-5xl font-black orbitron mb-4">
            RETURN & <span className="neon-cyan">REFUND POLICY</span>
          </h1>
          <p className="text-zinc-900 font-mono text-sm">
            LAST UPDATED: JULY 2026 // COMPLIANT WITH INDIAN E-COMMERCE LAW & PRINT-ON-DEMAND FULFILLMENT SPECIFICATIONS
          </p>
        </div>

        {/* Policy Notice Callout */}
        <div className="bg-zinc-900 border border-red-500 text-white rounded-2xl p-6 md:p-8 mb-8 shadow-[0_0_30px_rgba(239,68,68,0.05)] backdrop-blur-md">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/30 text-red-500 shrink-0">
              <i className="fas fa-exclamation-triangle text-lg"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold orbitron text-red-500 mb-2 uppercase tracking-wide">
                CRITICAL WARNING: CUSTOM PRINT-ON-DEMAND PRODUCT
              </h2>
              <p className="text-zinc-200 text-sm leading-relaxed">
                Because all Urban Bullet apparel is custom-made-to-order (Print-on-Demand), we strictly do not offer returns, refunds, or exchanges for buyer's remorse, change of mind, or incorrect sizing ordered by the customer. Please review our size charts carefully before purchasing.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Clauses */}
        <div className="space-y-8">
          {/* Clause 1 */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold orbitron text-zinc-100 mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded">
                SEC 1.1
              </span>
              Eligible Claims & Damages
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed mb-4">
              Returns or replacements are only accepted in the rare event of a manufacturing defect, misprint, or incorrect item delivery. Claims must be submitted within <strong>7 days</strong> of delivery.
            </p>
            <p className="text-zinc-300 text-xs font-mono">
              * Any claim filed after the 7-day post-delivery threshold will be automatically marked as expired under our manufacturing partner (Qikink) fulfillment SLAs.
            </p>
          </div>

          {/* Clause 2 */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold orbitron text-zinc-100 mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-purple-400 bg-purple-950/40 border border-purple-800/50 px-2 py-0.5 rounded">
                SEC 1.2
              </span>
              Mandatory Evidence Requirements
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed mb-4">
              An unboxing video and clear photographic evidence are mandatory for any defect claim to be processed. The video must show the package unopened and clearly capture the opening process, shipping label, and the specific defect.
            </p>
            <div className="bg-zinc-900/60 rounded-xl border border-zinc-800/60 p-4 font-mono text-xs text-zinc-300 space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                <span>The package outer shipping label must be clearly legible in the video.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                <span>The unboxing video must be continuous with no cuts, edits, or transitions.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                <span>High-resolution close-up photographs of the defect/misprint must be attached to the claim.</span>
              </div>
            </div>
          </div>

          {/* Clause 3 */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold orbitron text-zinc-100 mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded">
                SEC 1.3
              </span>
              Processing and Resolution
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed mb-4">
              Once your claim with evidence is received, we will verify the claim details with our production partners. If approved, we will process a replacement order at no additional cost to you.
            </p>
            <p className="text-zinc-200 text-sm leading-relaxed">
              Refunds are only issued in the form of original payment gateway reversals or store credits in the event that the item is out of stock or cannot be replaced due to material limitations.
            </p>
          </div>

          {/* SLA Flow Chart / Steps */}
          <div className="border border-zinc-800/80 rounded-2xl p-6 md:p-8 bg-zinc-900">
            <h4 className="text-sm font-bold orbitron text-zinc-200 mb-6 uppercase tracking-wider">
              CLAIM SUBMISSION PROTOCOL
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center font-mono">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold mb-3">
                  01
                </div>
                <div className="text-xs font-bold text-zinc-200 uppercase mb-1">Record Unboxing</div>
                <p className="text-[11px] text-zinc-300">Capture continuous video from seal-break to defect identification.</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold mb-3">
                  02
                </div>
                <div className="text-xs font-bold text-zinc-200 uppercase mb-1">Submit Ticket</div>
                <p className="text-[11px] text-zinc-300">Email support with your order number, video link, and photos within 7 days.</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold mb-3">
                  03
                </div>
                <div className="text-xs font-bold text-zinc-200 uppercase mb-1">Rapid Dispatch</div>
                <p className="text-[11px] text-zinc-300">Once verified, a brand new replacement is pushed directly to production.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
