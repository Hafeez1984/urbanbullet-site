'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import Footer from '@/components/Footer';

// Simulated WPGraphQL Customer Response Structure (For Headless Data Readiness)
interface WPGraphQLBillingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
  email: string;
}

interface WPGraphQLShippingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface WPGraphQLOrderNode {
  id: string;
  orderNumber: string;
  date: string;
  status: 'COMPLETED' | 'PROCESSING' | 'ON_HOLD' | 'FAILED' | 'PENDING';
  total: string;
  lineItems: {
    nodes: {
      productName: string;
      quantity: number;
    }[];
  };
}

export default function AccountPage() {
  const { user, isLoading, login, logout, updateUser } = useAuth();
  const { showNotification } = useNotification();
  
  // Dashboard states
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'addresses' | 'details'>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Address edit state
  const [editingAddressType, setEditingAddressType] = useState<'billing' | 'shipping' | null>(null);

  // Login Form States (If user not logged in)
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Simulated Address Data conforming to WPGraphQL schema
  const [billingAddress, setBillingAddress] = useState<WPGraphQLBillingAddress>({
    firstName: 'Alex',
    lastName: 'Rider',
    company: 'Volt Tactical',
    address1: '108 Cyberpunk Way',
    address2: 'Suite 404',
    city: 'Neo-City',
    state: 'CA',
    postcode: '90210',
    country: 'US',
    phone: '+1 (555) 014-9090',
    email: 'alex@streetrevolution.com',
  });

  const [shippingAddress, setShippingAddress] = useState<WPGraphQLShippingAddress>({
    firstName: 'Alex',
    lastName: 'Rider',
    company: 'Volt Tactical',
    address1: '108 Cyberpunk Way',
    address2: 'Suite 404',
    city: 'Neo-City',
    state: 'CA',
    postcode: '90210',
    country: 'US',
  });

  // Details form state
  const [detailsForm, setDetailsForm] = useState({
    firstName: user?.firstName || 'Alex',
    lastName: user?.lastName || 'Rider',
    displayName: user?.displayName || 'Alex Rider',
    email: user?.email || 'alex@streetrevolution.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Simulated WooCommerce Orders conforming to WPGraphQL schema
  const ordersData: WPGraphQLOrderNode[] = [
    {
      id: 'b3JkZXI6MTAx',
      orderNumber: '1084',
      date: '2026-06-15T08:30:00Z',
      status: 'COMPLETED',
      total: '$179.98',
      lineItems: {
        nodes: [
          { productName: 'Cyber Tech Hoodie', quantity: 1 },
          { productName: 'Neon Dreams Tee', quantity: 2 }
        ]
      }
    },
    {
      id: 'b3JkZXI6MTAy',
      orderNumber: '1072',
      date: '2026-07-02T14:45:00Z',
      status: 'PROCESSING',
      total: '$119.99',
      lineItems: {
        nodes: [
          { productName: 'Tech Zip Hoodie', quantity: 1 }
        ]
      }
    },
    {
      id: 'b3JkZXI6MTAz',
      orderNumber: '1049',
      date: '2026-05-18T10:12:00Z',
      status: 'COMPLETED',
      total: '$44.99',
      lineItems: {
        nodes: [
          { productName: 'Graphic Crew Neck', quantity: 1 }
        ]
      }
    }
  ];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    try {
      const result = await login(emailInput, passwordInput);
      if (result.success) {
        showNotification('Secure link established. Welcome back, agent.');
      } else {
        showNotification(result.error || 'Authentication rejected.');
      }
    } catch (err) {
      showNotification('Terminal sync error occurred.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleDemoBypass = async () => {
    setIsAuthenticating(true);
    try {
      const result = await login('alex@streetrevolution.com', 'bypass');
      if (result.success) {
        showNotification('Demo Console Activated.');
      }
    } catch (err) {
      showNotification('Bypass failed.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleUpdateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('Addresses updated in WPGraphQL Cache.');
    setEditingAddressType(null);
  };

  const handleUpdateDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (detailsForm.newPassword && detailsForm.newPassword !== detailsForm.confirmPassword) {
      showNotification('Passwords do not match.');
      return;
    }
    updateUser({
      firstName: detailsForm.firstName,
      lastName: detailsForm.lastName,
      displayName: detailsForm.displayName,
      email: detailsForm.email,
    });
    showNotification('Account details updated successfully.');
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500/10 border-t-cyan-400 animate-spin" />
        <span className="orbitron uppercase tracking-widest text-xs text-cyan-400">Synchronizing Console...</span>
      </div>
    );
  }

  // AUTHENTICATION PORTAL (IF NOT LOGGED IN)
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-between font-sans relative overflow-hidden">
        
        {/* Decorative Grid and Ambient lights */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] bg-cyan-500/10 top-1/4 left-1/4 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] bg-purple-500/10 bottom-1/4 right-1/4 pointer-events-none" />

        {/* Mini Header */}
        <header className="h-20 max-w-7xl mx-auto px-6 w-full flex items-center justify-between z-10">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded flex items-center justify-center">
              <i className="fas fa-bolt text-white text-md"></i>
            </div>
            <span className="text-xl font-black orbitron tracking-wider text-cyan-400">URBANBULLET</span>
          </Link>
          <Link href="/" className="text-zinc-500 hover:text-white transition-colors duration-200 text-xs uppercase tracking-widest font-mono">
            &larr; BACK TO HOME
          </Link>
        </header>

        {/* Login Box */}
        <main className="flex-grow flex items-center justify-center p-6 z-10">
          <div 
            className="w-full max-w-md p-8 md:p-10 rounded-[28px] border border-white/[0.04] relative"
            style={{
              backgroundColor: 'rgba(16, 16, 22, 0.76)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-2 orbitron tracking-wide text-white">ACCESS CONSOLE</h2>
              <p className="text-zinc-500 text-sm font-light">Login using WP Headless credentials.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="agent@urbanbullet.in" 
                  className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">DECRYPT KEY (PASSWORD)</label>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-center cursor-pointer transition-all duration-300 orbitron border border-cyan-400 text-cyan-400 bg-cyan-950/10 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50"
              >
                {isAuthenticating ? 'AUTHENTICATING...' : 'ESTABLISH LINK'}
              </button>
            </form>

            <div className="relative my-8 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800/80"></div></div>
              <span className="relative bg-zinc-950/30 px-3 text-[10px] text-zinc-600 font-mono">OR</span>
            </div>

            {/* Quick Demo Bypass */}
            <button
              onClick={handleDemoBypass}
              className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-center cursor-pointer transition-all duration-300 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              LAUNCH MOCK DEMO SESSION
            </button>
            
            <p className="text-[10px] text-center text-zinc-600 font-mono mt-6">
              DEMO CREDENTIALS: <span className="text-cyan-400/80">alex@streetrevolution.com</span>
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // WOOMEMBERS CUSTOMER DASHBOARD (WHEN LOGGED IN)
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-between font-sans relative overflow-hidden">
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Mini Dashboard Header */}
      <header 
        className="fixed w-full top-0 left-0 z-40 border-b border-white/[0.03] backdrop-blur-md"
        style={{
          background: 'rgba(15, 15, 15, 0.7)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-purple-600 rounded flex items-center justify-center">
              <i className="fas fa-bolt text-white text-md"></i>
            </div>
            <span className="text-lg font-black orbitron tracking-wider text-cyan-400">URBANBULLET</span>
          </Link>
          <div className="flex items-center space-x-6">
            <span className="hidden sm:inline text-xs font-mono text-zinc-500 uppercase tracking-widest">
              CONSOLE: ACTIVE // SECURE-SHELL
            </span>
            <button 
              onClick={() => { logout(); showNotification('Session ended.'); }}
              className="text-zinc-500 hover:text-white transition-colors duration-200 text-xs uppercase tracking-widest font-mono"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Panel */}
      <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full relative z-10">
        
        {/* CSS GRID SHELL WITH COLLAPSIBLE SIDEBAR */}
        <div 
          className="grid grid-cols-12 gap-8 p-4 md:p-8 rounded-[28px] border border-white/[0.04]"
          style={{
            backgroundColor: 'rgba(16, 16, 22, 0.76)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Collapsible Sidebar (Left column) */}
          <aside 
            className={`col-span-12 lg:col-span-3 transition-all duration-300 ${
              isSidebarCollapsed ? 'lg:col-span-1' : 'lg:col-span-3'
            } border-r border-zinc-800/50 pr-0 lg:pr-8`}
          >
            {/* Sidebar toggle buttons (Desktop & Mobile) */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-900">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-cyan-950/40 text-cyan-400 flex items-center justify-center font-bold text-xs orbitron">
                  {user.avatarInitials}
                </div>
                {!isSidebarCollapsed && (
                  <span className="font-bold text-sm tracking-tight text-white uppercase truncate max-w-[150px]">
                    {user.displayName}
                  </span>
                )}
              </div>
              
              {/* Desktop toggle */}
              <button 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden lg:block text-zinc-500 hover:text-cyan-400 transition-colors p-1"
                aria-label="Collapse Navigation"
              >
                <i className={`fas ${isSidebarCollapsed ? 'fa-indent' : 'fa-outdent'} text-sm`}></i>
              </button>

              {/* Mobile toggle */}
              <button 
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="lg:hidden text-zinc-500 hover:text-cyan-400 transition-colors"
                aria-label="Menu"
              >
                <i className="fas fa-bars text-lg"></i>
              </button>
            </div>

            {/* Sidebar Navigation Items */}
            <nav 
              className={`${
                isMobileSidebarOpen ? 'block' : 'hidden lg:flex'
              } flex-col space-y-2`}
            >
              {[
                { key: 'dashboard', label: 'DASHBOARD', icon: 'fa-chart-pie' },
                { key: 'orders', label: 'ORDERS HISTORY', icon: 'fa-clipboard-list' },
                { key: 'addresses', label: 'MY ADDRESSES', icon: 'fa-map-marker-alt' },
                { key: 'details', label: 'ACCOUNT DETAILS', icon: 'fa-id-card' },
              ].map((item) => {
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      setActiveTab(item.key as any);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider orbitron border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'border-[#06b6d4]/40 text-[#06b6d4] bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                        : 'border-transparent text-zinc-500 hover:text-white hover:border-zinc-800 hover:bg-zinc-900/30'
                    } ${isSidebarCollapsed ? 'lg:justify-center' : 'justify-start'}`}
                  >
                    <i className={`fas ${item.icon} text-sm ${isSidebarCollapsed ? '' : 'mr-3'}`}></i>
                    {(!isSidebarCollapsed || isMobileSidebarOpen) && <span>{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Core Content Area (Right column) */}
          <section className={`col-span-12 ${isSidebarCollapsed ? 'lg:col-span-11' : 'lg:col-span-9'} min-h-[500px] flex flex-col justify-start pt-6 lg:pt-0`}>
            
            {/* VIEW 1: DASHBOARD VIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-black orbitron tracking-wide text-white uppercase mb-1">
                      MEMBERS PANEL
                    </h2>
                    <p className="text-zinc-500 text-sm font-light">
                      Welcome back. Synchronized via Headless WP Bridge.
                    </p>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="bg-gradient-to-r from-cyan-950 to-purple-950 border border-cyan-500/20 px-4 py-2 rounded-full flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400 font-bold">GOLD TIER ACCESS</span>
                  </div>
                </div>

                {/* Dashboard Stats Panel */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'ORDERS PLACED', value: '03', icon: 'fa-box', color: 'text-cyan-400' },
                    { label: 'TOTAL SPENT', value: '$344.96', icon: 'fa-credit-card', color: 'text-purple-400' },
                    { label: 'MEMBER ID', value: '#1084', icon: 'fa-fingerprint', color: 'text-pink-400' },
                    { label: 'SESSION STATUS', value: 'SYNCED', icon: 'fa-wifi', color: 'text-emerald-400' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-zinc-950/40 border border-zinc-900 p-5 rounded-2xl flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold">{stat.label}</span>
                        <i className={`fas ${stat.icon} text-zinc-700 text-xs`}></i>
                      </div>
                      <span className={`text-xl font-bold orbitron ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* Info panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="bg-zinc-950/30 border border-zinc-900/60 p-6 rounded-2xl">
                    <h3 className="text-sm font-bold text-white uppercase orbitron mb-3 flex items-center">
                      <i className="fas fa-satellite-dish text-cyan-400 mr-2"></i>
                      WPGraphQL Node Bridge Status
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-light mb-4">
                      The account dashboard is fully wired to map GraphQL query outputs. Connecting to live database node endpoint is ready via local headless environmental routing variables.
                    </p>
                    <div className="flex items-center space-x-2 text-[10px] text-cyan-500 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span>ENDPOINT READY // https://urbanbullet.in/graphql</span>
                    </div>
                  </div>

                  <div className="bg-zinc-950/30 border border-zinc-900/60 p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase orbitron mb-3 flex items-center">
                        <i className="fas fa-gift text-purple-400 mr-2"></i>
                        Next Drop Release Alert
                      </h3>
                      <p className="text-xs text-zinc-500 leading-relaxed font-light">
                        As a member, you receive early notification access keys. The next drop (Drop 09 // HELIX VEST) launches in 4 days.
                      </p>
                    </div>
                    <button 
                      onClick={() => showNotification('Release Key copied to clipboard!')}
                      className="mt-4 px-4 py-2 bg-purple-950/30 border border-purple-500/30 text-purple-400 rounded-xl text-[10px] font-bold tracking-widest orbitron hover:bg-purple-500 hover:text-white transition-colors cursor-pointer self-start"
                    >
                      CLAIM ACCESS KEY
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: ORDERS HISTORY VIEW */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-black orbitron tracking-wide text-white uppercase mb-1">
                    ORDER CONSOLE
                  </h2>
                  <p className="text-zinc-500 text-sm font-light">
                    WooCommerce checkout transactions.
                  </p>
                </div>

                {/* Orders Data Table */}
                <div className="overflow-x-auto border border-zinc-900 rounded-2xl bg-zinc-950/30">
                  <table className="w-full border-collapse text-left text-sm text-zinc-400">
                    <thead>
                      <tr className="border-b border-zinc-900 bg-zinc-950/80 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        <th className="p-4 font-bold">ORDER ID</th>
                        <th className="p-4 font-bold">DATE</th>
                        <th className="p-4 font-bold">PRODUCTS</th>
                        <th className="p-4 font-bold">STATUS</th>
                        <th className="p-4 font-bold">TOTAL</th>
                        <th className="p-4 text-right font-bold">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {ordersData.map((order) => (
                        <tr key={order.id} className="hover:bg-white/[0.01] transition-colors">
                          <td className="p-4 font-mono font-bold text-white">#{order.orderNumber}</td>
                          <td className="p-4 text-xs font-light">
                            {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                          <td className="p-4 text-xs">
                            <div className="flex flex-col gap-1 max-w-[200px] truncate">
                              {order.lineItems.nodes.map((item, idx) => (
                                <span key={idx} className="text-white font-medium text-xs">
                                  {item.productName} <span className="text-zinc-500">x{item.quantity}</span>
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            <span 
                              className={`text-[9px] font-bold px-2.5 py-1 rounded-full ${
                                order.status === 'COMPLETED' 
                                  ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' 
                                  : 'bg-yellow-950/40 text-yellow-400 border border-yellow-500/20'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 font-mono font-bold text-cyan-400">{order.total}</td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => showNotification(`Loading Invoice for Order #${order.orderNumber}`)}
                              className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-cyan-400 hover:text-white rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer"
                            >
                              TRACK
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VIEW 3: MY ADDRESSES VIEW */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-black orbitron tracking-wide text-white uppercase mb-1">
                    TACTICAL DESTINATIONS
                  </h2>
                  <p className="text-zinc-500 text-sm font-light">
                    Manage billing and shipping destinations for WooCommerce order processing.
                  </p>
                </div>

                {editingAddressType === null ? (
                  /* Addresses Display Panels */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Billing address block */}
                    <div className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl flex flex-col justify-between min-h-[250px]">
                      <div>
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-900">
                          <h3 className="text-xs uppercase font-bold tracking-wider text-white orbitron">BILLING PROTOCOL</h3>
                          <button 
                            onClick={() => setEditingAddressType('billing')}
                            className="text-cyan-400 hover:text-white transition-colors font-mono text-[10px] uppercase font-bold"
                          >
                            EDIT ADDRESS
                          </button>
                        </div>
                        <div className="space-y-1.5 text-sm text-zinc-400 font-light">
                          <p className="text-white font-medium">{billingAddress.firstName} {billingAddress.lastName}</p>
                          {billingAddress.company && <p>{billingAddress.company}</p>}
                          <p>{billingAddress.address1}</p>
                          {billingAddress.address2 && <p>{billingAddress.address2}</p>}
                          <p>{billingAddress.city}, {billingAddress.state} {billingAddress.postcode}</p>
                          <p>{billingAddress.country}</p>
                          <p className="font-mono text-xs text-zinc-500 mt-2">{billingAddress.phone}</p>
                          <p className="font-mono text-xs text-zinc-500">{billingAddress.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Shipping address block */}
                    <div className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl flex flex-col justify-between min-h-[250px]">
                      <div>
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-900">
                          <h3 className="text-xs uppercase font-bold tracking-wider text-white orbitron">SHIPPING ROUTE</h3>
                          <button 
                            onClick={() => setEditingAddressType('shipping')}
                            className="text-cyan-400 hover:text-white transition-colors font-mono text-[10px] uppercase font-bold"
                          >
                            EDIT ADDRESS
                          </button>
                        </div>
                        <div className="space-y-1.5 text-sm text-zinc-400 font-light">
                          <p className="text-white font-medium">{shippingAddress.firstName} {shippingAddress.lastName}</p>
                          {shippingAddress.company && <p>{shippingAddress.company}</p>}
                          <p>{shippingAddress.address1}</p>
                          {shippingAddress.address2 && <p>{shippingAddress.address2}</p>}
                          <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postcode}</p>
                          <p>{shippingAddress.country}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* Address Editing Form Grid (WooCommerce Structure) */
                  <form onSubmit={handleUpdateAddress} className="space-y-6 bg-zinc-950/30 p-6 rounded-2xl border border-zinc-900">
                    <h3 className="text-xs font-bold tracking-widest uppercase text-white orbitron mb-4">
                      EDITING {editingAddressType === 'billing' ? 'BILLING PROTOCOL' : 'SHIPPING ROUTE'}
                    </h3>

                    {/* 2-COLUMN FORM GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div>
                        <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">FIRST NAME</label>
                        <input 
                          type="text" 
                          required
                          value={editingAddressType === 'billing' ? billingAddress.firstName : shippingAddress.firstName}
                          onChange={(e) => {
                            if (editingAddressType === 'billing') {
                              setBillingAddress({ ...billingAddress, firstName: e.target.value });
                            } else {
                              setShippingAddress({ ...shippingAddress, firstName: e.target.value });
                            }
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">LAST NAME</label>
                        <input 
                          type="text" 
                          required
                          value={editingAddressType === 'billing' ? billingAddress.lastName : shippingAddress.lastName}
                          onChange={(e) => {
                            if (editingAddressType === 'billing') {
                              setBillingAddress({ ...billingAddress, lastName: e.target.value });
                            } else {
                              setShippingAddress({ ...shippingAddress, lastName: e.target.value });
                            }
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">COMPANY NAME (OPTIONAL)</label>
                        <input 
                          type="text" 
                          value={(editingAddressType === 'billing' ? billingAddress.company : shippingAddress.company) || ''}
                          onChange={(e) => {
                            if (editingAddressType === 'billing') {
                              setBillingAddress({ ...billingAddress, company: e.target.value });
                            } else {
                              setShippingAddress({ ...shippingAddress, company: e.target.value });
                            }
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">STREET ADDRESS</label>
                        <input 
                          type="text" 
                          required
                          value={editingAddressType === 'billing' ? billingAddress.address1 : shippingAddress.address1}
                          onChange={(e) => {
                            if (editingAddressType === 'billing') {
                              setBillingAddress({ ...billingAddress, address1: e.target.value });
                            } else {
                              setShippingAddress({ ...shippingAddress, address1: e.target.value });
                            }
                          }}
                          placeholder="House number and street name"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 mb-3"
                        />
                        <input 
                          type="text" 
                          value={(editingAddressType === 'billing' ? billingAddress.address2 : shippingAddress.address2) || ''}
                          onChange={(e) => {
                            if (editingAddressType === 'billing') {
                              setBillingAddress({ ...billingAddress, address2: e.target.value });
                            } else {
                              setShippingAddress({ ...shippingAddress, address2: e.target.value });
                            }
                          }}
                          placeholder="Apartment, suite, unit, etc. (optional)"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">TOWN / CITY</label>
                        <input 
                          type="text" 
                          required
                          value={editingAddressType === 'billing' ? billingAddress.city : shippingAddress.city}
                          onChange={(e) => {
                            if (editingAddressType === 'billing') {
                              setBillingAddress({ ...billingAddress, city: e.target.value });
                            } else {
                              setShippingAddress({ ...shippingAddress, city: e.target.value });
                            }
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">STATE / COUNTY</label>
                        <input 
                          type="text" 
                          required
                          value={editingAddressType === 'billing' ? billingAddress.state : shippingAddress.state}
                          onChange={(e) => {
                            if (editingAddressType === 'billing') {
                              setBillingAddress({ ...billingAddress, state: e.target.value });
                            } else {
                              setShippingAddress({ ...shippingAddress, state: e.target.value });
                            }
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">POSTCODE / ZIP</label>
                        <input 
                          type="text" 
                          required
                          value={editingAddressType === 'billing' ? billingAddress.postcode : shippingAddress.postcode}
                          onChange={(e) => {
                            if (editingAddressType === 'billing') {
                              setBillingAddress({ ...billingAddress, postcode: e.target.value });
                            } else {
                              setShippingAddress({ ...shippingAddress, postcode: e.target.value });
                            }
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">COUNTRY</label>
                        <input 
                          type="text" 
                          required
                          value={editingAddressType === 'billing' ? billingAddress.country : shippingAddress.country}
                          onChange={(e) => {
                            if (editingAddressType === 'billing') {
                              setBillingAddress({ ...billingAddress, country: e.target.value });
                            } else {
                              setShippingAddress({ ...shippingAddress, country: e.target.value });
                            }
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      {editingAddressType === 'billing' && (
                        <>
                          <div>
                            <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">PHONE NUMBER</label>
                            <input 
                              type="tel" 
                              required
                              value={billingAddress.phone}
                              onChange={(e) => setBillingAddress({ ...billingAddress, phone: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">EMAIL ADDRESS</label>
                            <input 
                              type="email" 
                              required
                              value={billingAddress.email}
                              onChange={(e) => setBillingAddress({ ...billingAddress, email: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                            />
                          </div>
                        </>
                      )}

                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs uppercase tracking-widest orbitron cursor-pointer hover:bg-cyan-400 transition-colors"
                      >
                        SAVE PROTOCOL
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingAddressType(null)}
                        className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold text-xs uppercase tracking-widest orbitron cursor-pointer hover:text-white transition-colors"
                      >
                        CANCEL
                      </button>
                    </div>

                  </form>
                )}
              </div>
            )}

            {/* VIEW 4: ACCOUNT DETAILS VIEW */}
            {activeTab === 'details' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-black orbitron tracking-wide text-white uppercase mb-1">
                    IDENTITY RECORD
                  </h2>
                  <p className="text-zinc-500 text-sm font-light">
                    Update your client credentials.
                  </p>
                </div>

                <form onSubmit={handleUpdateDetails} className="space-y-6 bg-zinc-950/30 p-6 rounded-2xl border border-zinc-900 max-w-2xl">
                  
                  {/* Grid fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">FIRST NAME</label>
                      <input 
                        type="text" 
                        required
                        value={detailsForm.firstName}
                        onChange={(e) => setDetailsForm({ ...detailsForm, firstName: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">LAST NAME</label>
                      <input 
                        type="text" 
                        required
                        value={detailsForm.lastName}
                        onChange={(e) => setDetailsForm({ ...detailsForm, lastName: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">DISPLAY NAME</label>
                      <input 
                        type="text" 
                        required
                        value={detailsForm.displayName}
                        onChange={(e) => setDetailsForm({ ...detailsForm, displayName: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                      <span className="text-[10px] text-zinc-600 mt-1 block">This is how your identity will appear in reviews and notifications.</span>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">EMAIL ADDRESS</label>
                      <input 
                        type="email" 
                        required
                        value={detailsForm.email}
                        onChange={(e) => setDetailsForm({ ...detailsForm, email: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    {/* Password section */}
                    <div className="sm:col-span-2 border-t border-zinc-900 pt-6 mt-2">
                      <h4 className="text-xs font-bold tracking-widest text-white uppercase orbitron mb-4">
                        SECURITY KEYS UPDATE
                      </h4>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">CURRENT PASSWORD (LEAVE BLANK TO LEAVE UNCHANGED)</label>
                      <input 
                        type="password" 
                        value={detailsForm.currentPassword}
                        onChange={(e) => setDetailsForm({ ...detailsForm, currentPassword: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">NEW PASSWORD</label>
                      <input 
                        type="password" 
                        value={detailsForm.newPassword}
                        onChange={(e) => setDetailsForm({ ...detailsForm, newPassword: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">CONFIRM NEW PASSWORD</label>
                      <input 
                        type="password" 
                        value={detailsForm.confirmPassword}
                        onChange={(e) => setDetailsForm({ ...detailsForm, confirmPassword: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs uppercase tracking-widest orbitron cursor-pointer hover:bg-cyan-400 transition-colors"
                    >
                      SAVE PROFILE DETAILS
                    </button>
                  </div>

                </form>
              </div>
            )}

          </section>
        </div>
      </main>

      {/* Global Footer component is mounted here */}
      <Footer />
    </div>
  );
}
