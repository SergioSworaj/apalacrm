import React from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, Sparkles, Shield, CheckCircle2, Lock } from 'lucide-react';

export const TierPrivilegesDrawer = () => {
  const { closeModal, modalData, TIER_PRIVILEGES, currentRole } = useCrm();

  const client = modalData || {};
  const tierName = client.tier || 'Gold';
  const tierInfo = TIER_PRIVILEGES[tierName] || TIER_PRIVILEGES['Gold'];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '540px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="var(--gold-dark)" />
              <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>{tierName} Tier Privileges</h2>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Patron: <strong>{client.name}</strong> ({client.id})
            </div>
          </div>
          <button onClick={closeModal} className="btn btn-ghost btn-sm">
            <X size={18} />
          </button>
        </div>

        {/* Tier Stats Summary (Section 16) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', margin: '18px 0', padding: '14px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
          <div>
            <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Tier Status Established</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{tierInfo.since}</div>
          </div>
          <div>
            <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Verified Lifetime Spend</div>
            <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)', marginTop: '2px' }}>
              NPR {(client.lifetimeValue || 1250000).toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Completed Purchases</div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>{client.purchasesCount || 3} bespoke orders</div>
          </div>
          <div>
            <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Relationship Duration</div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>Active since 2024 (2.5 years)</div>
          </div>
        </div>

        {/* Applicable Privileges List */}
        <div>
          <div style={{ fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-primary)', marginBottom: '10px' }}>
            Applicable {tierName} Privileges
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tierInfo.privileges.map((priv, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={15} color="var(--gold-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{priv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Governance & Approval Alert (Section 16) */}
        <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'var(--gold-surface)', border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-dark)', fontWeight: 600 }}>
            <Lock size={13} />
            <span>Additional Privilege Approval: {tierInfo.approvalRequired}</span>
          </div>
          <span style={{ color: 'var(--text-tertiary)' }}>Guidance Only</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '18px' }}>
          <button onClick={closeModal} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
