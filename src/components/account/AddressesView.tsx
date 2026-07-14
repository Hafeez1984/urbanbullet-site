'use client';

import React, { useState } from 'react';
import { useNotification } from '@/context/NotificationContext';

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

interface AddressesViewProps {
  addresses: Addresses;
  onUpdateAddresses?: (updated: Addresses) => void;
}

export default function AddressesView({
  addresses: initialAddresses,
  onUpdateAddresses,
}: AddressesViewProps) {
  const { showNotification } = useNotification();
  const [addresses, setAddresses] = useState<Addresses>(initialAddresses);
  const [editingType, setEditingType] = useState<'billing' | 'shipping' | null>(null);

  // Address form fields
  const [formFields, setFormFields] = useState<AddressDetail>({
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
  });

  const startEditing = (type: 'billing' | 'shipping') => {
    setEditingType(type);
    setFormFields(addresses[type]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingType) return;

    const updated = {
      ...addresses,
      [editingType]: formFields,
    };

    setAddresses(updated);
    if (onUpdateAddresses) {
      onUpdateAddresses(updated);
    }
    showNotification(`${editingType.charAt(0).toUpperCase() + editingType.slice(1)} address updated successfully.`);
    setEditingType(null);
  };

  return (
    <div className="content-grid">
      <section className="card card-padding span-12">
        <div className="section-head">
          <div>
            <h3 className="section-title">Saved Addresses</h3>
            <p className="section-subtitle">Use these cards to manage billing and shipping destinations.</p>
          </div>
        </div>

        <div className="address-grid">
          {(Object.keys(addresses) as Array<keyof Addresses>).map((type) => {
            const address = addresses[type];
            return (
              <div className="address-card" key={type}>
                <div className="address-card-header">
                  <h4 className="address-type">{type} Address</h4>
                  <button
                    className="link-action"
                    type="button"
                    onClick={() => startEditing(type)}
                  >
                    Edit
                  </button>
                </div>
                <address>
                  <strong style={{ color: 'var(--text)' }}>{address.name}</strong>
                  <br />
                  {address.line1}
                  <br />
                  {address.line2 && (
                    <>
                      {address.line2}
                      <br />
                    </>
                  )}
                  {address.city}, {address.state} {address.postcode}
                  <br />
                  {address.country}
                </address>
              </div>
            );
          })}
        </div>
      </section>

      {editingType && (
        <section className="card card-padding span-12">
          <div className="section-head">
            <div>
              <h3 className="section-title">Update {editingType.charAt(0).toUpperCase() + editingType.slice(1)} Address</h3>
              <p className="section-subtitle">Configure your shipping coordinates for rapid drops delivery.</p>
            </div>
          </div>

          <form className="form-grid" onSubmit={handleSave}>
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
            <div className="field full">
              <label htmlFor="postcode">Postcode / Zip</label>
              <input
                className="input"
                id="postcode"
                value={formFields.postcode}
                onChange={(e) => setFormFields({ ...formFields, postcode: e.target.value })}
                required
              />
            </div>
            <div className="field full flex gap-3">
              <button className="btn btn-primary" type="submit">
                Save Address
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => setEditingType(null)}
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
