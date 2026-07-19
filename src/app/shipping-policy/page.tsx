import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Shipping Policy | Urban Bullet',
  description: 'Learn about shipping and delivery times, courier partners, tracking, and reshipping guidelines for Urban Bullet streetwear within India.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white gradient-bg flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-6 pt-32 pb-20 flex-grow max-w-4xl">
        {/* Page Header */}
        <div className="mb-12 border-b border-zinc-800 pb-8">
          <span className="text-xs font-mono tracking-widest text-zinc-600 block mb-2 uppercase">
            [ SECTION // 02 // SHIPPING & DELIVERY POLICY ]
          </span>
          <h1 className="text-4xl md:text-5xl text-zinc-900 font-extrabold orbitron mb-4">
            SHIPPING POLICY
          </h1>
          <p className="text-zinc-900 font-mono text-sm">
            LAST UPDATED: JULY 2026 // NATIONWIDE LOGISTICS & MANUFACTURING PROTOCOLS
          </p>
        </div>

        {/* Shipping Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-mono">
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="text-cyan-400 text-xs uppercase tracking-widest mb-1">// Production Phase</div>
              <h3 className="text-xl font-bold orbitron text-white mb-3">2 - 4 BUSINESS DAYS</h3>
              <p className="text-zinc-300 text-xs leading-relaxed">
                Every Urban Bullet item is custom manufactured on-demand immediately after order receipt, reducing global textile waste.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-900 text-[10px] text-zinc-300">
              * EXCLUDES SUNDAYS AND PUBLIC HOLIDAYS
            </div>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="text-purple-400 text-xs uppercase tracking-widest mb-1">// Transit Phase</div>
              <h3 className="text-xl font-bold orbitron text-white mb-3">3 - 7 BUSINESS DAYS</h3>
              <p className="text-zinc-300 text-xs leading-relaxed">
                Shipped via Tier-1 Indian logistics providers. Delivery times vary by zone and pin code accessibility.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-900 text-[10px] text-zinc-300">
              * TRACKING LINK DISPATCHED VIA SMS/EMAIL
            </div>
          </div>
        </div>

        {/* Detailed Clauses */}
        <div className="space-y-8">
          {/* Clause 1 */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold orbitron text-zinc-100 mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded">
                SEC 2.1
              </span>
              Processing & SLA Window
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed">
              All orders are processed and sent to production within 2-4 business days. Standard delivery within India takes an additional 3-7 business days depending on the courier partner and pin code.
            </p>
          </div>

          {/* Clause 2 */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold orbitron text-zinc-100 mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-purple-400 bg-purple-950/40 border border-purple-800/50 px-2 py-0.5 rounded">
                SEC 2.2
              </span>
              Force Majeure & Courier Delays
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed mb-4">
              Urban Bullet is not liable for shipping delays caused by unforeseen circumstances, natural disasters, weather anomalies, public holidays, regional lockdowns, or courier partner operational delays.
            </p>
            <p className="text-zinc-200 text-sm leading-relaxed">
              We coordinate with leading courier aggregates (including Delhivery, Blue Dart, Xpressbees, and DTDC via our fulfillment partner Qikink) to resolve bottlenecks, but exact delivery dates cannot be guaranteed.
            </p>
          </div>

          {/* Clause 3 */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold orbitron text-zinc-100 mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded">
                SEC 2.3
              </span>
              Undelivered Shipments & Re-shipping Fees
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed mb-4">
              If an order is returned to us due to an incorrect/incomplete address provided by the customer, or multiple failed delivery attempts by the courier partner, the customer will be responsible for the re-shipping costs.
            </p>
            <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-4 font-mono text-xs text-zinc-300">
              <span className="text-amber-400 font-bold uppercase tracking-wider block mb-1">Notice on RTO (Return to Origin):</span>
              To avoid extra logistics fees, please ensure that the shipping address is complete with door numbers, landmarks, and correct pin codes, and that your contact number remains active during the delivery window.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
