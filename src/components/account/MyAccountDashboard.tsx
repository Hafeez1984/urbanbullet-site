'use client';

import React, { useMemo, useState } from 'react';
import { useAuth, User } from '@/context/AuthContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import DashboardHome from './DashboardHome';
import OrdersView from './OrdersView';
import AddressesView from './AddressesView';
import AccountDetailsView from './AccountDetailsView';
import './account.css';

export interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
  items: string;
}

export interface AddressDetail {
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface Addresses {
  billing: AddressDetail;
  shipping: AddressDetail;
}

const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
      <path d="M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7v-9h-7v9Zm0-16v5h7V4h-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
      <path d="M7 7.5V6a5 5 0 0 1 10 0v1.5M5.6 8h12.8l1 12H4.6l1-12Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  addresses: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
      <path d="M12 21s7-5.1 7-11.2A7 7 0 1 0 5 9.8C5 15.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M12 12.3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  account: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
      <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 12a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="26" height="26">
      <path d="m13 2-9 12h7l-1 8 10-13h-7l0-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="20" height="20">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
    </svg>
  ),
  collapse: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="20" height="20">
      <path d="M15 6 9 12l6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="20" height="20">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
    </svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
      <path d="M3.5 8.5h17M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M7 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  package: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
      <path d="m12 3 8 4.4v9.2L12 21l-8-4.4V7.4L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="m4.5 7.7 7.5 4.2 7.5-4.2M12 12v8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
      <path d="M12 2.5 14.2 9l6.8 1-4.9 4.7 1.2 6.8L12 18.3l-6.1 3.2 1.2-6.8L2.2 10 9 9l3-6.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="20" height="20">
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 10.5V17M12 7.2v.1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
};

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: icons.dashboard },
  { id: 'orders', label: 'Orders', icon: icons.orders },
  { id: 'addresses', label: 'Addresses', icon: icons.addresses },
  { id: 'account', label: 'Account Details', icon: icons.account }
];

export const demoCustomer: User = {
  firstName: 'Alex',
  lastName: 'Rider',
  displayName: 'Alex Rider',
  email: 'alex@streetrevolution.com',
  phone: '+1 (555) 014-9090',
  memberSince: '2023',
  avatarInitials: 'AR'
};

export const demoOrders: Order[] = [
  { id: '#SR-1049', date: 'Feb 18, 2026', status: 'Processing', total: '$248.00', items: 'Apex Carbon Tee, Neon Utility Cap' },
  { id: '#SR-1038', date: 'Jan 29, 2026', status: 'Completed', total: '$119.00', items: 'Revolution Hoodie' },
  { id: '#SR-1017', date: 'Dec 14, 2025', status: 'Completed', total: '$312.50', items: 'Night Run Jacket, Cargo Tech Pants' },
  { id: '#SR-0994', date: 'Nov 03, 2025', status: 'Pending', total: '$88.00', items: 'Chrome Logo Longsleeve' }
];

export const demoAddresses: Addresses = {
  billing: {
    name: 'Alex Rider',
    line1: '188 Neon District Ave',
    line2: 'Unit 06',
    city: 'Los Angeles',
    state: 'CA',
    postcode: '90015',
    country: 'United States'
  },
  shipping: {
    name: 'Alex Rider',
    line1: '44 Cyan Boulevard',
    line2: 'Suite 12',
    city: 'Brooklyn',
    state: 'NY',
    postcode: '11201',
    country: 'United States'
  }
};

export interface MyAccountDashboardProps {
  customer?: User;
  orders?: Order[];
  addresses?: Addresses;
}

export default function MyAccountDashboard({
  customer: propCustomer,
  orders: propOrders,
  addresses: propAddresses,
}: MyAccountDashboardProps) {
  const { user, logout, updateUser } = useAuth();
  const currentCustomer = propCustomer || user || demoCustomer;

  const isDemo = currentCustomer?.email?.toLowerCase() === 'alex@streetrevolution.com';

  const orders = useMemo(() => {
    if (propOrders) return propOrders;
    if (isDemo) return demoOrders;
    return [];
  }, [propOrders, isDemo]);

  const addresses = useMemo(() => {
    if (propAddresses) return propAddresses;
    if (isDemo) return demoAddresses;
    return {
      billing: { name: '', line1: '', line2: '', city: '', state: '', postcode: '', country: '' },
      shipping: { name: '', line1: '', line2: '', city: '', state: '', postcode: '', country: '' }
    };
  }, [propAddresses, isDemo]);

  const [active, setActive] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeLabel = useMemo(() => {
    return navItems.find((item) => item.id === active)?.label || 'Dashboard';
  }, [active]);

  return (
    <div className="sr-page">
      <div className={`overlay ${mobileOpen ? 'show' : ''}`} onClick={() => setMobileOpen(false)} />

      <div className={`account-shell ${collapsed ? 'is-collapsed' : ''}`}>
        <Sidebar
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          navItems={navItems}
          icons={icons}
        />

        <main className="main">
          <Topbar
            customer={currentCustomer}
            activeLabel={activeLabel}
            setMobileOpen={setMobileOpen}
            onLogout={logout}
            icons={icons}
          />

          {active === 'dashboard' && (
            <DashboardHome customer={currentCustomer} orders={orders} icons={icons} />
          )}
          {active === 'orders' && <OrdersView orders={orders} icons={icons} />}
          {active === 'addresses' && <AddressesView addresses={addresses} />}
          {active === 'account' && (
            <AccountDetailsView customer={currentCustomer} onUpdate={updateUser} />
          )}
        </main>
      </div>
    </div>
  );
}
