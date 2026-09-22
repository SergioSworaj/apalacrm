import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Clock,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  MessageSquare,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export const FollowUpsView = () => {
  const {
    followUps,
    completeFollowUp,
    rescheduleFollowUp,
    openClient360,
    setActiveModal,
    setModalData,
    selectedBranch
  } = useCrm();

  const [activeTab, setActiveTab] = useState('Today');
  const [rescheduleModalItem, setRescheduleModalItem] = useState(null);
  const [newDueDate, setNewDueDate] = useState('');
  const [rescheduleReason, setRescheduleReason] = useState('');

  const filteredFollowUps = followUps.filter(f => {
    if (selectedBranch !== 'All Branches' && f.branch !== selectedBranch) return false;
    if (activeTab === 'Today') return f.status === 'Today';
    if (activeTab === 'Upcoming') return f.status === 'Upcoming';
    if (activeTab === 'Overdue') return f.status === 'Overdue';
    if (activeTab === 'Completed') return f.status === 'Completed';
    return true;
  });

  const handleOpenReschedule = (item) => {
    setRescheduleModalItem(item);
    setNewDueDate('');
    setRescheduleReason('');
  };

  const handleConfirmReschedule = () => {
    if (!rescheduleModalItem || !newDueDate || !rescheduleReason) return;
    rescheduleFollowUp(rescheduleModalItem.id, newDueDate, rescheduleReason);
    setRescheduleModalItem(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>Client Follow-up Queue</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
            System-guided relationship touchpoints ensuring zero lost opportunities or forgotten patrons.
          </p>
        </div>
      </div>

      {/* Tabs (Section 32) */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-medium)', paddingBottom: '2px' }}>
        {[
          { id: 'Today', label: 'Due Today', count: followUps.filter(f => f.status === 'Today').length },
          { id: 'Upcoming', label: 'Upcoming', count: followUps.filter(f => f.status === 'Upcoming').length },
          { id: 'Overdue', label: 'Overdue', count: followUps.filter(f => f.status === 'Overdue').length, badgeColor: 'badge-risk' },
          { id: 'Completed', label: 'Completed', count: followUps.filter(f => f.status === 'Completed').length }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              border: 'none',
              borderBottom: activeTab === t.id ? '2px solid var(--gold-primary)' : '2px solid transparent',
              backgroundColor: 'transparent',
              color: activeTab === t.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === t.id ? 600 : 500,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            <span>{t.label}</span>
            <span className={`badge ${t.badgeColor ? t.badgeColor : activeTab === t.id ? 'badge-gold' : 'badge-silver'}`} style={{ fontSize: '10px' }}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table (Section 32, 33) */}
      <div className="crm-table-container">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Due Date & Time</th>
              <th>Client</th>
              <th>Sales Rep Owner</th>
              <th>Purpose / Reason</th>
              <th>Commercial Opportunity</th>
              <th>Priority</th>
              <th>Reschedules</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFollowUps.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-secondary)' }}>
                  No follow-ups in the "{activeTab}" queue.
                </td>
              </tr>
            ) : (
              filteredFollowUps.map(item => {
                const isOverLimit = (item.rescheduledCount || 0) >= 2;

                return (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.dueDate}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{item.dueTime}</div>
                    </td>
                    <td>
                      <span
                        onClick={() => openClient360(item.clientId, 'follow-ups')}
                        style={{ fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}
                      >
                        {item.clientName}
                      </span>
                    </td>
                    <td>{item.owner}</td>
                    <td style={{ maxWidth: '240px' }}>
                      <div style={{ fontWeight: 500 }}>{item.reason}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.notes}</div>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--gold-dark)', fontWeight: 600 }}>
                      {item.opportunity}
                    </td>
                    <td>
                      <span className={`badge badge-${item.priority === 'High' ? 'risk' : item.priority === 'At Risk' ? 'risk' : 'gold'}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '11.5px', fontWeight: 600, color: isOverLimit ? '#C62828' : 'inherit' }}>
                          Rescheduled {item.rescheduledCount || 0} / 2
                        </span>
                        {isOverLimit && (
                          <span style={{ fontSize: '9.5px', color: '#C62828', fontWeight: 700 }}>
                            ⚠ Management Attention
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          onClick={() => {
                            setActiveModal('add-communication');
                            setModalData({ clientId: item.clientId, clientName: item.clientName });
                          }}
                          className="btn btn-gold btn-sm"
                          title="Contact on WhatsApp / Call"
                        >
                          <MessageSquare size={12} />
                          <span>Contact</span>
                        </button>

                        <button
                          onClick={() => handleOpenReschedule(item)}
                          className="btn btn-secondary btn-sm"
                          title="Reschedule with verified reason"
                        >
                          <RotateCcw size={12} />
                          <span>Reschedule</span>
                        </button>

                        {item.status !== 'Completed' && (
                          <button
                            onClick={() => completeFollowUp(item.id)}
                            className="btn btn-secondary btn-sm"
                            style={{ color: '#2E7D32' }}
                            title="Mark Completed"
                          >
                            <CheckCircle2 size={12} />
                            <span>Done</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Reschedule Modal (Section 33) */}
      {rescheduleModalItem && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '420px', padding: '20px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Reschedule Follow-up</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Client: <strong>{rescheduleModalItem.clientName}</strong> ({rescheduleModalItem.reason})
            </p>

            <div className="form-group">
              <label className="form-label">New Follow-up Date (Required)</label>
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mandatory Reschedule Reason</label>
              <textarea
                value={rescheduleReason}
                onChange={(e) => setRescheduleReason(e.target.value)}
                placeholder="Reason provided by patron (e.g. Travelling out of Kathmandu, Waiting for family consultation)..."
                className="form-textarea"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                Current Reschedule Count: {rescheduleModalItem.rescheduledCount || 0} / 2
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setRescheduleModalItem(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button onClick={handleConfirmReschedule} className="btn btn-gold" disabled={!newDueDate || !rescheduleReason}>
                  Confirm Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
