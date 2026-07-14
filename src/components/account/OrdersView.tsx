'use client';

import React from 'react';
import { useNotification } from '@/context/NotificationContext';

interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
  items: string;
}

interface OrdersViewProps {
  orders: Order[];
  icons: {
    orders: React.ReactNode;
  };
}

function StatusPill({ status }: { status: string }) {
  const className = `status-pill status-${status.toLowerCase()}`;
  return <span className={className}>{status}</span>;
}

export default function OrdersView({ orders, icons }: OrdersViewProps) {
  const { showNotification } = useNotification();

  const handleDownloadCSV = () => {
    showNotification('Preparing CSV export of transaction logs...');
  };

  return (
    <section className="card card-padding">
      <div className="section-head">
        <div>
          <h3 className="section-title">Order History</h3>
          <p className="section-subtitle">Minimal, high-contrast order history details.</p>
        </div>
        <button className="btn" type="button" onClick={handleDownloadCSV}>
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
                  <td>
                    <span className="order-id">{order.id}</span>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <StatusPill status={order.status} />
                  </td>
                  <td>{order.items}</td>
                  <td>{order.total}</td>
                  <td>
                    <button
                      className="link-action"
                      type="button"
                      onClick={() => showNotification(`Tracking status for order ${order.id}`)}
                    >
                      Track
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
          <p>Your order history will appear here after your first checkout.</p>
          <button className="btn btn-primary" type="button">
            Start Shopping
          </button>
        </div>
      )}
    </section>
  );
}
