'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import { useNotification } from '@/context/NotificationContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart();
    showNotification(`${product.name} added to cart!`);

    // Create ripple effect inside button
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart();
    showNotification(`Proceeding to checkout with ${product.name}!`);
  };

  // Render review stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400 text-xs"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400 text-xs"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-gray-600 text-xs"></i>);
      }
    }
    return stars;
  };

  return (
    <div className="product-card rounded-2xl overflow-hidden group">
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image.sourceUrl}
          alt={product.image.altText || product.name}
          className="w-full h-96 object-cover"
        />
        
        {/* Sale / New Tags */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {product.onSale && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow">
              Sale
            </span>
          )}
          {product.isNew && (
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow">
              New
            </span>
          )}
        </div>

        {/* Hover Action Buttons Container */}
        <div
          className="add-to-cart absolute bottom-4 left-4 right-4 flex gap-2"
          style={{ background: 'none' }}
        >
          <button
            onClick={handleAddToCart}
            className="w-1/2 px-4 py-3 rounded-full text-white font-bold text-xs uppercase tracking-wider cursor-pointer overflow-hidden flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
              boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
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
            className="w-1/2 px-4 py-3 rounded-full text-cyan-400 font-bold text-xs uppercase tracking-wider cursor-pointer border border-cyan-400/50 bg-black/60 transition-all duration-300 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 flex items-center justify-center gap-1.5"
            style={{
              boxShadow: '0 0 10px rgba(6, 182, 212, 0.3), inset 0 0 5px rgba(6, 182, 212, 0.2)',
            }}
          >
            <i className="fas fa-bolt"></i>
            <span>Buy Now</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {product.name}
          </h3>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              showNotification(`Added ${product.name} to wishlist!`);
            }}
            className="text-gray-400 hover:text-red-500 transition cursor-pointer"
          >
            <i className="far fa-heart text-xl"></i>
          </button>
        </div>
        
        <p className="text-gray-500 text-sm mb-4">{product.shortDescription}</p>
        
        {/* Rating moved directly above the price tag */}
        <div className="flex gap-1 mb-2">
          {renderStars(product.averageRating)}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black neon-cyan orbitron">{product.price}</span>
            {product.onSale && product.regularPrice && (
              <span className="text-gray-500 line-through text-sm">{product.regularPrice}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
