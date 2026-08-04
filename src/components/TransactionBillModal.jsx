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
          color: '#000000',
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
            backgroundColor: '#FFFFFF',
            border: 'none',color: '#000000',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: 10
          }}
          aria-label="Close PDF"
        >
          ✕
        </button>

        {/* Hospital PDF Header */}
        <div style={{ borderBottom: '2px solid #F2F4F7', paddingBottom: '14px', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '500',color: '#000000', letterSpacing: '-0.3px' }}>
            ST. MARY'S MEDICAL CENTER
          </h2>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', fontWeight: '500', color: '#555555' }}>
            NABH &amp; ISO 9001:2015 Accredited Multi-Specialty Hospital
          </p>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555555' }}>
            124 Healthcare Blvd · GSTIN: 33AAAAA0000A1Z5 · Ph: +91 44 2839 0000
          </p>
        </div>

        {/* Tax Invoice Banner */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #F2F4F7',
          borderLeft: '4px solid #CCA266',
          padding: '10px 12px',
          marginBottom: '16px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          borderRadius: '6px'
        }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555', textTransform: 'none' }}>
              TAX INVOICE &amp; RECEIPT
            </span>
            <span style={{ fontSize: '13px', color: '#555555', display: 'block' }}>
              Original Patient Receipt
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '13px', color: '#555555', display: 'block' }}>Invoice No</span>
            <span style={{ fontSize: '13px', fontWeight: '500',color: '#555555' }}>{transaction.txnId}</span>
          </div>
        </div>

        {/* Patient & Transaction Details Meta Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          fontSize: '13px',
          marginBottom: '16px',
          backgroundColor: '#FFFFFF',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #F2F4F7'
        }}>
          <div>
            <span style={{ color: '#000000', fontWeight: '500', display: 'block' }}>PATIENT</span>
            <strong style={{ fontSize: '13px', color: '#555555', display: 'block' }}>Jordan Walker</strong>
            <span style={{ color: '#000000', display: 'block', marginTop: '2px' }}>#IP-99824 · ICU B5</span>
          </div>

          <div>
            <span style={{ color: '#000000', fontWeight: '500', display: 'block' }}>DATE &amp; TIME</span>
            <strong style={{ fontSize: '13px', color: '#555555', display: 'block' }}>{transaction.date}</strong>
            <span style={{ color: '#000000', display: 'block', marginTop: '2px' }}>{transaction.time}</span>
          </div>
        </div>

        {/* Particulars Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F2F4F7', borderTop: '1px solid #F2F4F7', borderBottom: '1.5px solid #F2F4F7' }}>
              <th style={{ padding: '8px 6px', textAlign: 'left', fontWeight: '500', color: '#000000' }}>Particulars</th>
              <th style={{ padding: '8px 6px', textAlign: 'right', fontWeight: '500', color: '#000000', width: '50px' }}>Rate</th>
              <th style={{ padding: '8px 6px', textAlign: 'right', fontWeight: '500', color: '#000000', width: '32px' }}>Qty</th>
              <th style={{ padding: '8px 6px', textAlign: 'right', fontWeight: '500', color: '#000000', width: '60px' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transaction.items && transaction.items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #F2F4F7', backgroundColor: idx % 2 === 1 ? '#FFFFFF' : 'transparent' }}>
                <td style={{ padding: '8px 6px', color: '#000000', fontWeight: '500' }}>{item.name}</td>
                <td style={{ padding: '8px 6px', textAlign: 'right', color: '#000000' }}>₹{item.rate}</td>
                <td style={{ padding: '8px 6px', textAlign: 'right', color: '#000000' }}>{item.qty}</td>
                <td style={{ padding: '8px 6px', textAlign: 'right', fontWeight: '500', color: '#000000' }}>₹{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Calculations Breakdown */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          borderTop: '1.5px solid #F2F4F7',
          paddingTop: '10px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555555' }}>
            <span>Subtotal Amount:</span>
            <span style={{ fontWeight: '500', color: '#000000' }}>{transaction.amount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555555' }}>
            <span>CGST (0%) + SGST (0%):</span>
            <span style={{ fontWeight: '500', color: '#000000' }}>₹0.00</span>
          </div>
          
          <div style={{
            display: 'flex',
            justify: 'space-between',
            fontSize: '14px',
            fontWeight: '500',color: '#000000',
            backgroundColor: '#FFFFFF',
            padding: '10px 12px',
            borderRadius: '8px',
            marginTop: '4px',
            border: '1px solid #FFFFFF'
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
          borderTop: '1px dashed #F2F4F7'
        }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#555555', display: 'block' }}>
              ST. MARY'S HOSPITALS
            </span>
            <span style={{ fontSize: '13px', color: '#000000', display: 'block' }}>
              Computer Generated Invoice
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '13px',color: '#555555', fontWeight: '500' }}>
              ✓ Digitally Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
