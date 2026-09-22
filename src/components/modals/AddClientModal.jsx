import React, { useState, useEffect } from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, AlertCircle, User, CheckCircle2, Users2 } from 'lucide-react';

export const AddClientModal = () => {
  const {
    closeModal,
    addClient,
    checkDuplicates,
    openClient360,
    showToast,
    BRANCHES,
    ADVISORS
  } = useCrm();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    secondaryPhone: '',
    email: '',
    branch: 'Baluwatar',
    owner: 'Anisha Rai',
    supportingRep: 'Rohan Shrestha',
    occupation: '',
    address: '',
    gender: 'Female',
    dob: '',
    source: 'Walk-in Boutique',
    tier: 'Bronze',
    clientType: 'New',
    engagement: 'Hot',
    priceRange: 'NPR 250,000 – NPR 500,000',
    contactPermission: true,
    whatsappPermission: true,
    emailPermission: true,
    promotionalPermission: true,
    notes: ''
  });

  const [matchedDuplicate, setMatchedDuplicate] = useState(null);

  // Check duplicate as user types name or phone (Section 8)
  useEffect(() => {
    if (formData.name.trim().length > 2 || formData.phone.trim().length > 4) {
      const found = checkDuplicates(formData.name, formData.phone);
      setMatchedDuplicate(found || null);
    } else {
      setMatchedDuplicate(null);
    }
  }, [formData.name, formData.phone, checkDuplicates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter client name and phone number.');
      return;
    }
    const newClient = addClient(formData);
    closeModal();
    openClient360(newClient.id);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '650px', maxHeight: '90vh' }}>
        {/* Modal Header */}
        <div style={{
          padding: '16px 22px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FAF9F6'
        }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>New Client Onboarding</h2>
            <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              Creates a permanent Client ID linking store visits, preferences, and jewellery commissions.
            </p>
          </div>
          <button onClick={closeModal} className="btn btn-ghost btn-sm" style={{ padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '20px 24px' }}>
          {/* Duplicate Detection Alert Banner (Section 8) */}
          {matchedDuplicate && (
            <div style={{
              backgroundColor: '#FFF9E6',
              border: '1.5px solid #FADB14',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              marginBottom: '18px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B78103', fontWeight: 700, fontSize: '12.5px' }}>
                <AlertCircle size={16} />
                <span>Possible Existing Client Found</span>
              </div>
              <div style={{ fontSize: '12px', marginTop: '4px', color: 'var(--text-primary)' }}>
                <strong>{matchedDuplicate.name}</strong> • Phone: {matchedDuplicate.phone} • ID: <span className="font-mono text-gold">{matchedDuplicate.id}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    closeModal();
                    openClient360(matchedDuplicate.id);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  Open Existing Client 360
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Adding as family relation of ${matchedDuplicate.name}`);
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Continue as Family Member
                </button>
              </div>
            </div>
          )}

          {/* Basic Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Niraj Shrestha"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+977 98XXXXXXXX"
                className="form-control font-mono"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@domain.com"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Secondary / Spouse Phone</label>
              <input
                type="text"
                value={formData.secondaryPhone}
                onChange={(e) => setFormData({ ...formData, secondaryPhone: e.target.value })}
                placeholder="+977 98XXXXXXXX"
                className="form-control font-mono"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Store Branch</label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="form-select"
              >
                <option value="Baluwatar">Baluwatar Flagship</option>
                <option value="Labim">Labim Luxury Boutique</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Sales Representative</label>
              <select
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                className="form-select"
              >
                {ADVISORS.map(a => (
                  <option key={a.id} value={a.name}>{a.name} ({a.branch})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Occupation / Corporate Affiliation</label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                placeholder="e.g. Managing Director, Apex Solutions"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Residential Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="e.g. Ward 4, Baluwatar, Kathmandu"
              className="form-control"
            />
          </div>

          {/* Contact Permissions (Section 48) */}
          <div style={{ marginTop: '10px', padding: '12px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: '8px' }}>
              Communication Permissions (Section 48)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="checkbox"
                  checked={formData.whatsappPermission}
                  onChange={(e) => setFormData({ ...formData, whatsappPermission: e.target.checked })}
                />
                <span>WhatsApp Permitted ✓</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="checkbox"
                  checked={formData.promotionalPermission}
                  onChange={(e) => setFormData({ ...formData, promotionalPermission: e.target.checked })}
                />
                <span>Promotional Catalogues Allowed</span>
              </label>
            </div>
          </div>

          {/* Initial Remarks */}
          <div className="form-group" style={{ marginTop: '14px' }}>
            <label className="form-label">Bespoke Jewelry Preferences & Styling Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Interested in bespoke solitaire engagement rings, prefers GIA certified diamonds..."
              className="form-textarea"
            />
          </div>

          {/* Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '12px' }}>
            <button type="button" onClick={closeModal} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-gold">
              Create Client Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
