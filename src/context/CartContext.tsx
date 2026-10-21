'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  productId?: number | string;
  product_id?: number | string;
  variationId?: number | string;
  variation_id?: number | string;
  sku?: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Read cart state from localStorage on initial mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Write cart state to localStorage whenever cart items change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [cartItems, isLoaded]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product?: any) => {
    if (product) {
      setCartItems((prev) => {
        const parentId = product.productId || product.product_id || product.id || 'prod_1';
        const varId = product.variationId || product.variation_id;
        const itemId = product.id
          ? String(product.id)
          : (varId
              ? `${parentId}_${varId}`
              : `${parentId}_${product.size || 'M'}_${product.color || 'default'}`);

        const existing = prev.find((item) => item.id === itemId);
        if (existing) {
          return prev.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
          );
        }
        const numericPrice = typeof product.price === 'string'
          ? parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0
          : (typeof product.price === 'number' ? product.price : 0);

        const numericProductId = Number(parentId) || undefined;
        const numericVarId = Number(varId) || undefined;

        return [
          ...prev,
          {
            id: itemId,
            productId: numericProductId || parentId,
            product_id: numericProductId || parentId,
            variationId: numericVarId,
            variation_id: numericVarId,
            sku: product.sku || undefined,
            name: product.name,
            price: numericPrice,
            quantity: Number(product.quantity) || 1,
            size: product.size || 'M',
            color: product.color || 'Black',
            image: product.image?.sourceUrl || (typeof product.image === 'string' ? product.image : ''),
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
            color: 'Black',
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
