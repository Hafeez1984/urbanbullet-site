'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useNotification } from '@/context/NotificationContext';
import Footer from '@/components/Footer';
import { MOCK_PRODUCTS, Product } from '@/lib/mockData';

export default function Home() {
  const { cartCount, addToCart } = useCart();
  const { showNotification } = useNotification();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scrollY, setScrollY] = useState(0);
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

  const handleCartClick = () => {
    showNotification('Shopping cart panel opened! (Headless Integration)');
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
      <header 
        className="fixed w-full top-0 left-0 z-50 transition-all duration-300 border-b border-white/[0.03]"
        style={{
          background: 'rgba(15, 15, 15, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-[1800px] mx-auto px-12 h-20 grid grid-cols-3 items-center gap-6">
          {/* Logo */}
          <div className="flex justify-start flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <i className="fas fa-bolt text-white text-xl"></i>
              </div>
              <span 
                className="text-2xl font-black orbitron tracking-wider uppercase select-none transition-colors duration-300"
                style={{
                  color: '#06b6d4',
                  textShadow: '0 0 10px rgba(6, 182, 212, 0.4)',
                }}
              >
                URBANBULLET
              </span>
            </Link>
          </div>

          {/* Centralized Search Bar with Category Dropdown */}
          <div className="flex justify-center w-full">
            <div className="w-full max-w-xl hidden md:flex items-center bg-[#141416]/90 border border-zinc-800 focus-within:border-cyan-500/50 rounded-full px-3 py-1.5 transition-all duration-300">
              {/* Category Select Dropdown */}
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="bg-transparent text-gray-300 text-xs px-3 py-1.5 focus:outline-none border-r border-zinc-800 cursor-pointer hover:text-white uppercase tracking-wider font-semibold orbitron select-none"
                style={{ colorScheme: 'dark' }}
              >
                <option value="all" className="text-gray-900 bg-white" style={{ color: '#111', backgroundColor: '#fff' }}>All Products</option>
                <option value="tees" className="text-gray-900 bg-white" style={{ color: '#111', backgroundColor: '#fff' }}>T-Shirts</option>
                <option value="hoodies" className="text-gray-900 bg-white" style={{ color: '#111', backgroundColor: '#fff' }}>Hoodies</option>
                <option value="jackets" className="text-gray-900 bg-white" style={{ color: '#111', backgroundColor: '#fff' }}>Jackets</option>
                <option value="accessories" className="text-gray-900 bg-white" style={{ color: '#111', backgroundColor: '#fff' }}>Accessories</option>
                <option value="limited" className="text-gray-900 bg-white" style={{ color: '#111', backgroundColor: '#fff' }}>Limited Edition</option>
              </select>
              
              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH PRODUCTS..."
                className="bg-transparent border-0 outline-none text-white text-xs px-4 py-1.5 flex-grow font-mono uppercase tracking-wider placeholder-zinc-700"
              />
              
              {/* Search Icon */}
              <i className="fas fa-search text-gray-500 mr-2 text-sm"></i>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex justify-end items-center space-x-6 flex-shrink-0">
            <Link 
              href="/account"
              className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label="My Account"
            >
              <i className="fas fa-user text-xl"></i>
            </Link>

            <button 
              onClick={handleCartClick}
              className="relative text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label="Cart"
            >
              <i className="fas fa-shopping-bag text-xl"></i>
              <span 
                className="absolute -top-2.5 -right-2.5 w-5 h-5 text-xs flex items-center justify-center rounded-full text-white font-bold animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
                  boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
                }}
              >
                {cartCount}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Toggle Mobile Menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0c0c0e]/95 border-b border-zinc-800 p-6 flex flex-col space-y-4 animate-fade-in">
            {/* Mobile Search and Category selection */}
            <div className="flex items-center bg-[#141416]/90 border border-zinc-800 focus-within:border-cyan-500/50 rounded-full px-3 py-1.5 transition-all duration-300 w-full mb-2">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="bg-transparent text-gray-300 text-[10px] px-2 py-1 focus:outline-none border-r border-zinc-800 cursor-pointer hover:text-white uppercase tracking-wider font-semibold orbitron"
                style={{ colorScheme: 'dark' }}
              >
                <option value="all" className="text-gray-900 bg-white" style={{ color: '#111', backgroundColor: '#fff' }}>All Products</option>
                <option value="tees" className="text-gray-900 bg-white" style={{ color: '#111', backgroundColor: '#fff' }}>T-Shirts</option>
                <option value="hoodies" className="text-gray-900 bg-white" style={{ color: '#111', backgroundColor: '#fff' }}>Hoodies</option>
                <option value="jackets" className="text-gray-900 bg-white" style={{ color: '#111', backgroundColor: '#fff' }}>Jackets</option>
                <option value="accessories" className="text-gray-900 bg-white" style={{ color: '#111', backgroundColor: '#fff' }}>Accessories</option>
                <option value="limited" className="text-gray-900 bg-white" style={{ color: '#111', backgroundColor: '#fff' }}>Limited Edition</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH..."
                className="bg-transparent border-0 outline-none text-white text-xs px-3 py-1 flex-grow font-mono uppercase tracking-wider placeholder-zinc-700 w-full"
              />
            </div>
            
            <a 
              href="#products" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#06b6d4] transition-colors py-2 orbitron tracking-wide"
            >
              NEW DROPS
            </a>
            <a 
              href="#products" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#06b6d4] transition-colors py-2 orbitron tracking-wide"
            >
              COLLECTIONS
            </a>
            <Link 
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#06b6d4] transition-colors py-2 orbitron tracking-wide"
            >
              DASHBOARD
            </Link>
          </div>
        )}
      </header>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
            {filteredProducts.map((product) => {
              const productRipples = ripples[product.id] || [];
              return (
                <div 
                  key={product.id}
                  className="rounded-3xl overflow-hidden transition-all duration-500 ease-out group"
                  style={{
                    background: 'rgba(20, 20, 20, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                  // Hover effects: translateY(-8px) and cyan box shadow
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(6, 182, 212, 0.25)';
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  {/* Product Image Panel */}
                  <div className="relative overflow-hidden aspect-[4/5] bg-zinc-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={product.image.sourceUrl} 
                      alt={product.image.altText || product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Sale / New Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                      {product.onSale && (
                        <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-[0_4px_10px_rgba(239,68,68,0.4)]">
                          SALE
                        </span>
                      )}
                      {product.isNew && (
                        <span 
                          className="text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
                            boxShadow: '0 4px 10px rgba(6, 182, 212, 0.3)',
                          }}
                        >
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Overlay Button (appears on card hover) */}
                    <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex gap-2">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider cursor-pointer relative overflow-hidden flex items-center justify-center gap-2 select-none shadow-[0_10px_20px_rgba(6,182,212,0.25)] transition-transform duration-300 hover:scale-[1.02]"
                        style={{
                          background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
                          color: '#fff',
                        }}
                      >
                        <i className="fas fa-shopping-cart text-sm"></i>
                        <span>ADD TO CART</span>

                        {/* Ripple animation elements */}
                        {productRipples.map((ripple) => (
                          <span
                            key={ripple.id}
                            className="absolute bg-white/40 rounded-full pointer-events-none"
                            style={{
                              left: ripple.x,
                              top: ripple.y,
                              width: '20px',
                              height: '20px',
                              transform: 'translate(-50%, -50%)',
                              animation: 'ripple 0.6s ease-out forwards',
                            }}
                          />
                        ))}
                      </button>
                    </div>
                  </div>

                  {/* Product Info Block */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <button 
                        onClick={() => showNotification(`Added ${product.name} to wishlist!`)}
                        className="text-zinc-500 hover:text-red-500 transition-colors cursor-pointer p-1"
                        aria-label="Add to wishlist"
                      >
                        <i className="far fa-heart text-lg"></i>
                      </button>
                    </div>
                    
                    <p className="text-zinc-500 text-sm mb-4 font-light leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Ratings */}
                    <div className="flex items-center space-x-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star text-xs ${
                            i < product.averageRating ? 'text-yellow-400' : 'text-zinc-800'
                          }`}
                        />
                      ))}
                      <span className="text-[10px] text-zinc-600 font-bold ml-2">({product.reviewCount})</span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline space-x-3">
                      <span className="text-xl font-black orbitron" style={{ color: '#06b6d4' }}>
                        {product.price}
                      </span>
                      {product.onSale && product.regularPrice && (
                        <span className="text-zinc-600 line-through text-sm">
                          {product.regularPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Footer component is mounted here */}
      <Footer />
    </div>
  );
}
