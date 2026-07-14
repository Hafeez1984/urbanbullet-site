'use client';

import React, { useState } from 'react';
import { useNotification } from '@/context/NotificationContext';

export const Newsletter: React.FC = () => {
  const { showNotification } = useNotification();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    showNotification('Access Granted! 15% discount code sent to email.');
    setEmail('');
  };

  return (
    <section className="py-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 orbitron">
            <span className="neon-purple">STAY</span> CONNECTED
          </h2>
          <p className="text-xl text-gray-400 mb-6">
            Subscribe to get exclusive drops, early access, and 15% off your first order
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 bg-gray-900 border border-gray-800 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
              required
            />
            <button type="submit" className="cta-button px-10 py-4 rounded-full text-white font-bold orbitron whitespace-nowrap cursor-pointer">
              SUBSCRIBE NOW
            </button>
          </form>
          
          <p className="text-gray-600 text-sm mt-6">
            By subscribing, you agree to our Privacy Policy and consent to receive updates
          </p>
        </div>
      </div>
    </section>
  );
};
export default Newsletter;
