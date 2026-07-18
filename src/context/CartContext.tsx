'use client';

import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product?: any) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'prod_1',
      name: 'Cyber Hoodie',
      price: 89.99,
      quantity: 1,
      size: 'M',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    },
    {
      id: 'prod_2',
      name: 'Neon Dreams Tee',
      price: 49.99,
      quantity: 1,
      size: 'L',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80',
    },
    {
      id: 'prod_5',
      name: 'Graphic Crew Neck',
      price: 44.99,
      quantity: 1,
      size: 'XL',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80',
    },
  ]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product?: any) => {
    if (product) {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        const numericPrice = typeof product.price === 'string'
          ? parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0
          : product.price;

        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: numericPrice,
            quantity: 1,
            size: 'M',
            image: product.image?.sourceUrl || '',
          },
        ];
      });
    } else {
      // Fallback/Legacy increment (defaults to Cyber Hoodie)
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === 'prod_1');
        if (existing) {
          return prev.map((item) =>
            item.id === 'prod_1' ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [
          ...prev,
          {
            id: 'prod_1',
            name: 'Cyber Hoodie',
            price: 89.99,
            quantity: 1,
            size: 'M',
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
          },
        ];
      });
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
