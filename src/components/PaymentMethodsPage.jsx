import React, { useState } from 'react';
import continueArrow from '../assets/Continue Arrow.svg';
import paymentIcon from '../assets/Payment Methods.svg';

export default function PaymentMethodsPage({ onBack }) {
  const [cards, setCards] = useState([
    { id: 1, type: 'Visa', last4: '4242', expiry: '08/27', primary: true },
    { id: 2, type: 'Mastercard', last4: '5555', expiry: '03/26', primary: false },
  ]);
  const [upi] = useState('ryan@upi');
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const setPrimary = (id) => {
    setCards(prev => prev.map(c => ({ ...c, primary: c.id === id })));
  };
  const removeCard = (id) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };
  const handleAddCard = () => {
    if (!newCard.number || !newCard.name) return;
    const last4 = newCard.number.replace(/\s/g, '').slice(-4);
    setCards(prev => [...prev, { id: Date.now(), type: 'Card', last4, expiry: newCard.expiry, primary: false }]);
    setNewCard({ number: '', name: '', expiry: '', cvv: '' });
    setShowAddCard(false);
  };

  return (
    <div className="doctors-page-container" style={{ minHeight: '100vh', backgroundColor: '#F2F4F7' }}>
      {/* Header */}
      <div style={{ background: 'transparent', padding: '20px 12px 16px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'transform 0.2s ease' }}>
          <img src={continueArrow} alt="Back" style={{ transform: 'rotate(180deg)', width: '16px', height: '14px' }} />
        </button>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '500', color: '#000000' }}>Payment Methods</h1>
      </div>

      <div style={{ padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Saved Cards */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#000000' }}>Saved Cards</h2>
          {cards.length === 0 && (
            <p style={{ margin: 0, color: '#555555', fontSize: '14px' }}>No saved cards.</p>
          )}
          {cards.map(card => (
            <div key={card.id} style={{ background: '#F2F4F7', borderRadius: '16px', padding: '16px', border: card.primary ? '1.5px solid #CCA266' : '1.5px solid transparent' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: '600', fontSize: '15px', color: '#000000' }}>{card.type} •••• {card.last4}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#555555' }}>Expires {card.expiry}</p>
                </div>
                {card.primary && (
                  <span style={{ background: '#CCA266', color: '#FFFFFF', fontSize: '13px', fontWeight: '600', padding: '4px 12px', borderRadius: '100px' }}>Primary</span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                {!card.primary && (
                  <button onClick={() => setPrimary(card.id)} style={{ flex: 1, background: '#CCA266', color: '#FFFFFF', border: 'none', borderRadius: '100px', padding: '9px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                    Set as Primary
                  </button>
                )}
                <button onClick={() => removeCard(card.id)} style={{ flex: card.primary ? 1 : 0, background: '#F9FAFB', color: '#E53935', border: '1px solid #FECDD3', borderRadius: '100px', padding: '9px 14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* UPI */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px' }}>
          <h2 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: '600', color: '#000000' }}>UPI</h2>
          <div style={{ background: '#F2F4F7', borderRadius: '14px', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#000000' }}>UPI ID</p>
              <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#555555' }}>{upi}</p>
            </div>
            <span style={{ background: '#E8F5E9', color: '#2E7D32', fontSize: '13px', fontWeight: '600', padding: '4px 10px', borderRadius: '100px' }}>Verified</span>
          </div>
        </div>

        {/* Add New Card */}
        {!showAddCard ? (
          <button onClick={() => setShowAddCard(true)} style={{ background: '#CCA266', color: '#FFFFFF', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%' }}>
            + Add New Card
          </button>
        ) : (
          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#000000' }}>Add New Card</h2>
            {[
              { key: 'number', label: 'Card Number', placeholder: '1234 5678 9012 3456', type: 'tel' },
              { key: 'name', label: 'Cardholder Name', placeholder: 'Ryan Gosling', type: 'text' },
              { key: 'expiry', label: 'Expiry (MM/YY)', placeholder: 'MM/YY', type: 'text' },
              { key: 'cvv', label: 'CVV', placeholder: '•••', type: 'password' },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label style={{ fontSize: '13px', color: '#555555', fontWeight: '500', display: 'block', marginBottom: '6px' }}>{label}</label>
                <input
                  type={type}
                  value={newCard[key]}
                  onChange={e => setNewCard(p => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  style={{ width: '100%', background: '#F2F4F7', border: '1.5px solid #E5E7EB', borderRadius: '12px', padding: '12px 14px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <button onClick={handleAddCard} style={{ background: '#CCA266', color: '#FFFFFF', border: 'none', borderRadius: '100px', padding: '13px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '4px' }}>
              Save Card
            </button>
            <button onClick={() => setShowAddCard(false)} style={{ background: '#F2F4F7', color: '#000000', border: 'none', borderRadius: '100px', padding: '13px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
