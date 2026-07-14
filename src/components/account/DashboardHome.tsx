'use client';

import React from 'react';
import { User } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';

interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
  items: string;
}

interface DashboardHomeProps {
  customer: User;
  orders: Order[];
  icons: {
    orders: React.ReactNode;
    card: React.ReactNode;
    spark: React.ReactNode;
    package: React.ReactNode;
    info: React.ReactNode;
  };
}

function StatusPill({ status }: { status: string }) {
  const className = `status-pill status-${status.toLowerCase()}`;
  return <span className={className}>{status}</span>;
}

export default function DashboardHome({
  customer,
  orders,
  icons,
}: DashboardHomeProps) {
  const { showNotification } = useNotification();
  const totalSpend = '$767.50';
  const latestOrder = orders[0] || { status: 'N/A' };

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
            <p className="section-subtitle">Your latest order and profile events.</p>
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
            <strong>Member since {customer.memberSince || '2023'}</strong>
            <br />
            Your profile is ready for early-access launches. Add SMS updates to receive drop alerts first.
          </div>
        </div>

        <div style={{ height: 16 }} />

        <button
          className="btn btn-primary"
          type="button"
          style={{ width: '100%' }}
          onClick={() => showNotification('SMS alert registration system initialized.')}
        >
          Enable Drop Alerts
        </button>
      </section>
    </div>
  );
}
