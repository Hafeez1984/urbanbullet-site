'use client';

import React, { useState } from 'react';
import { useNotification } from '@/context/NotificationContext';

export default function ContactForm() {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showNotification('Please fill in all mandatory fields.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    showNotification('Transmission sent! Our operators will reply shortly.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
            Operator Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Neo"
            className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition duration-200"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
            Signal Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. pilot@zion.net"
            className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition duration-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
          Transmission Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g. Custom order inquiry"
          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition duration-200"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
          Payload Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Compose your transmission..."
          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition duration-200 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cta-button w-full orbitron font-bold text-xs uppercase tracking-widest text-white py-4 rounded-xl shadow-lg border border-cyan-400/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
            <span>TRANSMITTING SIGNAL...</span>
          </>
        ) : (
          <>
            <i className="fas fa-paper-plane"></i>
            <span>SEND TRANSMISSION</span>
          </>
        )}
      </button>
    </form>
  );
}
