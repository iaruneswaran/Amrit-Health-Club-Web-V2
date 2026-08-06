import React from 'react';

export default function OnlineConsultationCard({ onJoinCall, onReschedule }) {
  return (
    <div 
      className="online-consultation-card" 
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #F2F4F7',
        padding: '16px',
        boxSizing: 'border-box',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        marginTop: '12px'
      }}
    >
      {/* Top Header Badge & Type */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '14px', fontWeight: '700', color: '#CCA266' }}>Online Video Consultation</span>
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', background: '#CCA266', padding: '6px 16px', borderRadius: '100px 0 0 100px', marginRight: '-16px' }}>
          Confirmed
        </span>
      </div>

      {/* Doctor Profile Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div className="doctor-logo-placeholder" style={{ width: '50px', height: '50px', borderRadius: '14px', background: '#F2F4F7', color: '#CCA266', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          SJ
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#000000' }}>Dr. Sarah Jenkins</h4>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555555', fontWeight: '500' }}>
            General Physician & Telehealth
          </p>
        </div>
      </div>

      {/* Scheduled Time Box */}
      <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '10px 12px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
          <span style={{ color: '#555555', fontWeight: '500' }}>Scheduled Time</span>
          <span style={{ color: '#000000', fontWeight: '600' }}>Today, 5:30 PM</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="button"
          onClick={onJoinCall}
          style={{
            flex: 1,
            height: '48px',
            background: '#CCA266',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Join Video Call
        </button>

        <button
          type="button"
          onClick={onReschedule}
          style={{
            padding: '0 16px',
            height: '48px',
            background: '#FFFFFF',
            color: '#CCA266',
            border: '1px solid #CCA266',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Reschedule
        </button>
      </div>
    </div>
  );
}
