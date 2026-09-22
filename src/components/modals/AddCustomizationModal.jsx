import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, Layers, Sparkles } from 'lucide-react';

export const AddCustomizationModal = () => {
  const { closeModal, clients, modalData, setCustomizations, showToast, ADVISORS } = useCrm();

  const [clientId, setClientId] = useState(modalData?.clientId || clients[0]?.id || '');
  const [productType, setProductType] = useState('Solitaire Diamond Ring');
  const [designer, setDesigner] = useState('Sonam Lama (Senior CAD Master)');
  const [advisor, setAdvisor] = useState('Anisha Rai');
  const [branch, setBranch] = useState('Baluwatar');
  const [estimatedCost, setEstimatedCost] = useState('450000');
  const [advancePaid, setAdvancePaid] = useState('150000');
  const [totalDays, setTotalDays] = useState('45');
  const [designBrief, setDesignBrief] = useState('');
  const [stoneSpecs, setStoneSpecs] = useState('1.2ct Certified Oval Solitaire Diamond (E/VVS2)');
  const [metalSpecs, setMetalSpecs] = useState('18K White Gold (750 hallmark)');

  const client = clients.find(c => c.id === clientId) || clients[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productType || !estimatedCost) {
      alert('Please enter product type and estimated cost.');
      return;
    }

    const est = Number(estimatedCost);
    const adv = Number(advancePaid) || 0;
    const nextId = `CUST-2026-${String(Math.floor(100 + Math.random() * 900))}`;

    const newCust = {
      id: nextId,
      clientId: client.id,
      clientName: client.name,
      productType,
      productCode: `CUS-${nextId.split('-')[2]}`,
      designer,
      advisor,
      branch,
      currentStageIndex: 0, // Request
      currentStage: 'Request',
      currentDay: 1,
      totalDays: Number(totalDays) || 45,
      estimatedCost: est,
      finalCost: est,
      advancePaid: adv,
      balanceDue: Math.max(0, est - adv),
      clientBudget: `NPR ${est.toLocaleString()} max`,
      startDate: new Date().toISOString().split('T')[0],
      expectedCompletion: new Date(Date.now() + (Number(totalDays) || 45) * 86400000).toISOString().split('T')[0],
      designBrief: designBrief || 'Bespoke custom jewellery commission initiated with client specifications.',
      status: 'Commission Initiated',
      costingBreakdown: {
        goldWeightGrams: 5.0,
        goldAlloy: metalSpecs,
        goldCost: Math.round(est * 0.2),
        centerDiamondCarat: 1.0,
        centerDiamondCert: stoneSpecs,
        centerDiamondCost: Math.round(est * 0.6),
        accentDiamondsCarat: 0.2,
        accentDiamondsCost: Math.round(est * 0.1),
        makingAndCadCharges: Math.round(est * 0.08),
        hallmarkCertification: Math.round(est * 0.02),
        totalNpr: est
      },
      versions: [
        { version: 'Initial Request', date: new Date().toISOString().split('T')[0], status: 'Draft', notes: 'Initial design brief recorded.' }
      ],
      conversationSummary: 'Bespoke commission sheet opened. Assigned to design department.',
      nextStep: 'Produce initial concept sketches and CAD wireframes',
      stoneSpecs,
      metalSpecs
    };

    setCustomizations(prev => [newCust, ...prev]);
    showToast(`Bespoke commission ${newCust.id} created for ${client.name}`);
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="var(--gold-dark)" />
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>New Customization Commission</h2>
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
              <label className="form-label">Store Branch</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="form-select"
              >
                <option value="Baluwatar">Baluwatar Flagship</option>
                <option value="Labim">Labim Luxury Boutique</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Product / Commission Type *</label>
              <input
                type="text"
                required
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                placeholder="e.g. Solitaire Diamond Engagement Ring"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Lead CAD Master / Designer</label>
              <select
                value={designer}
                onChange={(e) => setDesigner(e.target.value)}
                className="form-select"
              >
                <option value="Sonam Lama (Senior CAD Master)">Sonam Lama (CAD Master)</option>
                <option value="Arun Bajracharya (Master Jeweller)">Arun Bajracharya (Master Jeweller)</option>
                <option value="Deepak Shakya (High Jewellery Artisan)">Deepak Shakya (High Jewellery)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Price Quote (NPR) *</label>
              <input
                type="number"
                required
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                placeholder="450000"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Advance Received (NPR)</label>
              <input
                type="number"
                value={advancePaid}
                onChange={(e) => setAdvancePaid(e.target.value)}
                placeholder="150000"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Days (Total)</label>
              <input
                type="number"
                value={totalDays}
                onChange={(e) => setTotalDays(e.target.value)}
                placeholder="45"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Assigned Sales Advisor</label>
              <select
                value={advisor}
                onChange={(e) => setAdvisor(e.target.value)}
                className="form-select"
              >
                {ADVISORS.map(a => (
                  <option key={a.id} value={a.name}>{a.name} ({a.branch})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Stone Specifications & Diamond Parameters</label>
            <input
              type="text"
              value={stoneSpecs}
              onChange={(e) => setStoneSpecs(e.target.value)}
              placeholder="e.g. 1.21 ct Oval Brilliant, GIA certified, Color E, VVS2"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Precious Metal Alloy & Hallmark</label>
            <input
              type="text"
              value={metalSpecs}
              onChange={(e) => setMetalSpecs(e.target.value)}
              placeholder="e.g. 18K White Gold (750 hallmark), Nickel-free palladium alloy"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Design Brief & Client Vision</label>
            <textarea
              value={designBrief}
              onChange={(e) => setDesignBrief(e.target.value)}
              placeholder="Describe prong configuration, cathedral basket, pavé bridge, finish texture..."
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
            <button type="button" onClick={closeModal} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-gold">
              Commission Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
