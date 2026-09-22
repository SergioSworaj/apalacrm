import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, Footprints, ShoppingBag, AlertCircle, Sparkles } from 'lucide-react';

export const AddVisitModal = () => {
  const {
    closeModal,
    addVisit,
    clients,
    modalData,
    ADVISORS
  } = useCrm();

  const [clientId, setClientId] = useState(modalData?.clientId || clients[0]?.id || '');
  const [branch, setBranch] = useState('Baluwatar');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('04:00 PM');
  const [advisor, setAdvisor] = useState('Anisha Rai');
  const [purpose, setPurpose] = useState('Design concept & CAD discussion');
  const [outcome, setOutcome] = useState('Customization');

  // If Purchased (Section 20)
  const [isPurchased, setIsPurchased] = useState(false);
  const [productCode, setProductCode] = useState('');
  const [inventoryType, setInventoryType] = useState('Custom Order');
  const [salesValue, setSalesValue] = useState('');
  const [discount, setDiscount] = useState('0%');

  // If Did Not Purchase (Section 20)
  const [didNotPurchaseReason, setDidNotPurchaseReason] = useState('');

  // Remarks (Section 21)
  const [remarks, setRemarks] = useState('');

  // Product Interest (Section 22)
  const [selectedInterests, setSelectedInterests] = useState(['Diamond', 'Custom']);
  const [interestLevel, setInterestLevel] = useState('High');
  const [budget, setBudget] = useState('NPR 450,000');

  // Future Opportunity (Section 23)
  const [futureExpectedDate, setFutureExpectedDate] = useState('October 2026');
  const [futureEvent, setFutureEvent] = useState('Wedding');
  const [futureRemarks, setFutureRemarks] = useState('Client expects to return with family for bridal set selection.');

  const client = clients.find(c => c.id === clientId) || clients[0];

  const handleOutcomeChange = (newOutcome) => {
    setOutcome(newOutcome);
    setIsPurchased(newOutcome === 'Purchased');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (outcome === 'Did not purchase' && !didNotPurchaseReason) {
      alert('Please state the reason why the client did not purchase.');
      return;
    }

    addVisit({
      clientId: client.id,
      clientName: client.name,
      branch,
      date,
      time,
      advisor,
      purpose,
      outcome,
      purchase: isPurchased,
      salesValue: isPurchased ? Number(salesValue) : 0,
      productCode,
      inventoryType,
      discount,
      didNotPurchaseReason,
      remarks,
      productInterest: selectedInterests,
      budget
    });

    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '680px', maxHeight: '90vh' }}>
        {/* Header */}
        <div style={{
          padding: '16px 22px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FAF9F6'
        }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>Record Boutique Store Visit</h2>
            <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              Automatically increments visit counter and appends to the client's relationship timeline.
            </p>
          </div>
          <button onClick={closeModal} className="btn btn-ghost btn-sm" style={{ padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '20px 24px' }}>
          {/* Client Selector & Branch */}
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
              <label className="form-label">Boutique Store Branch *</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="form-select"
              >
                <option value="Baluwatar">Baluwatar Flagship store</option>
                <option value="Labim">Labim Luxury Boutique</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Visit Date & Time</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                />
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="form-control"
                  style={{ width: '120px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Advisor / Host</label>
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

          {/* Purpose & Outcome */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '4px' }}>
            <div className="form-group">
              <label className="form-label">Visit Purpose (Section 20)</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="form-select"
              >
                <option value="Sales">Sales</option>
                <option value="Consultation">Consultation</option>
                <option value="Product enquiry">Product enquiry</option>
                <option value="Design concept">Design concept</option>
                <option value="Sketch discussion">Sketch discussion</option>
                <option value="CAD discussion">CAD discussion</option>
                <option value="Costing discussion">Costing discussion</option>
                <option value="Collection">Collection</option>
                <option value="Repair">Repair</option>
                <option value="Return / Exchange">Return / Exchange</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Visit Outcome (Section 20)</label>
              <select
                value={outcome}
                onChange={(e) => handleOutcomeChange(e.target.value)}
                className="form-select"
              >
                <option value="Purchased">Purchased</option>
                <option value="Did not purchase">Did not purchase</option>
                <option value="Follow-up required">Follow-up required</option>
                <option value="Customization">Customization</option>
                <option value="Consultation only">Consultation only</option>
                <option value="Repair">Repair</option>
              </select>
            </div>
          </div>

          {/* Conditional Outcome Details */}
          {outcome === 'Purchased' && (
            <div style={{ padding: '14px', backgroundColor: '#F6FBF7', border: '1px solid #A5D6A7', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}>
              <div style={{ fontWeight: 600, fontSize: '12px', color: '#1B5E20', marginBottom: '8px' }}>
                Purchase Invoice Particulars
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label className="form-label">Product Code</label>
                  <input
                    type="text"
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    placeholder="RNG-SOL-BND"
                    className="form-control font-mono"
                  />
                </div>
                <div>
                  <label className="form-label">Inventory Type</label>
                  <select
                    value={inventoryType}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-select"
                  >
                    <option value="Stock Product">Stock Product</option>
                    <option value="Custom Order">Custom Order</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Sales Value (NPR) *</label>
                  <input
                    type="number"
                    value={salesValue}
                    onChange={(e) => setSalesValue(e.target.value)}
                    placeholder="425000"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          )}

          {outcome === 'Did not purchase' && (
            <div className="form-group" style={{ backgroundColor: '#FFF5F5', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid #FFCDD2' }}>
              <label className="form-label" style={{ color: '#C62828' }}>Mandatory Non-Purchase Reason *</label>
              <input
                type="text"
                required
                value={didNotPurchaseReason}
                onChange={(e) => setDidNotPurchaseReason(e.target.value)}
                placeholder="e.g. Comparing carat weights, awaiting spouse approval, over current budget..."
                className="form-control"
              />
            </div>
          )}

          {/* Remarks (Section 21) */}
          <div className="form-group">
            <label className="form-label">Visit Remarks & Narrative (Section 21)</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="What happened during this visit? (e.g. Client visited with spouse. Interested in a diamond engagement ring around NPR 350K–450K. Reviewed CAD. Requested 3D resin prototype try-on)..."
              className="form-textarea"
              style={{ minHeight: '75px' }}
            />
          </div>

          {/* Future Opportunity (Section 23) */}
          <div style={{ padding: '14px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--gold-dark)', fontWeight: 700, marginBottom: '8px' }}>
              Future Arrival & Opportunity Anticipation (Section 23)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label className="form-label">Expected Arrival Date</label>
                <input
                  type="text"
                  value={futureExpectedDate}
                  onChange={(e) => setFutureExpectedDate(e.target.value)}
                  placeholder="October 2026"
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">Upcoming Occasion / Event</label>
                <input
                  type="text"
                  value={futureEvent}
                  onChange={(e) => setFutureEvent(e.target.value)}
                  placeholder="Wedding / Dashain"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
            <button type="button" onClick={closeModal} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-gold">
              Log Visit to Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
