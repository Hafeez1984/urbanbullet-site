import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Urban Bullet',
  description: 'Read the official Terms of Service and conditions of use for the Urban Bullet e-commerce platform and cyberpunk apparel store.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white gradient-bg flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-6 pt-32 pb-20 flex-grow max-w-4xl">
        {/* Page Header */}
        <div className="mb-12 border-b border-zinc-800 pb-8">
          <span className="text-xs font-mono tracking-widest text-zinc-600 block mb-2 uppercase">
            [ SECTION // 03 // TERMS & CONDITIONS ]
          </span>
          <h1 className="text-4xl md:text-5xl text-zinc-900 font-extrabold orbitron mb-4">
            TERMS & CONDITIONS
          </h1>
          <p className="text-zinc-900 font-mono text-sm">
            LAST UPDATED: JULY 2026 // USER AGREEMENT & JURISDICTIONAL MEMORANDUM
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 mb-8 shadow-2xl backdrop-blur-md text-zinc-200 text-sm leading-relaxed">
          <p className="mb-4">
            Welcome to Urban Bullet. This website is operated by Urban Bullet. Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to Urban Bullet. By visiting our site and/or purchasing products from us, you engage in our &ldquo;Service&rdquo; and agree to be bound by the following terms and conditions.
          </p>
          <p>
            Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service.
          </p>
        </div>

        {/* Detailed Clauses */}
        <div className="space-y-8">
          {/* Clause 1: Intellectual Property & Copyright */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold orbitron text-zinc-100 mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded">
                SEC 3.1
              </span>
              Intellectual Property & Design Rights
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed mb-4">
              All designs, artworks, graphics, prints, digital assets, product listings, typography, layouts, code, and source files displayed on the Urban Bullet website are the exclusive intellectual property of Urban Bullet and are protected by Indian and international copyright, trademark, and proprietary laws.
            </p>
            <p className="text-zinc-200 text-sm leading-relaxed">
              No content from this site may be copied, reproduced, modified, republished, uploaded, posted, transmitted, or distributed in any form or by any means without prior written permission from us. Unauthorized use of any material may violate copyright, trademark, and other applicable laws.
            </p>
          </div>

          {/* Clause 2: Limitation of Liability */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold orbitron text-zinc-100 mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-purple-400 bg-purple-950/40 border border-purple-800/50 px-2 py-0.5 rounded">
                SEC 3.2
              </span>
              Limitation of Liability
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed mb-4">
              In no event shall Urban Bullet, our partners, officers, employees, or third-party suppliers (including Qikink) be liable for any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service.
            </p>
            <p className="text-zinc-200 text-sm leading-relaxed">
              We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. The service and all products delivered to you through the service are (except as expressly stated by us) provided &apos;as is&apos; and &apos;as available&apos; for your use.
            </p>
          </div>

          {/* Clause 3: Governing Law & Jurisdiction */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.03)]">
            <h3 className="text-xl font-bold orbitron text-zinc-100 mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded animate-pulse">
                SEC 3.3
              </span>
              Governing Law & Legal Jurisdiction
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed mb-4 font-bold">
              These Terms of Service and any separate agreements shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Idukki, Kerala, India.
            </p>
            <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/60 font-mono text-[11px] text-zinc-300">
              <i className="fas fa-gavel mr-2 text-cyan-400"></i>
              LEGAL FORUM: COURT OF IDUKKI, KERALA STATE, INDIA
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
