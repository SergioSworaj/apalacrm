import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, MessageSquare, Send } from 'lucide-react';

export const AddCommunicationModal = () => {
  const { closeModal, addCommunication, clients, modalData } = useCrm();

  const [clientId, setClientId] = useState(modalData?.clientId || clients[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('11:30 AM');
  const [channel, setChannel] = useState('WhatsApp');
  const [direction, setDirection] = useState('Outgoing');
  const [advisor, setAdvisor] = useState('Anisha Rai');
  const [category, setCategory] = useState('CAD Discussion');
  const [summary, setSummary] = useState('');
  const [clientResponse, setClientResponse] = useState('');
  const [nextStep, setNextStep] = useState('');
  const [followUpDate, setFollowUpDate] = useState('2026-09-22');
  const [engagement, setEngagement] = useState('Hot');

  const client = clients.find(c => c.id === clientId) || clients[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!summary) {
      alert('Please enter conversation summary.');
      return;
    }

    addCommunication({
      clientId: client.id,
      clientName: client.name,
      date,
      time,
      channel,
      direction,
      advisor,
      category,
      summary,
      clientResponse,
      nextStep,
      followUpDate,
      engagement
    });

    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '640px', maxHeight: '90vh' }}>
        <div style={{
          padding: '16px 22px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FAF9F6'
        }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>Log Client Communication</h2>
            <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              Records omnichannel interactions and schedules automatic follow-up tasks.
            </p>
          </div>
          <button onClick={closeModal} className="btn btn-ghost btn-sm">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '20px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Client *</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="form-select"
              >
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Communication Channel</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="form-select"
              >
                <option value="WhatsApp">WhatsApp Message / Video</option>
                <option value="Phone">Direct Phone Call</option>
                <option value="Email">Email</option>
                <option value="In-person">In-person store</option>
                <option value="Video Call">Virtual store Video Call</option>
                <option value="SMS">SMS Notification</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Direction</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                className="form-select"
              >
                <option value="Outgoing">Outgoing (Advisor initiated)</option>
                <option value="Incoming">Incoming (Client initiated)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="CAD Discussion">CAD Discussion & 3D Render</option>
                <option value="Product Enquiry">Product Enquiry</option>
                <option value="Stock / Price">Stock / Price Quote</option>
                <option value="Appointment Setup">Appointment Setup</option>
                <option value="Design Concept">Design Concept</option>
                <option value="Costing Discussion">Costing Discussion</option>
                <option value="Order Confirmation">Order Confirmation</option>
                <option value="Account Discussion">Account Discussion</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Conversation Summary *</label>
            <textarea
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Key points discussed during call or chat (e.g. Discussed revised ring design. Client requested lower center stone profile)..."
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Client Response</label>
            <input
              type="text"
              value={clientResponse}
              onChange={(e) => setClientResponse(e.target.value)}
              placeholder="e.g. Delighted with changes, confirmed Tuesday 11:30 AM appointment..."
              className="form-control"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div className="form-group">
              <label className="form-label">Next Action Step</label>
              <input
                type="text"
                value={nextStep}
                onChange={(e) => setNextStep(e.target.value)}
                placeholder="Prepare 3D resin sample"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Next Follow-up Date</label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Engagement Level</label>
              <select
                value={engagement}
                onChange={(e) => setEngagement(e.target.value)}
                className="form-select"
              >
                <option value="Hot">Hot</option>
                <option value="Warm">Warm</option>
                <option value="Administrative">Administrative</option>
                <option value="Drop-off">Drop-off</option>
                <option value="Cold">Cold</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '12px' }}>
            <button type="button" onClick={closeModal} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-gold">
              Save Communication Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
