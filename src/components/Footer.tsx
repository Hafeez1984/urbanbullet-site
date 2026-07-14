'use client';

import React, { useState } from 'react';
import { useNotification } from '@/context/NotificationContext';

export const Footer: React.FC = () => {
  const { showNotification } = useNotification();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showNotification(`Subscription successful! Joined with ${email}`);
      setEmail('');
    } else {
      showNotification('Please enter a valid email address.');
    }
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-zinc-900/60 pt-6 pb-12 text-zinc-400 font-sans relative z-20">
      <div className="max-w-[1800px] mx-auto px-12">
        
        {/* 12-Column Grid */}
        <div className="grid grid-cols-12 gap-y-16 md:gap-x-12">
          
          {/* Left Column (5/12 width) - Newsletter form */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-start">
            <h3 className="text-xl font-bold text-white mb-4 orbitron tracking-wider">
              JOIN THE REVOLUTION
            </h3>
            <p className="text-zinc-500 text-sm mb-6 max-w-sm leading-relaxed font-light">
              Subscribe to unlock early access to drops, member-only sales, and tactical streetwear updates.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-md">
              {/* Focus-within background transition container */}
              <div 
                className="flex items-center p-1.5 rounded-full border transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER ENCRYPTED EMAIL"
                  className="bg-transparent border-0 outline-none text-white text-xs px-4 py-2.5 flex-grow font-mono uppercase tracking-wider placeholder-zinc-700 w-full"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full font-bold text-xs bg-white text-black transition-all duration-300 hover:scale-105 cursor-pointer orbitron tracking-widest whitespace-nowrap active:scale-95"
                >
                  SUBSCRIBE
                </button>
              </div>
            </form>
          </div>

          {/* Right Columns (7/12 width) - Navigation Link directories */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 md:justify-items-end lg:justify-items-end">
            
            {/* Shop Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-bold text-white orbitron mb-2">
                SHOP CONSOLE
              </h4>
              <a href="#products" className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm font-light">
                All Drops
              </a>
              <a href="#products" className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm font-light">
                Outerwear
              </a>
              <a href="#products" className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm font-light">
                Hoodies
              </a>
              <a href="#products" className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm font-light">
                Accessories
              </a>
            </div>

            {/* Support / Info */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-bold text-white orbitron mb-2">
                TACTICAL UNIT
              </h4>
              <a href="#" onClick={(e) => { e.preventDefault(); showNotification('FAQ section coming soon'); }} className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm font-light">
                Client FAQ
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); showNotification('Shipping terms'); }} className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm font-light">
                Shipping & Transit
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); showNotification('Return policy details'); }} className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm font-light">
                Returns Portal
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); showNotification('Contact details'); }} className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm font-light">
                Contact HQ
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col space-y-4 col-span-2 md:col-span-1">
              <h4 className="text-xs uppercase tracking-widest font-bold text-white orbitron mb-2">
                PROTOCOLS
              </h4>
              <a href="#" onClick={(e) => { e.preventDefault(); showNotification('Terms under review'); }} className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm font-light">
                Terms of Service
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); showNotification('Privacy data protocols'); }} className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm font-light">
                Privacy Protocol
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); showNotification('Security terms'); }} className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm font-light">
                System Security
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-900 mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Signature Multicolor Continuous-Line SVG Logo */}
          <div className="flex flex-col items-start gap-2 self-start">
            <svg 
              width="180" 
              height="35" 
              viewBox="0 0 180 35" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-90 hover:opacity-100 transition-opacity duration-300"
            >
              <defs>
                <linearGradient id="rainbow-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />   {/* Red */}
                  <stop offset="25%" stopColor="#f59e0b" />  {/* Yellow/Orange */}
                  <stop offset="50%" stopColor="#10b981" />  {/* Green */}
                  <stop offset="75%" stopColor="#3b82f6" />  {/* Blue */}
                  <stop offset="100%" stopColor="#8b5cf6" /> {/* Purple */}
                </linearGradient>
              </defs>
              {/* Sleek continuous line waveform representing urban wave */}
              <path 
                d="M5 25 C 20 25, 30 5, 45 5 C 60 5, 70 30, 85 30 C 100 30, 110 10, 125 10 C 140 10, 150 25, 175 25" 
                stroke="url(#rainbow-line-grad)" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none" 
              />
            </svg>
            <span className="text-[10px] text-zinc-700 tracking-widest font-mono uppercase mt-1">
              URBANBULLET LINE SYSTEM // VER: 8.4
            </span>
          </div>

          {/* Copyright & Meta */}
          <div className="text-right flex flex-col md:items-end gap-1.5 text-xs text-zinc-600 font-mono">
            <span>© {new Date().getFullYear()} URBANBULLET INDUSTRIES. ALL RIGHTS SECURED.</span>
            <span className="text-[10px] text-zinc-800">CONNECTIVITY VIA HEADLESS BRIDGE V2.0</span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
