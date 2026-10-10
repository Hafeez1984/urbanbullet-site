'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useNotification } from '@/context/NotificationContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { MOCK_PRODUCTS, Product } from '@/lib/mockData';

export default function Home() {
  const { cartCount, addToCart } = useCart();
  const { showNotification } = useNotification();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scrollY, setScrollY] = useState(0);

  // Sync URL search parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      const q = params.get('search');
      if (cat) setActiveCategory(cat);
      if (q) setSearchQuery(q);
    }
  }, []);
  const [ripples, setRipples] = useState<{ [productId: string]: { id: number; x: number; y: number }[] }>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (product: Product, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Trigger cart context
    addToCart();
    showNotification(`${product.name} added to cart!`);

    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => ({
      ...prev,
      [product.id]: [...(prev[product.id] || []), { id, x, y }],
    }));

    // Clean up ripple after animation
    setTimeout(() => {
      setRipples((prev) => ({
        ...prev,
        [product.id]: (prev[product.id] || []).filter((r) => r.id !== id),
      }));
    }, 600);
  };

  const router = useRouter();

  const handleCartClick = () => {
    router.push('/account?tab=cart');
  };

  // Filter products by category and search query
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    // 1. Category Filter
    let matchesCategory = true;
    if (activeCategory !== 'all') {
      const name = product.name.toLowerCase();
      if (activeCategory === 'hoodies') {
        matchesCategory = name.includes('hoodie') || name.includes('sweatshirt');
      } else if (activeCategory === 'tees') {
        matchesCategory = name.includes('tee') || name.includes('crew') || name.includes('t-shirt');
      } else if (activeCategory === 'jackets') {
        matchesCategory = name.includes('jacket');
      } else if (activeCategory === 'accessories') {
        matchesCategory = name.includes('bag') || name.includes('cap') || name.includes('accessory');
      } else if (activeCategory === 'limited') {
        matchesCategory = !!(product.onSale || product.isNew || name.includes('limited'));
      }
    }

    // 2. Text Search Filter
    let matchesSearch = true;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      const name = product.name.toLowerCase();
      const desc = product.shortDescription.toLowerCase();
      matchesSearch = name.includes(query) || desc.includes(query);
    }

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
      {/* 1. FIXED GLASSMORPHISM HEADER */}
      <Header 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 2. PARALLAX HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Parallax Background Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />

        {/* Glowing Ambient Lights (Parallax) */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.8) 0%, transparent 70%)',
            top: '20%',
            left: '10%',
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, transparent 70%)',
            bottom: '10%',
            right: '10%',
            transform: `translateY(${scrollY * -0.1}px)`,
          }}
        />

        <div className="max-w-[1800px] mx-auto px-12 pt-10 pb-6 relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Hero Left Content */}
          <div 
            className="flex-1 text-center lg:text-left select-none"
            style={{
              transform: `translateY(${scrollY * 0.08}px)`,
            }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold orbitron">DROP 08 AVAILABLE NOW</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl xl:text-7.5xl font-black tracking-tighter leading-none mb-6 orbitron uppercase">
              <span className="block text-white">STREET</span>
              <span 
                className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.4))',
                }}
              >
                REVOLUTION
              </span>
            </h1>

            <p className="text-gray-400 text-base md:text-lg max-w-lg mb-10 leading-relaxed font-light mx-auto lg:mx-0">
              Cyberpunk design meets modern street culture. Engineered for comfort, styled for the neon-drenched future.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a 
                href="#products"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm tracking-widest orbitron transition-all duration-300 hover:scale-105 cursor-pointer text-center"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
                  boxShadow: '0 0 25px rgba(6, 182, 212, 0.4)',
                }}
              >
                EXPLORE DROPS
              </a>
              <Link 
                href="/account"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm tracking-widest orbitron border border-zinc-800 bg-[#0c0c0e]/80 transition-all duration-300 hover:border-cyan-400 hover:bg-zinc-900/50 cursor-pointer text-center"
              >
                MEMBERS PORTAL
              </Link>
            </div>
          </div>

          {/* Hero Right Visuals (Parallax Model + Floating Price Tag) */}
          <div 
            className="flex-1 relative w-full max-w-[650px] aspect-[4/5] flex items-center justify-center"
            style={{
              transform: `translateY(${scrollY * -0.05}px)`,
            }}
          >
            {/* Main Image Container */}
            <div className="relative w-full h-full rounded-[32px] overflow-hidden border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80"
                alt="Streetwear Hero Hoodie" 
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* FLOATING PRICE TAG ELEMENT */}
            <div 
              className="absolute -right-4 top-1/3 bg-black/80 border border-cyan-400/50 px-5 py-4 rounded-2xl backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.3)] float-animation"
              style={{
                animation: 'float 6s ease-in-out infinite',
              }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold orbitron">LIMITED RELEASE</span>
                <span className="text-sm font-bold text-white uppercase tracking-wide">CYBER TECH HOODIE</span>
                <div className="flex items-center justify-between gap-6 mt-1 border-t border-zinc-800 pt-1.5">
                  <span className="text-lg font-black text-[#06b6d4] orbitron">₹89.99</span>
                  <span className="text-[10px] text-gray-500 line-through">₹129.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT GRID: FEATURED DROPS */}
      <section className="py-6 relative z-10" id="products">
        <div className="max-w-[1800px] mx-auto px-12">
          
          {/* Section Heading */}
          <div className="text-center mb-6 select-none">
            <h2 className="text-4xl md:text-5xl font-black mb-6 orbitron tracking-tight">
              <span 
                className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mr-4"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))',
                }}
              >
                FEATURED
              </span>
              <span>DROPS</span>
            </h2>
            <p className="text-gray-400 text-base max-w-lg mx-auto font-light">
              High-performance apparel designed for urban exploration.
            </p>
          </div>

          {/* Product Cards Shell Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id || index} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Global Footer component is mounted here */}
      <Footer />
    </div>
  );
}
