import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

export const AppointmentsView = () => {
  const {
    appointments,
    openClient360,
    updateAppointmentStatus,
    selectedBranch,
    showToast
  } = useCrm();

  const [calendarView, setCalendarView] = useState('Week'); // Day | Week | Month
  const [cancelModalItem, setCancelModalItem] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  const filteredAppointments = appointments.filter(a => {
    if (selectedBranch !== 'All Branches' && a.branch !== selectedBranch) return false;
    return true;
  });

  const handleConfirmCancel = () => {
    if (!cancelModalItem || !cancelReason) return;
    showToast(`Appointment for ${cancelModalItem.clientName} cancelled: ${cancelReason}`);
    setCancelModalItem(null);
    setCancelReason('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>Store Appointment Calendar</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
            Unified scheduling for Baluwatar and Labim private VIP viewing suites.
          </p>
        </div>

        {/* View Switcher (Day, Week, Month) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-sm)',
          padding: '3px'
        }}>
          {['Day', 'Week', 'Month'].map(v => (
            <button
              key={v}
              onClick={() => setCalendarView(v)}
              style={{
                padding: '5px 14px',
                fontSize: '12px',
                fontWeight: calendarView === v ? 600 : 500,
                color: calendarView === v ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: calendarView === v ? 'var(--bg-subtle)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer'
              }}
            >
              {v} View
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid Container (Section 34) */}
      <div className="luxury-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600 }}>
              September 2026
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button className="btn btn-ghost btn-sm" style={{ padding: '4px 6px' }}><ChevronLeft size={14} /></button>
              <button className="btn btn-ghost btn-sm" style={{ padding: '4px 6px' }}><ChevronRight size={14} /></button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--gold-primary)' }} />
              <span>Baluwatar Store</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#1976D2' }} />
              <span>Labim store</span>
            </div>
          </div>
        </div>

        {/* Appointments List / Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {filteredAppointments.map(apt => {
            const isBaluwatar = apt.branch === 'Baluwatar';

            return (
              <div
                key={apt.id}
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: `4px solid ${isBaluwatar ? 'var(--gold-primary)' : '#1976D2'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: isBaluwatar ? 'var(--gold-dark)' : '#1976D2', textTransform: 'uppercase' }}>
                      {apt.branch} VIP store
                    </span>
                    <div
                      onClick={() => openClient360(apt.clientId, 'appointments')}
                      style={{ fontWeight: 600, fontSize: '14.5px', color: 'var(--text-primary)', cursor: 'pointer', marginTop: '2px' }}
                    >
                      {apt.clientName}
                    </div>
                  </div>
                  <span className={`badge ${apt.status === 'Scheduled' ? 'badge-active' : 'badge-silver'}`}>
                    {apt.status}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <Clock size={13} color="var(--text-tertiary)" />
                  <span>{apt.date} • {apt.time}</span>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <strong>Purpose:</strong> {apt.purpose}
                </div>

                <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>
                  {apt.notes}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(0,0,0,0.05)', fontSize: '11px' }}>
                  <span>Sales Rep: <strong>{apt.advisor}</strong></span>
                  {apt.status === 'Scheduled' && (
                    <button
                      onClick={() => setCancelModalItem(apt)}
                      className="btn btn-ghost btn-sm"
                      style={{ color: '#C62828', padding: '2px 6px', fontSize: '11px' }}
                    >
                      Postpone / Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Postpone / Cancel Reason Modal (Section 34) */}
      {cancelModalItem && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '420px', padding: '20px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Postpone / Cancel Appointment</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Management requires a verified reason when changing scheduled store appointments for <strong>{cancelModalItem.clientName}</strong>.
            </p>

            <div className="form-group">
              <label className="form-label">Mandatory Postponement Reason</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Reason provided by patron (e.g. Flight delay, wedding planning conflict)..."
                className="form-textarea"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
              <button onClick={() => setCancelModalItem(null)} className="btn btn-secondary">
                Keep Appointment
              </button>
              <button onClick={handleConfirmCancel} className="btn btn-danger" disabled={!cancelReason}>
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
