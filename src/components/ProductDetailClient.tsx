'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import { useNotification } from '@/context/NotificationContext';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [selectedSize, setSelectedSize] = useState('M');
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart();
    showNotification(`${product.name} (Size: ${selectedSize}) added to cart!`);

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
    addToCart();
    showNotification(`Proceeding to checkout with ${product.name} (Size: ${selectedSize})!`);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400 text-sm"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400 text-sm"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-gray-600 text-sm"></i>);
      }
    }
    return stars;
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation Header */}
      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Breadcrumb navigation */}
          <div className="mb-8">
            <Link href="/" className="text-gray-500 hover:text-cyan-400 transition text-sm orbitron">
              &lt; BACK TO SHOP
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Product Image / Left Column */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-900 bg-black/40 p-4 flex justify-center items-center group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-purple-600/5 opacity-50 pointer-events-none"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image.sourceUrl}
                alt={product.image.altText || product.name}
                className="w-full max-h-[550px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              />

              {/* Tags */}
              <div className="absolute top-8 right-8 flex flex-col gap-2">
                {product.onSale && (
                  <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                    Sale
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                    New
                  </span>
                )}
              </div>
            </div>

            {/* Product Details / Right Column */}
            <div className="flex flex-col justify-center">
              {/* Category / Collection subtitle */}
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-3 orbitron">
                Streetwear Drop // 2026
              </span>

              {/* Product Title */}
              <h1 className="text-4xl lg:text-5xl font-black mb-4 orbitron tracking-tight text-white uppercase">
                {product.name}
              </h1>

              {/* Rating Section */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {renderStars(product.averageRating)}
                </div>
                <span className="text-xs text-gray-500 orbitron">
                  ({product.reviewCount} REVIEWS)
                </span>
              </div>

              {/* Price section */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-black neon-cyan orbitron">{product.price}</span>
                {product.onSale && product.regularPrice && (
                  <span className="text-gray-500 line-through text-lg">{product.regularPrice}</span>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-gray-900 pt-6 mb-8">
                <h3 className="text-xs uppercase text-gray-400 font-bold mb-3 orbitron">Overview</h3>
                <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                  {product.shortDescription}. Engineered with premium cyber-wear textiles for maximum durability and futuristic style. Features specialized tech-fiber integration and water-resistant microcoatings designed for modern metropolitan exploration.
                </p>
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <h3 className="text-xs uppercase text-gray-400 font-bold mb-3 orbitron">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer border transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                          : 'border-gray-800 bg-black/40 text-gray-400 hover:border-gray-700 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Button Actions Pair */}
              <div className="flex flex-col sm:flex-row gap-4 w-full pt-4 border-t border-gray-900">
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:w-1/2 px-6 py-4 rounded-full text-white font-bold text-sm uppercase tracking-wider cursor-pointer overflow-hidden flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)',
                    position: 'relative'
                  }}
                >
                  <i className="fas fa-shopping-cart"></i>
                  <span>Add to Cart</span>
                  
                  {/* Ripples */}
                  {ripples.map((ripple) => (
                    <span
                      key={ripple.id}
                      className="absolute bg-white/40 rounded-full animate-ripple pointer-events-none"
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

                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-1/2 px-6 py-4 rounded-full text-cyan-400 font-bold text-sm uppercase tracking-wider cursor-pointer border border-cyan-400/50 bg-black/60 transition-all duration-300 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 flex items-center justify-center gap-2"
                  style={{
                    boxShadow: '0 0 15px rgba(6, 182, 212, 0.3), inset 0 0 5px rgba(6, 182, 212, 0.2)',
                  }}
                >
                  <i className="fas fa-bolt"></i>
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation Footer */}
      <Footer />
    </div>
  );
}
