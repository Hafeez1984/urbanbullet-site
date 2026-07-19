'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  activeCategory?: string;
  setActiveCategory?: (category: string) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory: propActiveCategory,
  setActiveCategory,
  searchQuery: propSearchQuery,
  setSearchQuery,
}) => {
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Local state for search parameters if not controlled from parent page props
  const [localCategory, setLocalCategory] = useState('all');
  const [localSearch, setLocalSearch] = useState('');

  const activeCategory = propActiveCategory !== undefined ? propActiveCategory : localCategory;
  const searchQuery = propSearchQuery !== undefined ? propSearchQuery : localSearch;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (setActiveCategory) {
      setActiveCategory(val);
    } else {
      setLocalCategory(val);
      router.push(`/?category=${val}&search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (setSearchQuery) {
      setSearchQuery(val);
    } else {
      setLocalSearch(val);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!setSearchQuery) {
        router.push(`/?category=${activeCategory}&search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const handleCartClick = () => {
    router.push('/account?tab=cart');
  };

  return (
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
              onChange={handleCategoryChange}
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
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="SEARCH PRODUCTS..."
              className="bg-transparent border-0 outline-none text-white text-xs px-4 py-1.5 flex-grow font-mono uppercase tracking-wider placeholder-zinc-700"
            />
            
            {/* Search Icon */}
            <button 
              type="button"
              onClick={() => {
                if (!setSearchQuery) {
                  router.push(`/?category=${activeCategory}&search=${encodeURIComponent(searchQuery)}`);
                }
              }}
              className="focus:outline-none cursor-pointer flex items-center"
            >
              <i className="fas fa-search text-gray-500 mr-2 text-sm hover:text-white transition-colors"></i>
            </button>
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
            className="hidden text-gray-300 hover:text-white transition-colors duration-200"
            aria-label="Toggle Mobile Menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`} ></i>
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
              onChange={handleCategoryChange}
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
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="SEARCH..."
              className="bg-transparent border-0 outline-none text-white text-xs px-3 py-1 flex-grow font-mono uppercase tracking-wider placeholder-zinc-700 w-full"
            />
          </div>
          
          <a 
            href="/#products" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-300 hover:text-[#06b6d4] transition-colors py-2 orbitron tracking-wide font-medium"
          >
            NEW DROPS
          </a>
          <a 
            href="/#products" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-300 hover:text-[#06b6d4] transition-colors py-2 orbitron tracking-wide font-medium"
          >
            COLLECTIONS
          </a>
          <Link 
            href="/account"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-300 hover:text-[#06b6d4] transition-colors py-2 orbitron tracking-wide font-medium"
          >
            DASHBOARD
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
