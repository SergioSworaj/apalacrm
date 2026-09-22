import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Footprints,
  Plus,
  Search,
  Filter,
  Download,
  ShoppingBag,
  Clock,
  Calendar,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const VisitsView = () => {
  const { visits, openClient360, setActiveModal, selectedBranch } = useCrm();
  const [filterPurpose, setFilterPurpose] = useState('All');
  const [filterOutcome, setFilterOutcome] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVisits = visits.filter(v => {
    if (selectedBranch !== 'All Branches' && v.branch !== selectedBranch) return false;
    if (filterPurpose !== 'All' && !v.purpose.toLowerCase().includes(filterPurpose.toLowerCase())) return false;
    if (filterOutcome !== 'All' && v.outcome !== filterOutcome) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        v.clientName.toLowerCase().includes(q) ||
        v.advisor.toLowerCase().includes(q) ||
        v.remarks.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const purchasesCount = filteredVisits.filter(v => v.purchase === 'Yes').length;
  const nonPurchasesCount = filteredVisits.filter(v => v.purchase === 'No').length;
  const totalSalesVolume = filteredVisits.reduce((acc, v) => acc + (v.salesValue || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>Boutique Visits Log</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
            Store consultations, try-ons, and jewellery purchases at Baluwatar & Labim store branches.
          </p>
        </div>

        <button
          onClick={() => setActiveModal('add-visit')}
          className="btn btn-gold"
        >
          <Plus size={15} />
          <span>+ Record Store Visit</span>
        </button>
      </div>

      {/* Top Visit Metrics (Section 19) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Total Logged Visits</div>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginTop: '4px' }}>
            {filteredVisits.length}
          </div>
        </div>

        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Converted Purchases</div>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: '#2E7D32', marginTop: '4px' }}>
            {purchasesCount}
          </div>
        </div>

        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Consultations Only</div>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)', marginTop: '4px' }}>
            {nonPurchasesCount}
          </div>
        </div>

        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Total Sales Realized</div>
          <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginTop: '4px' }}>
            NPR {totalSalesVolume.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="luxury-card" style={{ padding: '14px 16px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={14} color="var(--text-tertiary)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search visits by client name, sales rep, remarks..."
            className="form-control"
            style={{ paddingLeft: '30px' }}
          />
        </div>

        <select
          value={filterPurpose}
          onChange={(e) => setFilterPurpose(e.target.value)}
          className="form-select"
          style={{ width: '180px' }}
        >
          <option value="All">All Purposes</option>
          <option value="Sales">Sales</option>
          <option value="Consultation">Consultation</option>
          <option value="CAD">CAD / Design</option>
          <option value="Customization">Customization</option>
        </select>

        <select
          value={filterOutcome}
          onChange={(e) => setFilterOutcome(e.target.value)}
          className="form-select"
          style={{ width: '180px' }}
        >
          <option value="All">All Outcomes</option>
          <option value="Purchased">Purchased</option>
          <option value="Did not purchase">Did not purchase</option>
          <option value="Customization">Customization</option>
        </select>
      </div>

      {/* Visits Data Table (Section 19) */}
      <div className="crm-table-container">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Client</th>
              <th>Store Branch</th>
              <th>Sales Representative</th>
              <th>Visit Purpose</th>
              <th>Outcome</th>
              <th>Purchase</th>
              <th>Value (NPR)</th>
              <th>Remarks</th>
              <th style={{ textAlign: 'right' }}>360 Profile</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisits.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
                  No visit logs match your query.
                </td>
              </tr>
            ) : (
              filteredVisits.map(v => (
                <tr key={v.id}>
                  <td>
                    <strong>{v.date}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{v.time}</div>
                  </td>
                  <td>
                    <span
                      onClick={() => openClient360(v.clientId, 'visits')}
                      style={{ fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}
                    >
                      {v.clientName}
                    </span>
                  </td>
                  <td>{v.branch}</td>
                  <td>{v.advisor}</td>
                  <td>{v.purpose}</td>
                  <td>
                    <span className={`badge ${v.outcome === 'Purchased' ? 'badge-active' : v.outcome === 'Customization' ? 'badge-gold' : 'badge-silver'}`}>
                      {v.outcome}
                    </span>
                  </td>
                  <td>{v.purchase}</td>
                  <td style={{ fontWeight: 600, color: v.salesValue > 0 ? '#2E7D32' : 'inherit' }}>
                    {v.salesValue > 0 ? v.salesValue.toLocaleString() : '—'}
                  </td>
                  <td style={{ maxWidth: '280px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {v.remarks}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => openClient360(v.clientId, 'visits')}
                      className="btn btn-ghost btn-sm"
                      style={{ color: 'var(--gold-dark)', fontWeight: 600 }}
                    >
                      <span>Profile</span>
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
