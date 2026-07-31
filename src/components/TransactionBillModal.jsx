import React from 'react';

export default function TransactionBillModal({ transaction, onClose }) {
  if (!transaction) return null;

  return (
    <div 
      className="report-modal-backdrop" 
      onClick={onClose} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: '#FFFFFF', 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'center', 
        zIndex: 99999, 
        padding: '0px' 
      }}
    >
      {/* Pure PDF Document - Full Height White Mobile */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '430px',
          height: '100vh',
          maxHeight: '100vh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '0px',
          padding: '24px 20px',
          boxShadow: 'none',
          fontFamily: "'Inter', Arial, sans-serif",
          color: '#0F172A',
          position: 'relative',
          animation: 'fadeInModal 0.25s ease-out'
        }}
      >
        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: '#F5EFE6',
            border: 'none',
            color: '#90644B',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '700',
            zIndex: 10
          }}
          aria-label="Close PDF"
        >
          ✕
        </button>

        {/* Hospital PDF Header */}
        <div style={{ borderBottom: '2px solid #E2E8F0', paddingBottom: '14px', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#90644B', letterSpacing: '-0.3px' }}>
            ST. MARY'S MEDICAL CENTER
          </h2>
          <p style={{ margin: '2px 0 0 0', fontSize: '11px', fontWeight: '600', color: '#475569' }}>
            NABH &amp; ISO 9001:2015 Accredited Multi-Specialty Hospital
          </p>
          <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748B' }}>
            124 Healthcare Blvd · GSTIN: 33AAAAA0000A1Z5 · Ph: +91 44 2839 0000
          </p>
        </div>

        {/* Tax Invoice Banner */}
        <div style={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderLeft: '4px solid #90644B',
          padding: '10px 12px',
          marginBottom: '16px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          borderRadius: '6px'
        }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase' }}>
              TAX INVOICE &amp; RECEIPT
            </span>
            <span style={{ fontSize: '10px', color: '#64748B', display: 'block' }}>
              Original Patient Receipt
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '10px', color: '#64748B', display: 'block' }}>Invoice No</span>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#90644B' }}>{transaction.txnId}</span>
          </div>
        </div>

        {/* Patient & Transaction Details Meta Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          fontSize: '11px',
          marginBottom: '16px',
          backgroundColor: '#FAFAFA',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #F1F5F9'
        }}>
          <div>
            <span style={{ color: '#64748B', fontWeight: '600', display: 'block' }}>PATIENT</span>
            <strong style={{ fontSize: '12px', color: '#0F172A', display: 'block' }}>Jordan Walker</strong>
            <span style={{ color: '#475569', display: 'block', marginTop: '2px' }}>#IP-99824 · ICU B5</span>
          </div>

          <div>
            <span style={{ color: '#64748B', fontWeight: '600', display: 'block' }}>DATE &amp; TIME</span>
            <strong style={{ fontSize: '12px', color: '#0F172A', display: 'block' }}>{transaction.date}</strong>
            <span style={{ color: '#475569', display: 'block', marginTop: '2px' }}>{transaction.time}</span>
          </div>
        </div>

        {/* Particulars Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '16px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F1F5F9', borderTop: '1px solid #CBD5E1', borderBottom: '1.5px solid #CBD5E1' }}>
              <th style={{ padding: '8px 6px', textAlign: 'left', fontWeight: '800', color: '#334155' }}>Particulars</th>
              <th style={{ padding: '8px 6px', textAlign: 'right', fontWeight: '800', color: '#334155', width: '50px' }}>Rate</th>
              <th style={{ padding: '8px 6px', textAlign: 'right', fontWeight: '800', color: '#334155', width: '32px' }}>Qty</th>
              <th style={{ padding: '8px 6px', textAlign: 'right', fontWeight: '800', color: '#334155', width: '60px' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transaction.items && transaction.items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: idx % 2 === 1 ? '#F8FAFC' : 'transparent' }}>
                <td style={{ padding: '8px 6px', color: '#0F172A', fontWeight: '600' }}>{item.name}</td>
                <td style={{ padding: '8px 6px', textAlign: 'right', color: '#475569' }}>₹{item.rate}</td>
                <td style={{ padding: '8px 6px', textAlign: 'right', color: '#475569' }}>{item.qty}</td>
                <td style={{ padding: '8px 6px', textAlign: 'right', fontWeight: '800', color: '#0F172A' }}>₹{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Calculations Breakdown */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          borderTop: '1.5px solid #E2E8F0',
          paddingTop: '10px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
            <span>Subtotal Amount:</span>
            <span style={{ fontWeight: '600', color: '#0F172A' }}>{transaction.amount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
            <span>CGST (0%) + SGST (0%):</span>
            <span style={{ fontWeight: '600', color: '#0F172A' }}>₹0.00</span>
          </div>
          
          <div style={{
            display: 'flex',
            justify: 'space-between',
            fontSize: '14px',
            fontWeight: '900',
            color: '#90644B',
            backgroundColor: '#F5EFE6',
            padding: '10px 12px',
            borderRadius: '8px',
            marginTop: '4px',
            border: '1px solid #E1D8C7'
          }}>
            <span>Total Amount Paid</span>
            <span>{transaction.amount}</span>
          </div>
        </div>

        {/* PDF Signature & Footer Disclaimer */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'flex-end',
          paddingTop: '12px',
          borderTop: '1px dashed #CBD5E1'
        }}>
          <div>
            <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', display: 'block' }}>
              ST. MARY'S HOSPITALS
            </span>
            <span style={{ fontSize: '9px', color: '#94A3B8', display: 'block' }}>
              Computer Generated Invoice
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '10px', color: '#16A34A', fontWeight: '800' }}>
              ✓ Digitally Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
