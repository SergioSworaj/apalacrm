import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, Wrench, AlertTriangle } from 'lucide-react';

export const AddServiceCaseModal = () => {
  const { closeModal, addServiceCase, clients, modalData } = useCrm();

  const [clientId, setClientId] = useState(modalData?.clientId || clients[0]?.id || '');
  const [product, setProduct] = useState('');
  const [type, setType] = useState('Repair & Restoration');
  const [severity, setSeverity] = useState('Medium Priority');
  const [problemDescription, setProblemDescription] = useState('');
  const [promisedResolutionDate, setPromisedResolutionDate] = useState('');
  const [accountablePerson, setAccountablePerson] = useState('Workshop Manager');

  const client = clients.find(c => c.id === clientId) || clients[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product || !problemDescription) {
      alert('Please fill in required fields.');
      return;
    }

    addServiceCase({
      clientId: client.id,
      clientName: client.name,
      product,
      type,
      severity,
      problemDescription,
      promisedResolutionDate,
      accountablePerson,
      status: 'Open',
      branch: 'Baluwatar'
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
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Wrench size={22} color="var(--gold-primary)" />
              New Service Case
            </h2>
            <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              Log repairs, restorations, or client grievances
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
                required
              >
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Product / Item *</label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. Diamond Solitaire Ring"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Service Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-select"
              >
                <option value="Repair & Restoration">Repair & Restoration</option>
                <option value="Resizing / Laser Work">Resizing / Laser Work</option>
                <option value="Complimentary Cleaning">Complimentary Cleaning</option>
                <option value="Stone Setting Issue">Stone Setting Issue</option>
                <option value="Quality Concern">Quality Concern</option>
                <option value="Patron Grievance">Patron Grievance</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Severity / Priority</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="form-select"
              >
                <option value="Low Priority">Low Priority</option>
                <option value="Medium Priority">Medium Priority</option>
                <option value="High Priority - Urgent">High Priority - Urgent</option>
                <option value="Critical - Grievance">Critical - Grievance</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Problem Description *</label>
            <textarea
              required
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Describe the issue, damage, or client concern in detail..."
              className="form-textarea"
              rows={4}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Promised Resolution Date</label>
              <input
                type="date"
                value={promisedResolutionDate}
                onChange={(e) => setPromisedResolutionDate(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Accountable Person</label>
              <select
                value={accountablePerson}
                onChange={(e) => setAccountablePerson(e.target.value)}
                className="form-select"
              >
                <option value="Workshop Manager">Workshop Manager</option>
                <option value="Senior Jeweler">Senior Jeweler</option>
                <option value="Store Manager">Store Manager</option>
                <option value="Branch Director">Branch Director</option>
                <option value="Quality Control">Quality Control</option>
              </select>
            </div>
          </div>

          {severity === 'Critical - Grievance' && (
            <div style={{
              padding: '12px',
              backgroundColor: '#FFEBEE',
              border: '1px solid #FFCDD2',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '12px'
            }}>
              <AlertTriangle size={18} color="#EF5350" />
              <div style={{ fontSize: '12px', color: '#C62828' }}>
                <strong>Critical Grievance:</strong> This will be automatically escalated to branch management.
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '16px' }}>
            <button type="button" onClick={closeModal} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-gold">
              Create Service Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
