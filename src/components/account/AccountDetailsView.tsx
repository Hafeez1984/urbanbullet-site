'use client';

import React, { useState } from 'react';
import { User } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';

interface AccountDetailsViewProps {
  customer: User;
  onUpdate: (updated: Partial<User>) => void;
}

export default function AccountDetailsView({
  customer,
  onUpdate,
}: AccountDetailsViewProps) {
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    firstName: customer.firstName || '',
    lastName: customer.lastName || '',
    displayName: customer.displayName || '',
    email: customer.email || '',
    phone: customer.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      showNotification('New passwords do not match.');
      return;
    }

    onUpdate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      displayName: formData.displayName,
      email: formData.email,
      phone: formData.phone,
    });

    showNotification('Account details updated successfully.');
  };

  return (
    <section className="card card-padding">
      <div className="section-head">
        <div>
          <h3 className="section-title">Account Details</h3>
          <p className="section-subtitle">Profile fields for identity validation and preferences.</p>
        </div>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="accountFirstName">First Name</label>
          <input
            className="input"
            id="accountFirstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="accountLastName">Last Name</label>
          <input
            className="input"
            id="accountLastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="displayName">Display Name</label>
          <input
            className="input"
            id="displayName"
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            className="input"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="field full">
          <label htmlFor="email">Email Address</label>
          <input
            className="input"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">New Password</label>
          <input
            className="input"
            id="password"
            type="password"
            placeholder="••••••••••••"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="input"
            id="confirmPassword"
            type="password"
            placeholder="••••••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </div>

        <div className="field full">
          <label htmlFor="notes">Style Preferences</label>
          <textarea
            className="textarea"
            id="notes"
            placeholder="Tell us your fit, size, and drop preferences..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <div className="field full">
          <button className="btn btn-primary" type="submit">
            Update Account
          </button>
        </div>
      </form>
    </section>
  );
}
