import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Urban Bullet',
  description: 'Get in touch with the Urban Bullet support squad. View our official registered address, business hours, and submit an inquiry.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white gradient-bg flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-6 pt-32 pb-20 flex-grow max-w-6xl">
        {/* Page Header */}
        <div className="mb-12 border border-zinc-800/80 rounded-2xl p-6 md:p-8 bg-zinc-900 text-center md:text-left">
          <span className="text-xs font-mono tracking-widest text-zinc-600 block mb-2 uppercase">
            [ ESTABLISH // COMMUNICATIONS // SQUAD SUPPORT ]
          </span>
          <h1 className="text-4xl md:text-5xl font-black orbitron mb-4">
            CONTACT <span className="neon-purple">US</span>
          </h1>
          <p className="text-zinc-900 font-mono text-sm max-w-xl">
            Have a question about custom print-on-demand sizing, defect replacements, or shipping? Broadcast your transmission below.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Coordinates / Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Info Card */}
            <div className="bg-zinc-900 border border-cyan-500 text-white rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md flex-grow flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">// Main Base Coordinates</h3>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-100 mb-1">Urban Bullet Headquarters</p>
                      <p className="text-zinc-400 text-xs leading-relaxed font-mono">
                        Darulnajad, Peermade(P.O),<br />
                        Idukki(Dist) Kerala 685531,<br />
                        LandMark: Behind State Bank of INDIA
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-2">// Digital Uplink</h3>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-purple-400 shrink-0 mt-1">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-100 mb-1">Official Support Mailbox</p>
                      <a href="mailto:urbanbullet1984@gmail.com" className="text-zinc-400 text-xs font-mono hover:text-purple-400 transition-colors">
                        urbanbullet1984@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">// Availability Window</h3>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-100 mb-1">Business Operating Hours</p>
                      <p className="text-zinc-400 text-xs font-mono">
                        Monday - Saturday<br />
                        10:00 AM - 6:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-xs text-zinc-400">
                  SYSTEM STATUS: COMMUNICATIONS OPERATIONAL
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Terminal */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold orbitron text-zinc-100 mb-6 flex items-center gap-3">
                <span className="font-mono text-xs text-purple-400 bg-purple-950/40 border border-purple-800/50 px-2 py-0.5 rounded animate-pulse">
                  FORM // UB-909
                </span>
                Transmit Message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
