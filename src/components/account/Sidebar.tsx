'use client';

import React from 'react';
import Link from 'next/link';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  active: string;
  setActive: (id: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  navItems: NavItem[];
  icons: {
    bolt: React.ReactNode;
    collapse: React.ReactNode;
    close: React.ReactNode;
  };
}

export default function Sidebar({
  active,
  setActive,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  navItems,
  icons,
}: SidebarProps) {
  const handleNav = (id: string) => {
    setActive(id);
    setMobileOpen(false);
  };

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`} aria-label="Account navigation">
      <div className="brand-row">
        <Link href="/" className="brand hover:opacity-90 transition">
          <div className="brand-mark">{icons.bolt}</div>
          <div className="brand-copy">
            <h1 className="brand-title">
              Street
              <br />
              Revolution
            </h1>
            <p className="brand-subtitle">My Account</p>
          </div>
        </Link>

        <button
          className="icon-button desktop-collapse"
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {icons.collapse}
        </button>

        <button
          className="icon-button mobile-menu-btn"
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          {icons.close}
        </button>
      </div>

      <nav>
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`nav-button ${active === item.id ? 'active' : ''}`}
                onClick={() => handleNav(item.id)}
                aria-current={active === item.id ? 'page' : undefined}
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
