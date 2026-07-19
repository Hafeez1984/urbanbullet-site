import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Urban Bullet',
  description: 'Understand how Urban Bullet collects, uses, protects, and handles customer data in compliance with the IT Act and DPDP Act 2023.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white gradient-bg flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-6 pt-32 pb-20 flex-grow max-w-4xl">
        {/* Page Header */}
        <div className="mb-12 border-b border-zinc-800 pb-8">
          <span className="text-xs font-mono tracking-widest neon-cyan block mb-2 uppercase">
            [ SECTION // 04 // DATA PRIVACY PROTOCOLS ]
          </span>
          <h1 className="text-4xl md:text-5xl font-black orbitron mb-4">
            PRIVACY <span className="neon-purple">POLICY</span>
          </h1>
          <p className="text-zinc-400 font-mono text-sm">
            LAST UPDATED: JULY 2026 // COMPLIANT WITH IT ACT 2000 & DIGITAL PERSONAL DATA PROTECTION (DPDP) ACT 2023
          </p>
        </div>

        {/* DPDP Compliance Callout */}
        <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-6 md:p-8 mb-8 shadow-[0_0_30px_rgba(6,182,212,0.05)] backdrop-blur-md">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 text-cyan-400 shrink-0">
              <i className="fas fa-shield-alt text-lg"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold orbitron text-cyan-400 mb-2 uppercase tracking-wide">
                DPDP ACT 2023 COMPLIANCE CONSENT STATEMENT
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Under the Indian Digital Personal Data Protection (DPDP) Act 2023, by placing an order or registering an account, you consent to the secure collection, processing, and storage of your digital personal data solely for transactional and shipping execution as described below.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Clauses */}
        <div className="space-y-8">
          {/* Clause 1: Data Collection */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold orbitron text-zinc-100 mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded">
                SEC 4.1
              </span>
              Personal Data We Collect
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us, including:
            </p>
            <ul className="list-none font-mono text-xs text-zinc-400 space-y-2 pl-4 border-l border-zinc-800">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                <span>Customer Identity Data: Full Name</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                <span>Contact Details: Email Address, Active Mobile Number</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                <span>Logistics Parameters: Shipping Address, Billing Address, Postal Code (PIN)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                <span>Device/Connection Logs: IP Address, Browser Metadata, Session Cookies</span>
              </li>
            </ul>
          </div>

          {/* Clause 2: Purpose & Third-Party Sharing */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold orbitron text-zinc-100 mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-purple-400 bg-purple-950/40 border border-purple-800/50 px-2 py-0.5 rounded">
                SEC 4.2
              </span>
              Fulfillment Partners & Data Sharing
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              Customer data (name, address, phone) is strictly collected for order fulfillment and is shared securely with our trusted third-party manufacturing and shipping partners (Qikink and integrated courier services) solely for the purpose of printing, packaging, and delivering the product to your designated address.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              These third-party providers are contractually obligated to use your personal information only to the extent necessary to allow them to perform the manufacturing and logistics services they provide to us. They do not store, distribute, or utilize your data for marketing or telemetry purposes.
            </p>
          </div>

          {/* Clause 3: Payment Gateways */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold orbitron text-zinc-100 mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded">
                SEC 4.3
              </span>
              Security & Payment Ingestion
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              If you choose a direct payment gateway to complete your purchase, your transaction data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS). All payment transactions are ingested via standard, highly secure, and encrypted payment gateways (e.g. Razorpay / PhonePe). We never store your raw credit/debit card credentials on our servers.
            </p>
          </div>

          {/* Clause 4: User Rights */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold orbitron text-zinc-100 mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-purple-400 bg-purple-950/40 border border-purple-800/50 px-2 py-0.5 rounded">
                SEC 4.4
              </span>
              Your Digital Data Rights
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              Consistent with the IT Act 2000 and DPDP Act 2023, you have the right to request access to the personal data we hold about you, request corrections to incorrect or incomplete information, or request the erasure of your personal data when it is no longer required for active order fulfillment or legal/tax audit compliance.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              For any data erasure requests or privacy-related complaints, please contact our designated Grievance Officer using the coordinates listed on our Contact Us page.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
