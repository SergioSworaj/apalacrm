import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Settings,
  Database,
  Users,
  Copy,
  Archive,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';

export const SettingsView = () => {
  const {
    dataQualityIssues,
    setDataQualityIssues,
    archivedRecords,
    restoreRecord,
    currentRole,
    showToast
  } = useCrm();

  const [activeTab, setActiveTab] = useState('data-quality'); // 'data-quality' | 'duplicates' | 'historical' | 'archive'
  const [duplicateResolved, setDuplicateResolved] = useState(false);

  const handleDuplicateAction = (action) => {
    setDuplicateResolved(true);
    showToast(`Duplicate record action completed: "${action}"`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>System Administration & Governance</h1>
          <span className="badge badge-gold font-mono" style={{ fontSize: '11.5px' }}>CRM Admin Access</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
          Historical data migration audit, client deduplication, data quality cleansing, and record archives.
        </p>
      </div>

      {/* Admin Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-medium)', paddingBottom: '2px' }}>
        {[
          { id: 'data-quality', label: 'Data Quality Center (Section 43)' },
          { id: 'duplicates', label: 'Duplicate Management (Section 45)' },
          { id: 'historical', label: 'Historical Migration (Section 44)' },
          { id: 'archive', label: 'Archived Records (Section 46)' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderBottom: activeTab === t.id ? '2px solid var(--gold-primary)' : '2px solid transparent',
              backgroundColor: 'transparent',
              color: activeTab === t.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === t.id ? 600 : 500,
              fontSize: '12.5px',
              cursor: 'pointer'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: DATA QUALITY CENTER (Section 43) */}
      {activeTab === 'data-quality' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="luxury-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Profile Completeness & Health Checks</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Identifies historical records missing phone, email, assigned branch, or incomplete client preferences.
            </p>

            <table className="crm-table">
              <thead>
                <tr>
                  <th>Client Record</th>
                  <th>Quality Issue Detected</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Resolution</th>
                </tr>
              </thead>
              <tbody>
                {dataQualityIssues.map(issue => (
                  <tr key={issue.id}>
                    <td>
                      <strong>{issue.clientName}</strong>
                      <div className="font-mono text-gold" style={{ fontSize: '11px' }}>{issue.clientId}</div>
                    </td>
                    <td>
                      <div><strong>{issue.type}</strong></div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{issue.details}</div>
                    </td>
                    <td>
                      <span className={`badge ${issue.severity === 'High' ? 'badge-risk' : 'badge-warm'}`}>
                        {issue.severity}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-gold font-mono">{issue.status}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => showToast(`Opened review drawer for issue ${issue.id}`)}
                        className="btn btn-secondary btn-sm"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DUPLICATE MANAGEMENT (Section 45) */}
      {activeTab === 'duplicates' && (
        <div className="luxury-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem' }}>Possible Duplicate Resolution Match</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Side-by-side comparison between modern active client and legacy Excel imported record.
              </p>
            </div>
            {duplicateResolved && (
              <span className="badge badge-active" style={{ fontSize: '11.5px', padding: '4px 10px' }}>
                ✓ Resolved & Logged in Audit Trail
              </span>
            )}
          </div>

          {/* Side by side comparison (Section 45) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '20px 0' }}>
            {/* Record A: Current Record */}
            <div style={{ padding: '18px', backgroundColor: '#FAF7F0', border: '1.5px solid var(--gold-border)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-gold">Active Master Record</span>
                <span className="font-mono text-gold" style={{ fontWeight: 700 }}>26-BLW-001-NS</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div><strong>Name:</strong> Niraj Shrestha</div>
                <div><strong>Phone:</strong> +977 9841234567</div>
                <div><strong>Email:</strong> niraj.shrestha@nepaltech.io</div>
                <div><strong>Branch:</strong> Baluwatar Flagship</div>
                <div><strong>Sales Rep Owner:</strong> Jharna Dahal</div>
                <div><strong>Tier:</strong> Gold (Visit #7)</div>
                <div><strong>Lifetime Purchases:</strong> NPR 1,250,000 (3 orders)</div>
              </div>
            </div>

            {/* Record B: Legacy Old Record */}
            <div style={{ padding: '18px', backgroundColor: '#F9F9FB', border: '1.5px solid var(--border-medium)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-silver">Legacy 2023 Excel Import</span>
                <span className="font-mono" style={{ fontWeight: 700, color: 'var(--text-tertiary)' }}>OLD-00492</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div><strong>Name:</strong> Niraj Shrestha</div>
                <div><strong>Phone:</strong> +977 9841234567 (Exact Phone Match)</div>
                <div><strong>Email:</strong> niraj_old@gmail.com</div>
                <div><strong>Branch:</strong> Baluwatar</div>
                <div><strong>Sales Rep Owner:</strong> Unassigned (Legacy Walk-in)</div>
                <div><strong>Tier:</strong> Standard (Visit #2)</div>
                <div><strong>Lifetime Purchases:</strong> NPR 280,000 (2023 Gold Coin)</div>
              </div>
            </div>
          </div>

          {/* Merge Actions (Section 45) */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
            <button
              onClick={() => handleDuplicateAction('Kept Separate')}
              className="btn btn-secondary"
            >
              Keep Separate
            </button>
            <button
              onClick={() => handleDuplicateAction('Marked as Family Member')}
              className="btn btn-secondary"
            >
              Mark Family
            </button>
            <button
              onClick={() => handleDuplicateAction('Merged into 26-BLW-001-NS')}
              className="btn btn-gold"
            >
              Merge into Master 26-BLW-001-NS
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: HISTORICAL DATA (Section 44) */}
      {activeTab === 'historical' && (
        <div className="luxury-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>Legacy Excel Data Ingestion Overview</h3>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Readiness status of historical guestbooks, paper receipts, and spreadsheet migrations.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Total Historical Clients</div>
              <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginTop: '4px' }}>
                2,200+
              </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Priority VIP Profiles</div>
              <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)', marginTop: '4px' }}>
                470 – 500
              </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Visitor Records</div>
              <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginTop: '4px' }}>
                400+
              </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Communications Logged</div>
              <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginTop: '4px' }}>
                3,000+
              </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Historical Grievances</div>
              <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-serif)', color: '#C62828', marginTop: '4px' }}>
                5 records
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ARCHIVE (Section 46) */}
      {activeTab === 'archive' && (
        <div className="crm-table-container">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.3rem' }}>Archived & Deleted Records</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Zero permanent data loss: soft-deleted profiles can be inspected and restored by CRM Admin.
            </p>
          </div>

          <table className="crm-table">
            <thead>
              <tr>
                <th>Record Title / Item</th>
                <th>Record Type</th>
                <th>Deleted Details</th>
                <th>Deleted By</th>
                <th>Archive Date</th>
                <th style={{ textAlign: 'right' }}>Restore Action</th>
              </tr>
            </thead>
            <tbody>
              {archivedRecords.map(item => (
                <tr key={item.id}>
                  <td><strong>{item.title}</strong></td>
                  <td><span className="badge badge-silver">{item.recordType}</span></td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.details}</td>
                  <td>{item.deletedBy}</td>
                  <td>{item.deletedDate}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => restoreRecord(item.id)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: 'var(--gold-dark)', gap: '4px' }}
                    >
                      <RotateCcw size={12} />
                      <span>Restore</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
