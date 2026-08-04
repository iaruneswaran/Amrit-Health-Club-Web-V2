import React, { useState } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import editIcon from '../assets/Profile edit.svg';
import profileHeaderImg from '../assets/Profile Header.jpg';

export default function EditProfilePage({ profile, onBack, onSave }) {
  const [form, setForm] = useState({
    name: profile?.label || 'Ryan Gosling',
    email: 'ryan.gosling@email.com',
    dob: '12/11/1988',
    gender: 'Male',
    bloodGroup: 'B+',
    emergencyContact: '+91 9000012345',
    emergencyName: 'Emily Gosling',
  });
  const [saved, setSaved] = useState(false);

  const field = (key, label, type = 'text', options = null, placeholder = '') => (
    <div key={key}>
      <label style={{ fontSize: '13px', color: '#555555', fontWeight: '500', display: 'block', marginBottom: '6px' }}>{label}</label>
      {options ? (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {options.map(opt => (
            <button key={opt} onClick={() => setForm(f => ({ ...f, [key]: opt }))}
              style={{ flex: 1, background: form[key] === opt ? '#CCA266' : '#F2F4F7', color: form[key] === opt ? '#FFFFFF' : '#000000', border: 'none', borderRadius: '100px', padding: '10px 14px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', minWidth: '60px' }}>
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <input
          type={type}
          value={form[key]}
          placeholder={placeholder}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          style={{ width: '100%', background: '#F2F4F7', border: '1.5px solid #E5E7EB', borderRadius: '12px', padding: '12px 14px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
        />
      )}
    </div>
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); if (onSave) onSave(form); onBack(); }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F2F4F7' }}>
      {/* Header */}
      <div style={{ background: 'transparent', padding: '20px 12px 16px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'transform 0.2s ease' }}>
          <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
        </button>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '500', color: '#000000' }}>Edit Profile</h1>
      </div>

      {/* Avatar block */}
      <div style={{ background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px 20px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: '76px', height: '76px', borderRadius: '50%', background: '#CCA266', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '700', color: '#FFFFFF', letterSpacing: '1px' }}>
            {form.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <button style={{ position: 'absolute', bottom: 0, right: 0, width: '26px', height: '26px', background: '#FFFFFF', border: '2px solid #CCA266', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
            <img src={editIcon} alt="Edit" style={{ width: '12px', height: '12px' }} />
          </button>
        </div>
        <p style={{ margin: '10px 0 0', fontSize: '16px', fontWeight: '700', color: '#000000' }}>{form.name}</p>
      </div>

      <div style={{ padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Personal Info */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#000000' }}>Personal information</h2>
          {field('name', 'Full Name')}
          {field('dob', 'Date of Birth', 'text', null, 'DD/MM/YYYY')}
          {field('gender', 'Gender', 'text', ['Male', 'Female', 'Other'])}
          {field('bloodGroup', 'Blood Group', 'text', ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'])}
        </div>

        {/* Emergency Contact */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#000000' }}>Emergency contact</h2>
          {field('emergencyName', 'Contact Name')}
          {field('emergencyContact', 'Contact Number', 'tel')}
        </div>

        {/* Save */}
        <button onClick={handleSave}
          style={{ background: saved ? '#2E7D32' : '#CCA266', color: '#FFFFFF', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%', transition: 'background 0.3s' }}>
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
