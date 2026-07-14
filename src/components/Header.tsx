'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNotification } from '@/context/NotificationContext';
import Link from 'next/link';

export const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { showNotification } = useNotification();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    showNotification('Shopping cart panel opened! (Headless Integration)');
  };

  return (
    <>
      {/* Header */}
      <header className="glass-header fixed w-full top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center glow-cyan">
                <i className="fas fa-bolt text-white text-xl"></i>
              </div>
              <span className="text-2xl font-black orbitron neon-cyan">URBANBULLET</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#products" className="nav-link text-gray-300 hover:text-white font-medium">New Arrivals</a>
              <a href="#products" className="nav-link text-gray-300 hover:text-white font-medium">Men</a>
              <a href="#products" className="nav-link text-gray-300 hover:text-white font-medium">Women</a>
              <a href="#products" className="nav-link text-gray-300 hover:text-white font-medium">Collections</a>
              <a href="#products" className="nav-link text-red-400 hover:text-red-300 font-semibold">Sale</a>
            </div>
            
            {/* Icons */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => showNotification('Search overlay coming soon')}
                className="text-gray-300 hover:text-white transition hidden md:block cursor-pointer"
              >
                <i className="fas fa-search text-xl"></i>
              </button>
              <Link 
                href="/account"
                className="text-gray-300 hover:text-white transition cursor-pointer"
                aria-label="My Account"
              >
                <i className="fas fa-user text-xl"></i>
              </Link>
              <button 
                onClick={handleCartClick}
                className="relative text-gray-300 hover:text-white transition cursor-pointer"
              >
                <i className="fas fa-shopping-bag text-xl"></i>
                <span className="cart-badge absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center rounded-full text-white font-bold">
                  {cartCount}
                </span>
              </button>
              <button 
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-300 hover:text-white cursor-pointer"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`mobile-menu fixed top-0 right-0 w-full h-full bg-black/95 z-40 md:hidden flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button 
          onClick={toggleMobileMenu} 
          className="absolute top-6 right-6 text-white text-3xl cursor-pointer"
        >
          <i className="fas fa-times"></i>
        </button>
        <a 
          href="#products" 
          onClick={toggleMobileMenu}
          className="text-2xl text-gray-300 hover:text-cyan-400 font-medium orbitron"
        >
          New Arrivals
        </a>
        <a 
          href="#products" 
          onClick={toggleMobileMenu}
          className="text-2xl text-gray-300 hover:text-cyan-400 font-medium orbitron"
        >
          Men
        </a>
        <a 
          href="#products" 
          onClick={toggleMobileMenu}
          className="text-2xl text-gray-300 hover:text-cyan-400 font-medium orbitron"
        >
          Women
        </a>
        <a 
          href="#products" 
          onClick={toggleMobileMenu}
          className="text-2xl text-gray-300 hover:text-cyan-400 font-medium orbitron"
        >
          Collections
        </a>
        <a 
          href="#products" 
          onClick={toggleMobileMenu}
          className="text-2xl text-red-400 hover:text-red-300 font-semibold orbitron"
        >
          Sale
        </a>
      </div>
    </>
  );
};
export default Header;
