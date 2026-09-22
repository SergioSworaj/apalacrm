import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, Sparkles } from 'lucide-react';

export const AddOpportunityModal = () => {
  const { closeModal, clients, modalData, PIPELINE_STAGES, setOpportunities, showToast } = useCrm();

  const [clientId, setClientId] = useState(modalData?.clientId || clients[0]?.id || '');
  const [product, setProduct] = useState('');
  const [stage, setStage] = useState('New Interest');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [expectedCloseDate, setExpectedCloseDate] = useState('2026-10-15');
  const [notes, setNotes] = useState('');

  const client = clients.find(c => c.id === clientId) || clients[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product || !estimatedValue) {
      alert('Please enter product description and estimated value.');
      return;
    }

    const newOpp = {
      id: `opp-${Date.now()}`,
      clientId: client.id,
      clientName: client.name,
      owner: client.owner,
      branch: client.branch,
      stage,
      product,
      estimatedValue: Number(estimatedValue),
      probability: '50%',
      expectedCloseDate,
      lastActivity: 'New opportunity created',
      nextFollowUp: 'Scheduled in 3 days',
      notes
    };

    setOpportunities(prev => [newOpp, ...prev]);
    showToast(`Opportunity created for ${client.name}`);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '540px', padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="var(--gold-dark)" />
            <h3 style={{ fontSize: '1.35rem' }}>Create Sales Opportunity</h3>
          </div>
          <button onClick={closeModal} className="btn btn-ghost btn-sm">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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
            <label className="form-label">Product / Bespoke Jewellery Requirement *</label>
            <input
              type="text"
              required
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="e.g. 1.5ct Emerald-Cut Solitaire Ring (18K White Gold)"
              className="form-control"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Initial Pipeline Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="form-select"
              >
                {PIPELINE_STAGES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Value (NPR) *</label>
              <input
                type="number"
                required
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                placeholder="450000"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Expected Close Date</label>
            <input
              type="date"
              value={expectedCloseDate}
              onChange={(e) => setExpectedCloseDate(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Client Notes & Design Preferences</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Carat parameters, setting style, family timeline..."
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
            <button type="button" onClick={closeModal} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-gold">
              Create Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
