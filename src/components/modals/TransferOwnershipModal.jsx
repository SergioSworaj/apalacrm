import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, Share2, Shield, ArrowRight } from 'lucide-react';

export const TransferOwnershipModal = () => {
  const { closeModal, modalData, transferOwnership, ADVISORS } = useCrm();

  const client = modalData || {};
  const [newOwner, setNewOwner] = useState(ADVISORS[1]?.name || 'Rohan Shrestha');
  const [supportingRep, setSupportingRep] = useState(client.owner || 'Anisha Rai');
  const [reason, setReason] = useState('Rebalancing portfolio for bridal jewellery season');

  const handleTransfer = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Please enter a transfer reason.');
      return;
    }

    transferOwnership(client.id, {
      newOwner,
      supportingRep,
      reason
    });

    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '480px', padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Share2 size={16} color="var(--gold-dark)" />
            <h3 style={{ fontSize: '1.35rem' }}>Transfer Client Ownership</h3>
          </div>
          <button onClick={closeModal} className="btn btn-ghost btn-sm">
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Reassigning <strong>{client.name}</strong> will create a permanent audit log entry and transfer notification.
        </p>

        <form onSubmit={handleTransfer}>
          <div className="form-group">
            <label className="form-label">Current Owner</label>
            <input
              type="text"
              readOnly
              value={client.owner || 'Anisha Rai'}
              className="form-control"
              style={{ backgroundColor: 'var(--bg-subtle)', cursor: 'not-allowed' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">New Primary Advisor *</label>
            <select
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
              className="form-select"
            >
              {ADVISORS.map(a => (
                <option key={a.id} value={a.name}>{a.name} ({a.branch})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Supporting Representative</label>
            <select
              value={supportingRep}
              onChange={(e) => setSupportingRep(e.target.value)}
              className="form-select"
            >
              {ADVISORS.map(a => (
                <option key={a.id} value={a.name}>{a.name} ({a.branch})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Reason for Reassignment *</label>
            <textarea
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="State operational reason for transfer..."
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
            <button type="button" onClick={closeModal} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-gold">
              Confirm Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
