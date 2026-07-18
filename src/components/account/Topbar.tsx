'use client';

import React from 'react';
import Link from 'next/link';
import { User } from '@/context/AuthContext';

interface TopbarProps {
  customer: User;
  activeLabel: string;
  setMobileOpen: (open: boolean) => void;
  onLogout: () => void;
  icons: {
    menu: React.ReactNode;
  };
}

export default function Topbar({
  customer,
  activeLabel,
  setMobileOpen,
  onLogout,
  icons,
}: TopbarProps) {
  return (
    <header className="topbar">
      <button
        className="icon-button mobile-menu-btn"
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        {icons.menu}
      </button>

      <div>
        <p className="eyebrow">
          {(activeLabel === 'Dashboard' || activeLabel === 'Cart') ? 'THIS ACCOUNT BELONGS TO' : 'Account Console'}
        </p>
        <h2 className="page-title text-3xl md:text-4xl">
          {(activeLabel === 'Dashboard' || activeLabel === 'Cart') ? (
            (() => {
              const fullName = customer?.displayName || (customer?.firstName && customer?.lastName ? `${customer.firstName} ${customer.lastName}` : '') || 'Member';
              const parts = fullName.trim().split(' ');
              if (parts.length > 1) {
                const first = parts.slice(0, -1).join(' ');
                const last = parts[parts.length - 1];
                return (
                  <>
                    {first} <span className="gradient-text">{last}</span>
                  </>
                );
              }
              return <span className="gradient-text">{fullName}</span>;
            })()
          ) : (
            <>
              {activeLabel === 'Account Details' ? 'Account' : activeLabel} <span className="gradient-text">Hub</span>
            </>
          )}
        </h2>
      </div>

      <div className="topbar-actions">
        <div className="user-chip">
          <div className="avatar">{customer?.avatarInitials || 'AR'}</div>
          <div>
            <strong>{customer?.displayName || (customer ? `${customer.firstName} ${customer.lastName}` : 'Member')}</strong>
            <span>{customer?.email || ''}</span>
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
