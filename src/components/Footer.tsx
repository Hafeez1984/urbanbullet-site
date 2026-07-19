'use client';

import React, { useState, useEffect } from 'react';
import { useNotification } from '@/context/NotificationContext';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const { showNotification } = useNotification();
  const [email, setEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'success' | 'error' | ''>('');
  
  // Hydration-safe year state to match SSR '2026' target initially
  const [currentYear, setCurrentYear] = useState('2026');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.trim()) {
      setFormMessage('Please enter a valid email address.');
      setFormStatus('error');
      showNotification('Please enter a valid email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormMessage('Please enter a valid email address.');
      setFormStatus('error');
      showNotification('Please enter a valid email address.');
      return;
    }

    setFormStatus('success');
    setFormMessage('Subscription successful! Checked in.');
    showNotification(`Subscription successful! Joined with ${email}`);
    setEmail('');

    setTimeout(() => {
      setFormMessage('');
      setFormStatus('');
    }, 5000);
  };

  return (
    <footer className="w-full bg-[#0A0A0A] text-white border-t border-white/[0.06] relative z-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Top Grid: Newsletter + Navigation */}
        <div className="grid grid-cols-12 gap-0">
          {/* Newsletter */}
          <div className="col-span-12 lg:col-span-7 py-8 lg:py-10 lg:pr-14 xl:pr-24 border-b lg:border-b-0 lg:border-r border-white/[0.08]">
            <h2 className="font-display font-extrabold uppercase leading-[0.82] tracking-[-0.05em] text-[11.5vw] sm:text-[9vw] md:text-[58px] lg:text-[56px] xl:text-[64px] max-w-[14ch]">
              Subscribe to get{' '}
              <span className="font-[700] italic lowercase tracking-[-0.02em] text-white/30">free shipping</span>{' '}
              on your first order.
            </h2>
            <form id="newsletter-form" onSubmit={handleSubmit} className="mt-10 md:mt-12 max-w-[560px]" noValidate>
              <div className="flex flex-col sm:flex-row sm:items-stretch gap-0 border border-white/15 bg-white/[0.02] focus-within:bg-white/[0.04] focus-within:border-white transition-all duration-300">
                <label htmlFor="email-input" className="sr-only">Email address</label>
                <input
                  id="email-input"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer flex-1 bg-transparent px-5 sm:px-6 py-[18px] md:py-[20px] font-mono text-[11px] tracking-[0.18em] uppercase placeholder:text-white/30 text-white outline-none"
                />
                <button
                  type="submit"
                  className="group sm:w-auto w-full inline-flex items-center justify-center gap-2 bg-white text-black font-mono text-[11px] font-semibold tracking-[0.22em] uppercase px-6 md:px-8 py-[18px] md:py-[20px] hover:bg-zinc-100 active:bg-zinc-200 transition-colors cursor-pointer"
                >
                  <span>Subscribe</span>
                  <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                </button>
              </div>
              <p
                id="form-message"
                className={`${
                  formStatus ? 'block' : 'hidden'
                } mt-4 font-mono text-[11px] leading-relaxed tracking-wide uppercase ${
                  formStatus === 'success' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {formMessage}
              </p>
              <p className="mt-4 font-mono text-[10px] leading-[1.6] tracking-[0.04em] text-white/30 uppercase max-w-[56ch]">
                By subscribing you agree to our Privacy Policy. *Free shipping applies to domestic orders only. Limited time. No spam, ever.
              </p>
            </form>
          </div>
          {/* Navigation Links */}
          <div className="col-span-12 lg:col-span-5 py-8 lg:py-10 lg:pl-14 xl:pl-20">
            <div className="grid grid-cols-2 gap-10 md:gap-12">
              {/* Shop */}
              <div>
                <h3 className="font-mono text-[13px] md:text-[14px] font-bold tracking-[0.24em] uppercase text-white/30 mb-8 md:mb-10">Shop</h3>
                <ul className="space-y-[18px]">
                  <li>
                    <Link href="/shop" className="group inline-flex items-center gap-2 font-medium text-[15px] md:text-[16px] tracking-tight text-white/70 hover:text-white transition-colors duration-200">
                      <span className="link-underline">New Drops</span>
                      <span className="inline-flex items-center justify-center rounded-[4px] bg-white text-black font-mono text-[8px] tracking-[0.12em] uppercase px-1.5 py-[2px] ml-1">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop/men" className="group inline-flex items-center gap-2 text-[15px] md:text-[16px] tracking-tight text-white/70 hover:text-white transition-colors">
                      <span className="link-underline">Men</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop/women" className="group inline-flex items-center gap-2 text-[15px] md:text-[16px] tracking-tight text-white/70 hover:text-white transition-colors">
                      <span className="link-underline">Women</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop/accessories" className="group inline-flex items-center gap-2 text-[15px] md:text-[16px] tracking-tight text-white/70 hover:text-white transition-colors">
                      <span className="link-underline">Accessories</span>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Legal & Help */}
              <div>
                <h3 className="font-mono text-[13px] md:text-[14px] font-bold tracking-[0.24em] uppercase text-white/30 mb-8 md:mb-10">Legal & Help</h3>
                <ul className="space-y-[14px]">
                  <li>
                    <Link href="/privacy-policy" className="link-underline font-mono text-[12px] md:text-[13px] tracking-[0.02em] text-white/50 hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-and-conditions" className="link-underline font-mono text-[12px] md:text-[13px] tracking-[0.02em] text-white/50 hover:text-white transition-colors">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/return-policy" className="link-underline font-mono text-[12px] md:text-[13px] tracking-[0.02em] text-white/50 hover:text-white transition-colors">
                      Return & Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping-policy" className="link-underline font-mono text-[12px] md:text-[13px] tracking-[0.02em] text-white/50 hover:text-white transition-colors">
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="inline-flex items-center gap-2 font-mono text-[12px] md:text-[13px] tracking-[0.02em] text-white hover:text-white transition-colors">
                      <span className="link-underline">Contact Us</span>
                      <span className="h-1 w-1 rounded-full bg-white animate-pulse"></span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* Social Icons & Address Grid */}
            <div className="mt-8 md:mt-10 pt-6 border-t border-white/10 lg:border-white/0 grid grid-cols-2 gap-10 md:gap-12">
              {/* Left Column (Under Shop) */}
              <div>
                {/* Monochrome Social Icons */}
                <div className="flex items-center gap-2.5">
                  {/* YouTube */}
                  <a href="https://www.youtube.com/@urbanbulletofficial" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200" aria-label="YouTube">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a href="https://www.facebook.com/urbanbulletofficial/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200" aria-label="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200" aria-label="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  {/* WhatsApp */}
                  <a href="https://wa.me/919447921089" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200" aria-label="WhatsApp">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </a>
                </div>
              </div>
              {/* Right Column (Under Legal & Help) */}
              <div>
                <p className="font-mono text-[11px] leading-relaxed text-white/50 max-w-[40ch]">
                  Darulnajad, Peermade(P.O), Idukki(Dist)Kerala 685531, landMark: Behind State Bank of INDIA
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full border-t border-white/[0.08] py-4">
          {/* Multicolor continuous line logo for Urban Bullet */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Home">
            <svg width="86" height="20" viewBox="0 0 86 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <defs>
                <linearGradient id="urban-rainbow" x1="0" y1="10" x2="86" y2="10" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FF3B30"/>
                  <stop offset="22%" stopColor="#FFCC02"/>
                  <stop offset="48%" stopColor="#34C759"/>
                  <stop offset="73%" stopColor="#007AFF"/>
                  <stop offset="100%" stopColor="#AF52DE"/>
                </linearGradient>
              </defs>
              <path
                d="M1.5 12.8C9 5.2 15.5 -0.8 23.2 5.2C30.9 11.2 35.2 17 43.8 10.2C52.4 3.4 58.2 -1.5 67.2 6.8C72.8 11.6 79.5 13.4 84.5 11.5"
                stroke="url(#urban-rainbow)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-display font-extrabold tracking-[-0.02em] text-[13px] uppercase leading-none pt-[1px]">Urban Bullet</span>
          </Link>
          {/* Right: Copyright */}
          <div className="font-mono text-[11px] leading-[1.5] tracking-[0.02em] text-white/35">
            <span className="uppercase">
              © <span id="current-year">{currentYear}</span> Urban Bullet. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
