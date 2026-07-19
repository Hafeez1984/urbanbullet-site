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
    <header className="topbar !flex-col md:!flex-row !items-stretch md:!items-center !gap-4 md:!gap-6 !p-4 md:!p-6 !mb-6">
      <div className="flex items-center justify-between w-full gap-4 md:w-auto">
        <button
          className="icon-button mobile-menu-btn !m-0 !p-0 mr-4"
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          {icons.menu}
        </button>

        <div className="text-right md:text-left flex-grow min-w-0">
          <p className="eyebrow !m-0 mb-1 hidden md:block">
            {(activeLabel === 'Dashboard' || activeLabel === 'Cart') ? 'THIS ACCOUNT BELONGS TO' : 'Account Console'}
          </p>
          <h2 className="page-title text-2xl sm:text-3xl md:text-4xl !m-0 truncate max-w-[150px] md:max-w-none ml-auto md:ml-0">
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
