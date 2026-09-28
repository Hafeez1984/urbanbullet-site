'use client';

import React from 'react';
import { useCart, CartItem } from '@/context/CartContext';
import { useNotification } from '@/context/NotificationContext';

interface CartViewProps {
  icons: {
    cart: React.ReactNode;
  };
}

export default function CartView({ icons }: CartViewProps) {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { showNotification } = useNotification();

  const items = cartItems || [];

  const subtotal = React.useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  }, [items]);

  const shipping = subtotal > 150 ? 0 : subtotal > 0 ? 15.00 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    showNotification('Initializing secure quantum checkout sequence...');
    // We could clear the cart or just show a notification.
  };

  return (
    <section className="card card-padding w-full">
      <div className="section-head">
        <div>
          <h3 className="section-title">Shopping Cart</h3>
          <p className="section-subtitle">Manage your selected items and configure checkout.</p>
        </div>
        {items.length > 0 && (
          <button className="btn btn-danger" type="button" onClick={clearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {items.length ? (
        <div className="cart-content-layout w-full">
          <div className="table-wrap w-full">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-sm text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-800">ITEM</th>
                  <th className="text-center py-4 px-4 text-sm text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-800">PRICE</th>
                  <th className="text-center py-4 px-4 text-sm text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-800">QUANTITY</th>
                  <th className="text-center py-4 px-4 text-sm text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-800">TOTAL</th>
                  <th className="text-center py-4 px-4 text-sm text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-800">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-6 px-4 border-b border-gray-900/50 text-left">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80'}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg border border-white/10 flex-shrink-0 shadow-sm"
                        />
                        <div className="flex flex-col justify-center">
                          <strong className="text-white font-bold text-lg md:text-xl tracking-wide">
                            {item.name}
                          </strong>
                          <span className="text-sm text-gray-400 mt-1">
                            Color: {item.color || 'Black'} | Size: {item.size || 'M'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-4 border-b border-gray-900/50 text-center font-mono text-base md:text-lg text-gray-200">
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="py-6 px-4 border-b border-gray-900/50 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          className="w-9 h-9 rounded border border-white/10 hover:border-[var(--cyan)] hover:bg-[rgba(6,182,212,0.1)] flex items-center justify-center text-base transition"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-mono font-bold text-base md:text-lg text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="w-9 h-9 rounded border border-white/10 hover:border-[var(--cyan)] hover:bg-[rgba(6,182,212,0.1)] flex items-center justify-center text-base transition"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-6 px-4 border-b border-gray-900/50 text-center font-mono text-base md:text-lg text-[var(--cyan)] font-bold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-6 px-4 border-b border-gray-900/50 text-center">
                      <button
                        className="link-action font-mono text-base md:text-lg text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary Section */}
          <div className="cart-summary-card w-full mt-8 p-6 rounded-xl border border-white/10 bg-black/40 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-8 text-sm md:text-base">
              <div>
                <span className="block text-gray-500 font-mono uppercase tracking-wider text-xs">Subtotal</span>
                <span className="text-xl font-mono font-bold text-white">₹{subtotal.toFixed(2)}</span>
              </div>
              <div>
                <span className="block text-gray-500 font-mono uppercase tracking-wider text-xs">Shipping</span>
                <span className="text-xl font-mono font-bold text-white">
                  {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div>
                <span className="block text-gray-500 font-mono uppercase tracking-wider text-xs">Tax (8%)</span>
                <span className="text-xl font-mono font-bold text-white">₹{tax.toFixed(2)}</span>
              </div>
              <div>
                <span className="block text-gray-500 font-mono uppercase tracking-wider text-xs">Grand Total</span>
                <span className="text-xl font-mono font-black text-[var(--cyan)]">₹{total.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="btn btn-primary orbitron uppercase tracking-widest text-xs md:text-sm py-3.5 px-8 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              type="button"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-state py-12">
          <div className="empty-icon text-gray-600 mb-4">{icons.cart}</div>
          <h3 className="text-lg font-bold text-white mb-2">Your cart is empty</h3>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">
            You don't have any gear in your cart right now. Visit our shop catalog to add items.
          </p>
          <a href="/" className="btn btn-primary inline-block">
            Start Shopping
          </a>
        </div>
      )}
    </section>
  );
}
