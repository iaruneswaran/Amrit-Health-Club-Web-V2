import React, { useState } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';

const STATES = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

const defaultAddresses = [
  { id: 1, tag: 'Home', line1: '42, 3rd Cross, Indira Nagar', city: 'Bangalore', state: 'Karnataka', pin: '560038', default: true },
  { id: 2, tag: 'Work', line1: '14, MG Road, Office Block B', city: 'Bangalore', state: 'Karnataka', pin: '560001', default: false },
];

const emptyForm = { tag: 'Home', line1: '', line2: '', city: '', state: 'Karnataka', pin: '' };

export default function AddressPage({ onBack }) {
  const [addresses, setAddresses] = useState(defaultAddresses);
  const [editing, setEditing] = useState(null); // null | 'new' | id
  const [form, setForm] = useState(emptyForm);

  const openNew = () => { setForm(emptyForm); setEditing('new'); };
  const openEdit = (addr) => { setForm({ tag: addr.tag, line1: addr.line1, line2: addr.line2 || '', city: addr.city, state: addr.state, pin: addr.pin }); setEditing(addr.id); };

  const handleSave = () => {
    if (!form.line1 || !form.city || !form.pin) return;
    if (editing === 'new') {
      setAddresses(prev => [...prev, { id: Date.now(), ...form, default: prev.length === 0 }]);
    } else {
      setAddresses(prev => prev.map(a => a.id === editing ? { ...a, ...form } : a));
    }
    setEditing(null);
  };

  const setDefault = (id) => setAddresses(prev => prev.map(a => ({ ...a, default: a.id === id })));
  const removeAddr = (id) => setAddresses(prev => prev.filter(a => a.id !== id));

  const tagColors = { Home: { bg: '#E8F5E9', text: '#2E7D32' }, Work: { bg: '#E3F2FD', text: '#1565C0' }, Other: { bg: '#F3E5F5', text: '#6A1B9A' } };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F2F4F7' }}>
      {/* Header */}
      <div style={{ background: 'transparent', padding: '20px 12px 16px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={editing ? () => setEditing(null) : onBack} style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'transform 0.2s ease' }}>
          <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
        </button>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '500', color: '#000000' }}>
          {editing ? (editing === 'new' ? 'Add Address' : 'Edit Address') : 'My Addresses'}
        </h1>
      </div>

      {!editing ? (
        <div style={{ padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {addresses.map(addr => {
            const tc = tagColors[addr.tag] || tagColors['Other'];
            return (
              <div key={addr.id} style={{ background: '#FFFFFF', borderRadius: '20px', padding: '18px', border: addr.default ? '1.5px solid #CCA266' : '1.5px solid transparent' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ background: tc.bg, color: tc.text, fontSize: '13px', fontWeight: '600', padding: '3px 10px', borderRadius: '100px' }}>{addr.tag}</span>
                  {addr.default && <span style={{ background: '#CCA266', color: '#FFFFFF', fontSize: '13px', fontWeight: '600', padding: '3px 10px', borderRadius: '100px' }}>Default</span>}
                </div>
                <p style={{ margin: 0, fontWeight: '500', fontSize: '14px', color: '#000000', lineHeight: '1.5' }}>
                  {addr.line1}<br />{addr.city}, {addr.state} – {addr.pin}
                </p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button onClick={() => openEdit(addr)} style={{ flex: 1, background: '#F2F4F7', color: '#000000', border: 'none', borderRadius: '100px', padding: '9px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Edit</button>
                  {!addr.default && (
                    <button onClick={() => setDefault(addr.id)} style={{ flex: 1, background: '#CCA266', color: '#FFFFFF', border: 'none', borderRadius: '100px', padding: '9px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Set Default</button>
                  )}
                  <button onClick={() => removeAddr(addr.id)} style={{ flex: 0, background: '#FFF5F5', color: '#E53935', border: '1px solid #FECDD3', borderRadius: '100px', padding: '9px 14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            );
          })}
          <button onClick={openNew} style={{ background: '#CCA266', color: '#FFFFFF', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%', marginTop: '4px' }}>
            + Add New Address
          </button>
        </div>
      ) : (
        <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Tag selector */}
          <div>
            <label style={{ fontSize: '13px', color: '#555555', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Tag</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Home', 'Work', 'Other'].map(tag => (
                <button key={tag} onClick={() => setForm(f => ({ ...f, tag }))}
                  style={{ flex: 1, background: form.tag === tag ? '#CCA266' : '#F2F4F7', color: form.tag === tag ? '#FFFFFF' : '#000000', border: 'none', borderRadius: '100px', padding: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {[
            { key: 'line1', label: 'Address Line 1', placeholder: 'Street, Area' },
            { key: 'line2', label: 'Address Line 2 (optional)', placeholder: 'Landmark, Apartment' },
            { key: 'city', label: 'City', placeholder: 'City' },
            { key: 'pin', label: 'PIN Code', placeholder: '6-digit PIN' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label style={{ fontSize: '13px', color: '#555555', fontWeight: '500', display: 'block', marginBottom: '6px' }}>{label}</label>
              <input
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                type={key === 'pin' ? 'tel' : 'text'}
                style={{ width: '100%', background: '#F2F4F7', border: '1.5px solid #E5E7EB', borderRadius: '12px', padding: '12px 14px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          ))}

          {/* State */}
          <div>
            <label style={{ fontSize: '13px', color: '#555555', fontWeight: '500', display: 'block', marginBottom: '6px' }}>State</label>
            <select value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
              style={{ width: '100%', background: '#F2F4F7', border: '1.5px solid #E5E7EB', borderRadius: '12px', padding: '12px 14px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', appearance: 'none' }}>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <button onClick={handleSave} style={{ background: '#CCA266', color: '#FFFFFF', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '4px' }}>
            Save Address
          </button>
          <button onClick={() => setEditing(null)} style={{ background: '#F2F4F7', color: '#000000', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
