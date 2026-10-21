'use client';

import React, { useState, useEffect } from 'react';
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

  // Shipping address state for checkout
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    country: 'IN',
  });
  const [isAddressLoading, setIsAddressLoading] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Load saved address from database on mount
  useEffect(() => {
    if (!session?.user?.email) {
      setIsAddressLoading(false);
      return;
    }

    let isMounted = true;
    fetch('/api/account', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const addrs = data.addresses || [];
        const shippingDefault =
          addrs.find(
            (a: any) =>
              a.id === 'shipping' || (a.type && String(a.type).toLowerCase().includes('shipping'))
          ) || addrs[0];
        const billingDefault = addrs.find(
          (a: any) =>
            a.id === 'billing' || (a.type && String(a.type).toLowerCase().includes('billing'))
        );
        const target = shippingDefault || billingDefault;

        const defaultFirstName = session?.user?.name?.split(' ')[0] || '';
        const defaultLastName = session?.user?.name?.split(' ').slice(1).join(' ') || '';

        if (target && (target.address1 || target.postcode)) {
          setShippingAddress({
            firstName: target.firstName || defaultFirstName,
            lastName: target.lastName || defaultLastName,
            address1: target.address1 || '',
            address2: target.address2 || '',
            city: target.city || '',
            state: target.state || '',
            postcode: target.postcode || '',
            phone: target.phone || data?.profile?.phone || '',
            country: target.country || 'IN',
          });

          if (target.address1 && target.postcode && (target.phone || data?.profile?.phone)) {
            setIsEditingAddress(false);
          } else {
            setIsEditingAddress(true);
          }
        } else {
          setShippingAddress((prev) => ({
            ...prev,
            firstName: defaultFirstName,
            lastName: defaultLastName,
            phone: data?.profile?.phone || '',
          }));
          setIsEditingAddress(true);
        }
      })
      .catch((err) => {
        console.error('Failed to load saved address:', err);
        setIsEditingAddress(true);
      })
      .finally(() => {
        if (isMounted) setIsAddressLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [session?.user?.email, session?.user?.name]);

  const items = cartItems || [];

  const subtotal = React.useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  }, [items]);

  const shipping = subtotal > 150 ? 0 : subtotal > 0 ? 15.0 : 0;
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

    // Strictly validate required address details for WooCommerce & Qikink POD partner
    const address1 = shippingAddress.address1.trim();
    const postcode = shippingAddress.postcode.trim();
    const phone = shippingAddress.phone.trim();

    if (!address1 || !postcode || !phone) {
      setIsEditingAddress(true);
      showNotification('Please provide complete delivery details (Address, PIN/Postcode, and Phone Number).');
      return;
    }

    setIsProcessing(true);
    showNotification('Initializing secure Razorpay checkout...');

    const firstName =
      shippingAddress.firstName.trim() || session.user.name?.split(' ')[0] || 'Urban';
    const lastName =
      shippingAddress.lastName.trim() || session.user.name?.split(' ').slice(1).join(' ') || 'Bullet';

    const shippingPayload = {
      first_name: firstName,
      last_name: lastName,
      address_1: address1,
      address_2: shippingAddress.address2.trim(),
      city: shippingAddress.city.trim(),
      state: shippingAddress.state.trim(),
      postcode: postcode,
      country: shippingAddress.country || 'IN',
      phone: phone,
    };

    const billingPayload = {
      ...shippingPayload,
      email: session.user.email,
    };

    // Save updated address to WooCommerce customer account in background
    fetch('/api/account/address', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        name: `${firstName} ${lastName}`.trim(),
        address: address1,
        address1: address1,
        nearestLandmark: shippingAddress.address2.trim(),
        address2: shippingAddress.address2.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        pin: postcode,
        postcode: postcode,
        contactNumber: phone,
        phone: phone,
        email: session.user.email,
      }),
    }).catch((e) => console.warn('Background address save failed:', e));

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
      const userName = `${firstName} ${lastName}`.trim();

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
                shipping: shippingPayload,
                billing: billingPayload,
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
          name: userName,
          email: userEmail,
          contact: phone,
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
                  <th className="text-left py-4 px-4 text-sm text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-800">
                    ITEM
                  </th>
                  <th className="text-center py-4 px-4 text-sm text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-800">
                    PRICE
                  </th>
                  <th className="text-center py-4 px-4 text-sm text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-800">
                    QUANTITY
                  </th>
                  <th className="text-center py-4 px-4 text-sm text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-800">
                    TOTAL
                  </th>
                  <th className="text-center py-4 px-4 text-sm text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-800">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-6 px-4 border-b border-gray-900/50 text-left">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            item.image ||
                            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80'
                          }
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg border border-white/10 flex-shrink-0 shadow-sm"
                        />
                        <div className="flex flex-col justify-center">
                          <strong className="text-white font-bold text-lg md:text-xl tracking-wide">
                            {item.name}
                          </strong>
                          <span className="text-sm text-gray-400 mt-1">
                            {[item.color && `Color: ${item.color}`, item.size && `Size: ${item.size}`]
                              .filter(Boolean)
                              .join(' | ') || 'Standard'}
                            {item.sku ? ` (${item.sku})` : ''}
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

          {/* Shipping Address Section */}
          <div className="shipping-address-card w-full mt-8 p-6 rounded-xl border border-white/10 bg-black/40">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[var(--cyan)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h4 className="font-mono text-sm uppercase tracking-wider text-white font-bold">
                  Delivery & Shipping Address
                </h4>
              </div>
              {!isAddressLoading && shippingAddress.address1 && (
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-xs font-mono text-[var(--cyan)] hover:underline uppercase tracking-wider cursor-pointer"
                >
                  {isEditingAddress ? 'Done Editing' : 'Change Address'}
                </button>
              )}
            </div>

            {isAddressLoading ? (
              <p className="text-xs font-mono text-gray-500">Loading saved delivery address...</p>
            ) : !isEditingAddress && shippingAddress.address1 ? (
              <div className="text-sm text-gray-300 font-mono space-y-1 bg-black/30 p-4 rounded-lg border border-white/5">
                <p className="text-white font-bold text-base">
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </p>
                <p>
                  {shippingAddress.address1}
                  {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}
                </p>
                <p>
                  {shippingAddress.city ? `${shippingAddress.city}, ` : ''}
                  {shippingAddress.state ? `${shippingAddress.state} - ` : ''}
                  <span className="text-[var(--cyan)] font-bold">{shippingAddress.postcode}</span>
                </p>
                <p className="text-gray-400">
                  Phone: <span className="text-white font-semibold">{shippingAddress.phone}</span>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-gray-400 font-mono">
                  Enter your shipping address. PIN/Postcode and Contact Phone are strictly required for print-on-demand & courier fulfillment.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">First Name *</label>
                    <input
                      type="text"
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[var(--cyan)] outline-none"
                      value={shippingAddress.firstName}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                      }
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">Last Name *</label>
                    <input
                      type="text"
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[var(--cyan)] outline-none"
                      value={shippingAddress.lastName}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                      }
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">
                    Street Address (House No, Street name) *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[var(--cyan)] outline-none"
                    value={shippingAddress.address1}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, address1: e.target.value })
                    }
                    placeholder="e.g. 128 Cyberpunk Blvd, Apt 4"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">
                    Landmark / Suite / Floor (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[var(--cyan)] outline-none"
                    value={shippingAddress.address2}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, address2: e.target.value })
                    }
                    placeholder="e.g. Near Metro Station"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">City *</label>
                    <input
                      type="text"
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[var(--cyan)] outline-none"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, city: e.target.value })
                      }
                      placeholder="City (e.g. Bengaluru, Mumbai)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">State *</label>
                    <input
                      type="text"
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[var(--cyan)] outline-none"
                      value={shippingAddress.state}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, state: e.target.value })
                      }
                      placeholder="State (e.g. KA, MH, DL, KL)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">
                      Postal Code / PIN * <span className="text-[var(--cyan)] font-bold">(Required)</span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[var(--cyan)] outline-none"
                      value={shippingAddress.postcode}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, postcode: e.target.value })
                      }
                      placeholder="6-digit PIN code"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">
                      Contact Phone * <span className="text-[var(--cyan)] font-bold">(Required)</span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[var(--cyan)] outline-none"
                      value={shippingAddress.phone}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, phone: e.target.value })
                      }
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cart Summary Section */}
          <div className="cart-summary-card w-full mt-8 p-6 rounded-xl border border-white/10 bg-black/40 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-8 text-sm md:text-base">
              <div>
                <span className="block text-gray-500 font-mono uppercase tracking-wider text-xs">
                  Subtotal
                </span>
                <span className="text-xl font-mono font-bold text-white">₹{subtotal.toFixed(2)}</span>
              </div>
              <div>
                <span className="block text-gray-500 font-mono uppercase tracking-wider text-xs">
                  Shipping
                </span>
                <span className="text-xl font-mono font-bold text-white">
                  {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div>
                <span className="block text-gray-500 font-mono uppercase tracking-wider text-xs">
                  Tax (8%)
                </span>
                <span className="text-xl font-mono font-bold text-white">₹{tax.toFixed(2)}</span>
              </div>
              <div>
                <span className="block text-gray-500 font-mono uppercase tracking-wider text-xs">
                  Grand Total
                </span>
                <span className="text-xl font-mono font-black text-[var(--cyan)]">
                  ₹{total.toFixed(2)}
                </span>
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
