'use client';

import React, { useMemo, useState } from 'react';
import { useAuth, User } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import Link from 'next/link';

interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
  items: string;
}

interface AddressDetail {
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface Addresses {
  billing: AddressDetail;
  shipping: AddressDetail;
}

const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24">
      <path d="M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7v-9h-7v9Zm0-16v5h7V4h-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24">
      <path d="M7 7.5V6a5 5 0 0 1 10 0v1.5M5.6 8h12.8l1 12H4.6l1-12Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  addresses: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24">
      <path d="M12 21s7-5.1 7-11.2A7 7 0 1 0 5 9.8C5 15.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M12 12.3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  account: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24">
      <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 12a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24">
      <path d="m13 2-9 12h7l-1 8 10-13h-7l0-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
    </svg>
  ),
  collapse: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24">
      <path d="M15 6 9 12l6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
    </svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24">
      <path d="M3.5 8.5h17M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M7 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  package: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24">
      <path d="m12 3 8 4.4v9.2L12 21l-8-4.4V7.4L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="m4.5 7.7 7.5 4.2 7.5-4.2M12 12v8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24">
      <path d="M12 2.5 14.2 9l6.8 1-4.9 4.7 1.2 6.8L12 18.3l-6.1 3.2 1.2-6.8L2.2 10 9 9l3-6.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24">
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 10.5V17M12 7.2v.1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: icons.dashboard },
  { id: "orders", label: "Orders", icon: icons.orders },
  { id: "addresses", label: "Addresses", icon: icons.addresses },
  { id: "account", label: "Account Details", icon: icons.account }
];

const demoOrders: Order[] = [
  { id: "#SR-1049", date: "Feb 18, 2026", status: "Processing", total: "$248.00", items: "Apex Carbon Tee, Neon Utility Cap" },
  { id: "#SR-1038", date: "Jan 29, 2026", status: "Completed", total: "$119.00", items: "Revolution Hoodie" },
  { id: "#SR-1017", date: "Dec 14, 2025", status: "Completed", total: "$312.50", items: "Night Run Jacket, Cargo Tech Pants" },
  { id: "#SR-0994", date: "Nov 03, 2025", status: "Pending", total: "$88.00", items: "Chrome Logo Longsleeve" }
];

const demoAddresses: Addresses = {
  billing: {
    name: "Alex Rider",
    line1: "188 Neon District Ave",
    line2: "Unit 06",
    city: "Los Angeles",
    state: "CA",
    postcode: "90015",
    country: "United States"
  },
  shipping: {
    name: "Alex Rider",
    line1: "44 Cyan Boulevard",
    line2: "Suite 12",
    city: "Brooklyn",
    state: "NY",
    postcode: "11201",
    country: "United States"
  }
};

function StatusPill({ status }: { status: string }) {
  const className = `status-pill status-${status.toLowerCase()}`;
  return <span className={className}>{status}</span>;
}

