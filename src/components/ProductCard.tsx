'use client';

import React, { useState } from 'react';
import { Heart, Printer } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useNotification } from '@/context/NotificationContext';

export function ProductCard({ product }: { product?: any } = {}) {
  const [selectedColor, setSelectedColor] = useState('OBSIDIAN BLACK');
  const [selectedSize, setSelectedSize] = useState('L');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  const title = product?.name || 'NEO-SHINJUKU GLITCH RUNNER';
  const priceDisplay = product?.price
    ? typeof product.price === 'string'
      ? product.price
      : `₹${product.price}`
    : '$128.00';
  const imageUrl =
    product?.image?.sourceUrl ||
    (typeof product?.image === 'string'
      ? product.image
      : 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80');
  const productUrl = product?.slug
    ? `/products/${product.slug}`
    : product?.id
    ? `/products/${product.id}`
    : '/';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const itemToAdd = {
      id: product?.id || 'prod_1',
      name: title,
      price: product?.price
        ? typeof product.price === 'string'
          ? parseFloat(product.price.replace(/[^0-9.]/g, '')) || 128
          : product.price
        : 128,
      size: selectedSize,
      color: selectedColor,
      image: imageUrl,
    };
    addToCart(itemToAdd);
    showNotification(`${title} (Size: ${selectedSize}) added to cart!`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    const itemToAdd = {
      id: product?.id || 'prod_1',
      name: title,
      price: product?.price
        ? typeof product.price === 'string'
          ? parseFloat(product.price.replace(/[^0-9.]/g, '')) || 128
          : product.price
        : 128,
      size: selectedSize,
      color: selectedColor,
      image: imageUrl,
    };
    addToCart(itemToAdd);
    router.push('/account?tab=cart');
  };

  return (
    <article className="group relative bg-[#080a11]/85 backdrop-blur-xl border border-[#1b223c] hover:border-[#00f0ff]/80 transition-all duration-500 flex flex-col cyber-chamfer hover:shadow-[0_0_20px_-3px_rgba(0,240,255,0.45)] scanline-bg w-full max-w-sm text-slate-100">
      <div className="flex justify-between items-center px-4 pt-3 pb-1 text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-[#1b223c]/40">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>SYS.REF // 884-XTR
        </span>
        <span className="text-[#00f0ff]/70 font-semibold">NEO_FABRIC // POD-01</span>
      </div>
      <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#0c0f1d] to-[#080a11] overflow-hidden flex items-center justify-center">
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 items-start">
          <span className="cyber-badge-clip bg-gradient-to-r from-[#00f0ff] to-blue-600 text-black font-bold text-xs uppercase px-2.5 py-1 tracking-wider shadow-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span> NEW DROP
          </span>
        </div>
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center bg-black/70 border ${
            isWishlisted
              ? 'border-[#ff0055] text-[#ff0055]'
              : 'border-slate-700/80 text-slate-400'
          } hover:text-[#ff0055] hover:border-[#ff0055] transition-all backdrop-blur-md`}
        >
          <Heart className="w-4 h-4" />
        </button>
        <Link
          className="relative w-full h-full p-6 flex items-center justify-center cursor-pointer"
          href={productUrl}
        >
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
          />
          <img
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"
            alt="Back"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
          />
        </Link>
        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-slate-400 bg-black/80 px-2 py-0.5 border border-slate-800 backdrop-blur-sm z-10 flex items-center gap-1.5 pointer-events-none">
          <Printer className="w-3 h-3 text-[#00f0ff]" /> DTG ULTRA-HD
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link href={productUrl}>
            <h2 className="text-xl font-bold uppercase tracking-wide text-white hover:text-[#00f0ff] transition-colors line-clamp-1 cursor-pointer">
              {title}
            </h2>
          </Link>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl font-mono font-bold text-[#00f0ff] tracking-tight">
              {priceDisplay}
            </span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5">
              IN STOCK [POD]
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                CHROMA COLORWAY:
              </span>
              <span className="text-[11px] font-mono text-[#00f0ff] font-semibold">
                {selectedColor}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setSelectedColor('OBSIDIAN BLACK')}
                className={`relative w-6 h-6 rounded-none transition-all hover:scale-110 focus:outline-none ${
                  selectedColor === 'OBSIDIAN BLACK'
                    ? 'border-2 ring-2 border-[#00f0ff] ring-[#00f0ff]/40'
                    : 'border border-slate-700 hover:border-[#00f0ff]'
                }`}
              >
                <span className="absolute inset-0.5 bg-[#0e1017]"></span>
              </button>
              <button
                onClick={() => setSelectedColor('NEON CYAN')}
                className={`relative w-6 h-6 rounded-none transition-all hover:scale-110 focus:outline-none ${
                  selectedColor === 'NEON CYAN'
                    ? 'border-2 ring-2 border-[#00f0ff] ring-[#00f0ff]/40'
                    : 'border border-slate-700 hover:border-[#00f0ff]'
                }`}
              >
                <span className="absolute inset-0.5 bg-gradient-to-br from-cyan-400 to-cyan-600"></span>
              </button>
              <button
                onClick={() => setSelectedColor('ACID MAGENTA')}
                className={`relative w-6 h-6 rounded-none transition-all hover:scale-110 focus:outline-none ${
                  selectedColor === 'ACID MAGENTA'
                    ? 'border-2 ring-2 border-[#00f0ff] ring-[#00f0ff]/40'
                    : 'border border-slate-700 hover:border-[#00f0ff]'
                }`}
              >
                <span className="absolute inset-0.5 bg-gradient-to-br from-pink-500 to-rose-700"></span>
              </button>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 block">
              FIT PROFILE:
            </span>
            <div className="grid grid-cols-5 gap-1.5 text-xs font-mono font-medium">
              {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-1.5 text-center transition-colors focus:outline-none ${
                    selectedSize === size
                      ? 'border border-[#00f0ff] bg-[#00f0ff]/15 text-[#00f0ff] font-bold shadow-[0_0_8px_rgba(0,240,255,0.3)]'
                      : 'border border-[#1b223c] hover:border-[#00f0ff] hover:text-[#00f0ff] bg-[#0c0f1d]/60'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-2 flex gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 px-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black flex items-center justify-center rounded-none cursor-pointer"
          >
            ADD TO CART
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 py-3 px-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 bg-green-500 text-black font-bold hover:bg-green-400 flex items-center justify-center rounded-none cursor-pointer"
          >
            BUY NOW
          </button>
        </div>
      </div>
      <div className="bg-black/80 px-4 py-2 border-t border-[#1b223c] flex items-center justify-between text-[10px] font-mono text-slate-500 mt-auto">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00f0ff]"></span>
          POD READY: 48H CRAFTING
        </span>
        <span className="text-slate-400">GLOBAL_SHIP // SECURE</span>
      </div>
    </article>
  );
}
