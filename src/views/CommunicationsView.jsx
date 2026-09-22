import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  MessageSquare,
  Plus,
  Phone,
  Mail,
  Video,
  Users,
  Search,
  ChevronRight,
  Send
} from 'lucide-react';

export const CommunicationsView = () => {
  const { communications, openClient360, setActiveModal, selectedBranch } = useCrm();
  const [selectedChannel, setSelectedChannel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const channels = ['All', 'WhatsApp', 'Phone', 'Email', 'In-person', 'Video Call', 'SMS'];

  const filteredCommunications = communications.filter(c => {
    if (selectedChannel !== 'All' && c.channel !== selectedChannel) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        c.clientName.toLowerCase().includes(q) ||
        c.advisor.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>Client Communications Register</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
            Omnichannel luxury concierge interactions logged across WhatsApp, phone consultations, and emails.
          </p>
        </div>

        <button
          onClick={() => setActiveModal('add-communication')}
          className="btn btn-gold"
        >
          <Plus size={15} />
          <span>+ Log Communication</span>
        </button>
      </div>

      {/* Channel Filters (Section 24) */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-medium)', paddingBottom: '2px', overflowX: 'auto' }}>
        {channels.map(ch => (
          <button
            key={ch}
            onClick={() => setSelectedChannel(ch)}
            style={{
              padding: '8px 14px',
              border: 'none',
              borderBottom: selectedChannel === ch ? '2px solid var(--gold-primary)' : '2px solid transparent',
              backgroundColor: 'transparent',
              color: selectedChannel === ch ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: selectedChannel === ch ? 600 : 500,
              fontSize: '12.5px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {ch}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="luxury-card" style={{ padding: '12px 16px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} color="var(--text-tertiary)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search communication summaries, next steps, client names..."
            className="form-control"
            style={{ paddingLeft: '30px' }}
          />
        </div>
      </div>

      {/* Communications Table (Section 24) */}
      <div className="crm-table-container">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Client</th>
              <th>Channel</th>
              <th>Sales Representative</th>
              <th>Category</th>
              <th>Conversation Summary</th>
              <th>Next Step & Follow-up</th>
              <th style={{ textAlign: 'right' }}>Profile</th>
            </tr>
          </thead>
          <tbody>
            {filteredCommunications.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-secondary)' }}>
                  No communication logs found.
                </td>
              </tr>
            ) : (
              filteredCommunications.map(comm => (
                <tr key={comm.id}>
                  <td>
                    <strong>{comm.date}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{comm.time}</div>
                  </td>
                  <td>
                    <span
                      onClick={() => openClient360(comm.clientId, 'communications')}
                      style={{ fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}
                    >
                      {comm.clientName}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-gold font-mono" style={{ fontSize: '10.5px' }}>
                      {comm.channel}
                    </span>
                  </td>
                  <td>{comm.advisor}</td>
                  <td>
                    <span style={{ fontWeight: 500, fontSize: '12px' }}>
                      {comm.category}
                    </span>
                  </td>
                  <td style={{ maxWidth: '300px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {comm.summary}
                  </td>
                  <td>
                    <div style={{ fontSize: '11.5px', color: 'var(--gold-dark)', fontWeight: 600 }}>
                      {comm.nextStep}
                    </div>
                    {comm.followUpDate && (
                      <div style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                        Due: {comm.followUpDate}
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => openClient360(comm.clientId, 'communications')}
                      className="btn btn-ghost btn-sm"
                      style={{ color: 'var(--gold-dark)', fontWeight: 600 }}
                    >
                      <span>360</span>
                      <ChevronRight size={13} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
