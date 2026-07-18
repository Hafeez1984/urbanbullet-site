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

  // Address form fields
  const [formFields, setFormFields] = useState<AddressDetail>({
    id: '',
    type: 'shipping',
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    country: '',
  });

  const startAdding = () => {
    setEditingId('new');
    setFormFields({
      id: '',
      type: 'shipping',
      name: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postcode: '',
      phone: '',
      country: '',
    });
  };

  const startEditing = (address: AddressDetail) => {
    setEditingId(address.id);
    setFormFields(address);
  };

  const handleDelete = (id: string) => {
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    let updatedList: AddressDetail[];
    if (editingId === 'new') {
      const newAddress: AddressDetail = {
        ...formFields,
        id: `addr_${Date.now()}`,
      };
      updatedList = [...addressList, newAddress];
    } else {
      updatedList = addressList.map((a) => (a.id === editingId ? formFields : a));
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

    showNotification(
      editingId === 'new' ? 'New address record created successfully.' : 'Address record updated successfully.'
    );
    setEditingId(null);
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
              <label htmlFor="addressType">Address Destination Type</label>
              <select
                className="input select-input"
                id="addressType"
                value={formFields.type}
                onChange={(e) => setFormFields({ ...formFields, type: e.target.value as 'billing' | 'shipping' })}
                style={{ background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                required
              >
                <option value="shipping">Shipping Address</option>
                <option value="billing">Billing Address</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="fullName">Full Name</label>
              <input
                className="input"
                id="fullName"
                value={formFields.name}
                onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="country">Country</label>
              <input
                className="input"
                id="country"
                value={formFields.country}
                onChange={(e) => setFormFields({ ...formFields, country: e.target.value })}
                required
              />
            </div>
            <div className="field full">
              <label htmlFor="street">Street Address</label>
              <input
                className="input"
                id="street"
                value={formFields.line1}
                onChange={(e) => setFormFields({ ...formFields, line1: e.target.value })}
                required
              />
            </div>
            <div className="field full">
              <label htmlFor="suite">Apartment, suite, unit, etc. (optional)</label>
              <input
                className="input"
                id="suite"
                value={formFields.line2}
                onChange={(e) => setFormFields({ ...formFields, line2: e.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <input
                className="input"
                id="city"
                value={formFields.city}
                onChange={(e) => setFormFields({ ...formFields, city: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="state">State / Province</label>
              <input
                className="input"
                id="state"
                value={formFields.state}
                onChange={(e) => setFormFields({ ...formFields, state: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="postcode">Postcode / Zip</label>
              <input
                className="input"
                id="postcode"
                value={formFields.postcode}
                onChange={(e) => setFormFields({ ...formFields, postcode: e.target.value })}
                required
              />
            </div>
            
            {/* Schema Update: Contact Phone Number input field styled side-by-side with postcode */}
            <div className="field">
              <label htmlFor="contactPhone">Contact Phone Number</label>
              <input
                className="input"
                id="contactPhone"
                type="tel"
                value={formFields.phone}
                onChange={(e) => setFormFields({ ...formFields, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>

            <div className="field full flex gap-3 mt-4">
              <button className="btn btn-primary" type="submit">
                Save Address Protocol
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => setEditingId(null)}
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
