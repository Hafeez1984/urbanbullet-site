'use client';

import React, { useState } from 'react';
import { useNotification } from '@/context/NotificationContext';

interface AddressDetail {
  id: string;
  type: 'billing' | 'shipping';
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  country: string;
}

interface Addresses {
  billing: {
    name: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone?: string;
  };
  shipping: {
    name: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone?: string;
  };
}

interface AddressesViewProps {
  addresses: Addresses;
  onUpdateAddresses?: (updated: Addresses) => void;
}

export default function AddressesView({
  addresses: initialAddresses,
  onUpdateAddresses,
}: AddressesViewProps) {
  const { showNotification } = useNotification();
  
  // Initialize multiple addresses list from initial object
  const [addressList, setAddressList] = useState<AddressDetail[]>(() => {
    const list: AddressDetail[] = [];
    if (initialAddresses?.billing && (initialAddresses.billing.line1 || initialAddresses.billing.name)) {
      list.push({
        id: 'billing_default',
        type: 'billing',
        name: initialAddresses.billing.name || '',
        line1: initialAddresses.billing.line1 || '',
        line2: initialAddresses.billing.line2 || '',
        city: initialAddresses.billing.city || '',
        state: initialAddresses.billing.state || '',
        postcode: initialAddresses.billing.postcode || '',
        phone: initialAddresses.billing.phone || '+1 (555) 014-9090',
        country: initialAddresses.billing.country || '',
      });
    }
    if (initialAddresses?.shipping && (initialAddresses.shipping.line1 || initialAddresses.shipping.name)) {
      list.push({
        id: 'shipping_default',
        type: 'shipping',
        name: initialAddresses.shipping.name || '',
        line1: initialAddresses.shipping.line1 || '',
        line2: initialAddresses.shipping.line2 || '',
        city: initialAddresses.shipping.city || '',
        state: initialAddresses.shipping.state || '',
        postcode: initialAddresses.shipping.postcode || '',
        phone: initialAddresses.shipping.phone || '+1 (555) 014-9090',
        country: initialAddresses.shipping.country || '',
      });
    }
    return list;
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [addressForm, setAddressForm] = useState({
    name: '',
    address: '',
    nearestLandmark: '',
    pin: '',
    email: '',
    contactNumber: '',
  });

  const startAdding = () => {
    setEditingId('new');
    setAddressForm({
      name: '',
      address: '',
      nearestLandmark: '',
      pin: '',
      email: '',
      contactNumber: '',
    });
  };

  const startEditing = (address: AddressDetail) => {
    setEditingId(address.id);
    setAddressForm({
      name: address.name || '',
      address: address.line1 || '',
      nearestLandmark: address.line2 || '',
      pin: address.postcode || '',
      email: '',
      contactNumber: address.phone || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this saved address?')) return;
    
    try {
      await fetch('/api/account/address', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Error deleting address:', err);
    }

    const updated = addressList.filter((a) => a.id !== id);
    setAddressList(updated);
    
    if (onUpdateAddresses) {
      const billingDefault = updated.find((a) => a.type === 'billing') || updated[0];
      const shippingDefault = updated.find((a) => a.type === 'shipping') || updated[0];
      onUpdateAddresses({
        billing: billingDefault || { name: '', line1: '', line2: '', city: '', state: '', postcode: '', country: '', phone: '' },
        shipping: shippingDefault || { name: '', line1: '', line2: '', city: '', state: '', postcode: '', country: '', phone: '' },
      });
    }
    showNotification('Address record deleted successfully.');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/account/address', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addressForm),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save address');
      }

      const newAddress: AddressDetail = {
        id: editingId === 'new' ? `addr_${Date.now()}` : editingId,
        type: 'shipping',
        name: addressForm.name,
        line1: addressForm.address,
        line2: addressForm.nearestLandmark,
        city: '',
        state: '',
        postcode: addressForm.pin,
        phone: addressForm.contactNumber,
        country: 'India',
      };

      let updatedList: AddressDetail[];
      if (editingId === 'new') {
        updatedList = [...addressList, newAddress];
      } else {
        updatedList = addressList.map((a) => (a.id === editingId ? newAddress : a));
      }

      setAddressList(updatedList);

      if (onUpdateAddresses) {
        const billingDefault = updatedList.find((a) => a.type === 'billing') || updatedList[0];
        const shippingDefault = updatedList.find((a) => a.type === 'shipping') || updatedList[0];
        onUpdateAddresses({
          billing: billingDefault || { name: '', line1: '', line2: '', city: '', state: '', postcode: '', country: '', phone: '' },
          shipping: shippingDefault || { name: '', line1: '', line2: '', city: '', state: '', postcode: '', country: '', phone: '' },
        });
      }

      showNotification('Address saved successfully.');
      setEditingId(null);
    } catch (err: any) {
      showNotification(err.message || 'Error saving address.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="content-grid">
      <section className="card card-padding span-12">
        <div className="section-head flex justify-between items-center">
          <div>
            <h3 className="section-title">Saved Address Book</h3>
            <p className="section-subtitle">Manage billing and shipping coordinates for fast checkout.</p>
          </div>
          {!editingId && (
            <button className="btn btn-primary" type="button" onClick={startAdding}>
              + Add Address
            </button>
          )}
        </div>

        <div className="address-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {addressList.map((address) => (
            <div className="address-card" key={address.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'between' }}>
              <div className="address-card-header flex justify-between items-center mb-4">
                <span className={`status-pill status-${address.type}`} style={{ fontSize: '0.7rem', padding: '4px 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {address.type}
                </span>
                <div className="flex gap-3">
                  <button
                    className="link-action"
                    type="button"
                    onClick={() => startEditing(address)}
                  >
                    Edit
                  </button>
                  <button
                    className="link-action"
                    type="button"
                    style={{ color: 'var(--danger)' }}
                    onClick={() => handleDelete(address.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <address style={{ fontStyle: 'normal', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <strong style={{ color: 'var(--text)', fontSize: '1rem' }} className="block mb-1">{address.name}</strong>
                {address.line1}
                {address.line2 && `, ${address.line2}`}
                <br />
                {address.city}, {address.state} {address.postcode}
                <br />
                {address.country}
                <br />
                <span className="block mt-2 font-mono text-xs text-[var(--cyan)]">
                  Phone: {address.phone}
                </span>
              </address>
            </div>
          ))}
          {addressList.length === 0 && (
            <div className="span-12 empty-address-placeholder text-center py-8" style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
              No addresses configured. Click "+ Add Address" to build your roster.
            </div>
          )}
        </div>
      </section>

      {editingId && (
        <section className="card card-padding span-12">
          <div className="section-head">
            <div>
              <h3 className="section-title">
                {editingId === 'new' ? 'Register New Address Coordinates' : 'Modify Address Details'}
              </h3>
              <p className="section-subtitle">
                Configure your delivery endpoint protocols. Fields marked as mandatory are required.
              </p>
            </div>
          </div>

          <form className="form-grid" onSubmit={handleSave}>
            <div className="field">
              <label htmlFor="addressName">Name</label>
              <input
                className="input font-mono"
                id="addressName"
                value={addressForm.name}
                onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                placeholder="Recipient Full Name"
                required
              />
            </div>

            <div className="field full">
              <label htmlFor="addressLine">Address</label>
              <input
                className="input font-mono"
                id="addressLine"
                value={addressForm.address}
                onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                placeholder="Flat / House no., Building, Street address"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="nearestLandmark">Nearest Landmark</label>
              <input
                className="input font-mono"
                id="nearestLandmark"
                value={addressForm.nearestLandmark}
                onChange={(e) => setAddressForm({ ...addressForm, nearestLandmark: e.target.value })}
                placeholder="Nearby landmark (optional)"
              />
            </div>

            <div className="field">
              <label htmlFor="addressPin">PIN</label>
              <input
                className="input font-mono"
                id="addressPin"
                value={addressForm.pin}
                onChange={(e) => setAddressForm({ ...addressForm, pin: e.target.value })}
                placeholder="6-digit Postal PIN"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="addressEmail">E-mail ID</label>
              <input
                className="input font-mono"
                id="addressEmail"
                type="email"
                value={addressForm.email}
                onChange={(e) => setAddressForm({ ...addressForm, email: e.target.value })}
                placeholder="user@urbanbullet.co"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                className="input font-mono"
                id="contactNumber"
                type="tel"
                value={addressForm.contactNumber}
                onChange={(e) => setAddressForm({ ...addressForm, contactNumber: e.target.value })}
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <div className="field full flex gap-3 mt-4">
              <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Address'}
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => setEditingId(null)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
