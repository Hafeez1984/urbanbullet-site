'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNotification } from '@/context/NotificationContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface CartViewProps {
  icons: {
    cart: React.ReactNode;
  };
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CartView({ icons }: CartViewProps) {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { showNotification } = useNotification();
  const { data: session } = useSession();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const items = cartItems || [];

  const subtotal = React.useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  }, [items]);

  const shipping = subtotal > 150 ? 0 : subtotal > 0 ? 15.00 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    if (!session?.user?.email) {
      showNotification('Please sign in to place an order.');
      return;
    }

    if (total <= 0) {
      showNotification('Cart total must be greater than zero.');
      return;
    }

    setIsProcessing(true);
    showNotification('Initializing secure Razorpay checkout...');

    try {
      // 1. Load Razorpay SDK on demand
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        showNotification('Failed to load Razorpay SDK. Please check your connection.');
        setIsProcessing(false);
        return;
      }

      // 2. Create Razorpay order via backend route
      const createRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'INR',
        }),
      });

      const orderData = await createRes.json();
      if (!createRes.ok || orderData.error) {
        showNotification(orderData.error || 'Failed to create Razorpay order.');
        setIsProcessing(false);
        return;
      }

      // 3. Configure and launch Razorpay checkout modal
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_Tl4C0LdtWC1ZVC';
      const userEmail = session.user.email;
      const userName = session.user.name || undefined;

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Urban Bullet',
        description: 'Headless Checkout Order',
        order_id: orderData.order_id,
        handler: async function (response: any) {
          showNotification('Verifying payment signature...');
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cart_items: items,
                email: userEmail,
                name: userName,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              clearCart();
              showNotification('Payment successful! Your order has been placed.');
              router.push('/account?tab=orders');
            } else {
              showNotification(verifyData.error || 'Payment verification failed.');
            }
          } catch (err: any) {
            console.error('Error during signature verification:', err);
            showNotification('Payment verification request failed.');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            showNotification('Checkout session cancelled.');
          },
        },
        prefill: {
          name: session?.user?.name || '',
          email: session?.user?.email || '',
        },
        theme: {
          color: '#06b6d4',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setIsProcessing(false);
        showNotification(`Payment failed: ${resp?.error?.description || 'Transaction failed'}`);
      });
      rzp.open();
    } catch (err: any) {
      console.error('Checkout error:', err);
      showNotification('An error occurred during checkout setup.');
      setIsProcessing(false);
    }
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
              className="btn btn-primary orbitron uppercase tracking-widest text-xs md:text-sm py-3.5 px-8 shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              type="button"
              disabled={isProcessing}
              onClick={handleCheckout}
            >
              {isProcessing ? 'Processing...' : 'Pay Now / Place Order'}
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
