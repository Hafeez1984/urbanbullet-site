'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import AuthCard from '@/app/(auth)/components/AuthCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartView from '@/components/account/CartView';
import { useCart } from '@/context/CartContext';

type Tab = 'overview' | 'orders' | 'profile' | 'addresses' | 'cart';

interface LineItem {
  id: string;
  name: string;
  quantity: number;
  total: string;
}

interface OrderData {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: string;
  itemsCount: number;
  itemsSummary: string;
  lineItems?: LineItem[];
}

interface AddressData {
  id: string;
  type: string;
  isDefault?: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

function AccountContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cartCount } = useCart();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // Sync activeTab with URL ?tab= search parameter (e.g. when Cart Icon in Header is clicked)
  useEffect(() => {
    const tabParam = searchParams?.get('tab') as Tab | null;
    if (tabParam && ['overview', 'orders', 'profile', 'addresses', 'cart'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Fetch real WooCommerce order history & saved addresses based on authenticated session email
  useEffect(() => {
    if (session?.user?.email) {
      setIsLoadingData(true);
      fetch('/api/account')
        .then((res) => res.json())
        .then((data) => {
          if (data.orders && Array.isArray(data.orders)) {
            setOrders(data.orders);
          }
          if (data.addresses && Array.isArray(data.addresses)) {
            setAddresses(data.addresses);
          }
        })
        .catch((err) => console.error("Failed to load account data from WooCommerce:", err))
        .finally(() => setIsLoadingData(false));
    }
  }, [session?.user?.email]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#07070A] text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-t-transparent border-[#D4FF3F] animate-spin" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
            Verifying Vault Access...
          </span>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !session?.user) {
    return <AuthCard />;
  }

  const userName = session.user.name || 'Urban Explorer';
  const userEmail = session.user.email || 'user@urbanbullet.co';
  const userImage = session.user.image;

  // Extract initials for fallback avatar
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'UB';

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    router.push(`/account?tab=${tab}`, { scroll: false });
  };

  const processingCount = orders.filter(
    (o) => o.status.toLowerCase() === 'processing' || o.status.toLowerCase() === 'pending'
  ).length;

  return (
    <div className="min-h-screen bg-[#07070A] text-zinc-200 font-sans flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Ambient Background Glows */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-[#D4FF3F]/5 blur-[140px]" />
          <div className="absolute bottom-1/4 right-10 h-[350px] w-[350px] rounded-full bg-cyan-500/5 blur-[140px]" />
        </div>

        <div className="relative z-10 space-y-8">
          {/* USER BANNER */}
          <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl">
            <span className="pointer-events-none absolute -left-px -top-px h-3.5 w-3.5 border-l-2 border-t-2 border-[#D4FF3F]" />
            <span className="pointer-events-none absolute -right-px -top-px h-3.5 w-3.5 border-r-2 border-t-2 border-[#D4FF3F]" />
            <span className="pointer-events-none absolute -bottom-px -left-px h-3.5 w-3.5 border-b-2 border-l-2 border-[#D4FF3F]" />
            <span className="pointer-events-none absolute -bottom-px -right-px h-3.5 w-3.5 border-b-2 border-r-2 border-[#D4FF3F]" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {/* Avatar */}
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-full border-2 border-[#D4FF3F]/50 bg-[#0c0c0e] flex items-center justify-center shadow-[0_0_20px_rgba(212,255,63,0.15)]">
                  {userImage ? (
                    <img src={userImage} alt={userName} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-mono text-xl sm:text-2xl font-black text-[#D4FF3F]">
                      {initials}
                    </span>
                  )}
                </div>

                {/* User Info */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 border border-[#D4FF3F]/30 bg-[#D4FF3F]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#D4FF3F]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D4FF3F] animate-pulse" /> Vault Access Unlocked
                    </span>
                    <span className="border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                      Google OAuth Verified
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    {userName}
                  </h1>
                  <p className="font-mono text-xs sm:text-sm text-zinc-400">
                    {userEmail}
                  </p>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/account' })}
                className="inline-flex items-center justify-center gap-2 border border-red-500/40 bg-red-500/10 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-400 transition hover:border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* DASHBOARD NAVIGATION & LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1 space-y-4">
              <nav className="border border-white/10 bg-white/[0.02] p-2 backdrop-blur-md space-y-1">
                <button
                  onClick={() => handleTabChange('overview')}
                  className={`w-full flex items-center justify-between px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === 'overview'
                      ? 'bg-[#D4FF3F] text-black font-bold'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span>Overview</span>
                  </div>
                  {activeTab === 'overview' && <span>→</span>}
                </button>

                <button
                  onClick={() => handleTabChange('orders')}
                  className={`w-full flex items-center justify-between px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === 'orders'
                      ? 'bg-[#D4FF3F] text-black font-bold'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Order History</span>
                  </div>
                  {activeTab === 'orders' ? <span>→</span> : orders.length > 0 && <span className="text-[10px] opacity-75">({orders.length})</span>}
                </button>

                <button
                  onClick={() => handleTabChange('cart')}
                  className={`w-full flex items-center justify-between px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === 'cart'
                      ? 'bg-[#D4FF3F] text-black font-bold'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Shopping Cart</span>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold ${activeTab === 'cart' ? 'bg-black text-[#D4FF3F]' : 'bg-[#D4FF3F]/20 text-[#D4FF3F]'}`}>
                    {cartCount}
                  </span>
                </button>

                <button
                  onClick={() => handleTabChange('profile')}
                  className={`w-full flex items-center justify-between px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === 'profile'
                      ? 'bg-[#D4FF3F] text-black font-bold'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile Details</span>
                  </div>
                  {activeTab === 'profile' && <span>→</span>}
                </button>

                <button
                  onClick={() => handleTabChange('addresses')}
                  className={`w-full flex items-center justify-between px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider transition ${
                    activeTab === 'addresses'
                      ? 'bg-[#D4FF3F] text-black font-bold'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Saved Addresses</span>
                  </div>
                  {activeTab === 'addresses' ? <span>→</span> : addresses.length > 0 && <span className="text-[10px] opacity-75">({addresses.length})</span>}
                </button>
              </nav>

              {/* Status Card */}
              <div className="border border-white/10 bg-white/[0.02] p-4 text-xs font-mono space-y-2">
                <div className="flex items-center gap-2 text-[#D4FF3F]">
                  <span className="h-2 w-2 rounded-full bg-[#D4FF3F] animate-ping" />
                  <span className="uppercase tracking-widest text-[10px] font-bold">VIP Drop Access</span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  You are registered for Drop 08 early access. Receive alerts before public releases.
                </p>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Stats Grid - Dynamic metrics with actual orders.length & addresses.length */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="border border-white/10 bg-white/[0.02] p-5">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Total Orders</p>
                      <p className="mt-2 font-mono text-3xl font-black text-white">
                        {isLoadingData ? '...' : String(orders.length).padStart(2, '0')}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-[#D4FF3F]">
                        {isLoadingData ? 'Syncing...' : `${processingCount} Processing`}
                      </p>
                    </div>

                    <div className="border border-white/10 bg-white/[0.02] p-5">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Saved Addresses</p>
                      <p className="mt-2 font-mono text-3xl font-black text-white">
                        {isLoadingData ? '...' : String(addresses.length).padStart(2, '0')}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-zinc-400">
                        {addresses.length > 0 ? 'Default: Shipping' : 'No Saved Address'}
                      </p>
                    </div>

                    <div className="border border-white/10 bg-white/[0.02] p-5">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Member Status</p>
                      <p className="mt-2 font-mono text-3xl font-black text-[#D4FF3F]">VIP</p>
                      <p className="mt-1 font-mono text-[10px] text-zinc-400">Early Drop Priority</p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="border border-white/10 bg-white/[0.02] p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                          Recent Orders
                        </h3>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                          Latest activity from your WooCommerce account
                        </p>
                      </div>
                      <button
                        onClick={() => handleTabChange('orders')}
                        className="font-mono text-xs uppercase tracking-wider text-[#D4FF3F] hover:underline"
                      >
                        View All →
                      </button>
                    </div>

                    {isLoadingData ? (
                      <div className="py-8 text-center font-mono text-xs text-zinc-500 animate-pulse">
                        Fetching real order history...
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="border border-white/5 bg-black/40 p-8 text-center space-y-3">
                        <svg className="mx-auto h-8 w-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <p className="font-mono text-sm font-bold uppercase tracking-wider text-zinc-300">
                          No recent orders
                        </p>
                        <p className="font-mono text-xs text-zinc-500">
                          You haven't placed any streetwear orders yet.
                        </p>
                        <a
                          href="/#products"
                          className="inline-block mt-2 border border-[#D4FF3F]/40 bg-[#D4FF3F]/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#D4FF3F] hover:bg-[#D4FF3F] hover:text-black transition"
                        >
                          Explore Catalog →
                        </a>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {orders.slice(0, 3).map((order) => (
                          <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between border border-white/5 bg-black/40 p-4 gap-2">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-white">{order.orderNumber}</span>
                                <span className={`border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                                  order.status.toLowerCase() === 'completed' || order.status.toLowerCase() === 'delivered'
                                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                                    : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="font-mono text-xs text-zinc-400">{order.itemsSummary}</p>
                              <p className="font-mono text-[10px] text-zinc-500">Placed on {order.date}</p>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="font-mono text-sm font-bold text-white">{order.total}</p>
                              <p className="font-mono text-[10px] text-zinc-400">{order.itemsCount} {order.itemsCount === 1 ? 'Item' : 'Items'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: ORDER HISTORY */}
              {activeTab === 'orders' && (
                <div className="border border-white/10 bg-white/[0.02] p-6 space-y-6">
                  <div>
                    <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-white">
                      Order History
                    </h2>
                    <p className="font-mono text-xs text-zinc-400 mt-1">
                      Track and manage your WooCommerce streetwear purchases
                    </p>
                  </div>

                  {isLoadingData ? (
                    <div className="py-12 text-center font-mono text-xs text-zinc-500 animate-pulse">
                      Loading order history...
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="border border-white/5 bg-black/40 p-12 text-center space-y-4">
                      <svg className="mx-auto h-12 w-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <h3 className="font-mono text-base font-bold uppercase tracking-wider text-white">
                        No recent orders
                      </h3>
                      <p className="font-mono text-xs text-zinc-400 max-w-sm mx-auto">
                        When you purchase drops from Urbanbullet, your order history and tracking details will appear here.
                      </p>
                      <a
                        href="/#products"
                        className="inline-block border border-[#D4FF3F] bg-[#D4FF3F]/10 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#D4FF3F] hover:bg-[#D4FF3F] hover:text-black transition"
                      >
                        Shop New Drops
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-white/10 bg-black/50 p-5 space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
                            <div>
                              <p className="font-mono text-xs text-zinc-400">Order ID: <span className="font-bold text-white">{order.orderNumber}</span></p>
                              <p className="font-mono text-[10px] text-zinc-500">Date: {order.date}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                                order.status.toLowerCase() === 'completed' || order.status.toLowerCase() === 'delivered'
                                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                                  : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
                              }`}>
                                {order.status}
                              </span>
                              <span className="font-mono text-base font-bold text-[#D4FF3F]">{order.total}</span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-zinc-300 gap-2">
                            <div>
                              <p className="font-bold text-white">{order.itemsSummary}</p>
                              <p className="text-[11px] text-zinc-400">{order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'} in order</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => alert(`Tracking details for order ${order.orderNumber}`)}
                              className="border border-[#D4FF3F]/40 bg-[#D4FF3F]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D4FF3F] hover:bg-[#D4FF3F] hover:text-black transition self-start sm:self-auto"
                            >
                              Track Order
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SHOPPING CART */}
              {activeTab === 'cart' && (
                <div className="border border-white/10 bg-white/[0.02] p-6">
                  <CartView
                    icons={{
                      cart: (
                        <svg className="h-10 w-10 mx-auto text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      ),
                    }}
                  />
                </div>
              )}

              {/* TAB 4: PROFILE DETAILS */}
              {activeTab === 'profile' && (
                <div className="border border-white/10 bg-white/[0.02] p-6 space-y-6">
                  <div>
                    <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-white">
                      Profile Details
                    </h2>
                    <p className="font-mono text-xs text-zinc-400 mt-1">
                      Account security and member settings synced via Google OAuth
                    </p>
                  </div>

                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                          Full Name
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={userName}
                          className="w-full border border-white/10 bg-black/60 px-4 py-2.5 font-mono text-xs text-white outline-none focus:border-[#D4FF3F]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                          Email Address
                        </label>
                        <input
                          type="email"
                          readOnly
                          value={userEmail}
                          className="w-full border border-white/10 bg-black/60 px-4 py-2.5 font-mono text-xs text-white outline-none focus:border-[#D4FF3F]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                          Auth Provider
                        </label>
                        <div className="flex items-center gap-2 border border-white/10 bg-black/60 px-4 py-2.5 font-mono text-xs text-zinc-300">
                          <svg className="h-4 w-4 text-[#D4FF3F]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
                          </svg>
                          <span>Google Sign-In (OAuth 2.0)</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                          Security Status
                        </label>
                        <div className="flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 font-mono text-xs text-emerald-400">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          <span>Session Active & Secured</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                        Preferences & Drop Alerts
                      </h3>

                      <label className="flex items-center gap-3 font-mono text-xs text-zinc-400 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded-none border-white/20 bg-black/60 accent-[#D4FF3F]"
                        />
                        <span>Receive priority Drop notifications & release countdowns</span>
                      </label>

                      <label className="flex items-center gap-3 font-mono text-xs text-zinc-400 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded-none border-white/20 bg-black/60 accent-[#D4FF3F]"
                        />
                        <span>Email order receipts and tracking updates</span>
                      </label>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 5: SAVED ADDRESSES */}
              {activeTab === 'addresses' && (
                <div className="border border-white/10 bg-white/[0.02] p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-white">
                        Saved Addresses
                      </h2>
                      <p className="font-mono text-xs text-zinc-400 mt-1">
                        Shipping destinations for express checkout
                      </p>
                    </div>
                    <button className="border border-[#D4FF3F] bg-[#D4FF3F]/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#D4FF3F] hover:bg-[#D4FF3F] hover:text-black transition">
                      + Add Address
                    </button>
                  </div>

                  {isLoadingData ? (
                    <div className="py-12 text-center font-mono text-xs text-zinc-500 animate-pulse">
                      Loading address book...
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="border border-white/5 bg-black/40 p-8 text-center space-y-3">
                      <svg className="mx-auto h-8 w-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <p className="font-mono text-sm font-bold uppercase tracking-wider text-zinc-300">
                        No saved addresses
                      </p>
                      <p className="font-mono text-xs text-zinc-500">
                        Your shipping and billing destinations will be saved here automatically when you complete checkout.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div key={address.id} className="border border-[#D4FF3F]/40 bg-black/50 p-5 space-y-3 relative">
                          <div className="flex items-center justify-between">
                            <span className="border border-[#D4FF3F]/40 bg-[#D4FF3F]/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#D4FF3F]">
                              {address.type}
                            </span>
                            {address.isDefault && (
                              <span className="font-mono text-xs text-zinc-500">Primary</span>
                            )}
                          </div>

                          <div className="font-mono text-xs text-zinc-300 space-y-1">
                            <p className="font-bold text-white text-sm">
                              {address.firstName} {address.lastName}
                            </p>
                            {address.company && <p className="text-zinc-400">{address.company}</p>}
                            <p>{address.address1} {address.address2}</p>
                            <p>{address.city}{address.state ? `, ${address.state}` : ''} {address.postcode}</p>
                            <p>{address.country}</p>
                            {address.phone && <p className="text-zinc-500 pt-1">{address.phone}</p>}
                          </div>

                          <div className="pt-2 flex items-center gap-3 font-mono text-xs">
                            <button type="button" className="text-[#D4FF3F] hover:underline">Edit</button>
                            <span className="text-zinc-600">|</span>
                            <button type="button" className="text-zinc-400 hover:text-white">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07070A] text-white flex items-center justify-center font-sans">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-t-transparent border-[#D4FF3F] animate-spin" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
              Initializing Account Vault...
            </span>
          </div>
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
