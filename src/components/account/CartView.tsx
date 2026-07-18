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

  const subtotal = React.useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const shipping = subtotal > 150 ? 0 : subtotal > 0 ? 15.00 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    showNotification('Initializing secure quantum checkout sequence...');
    // We could clear the cart or just show a notification.
  };

  return (
    <section className="card card-padding">
      <div className="section-head">
        <div>
          <h3 className="section-title">Shopping Cart</h3>
          <p className="section-subtitle">Manage your selected items and configure checkout.</p>
        </div>
        {cartItems.length > 0 && (
          <button className="btn btn-danger" type="button" onClick={clearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length ? (
        <div className="cart-content-layout">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-4 py-2">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg border border-[rgba(6,182,212,0.3)] shadow-[0_0_10px_rgba(6,182,212,0.1)] flex-shrink-0"
                          />
                        )}
                        <div>
                          <strong className="block text-white font-semibold tracking-wide">
                            {item.name}
                          </strong>
                          {item.size && (
                            <span className="text-xs text-[var(--cyan)] uppercase tracking-widest font-mono">
                              Size: {item.size}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="font-mono">₹{item.price.toFixed(2)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="w-8 h-8 rounded border border-white/10 hover:border-[var(--cyan)] hover:bg-[rgba(6,182,212,0.1)] flex items-center justify-center text-sm transition"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="w-8 h-8 rounded border border-white/10 hover:border-[var(--cyan)] hover:bg-[rgba(6,182,212,0.1)] flex items-center justify-center text-sm transition"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="font-mono text-[var(--cyan)] font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td>
                      <button
                        className="link-action font-mono text-[var(--danger)] hover:text-rose-400"
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
          <div className="cart-summary-card mt-8 p-6 rounded-xl border border-white/10 bg-black/40 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-8 text-sm">
              <div>
                <span className="block text-gray-500 font-mono uppercase tracking-wider text-xs">Subtotal</span>
                <span className="text-lg font-mono font-bold text-white">₹{subtotal.toFixed(2)}</span>
              </div>
              <div>
                <span className="block text-gray-500 font-mono uppercase tracking-wider text-xs">Shipping</span>
                <span className="text-lg font-mono font-bold text-white">
                  {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div>
                <span className="block text-gray-500 font-mono uppercase tracking-wider text-xs">Tax (8%)</span>
                <span className="text-lg font-mono font-bold text-white">₹{tax.toFixed(2)}</span>
              </div>
              <div>
                <span className="block text-gray-500 font-mono uppercase tracking-wider text-xs">Grand Total</span>
                <span className="text-lg font-mono font-black text-[var(--cyan)]">₹{total.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="btn btn-primary orbitron uppercase tracking-widest text-xs py-3 px-8 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
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
