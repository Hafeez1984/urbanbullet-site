'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DetailedProduct } from '@/lib/woocommerce';
import { useCart } from '@/context/CartContext';
import { useNotification } from '@/context/NotificationContext';
import { ShieldCheck, Zap, Award, ChevronDown, ChevronUp, ShoppingBag, Bolt, ArrowLeft, Check, Star } from 'lucide-react';

interface ProductDetailClientProps {
  product: DetailedProduct;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const router = useRouter();

  // Extract size & color attributes with sensible defaults
  const sizeAttribute = product.attributes.find((a) => a.name.toLowerCase().includes('size'));
  const sizes = sizeAttribute?.options && sizeAttribute.options.length > 0
    ? sizeAttribute.options
    : ['S', 'M', 'L', 'XL', 'XXL'];

  const colorAttribute = product.attributes.find((a) => a.name.toLowerCase().includes('color'));
  const colors = colorAttribute?.options && colorAttribute.options.length > 0
    ? colorAttribute.options
    : ['OBSIDIAN BLACK', 'NEON CYAN', 'ACID MAGENTA'];

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || 'OBSIDIAN BLACK');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [openAccordion, setOpenAccordion] = useState<'specs' | 'fabric' | 'delivery' | null>('specs');
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Mobile Touch Swipe Handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isSwipeLeft = distance > 40;
    const isSwipeRight = distance < -40;

    if (isSwipeLeft) {
      setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
    } else if (isSwipeRight) {
      setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentImage = product.images[selectedImageIndex] || product.images[0] || {
    sourceUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    altText: product.name,
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.numericPrice || parseFloat(product.price.replace(/[^0-9.]/g, '')) || 99,
      size: selectedSize,
      color: selectedColor,
      image: currentImage.sourceUrl,
    };

    addToCart(itemToAdd);
    showNotification(`${product.name} (Size: ${selectedSize}, Color: ${selectedColor}) added to cart!`);

    // Create ripple effect inside button
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rippleId = Date.now();

    setRipples((prev) => [...prev, { id: rippleId, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 600);
  };

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.numericPrice || parseFloat(product.price.replace(/[^0-9.]/g, '')) || 99,
      size: selectedSize,
      color: selectedColor,
      image: currentImage.sourceUrl,
    };

    addToCart(itemToAdd);
    showNotification(`Proceeding to checkout with ${product.name}!`);
    router.push('/account?tab=cart');
  };

  const toggleAccordion = (section: 'specs' | 'fabric' | 'delivery') => {
    setOpenAccordion((prev) => (prev === section ? null : section));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-zinc-700" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-cyan-500 selection:text-black">
      {/* Global Navigation Header */}
      <Header />

      <main className="pt-28 pb-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
            <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> HOME
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/#products" className="hover:text-cyan-400 transition-colors">
              SHOP
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-cyan-400 truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT COLUMN: Interactive Image Gallery */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Main Image View */}
              <div
                className="relative aspect-[4/5] sm:aspect-square w-full rounded-2xl overflow-hidden border border-zinc-800 bg-[#0d0d10] p-2 sm:p-4 flex items-center justify-center group shadow-[0_0_30px_rgba(0,0,0,0.8)] cursor-crosshair"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-600/10 opacity-70 pointer-events-none"></div>

                <img
                  src={currentImage.sourceUrl}
                  alt={currentImage.altText || product.name}
                  className="w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-105"
                />

                {/* Cyber Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.onSale && (
                    <span className="bg-red-500/90 text-white font-mono font-bold text-xs uppercase px-3 py-1 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.5)] border border-red-400/30">
                      SALE DROP
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-mono font-bold text-xs uppercase px-3 py-1 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                      NEW DROP
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4 z-10 font-mono text-[10px] text-cyan-400 bg-black/80 px-2.5 py-1 rounded border border-cyan-500/30 backdrop-blur-md">
                  SYS.REF // {product.sku}
                </div>

                {/* Mobile Touch Swipe Guidance */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 md:hidden bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-700 text-[10px] font-mono text-zinc-300 pointer-events-none">
                  SWIPE FOR GALLERY
                </div>
              </div>

              {/* Gallery Thumbnails Switcher */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer bg-[#121215] ${
                        selectedImageIndex === idx
                          ? 'border-cyan-400 ring-2 ring-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-95'
                          : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600'
                      }`}
                    >
                      <img src={img.sourceUrl} alt={img.altText || `${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Dot Indicators for Mobile */}
              {product.images.length > 1 && (
                <div className="flex justify-center items-center gap-2 py-2 md:hidden">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        selectedImageIndex === idx
                          ? 'bg-cyan-400 w-6 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                          : 'bg-zinc-700 hover:bg-zinc-500'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Product Details & Purchase Actions */}
            <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold font-mono block mb-2">
                  URBANBULLET // LIMITED STREETWEAR
                </span>

                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white orbitron mb-3">
                  {product.name}
                </h1>

                {/* Rating & Stock Status */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1 rounded-md border border-zinc-800">
                    <div className="flex gap-0.5">{renderStars(product.averageRating)}</div>
                    <span className="text-xs font-mono text-zinc-400 ml-1">({product.reviewCount})</span>
                  </div>

                  <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    IN STOCK [READY TO SHIP]
                  </span>
                </div>
              </div>

              {/* Price Display */}
              <div className="p-4 rounded-xl bg-[#111115] border border-zinc-800/80 flex items-baseline gap-4 shadow-inner">
                <span className="text-3xl sm:text-4xl font-black text-cyan-400 orbitron">
                  {product.price}
                </span>
                {product.onSale && product.regularPrice && (
                  <span className="text-zinc-500 line-through text-lg font-mono">
                    {product.regularPrice}
                  </span>
                )}
                {product.onSale && (
                  <span className="ml-auto text-xs font-mono font-bold uppercase text-purple-400 bg-purple-950/50 border border-purple-500/30 px-2.5 py-1 rounded">
                    LIMITED SALE
                  </span>
                )}
              </div>

              {/* Overview / Short Description */}
              <div className="text-zinc-300 text-sm leading-relaxed border-t border-zinc-800/80 pt-4">
                <p>{product.shortDescription}</p>
              </div>

              {/* Color Selector */}
              {colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400 uppercase tracking-wider">CHROMA COLORWAY:</span>
                    <span className="text-cyan-400 font-bold uppercase">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                          selectedColor === color
                            ? 'border-cyan-400 bg-cyan-500/10 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                            : 'border-zinc-800 bg-[#121216] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400 uppercase tracking-wider">FIT PROFILE (SIZE):</span>
                    <span className="text-cyan-400 font-bold uppercase">{selectedSize}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-xs font-mono">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 rounded-lg font-bold uppercase transition-all duration-200 cursor-pointer border text-center ${
                          selectedSize === size
                            ? 'border-cyan-400 bg-cyan-500/15 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                            : 'border-zinc-800 bg-[#121216] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Desktop CTA Action Pair */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-800/80">
                <button
                  onClick={handleAddToCart}
                  className="relative flex-1 py-4 px-6 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer overflow-hidden group"
                >
                  <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>ADD TO CART</span>

                  {/* Ripples */}
                  {ripples.map((ripple) => (
                    <span
                      key={ripple.id}
                      className="absolute bg-white/50 rounded-full animate-ping pointer-events-none"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: '20px',
                        height: '20px',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  ))}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 px-6 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-cyan-400 border border-cyan-400/60 bg-black/60 hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Bolt className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>BUY NOW</span>
                </button>
              </div>

              {/* 3 Trust Badges */}
              <div className="grid grid-cols-1 gap-3 pt-4 border-t border-zinc-800/80">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#111116] border border-zinc-800/80">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white uppercase">100% Secure Checkout via Razorpay</h4>
                    <p className="text-[11px] text-zinc-400">Encrypted UPI, Credit/Debit Cards, NetBanking & Wallets</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#111116] border border-zinc-800/80">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white uppercase">Fast Pan-India Express Delivery</h4>
                    <p className="text-[11px] text-zinc-400">Dispatched in 24-48h with real-time tracking updates</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#111116] border border-zinc-800/80">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white uppercase">Authentic Streetwear Guarantee</h4>
                    <p className="text-[11px] text-zinc-400">Heavyweight premium fabrics crafted & printed in India</p>
                  </div>
                </div>
              </div>

              {/* Accordions Section */}
              <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                {/* Product Specs */}
                <div className="rounded-xl border border-zinc-800 bg-[#0e0e12] overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('specs')}
                    className="w-full p-4 flex items-center justify-between text-left text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 hover:text-cyan-400 transition-colors"
                  >
                    <span>PRODUCT SPECS</span>
                    {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                  </button>
                  {openAccordion === 'specs' && (
                    <div className="px-4 pb-4 text-xs font-mono text-zinc-400 space-y-2 border-t border-zinc-800/50 pt-3">
                      <div className="flex justify-between border-b border-zinc-800/40 pb-1.5">
                        <span className="text-zinc-500">GSM / WEIGHT:</span>
                        <span className="text-zinc-200">240 GSM Heavyweight Fabric</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-800/40 pb-1.5">
                        <span className="text-zinc-500">FIT:</span>
                        <span className="text-zinc-200">Cyberpunk Oversized Drop-Shoulder</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-800/40 pb-1.5">
                        <span className="text-zinc-500">PRINT METHOD:</span>
                        <span className="text-zinc-200">DTG Ultra-HD Micro-Layering</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-zinc-500">STITCHING:</span>
                        <span className="text-zinc-200">Reinforced Dual-Needle Seams</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fabric & Care */}
                <div className="rounded-xl border border-zinc-800 bg-[#0e0e12] overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('fabric')}
                    className="w-full p-4 flex items-center justify-between text-left text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 hover:text-cyan-400 transition-colors"
                  >
                    <span>FABRIC & CARE</span>
                    {openAccordion === 'fabric' ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                  </button>
                  {openAccordion === 'fabric' && (
                    <div className="px-4 pb-4 text-xs font-mono text-zinc-400 space-y-2 border-t border-zinc-800/50 pt-3">
                      <p className="text-zinc-300">100% Super Combed Premium Ring-Spun Cotton.</p>
                      <ul className="list-disc list-inside space-y-1 text-zinc-400">
                        <li>Machine wash cold with like colors inside out</li>
                        <li>Do not iron directly on graphic thermal prints</li>
                        <li>Tumble dry low or hang dry in shade</li>
                        <li>Do not dry clean or bleach</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Delivery & Returns */}
                <div className="rounded-xl border border-zinc-800 bg-[#0e0e12] overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('delivery')}
                    className="w-full p-4 flex items-center justify-between text-left text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 hover:text-cyan-400 transition-colors"
                  >
                    <span>DELIVERY & RETURNS</span>
                    {openAccordion === 'delivery' ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                  </button>
                  {openAccordion === 'delivery' && (
                    <div className="px-4 pb-4 text-xs font-mono text-zinc-400 space-y-2 border-t border-zinc-800/50 pt-3">
                      <p className="text-zinc-300">Fast Express Shipping Pan-India.</p>
                      <p className="text-zinc-400">Orders are crafted and dispatched within 24-48 hours. Express delivery takes 3-5 business days.</p>
                      <p className="text-zinc-400">7-Day easy replacement policy for size adjustments or print defects.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE QUICK-ACTION STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-zinc-800 p-3 px-4 flex items-center justify-between shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-zinc-400 uppercase">PRICE ({selectedSize}):</span>
          <span className="text-xl font-black text-cyan-400 orbitron">{product.price}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2.5 rounded-lg bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.4)] flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="px-4 py-2.5 rounded-lg bg-black text-cyan-400 border border-cyan-400/80 font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-colors flex items-center gap-1.5"
          >
            <Bolt className="w-3.5 h-3.5" />
            <span>BUY NOW</span>
          </button>
        </div>
      </div>

      {/* Global Navigation Footer */}
      <Footer />
    </div>
  );
}