interface SidebarProps {
  active: string;
  setActive: (id: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

function Sidebar({ active, setActive, collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const handleNav = (id: string) => {
    setActive(id);
    setMobileOpen(false);
  };

  return (
    <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`} aria-label="Account navigation">
      <div className="brand-row">
        <Link href="/" className="brand hover:opacity-90 transition">
          <div className="brand-mark">{icons.bolt}</div>
          <div className="brand-copy">
            <h1 className="brand-title">Street<br />Revolution</h1>
            <p className="brand-subtitle">My Account</p>
          </div>
        </Link>

        <button className="icon-button desktop-collapse" type="button" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
          {icons.collapse}
        </button>

        <button className="icon-button mobile-menu-btn" type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          {icons.close}
        </button>
      </div>

      <nav>
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`nav-button ${active === item.id ? "active" : ""}`}
                onClick={() => handleNav(item.id)}
                aria-current={active === item.id ? "page" : undefined}
              >
                {item.icon}
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-content">
          <strong>Revolution Status</strong>
          <p>Members receive early access to limited drops, private restocks, and street-coded rewards.</p>
        </div>
      </div>
    </aside>
  );
}

interface TopbarProps {
  customer: User;
  activeLabel: string;
  setMobileOpen: (open: boolean) => void;
  onLogout: () => void;
}

function Topbar({ customer, activeLabel, setMobileOpen, onLogout }: TopbarProps) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu-btn" type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
        {icons.menu}
      </button>

      <div>
        <p className="eyebrow">Account Console</p>
        <h2 className="page-title">
          {activeLabel === "Account Details" ? "Account" : activeLabel} <span className="gradient-text">Hub</span>
        </h2>
      </div>

      <div className="topbar-actions">
        <div className="user-chip">
          <div className="avatar">{customer.avatarInitials}</div>
          <div>
            <strong>{customer.displayName}</strong>
            <span>{customer.email}</span>
          </div>
        </div>
        <Link href="/" className="btn btn-primary">
          Shop New Drop
        </Link>
        <button className="btn btn-danger" type="button" onClick={onLogout}>
          Sign Out
        </button>
      </div>
    </header>
  );
}

interface DashboardHomeProps {
  customer: User;
  orders: Order[];
}

function DashboardHome({ customer, orders }: DashboardHomeProps) {
  const totalSpend = "$767.50";
  const latestOrder = orders[0] || { status: "N/A" };

  return (
    <div className="content-grid">
      <div className="card stat-card span-3">
        <div className="stat-icon">{icons.orders}</div>
        <div>
          <h3 className="stat-value">{orders.length}</h3>
          <p className="stat-label">Total Orders</p>
        </div>
      </div>

      <div className="card stat-card span-3">
        <div className="stat-icon purple">{icons.card}</div>
        <div>
          <h3 className="stat-value">{totalSpend}</h3>
          <p className="stat-label">Lifetime Spend</p>
        </div>
      </div>

      <div className="card stat-card span-3">
        <div className="stat-icon">{icons.spark}</div>
        <div>
          <h3 className="stat-value">VIP</h3>
          <p className="stat-label">Member Tier</p>
        </div>
      </div>

      <div className="card stat-card span-3">
        <div className="stat-icon purple">{icons.package}</div>
        <div>
          <h3 className="stat-value">{latestOrder.status}</h3>
          <p className="stat-label">Latest Order</p>
        </div>
      </div>

      <section className="card card-padding span-7">
        <div className="section-head">
          <div>
            <h3 className="section-title">Recent Activity</h3>
            <p className="section-subtitle">Your latest Street Revolution order and profile events.</p>
          </div>
        </div>

        <ul className="activity-list">
          {orders.slice(0, 3).map((order) => (
            <li className="activity-item" key={order.id}>
              <div className="activity-dot">{icons.package}</div>
              <div>
                <strong>{order.id} — {order.items}</strong>
                <span>{order.date} · {order.total}</span>
              </div>
              <StatusPill status={order.status} />
            </li>
          ))}
        </ul>
      </section>

      <section className="card card-padding span-5">
        <div className="section-head">
          <div>
            <h3 className="section-title">Profile Signal</h3>
            <p className="section-subtitle">Keep your account details current for faster checkout and exclusive access.</p>
          </div>
        </div>

        <div className="notice">
          {icons.info}
          <div>
            <strong>Member since {customer.memberSince}</strong>
            <br />
            Your profile is ready for early-access launches. Add SMS updates to receive drop alerts first.
          </div>
        </div>

        <div style={{ height: 16 }} />

        <button className="btn btn-primary" type="button" style={{ width: "100%" }}>Enable Drop Alerts</button>
      </section>
    </div>
  );
}

function OrdersView({ orders }: { orders: Order[] }) {
  const { showNotification } = useNotification();
  return (
    <section className="card card-padding">
      <div className="section-head">
        <div>
          <h3 className="section-title">Order History</h3>
          <p className="section-subtitle">Minimal, high-contrast WooCommerce order data ready for WPGraphQL.</p>
        </div>
        <button 
          className="btn" 
          type="button"
          onClick={() => showNotification("CSV download started!")}
        >
          Download CSV
        </button>
      </div>

      {orders.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Status</th>
                <th>Items</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td><span className="order-id">{order.id}</span></td>
                  <td>{order.date}</td>
                  <td><StatusPill status={order.status} /></td>
                  <td>{order.items}</td>
                  <td>{order.total}</td>
                  <td>
                    <button 
                      className="link-action" 
                      type="button"
                      onClick={() => showNotification(`Viewing details for ${order.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">{icons.orders}</div>
          <h3>No orders yet</h3>
          <p>Your order history will appear here after your first Street Revolution checkout.</p>
          <Link href="/" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      )}
    </section>
  );
}

interface AddressesViewProps {
  addresses: Addresses;
}

function AddressesView({ addresses: initialAddresses }: AddressesViewProps) {
  const { showNotification } = useNotification();
  const [addresses, setAddresses] = useState<Addresses>(initialAddresses);
  
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Rider",
    street: "44 Cyan Boulevard",
    city: "Brooklyn",
    state: "NY",
    postcode: "11201",
    country: "United States"
  });

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setAddresses(prev => ({
      ...prev,
      shipping: {
        name: `${formData.firstName} ${formData.lastName}`,
        line1: formData.street,
        line2: "Suite 12",
        city: formData.city,
        state: formData.state,
        postcode: formData.postcode,
        country: formData.country
      }
    }));
    showNotification("Shipping address updated successfully!");
  };

  return (
    <div className="content-grid">
      <section className="card card-padding span-12">
        <div className="section-head">
          <div>
            <h3 className="section-title">Saved Addresses</h3>
            <p className="section-subtitle">Use these cards for billing and shipping nodes from WooCommerce customer data.</p>
          </div>
        </div>

        <div className="address-grid">
          {Object.entries(addresses).map(([type, address]) => (
            <div className="address-card" key={type}>
              <div className="address-card-header">
                <h4 className="address-type">{type} Address</h4>
                <button 
                  className="link-action" 
                  type="button"
                  onClick={() => showNotification(`Editing ${type} address...`)}
                >
                  Edit
                </button>
              </div>
              <address>
                <strong style={{ color: "var(--text)" }}>{address.name}</strong><br />
                {address.line1}<br />
                {address.line2 && <>{address.line2}<br /></>}
                {address.city}, {address.state} {address.postcode}<br />
                {address.country}
              </address>
            </div>
          ))}
        </div>
      </section>

      <section className="card card-padding span-12">
        <div className="section-head">
          <div>
            <h3 className="section-title">Update Shipping Address</h3>
            <p className="section-subtitle">Neon focus states match the Street Revolution newsletter/input system.</p>
          </div>
        </div>

        <form className="form-grid" onSubmit={handleSaveAddress}>
          <div className="field">
            <label htmlFor="firstName">First Name</label>
            <input 
              className="input" 
              id="firstName" 
              value={formData.firstName} 
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="lastName">Last Name</label>
            <input 
              className="input" 
              id="lastName" 
              value={formData.lastName} 
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>
          <div className="field full">
            <label htmlFor="street">Street Address</label>
            <input 
              className="input" 
              id="street" 
              value={formData.street} 
              onChange={e => setFormData({ ...formData, street: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="city">City</label>
            <input 
              className="input" 
              id="city" 
              value={formData.city} 
              onChange={e => setFormData({ ...formData, city: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="state">State</label>
            <input 
              className="input" 
              id="state" 
              value={formData.state} 
              onChange={e => setFormData({ ...formData, state: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="postcode">Postcode</label>
            <input 
              className="input" 
              id="postcode" 
              value={formData.postcode} 
              onChange={e => setFormData({ ...formData, postcode: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="country">Country</label>
            <input 
              className="input" 
              id="country" 
              value={formData.country} 
              onChange={e => setFormData({ ...formData, country: e.target.value })}
              required
            />
          </div>
          <div className="field full">
            <button className="btn btn-primary" type="submit">Save Address</button>
          </div>
        </form>
      </section>
    </div>
  );
}

interface AccountDetailsViewProps {
  customer: User;
  onUpdate: (updated: Partial<User>) => void;
}

function AccountDetailsView({ customer, onUpdate }: AccountDetailsViewProps) {
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    displayName: customer.displayName,
    phone: customer.phone || "",
    email: customer.email,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      displayName: formData.displayName,
      phone: formData.phone,
      email: formData.email,
      avatarInitials: (formData.firstName.substring(0, 1) + formData.lastName.substring(0, 1)).toUpperCase()
    });
    showNotification("Account details updated successfully!");
  };

  return (
    <section className="card card-padding">
      <div className="section-head">
        <div>
          <h3 className="section-title">Account Details</h3>
          <p className="section-subtitle">Profile fields are structured for a WooCommerce customer update mutation.</p>
        </div>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="accountFirstName">First Name</label>
          <input 
            className="input" 
            id="accountFirstName" 
            value={formData.firstName} 
            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="accountLastName">Last Name</label>
          <input 
            className="input" 
            id="accountLastName" 
            value={formData.lastName} 
            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="displayName">Display Name</label>
          <input 
            className="input" 
            id="displayName" 
            value={formData.displayName} 
            onChange={e => setFormData({ ...formData, displayName: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input 
            className="input" 
            id="phone" 
            value={formData.phone} 
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="field full">
          <label htmlFor="email">Email Address</label>
          <input 
            className="input" 
            id="email" 
            type="email" 
            value={formData.email} 
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">New Password</label>
          <input className="input" id="password" type="password" placeholder="••••••••••••" />
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input className="input" id="confirmPassword" type="password" placeholder="••••••••••••" />
        </div>

        <div className="field full">
          <label htmlFor="notes">Style Preferences</label>
          <textarea className="textarea" id="notes" placeholder="Tell us your fit, size, and drop preferences..." />
        </div>

        <div className="field full">
          <button className="btn btn-primary" type="submit">Update Account</button>
        </div>
      </form>
    </section>
  );
}

export interface MyAccountDashboardProps {
  customer?: User;
  orders?: Order[];
  addresses?: Addresses;
}

export default function MyAccountDashboard({
  customer: propCustomer,
  orders = demoOrders,
  addresses = demoAddresses
}: MyAccountDashboardProps) {
  const { user, logout, updateUser } = useAuth();
  
  const currentCustomer = propCustomer || user || {
    firstName: "Alex",
    lastName: "Rider",
    displayName: "Alex Rider",
    email: "alex@streetrevolution.com",
    phone: "+1 (555) 014-9090",
    memberSince: "2023",
    avatarInitials: "AR",
  };

  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeLabel = useMemo(() => {
    return navItems.find((item) => item.id === active)?.label || "Dashboard";
  }, [active]);

  return (
    <div className="sr-page">
      <style dangerouslySetInnerHTML={{ __html: `
        .sr-page {
          --bg: #0a0a0a;
          --panel: rgba(18, 18, 24, 0.68);
          --panel-strong: rgba(12, 12, 18, 0.88);
          --line: rgba(255, 255, 255, 0.11);
          --line-strong: rgba(6, 182, 212, 0.35);
          --cyan: #06b6d4;
          --purple: #a855f7;
          --text: #f8fafc;
          --muted: #9ca3af;
          --muted-2: #64748b;
          --danger: #fb7185;
          --success: #22c55e;
          --warning: #f59e0b;
          --radius-xl: 28px;
          --radius-lg: 20px;
          --radius-md: 14px;
          --shadow-cyan: 0 0 28px rgba(6, 182, 212, 0.22);
          --shadow-purple: 0 0 32px rgba(168, 85, 247, 0.24);
          --font-head: 'Orbitron', system-ui, sans-serif;
          --font-body: 'Inter', system-ui, sans-serif;

          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 100vh;
          padding: 28px;
          background:
            radial-gradient(circle at 15% 12%, rgba(6, 182, 212, 0.22), transparent 34%),
            radial-gradient(circle at 82% 8%, rgba(168, 85, 247, 0.22), transparent 34%),
            radial-gradient(circle at 50% 90%, rgba(6, 182, 212, 0.11), transparent 38%),
            var(--bg);
          color: var(--text);
          font-family: var(--font-body);
        }

        .sr-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 46px 46px;
          mask-image: radial-gradient(circle at center, black, transparent 78%);
          opacity: 0.5;
          z-index: 0;
        }

        .sr-page::after {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(120deg, transparent 0%, rgba(6, 182, 212, 0.05) 45%, rgba(168, 85, 247, 0.05) 55%, transparent 100%);
          mix-blend-mode: screen;
          z-index: 0;
        }

        .sr-page button,
        .sr-page input,
        .sr-page select,
        .sr-page textarea {
          font: inherit;
        }

        .sr-page button {
          cursor: pointer;
        }

        .account-shell {
          width: min(1440px, 100%);
          margin: 0 auto;
          min-height: calc(100vh - 56px);
          display: grid;
          grid-template-columns: 292px minmax(0, 1fr);
          background: linear-gradient(145deg, rgba(16,16,22,0.76), rgba(10,10,10,0.62));
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-xl);
          overflow: hidden;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 28px 90px rgba(0, 0, 0, 0.55),
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 0 0 1px rgba(6, 182, 212, 0.06);
          position: relative;
          z-index: 1;
        }

        .account-shell.is-collapsed {
          grid-template-columns: 96px minmax(0, 1fr);
        }

        .sidebar {
          position: relative;
          padding: 24px 18px;
          border-right: 1px solid rgba(255, 255, 255, 0.10);
          background:
            linear-gradient(180deg, rgba(6, 182, 212, 0.10), transparent 22%),
            linear-gradient(0deg, rgba(168, 85, 247, 0.08), transparent 34%),
            rgba(9, 9, 13, 0.56);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: width 220ms ease, padding 220ms ease;
        }

        .brand-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 28px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          text-decoration: none;
          color: white;
        }

        .brand-mark {
          width: 45px;
          height: 45px;
          flex: 0 0 auto;
          border-radius: 15px;
          display: grid;
          place-items: center;
          background:
            linear-gradient(135deg, rgba(6, 182, 212, 0.24), rgba(168, 85, 247, 0.22)),
            rgba(255,255,255,0.04);
          border: 1px solid rgba(6, 182, 212, 0.42);
          box-shadow: var(--shadow-cyan);
        }

        .brand-mark svg {
          width: 26px;
          height: 26px;
          color: var(--cyan);
          filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.65));
        }

        .brand-copy {
          min-width: 0;
          transition: opacity 180ms ease, transform 180ms ease;
        }

        .brand-title {
          margin: 0;
          font-family: var(--font-head);
          font-size: 0.93rem;
          line-height: 1.05;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .brand-subtitle {
          margin: 4px 0 0;
          color: var(--muted);
          font-size: 0.76rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .icon-button {
          width: 42px;
          height: 42px;
          flex: 0 0 auto;
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--text);
          background: rgba(255,255,255,0.045);
          border-radius: 14px;
          display: grid;
          place-items: center;
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }

        .icon-button:hover {
          transform: translateY(-1px);
          border-color: rgba(6, 182, 212, 0.55);
          background: rgba(6, 182, 212, 0.08);
          box-shadow: var(--shadow-cyan);
        }

        .icon-button svg {
          width: 20px;
          height: 20px;
        }

        .mobile-menu-btn {
          display: none;
        }

        .nav-list {
          display: grid;
          gap: 10px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .nav-button {
          width: 100%;
          min-height: 54px;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 0 15px;
          border: 1px solid transparent;
          border-radius: 17px;
          color: var(--muted);
          background: transparent;
          text-align: left;
          transition: transform 180ms ease, color 180ms ease, background 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
          position: relative;
          overflow: hidden;
        }

        .nav-button::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          background: linear-gradient(90deg, rgba(6, 182, 212, 0.16), rgba(168, 85, 247, 0.12));
          transition: opacity 180ms ease;
        }

        .nav-button > * {
          position: relative;
          z-index: 1;
        }

        .nav-button svg {
          width: 22px;
          height: 22px;
          flex: 0 0 auto;
        }

        .nav-label {
          font-weight: 700;
          letter-spacing: -0.01em;
          transition: opacity 180ms ease, transform 180ms ease;
          white-space: nowrap;
        }

        .nav-button:hover {
          color: var(--text);
          transform: translateX(2px);
          border-color: rgba(168, 85, 247, 0.24);
          box-shadow: 0 0 24px rgba(168, 85, 247, 0.13);
        }

        .nav-button:hover::before {
          opacity: 1;
        }

        .nav-button.active {
          color: white;
          border-color: rgba(6, 182, 212, 0.46);
          background: rgba(6, 182, 212, 0.06);
          box-shadow:
            inset 0 0 18px rgba(6, 182, 212, 0.08),
            0 0 28px rgba(6, 182, 212, 0.12);
        }

        .nav-button.active::before {
          opacity: 1;
        }

        .sidebar-footer {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 22px;
          padding: 16px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          background: rgba(255,255,255,0.045);
          overflow: hidden;
          transition: opacity 180ms ease;
        }

        .sidebar-footer::before {
          content: "";
          position: absolute;
          inset: -40%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.20), transparent 55%);
          animation: pulseGlow 4.5s ease-in-out infinite;
        }

        .sidebar-footer-content {
          position: relative;
          z-index: 1;
        }

        .sidebar-footer p {
          margin: 0;
          color: var(--muted);
          font-size: 0.82rem;
          line-height: 1.45;
        }

        .sidebar-footer strong {
          display: block;
          color: var(--text);
          font-family: var(--font-head);
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }

        .is-collapsed .brand-copy,
        .is-collapsed .nav-label,
        .is-collapsed .sidebar-footer {
          opacity: 0;
          pointer-events: none;
          transform: translateX(-8px);
        }

        .is-collapsed .brand-row {
          justify-content: center;
        }

        .is-collapsed .brand {
          gap: 0;
        }

        .is-collapsed .desktop-collapse {
          position: absolute;
          right: 18px;
          bottom: 22px;
        }

        .is-collapsed .nav-button {
          justify-content: center;
          padding: 0;
        }

        .main {
          min-width: 0;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 18px;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 24px;
          background: rgba(255,255,255,0.045);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 8px;
          color: var(--cyan);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .eyebrow::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--cyan);
          box-shadow: 0 0 18px var(--cyan);
        }

        .page-title {
          margin: 0;
          font-family: var(--font-head);
          font-size: clamp(1.6rem, 3vw, 2.55rem);
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1.08;
        }

        .gradient-text {
          background: linear-gradient(90deg, #ffffff, var(--cyan), var(--purple));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .user-chip {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px 8px 8px;
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 999px;
          background: rgba(10,10,10,0.36);
        }

        .avatar {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-weight: 900;
          color: #020617;
          background: linear-gradient(135deg, var(--cyan), var(--purple));
          box-shadow: 0 0 22px rgba(6, 182, 212, 0.20);
        }

        .user-chip strong {
          display: block;
          font-size: 0.9rem;
        }

        .user-chip span {
          display: block;
          color: var(--muted);
          font-size: 0.78rem;
        }

        .btn {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          padding: 0 16px;
          color: var(--text);
          font-weight: 800;
          text-decoration: none;
          background: rgba(255,255,255,0.055);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          border-color: rgba(6, 182, 212, 0.40);
          box-shadow: var(--shadow-cyan);
        }

        .btn-primary {
          border-color: rgba(6, 182, 212, 0.55);
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.92), rgba(168, 85, 247, 0.92));
          color: white;
          box-shadow: 0 14px 40px rgba(6, 182, 212, 0.16);
        }

        .btn-primary:hover {
          box-shadow: 0 18px 46px rgba(168, 85, 247, 0.22), 0 0 26px rgba(6, 182, 212, 0.25);
        }

        .btn-danger {
          color: #ffe4e6;
          border-color: rgba(251, 113, 133, 0.28);
        }

        .btn-danger:hover {
          border-color: rgba(251, 113, 133, 0.55);
          box-shadow: 0 0 26px rgba(251, 113, 133, 0.18);
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 18px;
        }

        .card {
          position: relative;
          border: 1px solid rgba(255,255,255,0.105);
          border-radius: 24px;
          background: linear-gradient(145deg, rgba(255,255,255,0.062), rgba(255,255,255,0.026));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.055);
          overflow: hidden;
        }

        .card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(6, 182, 212, 0.12), transparent 32%),
            radial-gradient(circle at 90% 10%, rgba(168, 85, 247, 0.14), transparent 28%);
          opacity: 0.72;
        }

        .card > * {
          position: relative;
          z-index: 1;
        }

        .card-padding {
          padding: 22px;
        }

        .span-3 { grid-column: span 3; }
        .span-4 { grid-column: span 4; }
        .span-5 { grid-column: span 5; }
        .span-6 { grid-column: span 6; }
        .span-7 { grid-column: span 7; }
        .span-8 { grid-column: span 8; }
        .span-12 { grid-column: span 12; }

        .section-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .section-title {
          margin: 0;
          font-family: var(--font-head);
          font-size: 1rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        .section-subtitle {
          margin: 7px 0 0;
          color: var(--muted);
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .stat-card {
          padding: 20px;
          min-height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(6, 182, 212, 0.28);
          box-shadow: var(--shadow-cyan);
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          border: 1px solid rgba(6, 182, 212, 0.32);
          background: rgba(6, 182, 212, 0.08);
          color: var(--cyan);
        }

        .stat-icon.purple {
          color: var(--purple);
          border-color: rgba(168, 85, 247, 0.34);
          background: rgba(168, 85, 247, 0.09);
        }

        .stat-icon svg {
          width: 22px;
          height: 22px;
        }

        .stat-value {
          margin: 16px 0 2px;
          font-family: var(--font-head);
          font-size: 1.7rem;
          letter-spacing: 0.02em;
        }

        .stat-label {
          margin: 0;
          color: var(--muted);
          font-size: 0.9rem;
        }

        .activity-list {
          display: grid;
          gap: 12px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .activity-item {
          display: grid;
          grid-template-columns: 40px 1fr auto;
          gap: 13px;
          align-items: center;
          padding: 13px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 17px;
          background: rgba(10,10,10,0.28);
        }

        .activity-dot {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: rgba(6, 182, 212, 0.09);
          color: var(--cyan);
          border: 1px solid rgba(6, 182, 212, 0.26);
        }

        .activity-item strong {
          display: block;
          font-size: 0.93rem;
          margin-bottom: 2px;
        }

        .activity-item span {
          color: var(--muted);
          font-size: 0.82rem;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 30px;
          padding: 0 10px;
          border-radius: 999px;
          font-size: 0.77rem;
          font-weight: 900;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          white-space: nowrap;
          border: 1px solid rgba(255,255,255,0.11);
          background: rgba(255,255,255,0.055);
        }

        .status-pill::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: currentColor;
          box-shadow: 0 0 12px currentColor;
        }

        .status-completed {
          color: var(--success);
          border-color: rgba(34, 197, 94, 0.28);
          background: rgba(34, 197, 94, 0.08);
        }

        .status-processing {
          color: var(--cyan);
          border-color: rgba(6, 182, 212, 0.28);
          background: rgba(6, 182, 212, 0.08);
        }

        .status-pending {
          color: var(--warning);
          border-color: rgba(245, 158, 11, 0.28);
          background: rgba(245, 158, 11, 0.08);
        }

        .table-wrap {
          width: 100%;
          overflow-x: auto;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          background: rgba(10,10,10,0.25);
        }

        .sr-page table {
          width: 100%;
          border-collapse: collapse;
          min-width: 760px;
          font-family: var(--font-body);
        }

        .sr-page th,
        .sr-page td {
          padding: 16px 18px;
          text-align: left;
          border-bottom: 1px solid rgba(255,255,255,0.075);
          white-space: nowrap;
        }

        .sr-page th {
          color: var(--muted);
          font-size: 0.74rem;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          font-weight: 900;
          background: rgba(255,255,255,0.035);
        }

        .sr-page td {
          color: rgba(248,250,252,0.92);
          font-size: 0.92rem;
          font-weight: 600;
        }

        .sr-page tbody tr {
          transition: background 180ms ease, box-shadow 180ms ease, transform 180ms ease;
        }

        .sr-page tbody tr:last-child td {
          border-bottom: none;
        }

        .sr-page tbody tr:hover {
          background: rgba(168, 85, 247, 0.075);
          box-shadow: inset 3px 0 0 rgba(168, 85, 247, 0.75), 0 0 28px rgba(168, 85, 247, 0.12);
        }

        .order-id {
          color: var(--cyan);
          font-weight: 900;
        }

        .link-action {
          border: none;
          background: transparent;
          color: var(--cyan);
          font-weight: 900;
          padding: 0;
          transition: color 180ms ease, text-shadow 180ms ease;
        }

        .link-action:hover {
          color: white;
          text-shadow: 0 0 16px rgba(6, 182, 212, 0.72);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .field {
          display: grid;
          gap: 8px;
        }

        .field.full {
          grid-column: 1 / -1;
        }

        .sr-page label {
          color: rgba(248,250,252,0.82);
          font-size: 0.82rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .input,
        .select,
        .textarea {
          width: 100%;
          min-height: 50px;
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 15px;
          padding: 0 15px;
          color: var(--text);
          background: rgba(5, 5, 8, 0.58);
          outline: none;
          transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }

        .textarea {
          min-height: 104px;
          padding-top: 14px;
          resize: vertical;
        }

        .input::placeholder,
        .textarea::placeholder {
          color: rgba(156, 163, 175, 0.72);
        }

        .input:focus,
        .select:focus,
        .textarea:focus {
          border-color: var(--cyan);
          box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.10), 0 0 24px rgba(6, 182, 212, 0.18);
          background: rgba(5, 5, 8, 0.78);
        }

        .address-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .address-card {
          padding: 18px;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          background: rgba(10,10,10,0.28);
        }

        .address-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 14px;
        }

        .address-type {
          margin: 0;
          font-family: var(--font-head);
          font-size: 0.86rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .sr-page address {
          color: var(--muted);
          font-style: normal;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .empty-state {
          display: grid;
          place-items: center;
          text-align: center;
          min-height: 300px;
          padding: 28px;
        }

        .empty-icon {
          width: 74px;
          height: 74px;
          border-radius: 24px;
          display: grid;
          place-items: center;
          margin-bottom: 18px;
          color: var(--cyan);
          border: 1px solid rgba(6, 182, 212, 0.32);
          background: rgba(6, 182, 212, 0.08);
          box-shadow: var(--shadow-cyan);
        }

        .empty-icon svg {
          width: 34px;
          height: 34px;
        }

        .empty-state h3 {
          margin: 0 0 8px;
          font-family: var(--font-head);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .empty-state p {
          max-width: 520px;
          margin: 0 0 18px;
          color: var(--muted);
          line-height: 1.6;
        }

        .notice {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          padding: 15px;
          border-radius: 18px;
          border: 1px solid rgba(6, 182, 212, 0.26);
          background: rgba(6, 182, 212, 0.07);
          color: rgba(248,250,252,0.9);
          line-height: 1.5;
        }

        .notice svg {
          width: 20px;
          height: 20px;
          color: var(--cyan);
          flex: 0 0 auto;
          margin-top: 1px;
        }

        .overlay {
          display: none;
        }

        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.45;
          }
        }

        @media (max-width: 1180px) {
          .span-3,
          .span-4 {
            grid-column: span 6;
          }

          .span-5,
          .span-6,
          .span-7,
          .span-8 {
            grid-column: span 12;
          }
        }

        @media (max-width: 920px) {
          .sr-page {
            padding: 14px;
          }

          .account-shell,
          .account-shell.is-collapsed {
            display: block;
            min-height: calc(100vh - 28px);
          }

          .sidebar {
            position: fixed;
            z-index: 30;
            top: 14px;
            bottom: 14px;
            left: 14px;
            width: min(318px, calc(100vw - 28px));
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 24px;
            transform: translateX(calc(-100% - 22px));
            transition: transform 220ms ease;
            box-shadow: 0 30px 90px rgba(0,0,0,0.62), var(--shadow-purple);
          }

          .sidebar.mobile-open {
            transform: translateX(0);
          }

          .brand-copy,
          .nav-label,
          .sidebar-footer {
            opacity: 1 !important;
            pointer-events: auto !important;
            transform: none !important;
          }

          .nav-button {
            justify-content: flex-start !important;
            padding: 0 15px !important;
          }

          .desktop-collapse {
            display: none;
          }

          .mobile-menu-btn {
            display: grid;
          }

          .overlay {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 20;
            background: rgba(0,0,0,0.58);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 200ms ease;
          }

          .overlay.show {
            opacity: 1;
            pointer-events: auto;
          }

          .main {
            padding: 16px;
          }

          .topbar {
            align-items: flex-start;
          }

          .topbar-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .user-chip {
            border-radius: 18px;
          }
        }

        @media (max-width: 680px) {
          .main {
            padding: 12px;
            gap: 16px;
          }

          .topbar {
            padding: 15px;
            border-radius: 20px;
          }

          .topbar {
            flex-direction: column;
          }

          .topbar-actions,
          .btn {
            width: 100%;
          }

          .user-chip {
            width: 100%;
          }

          .span-3,
          .span-4,
          .span-5,
          .span-6,
          .span-7,
          .span-8,
          .span-12 {
            grid-column: span 12;
          }

          .content-grid,
          .form-grid,
          .address-grid {
            grid-template-columns: 1fr;
          }

          .field.full {
            grid-column: auto;
          }

          .card-padding {
            padding: 17px;
          }

          .section-head {
            flex-direction: column;
          }

          .activity-item {
            grid-template-columns: 40px 1fr;
          }

          .activity-item .status-pill {
            grid-column: 1 / -1;
            justify-self: start;
          }

          .sr-page th,
          .sr-page td {
            padding: 14px;
          }
        }
      `}} />

      <div className={`overlay ${mobileOpen ? "show" : ""}`} onClick={() => setMobileOpen(false)} />

      <div className={`account-shell ${collapsed ? "is-collapsed" : ""}`}>
        <Sidebar
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <main className="main">
          <Topbar 
            customer={currentCustomer} 
            activeLabel={activeLabel} 
            setMobileOpen={setMobileOpen} 
            onLogout={logout}
          />

          {active === "dashboard" && <DashboardHome customer={currentCustomer} orders={orders} />}
          {active === "orders" && <OrdersView orders={orders} />}
          {active === "addresses" && <AddressesView addresses={addresses} />}
          {active === "account" && <AccountDetailsView customer={currentCustomer} onUpdate={updateUser} />}
        </main>
      </div>
    </div>
  );
}
