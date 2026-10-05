import React, { useState, useMemo } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Layers,
  Sparkles,
  Clock,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  User,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Eye,
  Sliders,
  FileCheck,
  Table,
  LayoutGrid,
  Download,
  Search,
  Plus,
  DollarSign,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const CustomizationsView = () => {
  const {
    customizations,
    openClient360,
    advanceCustomizationStage,
    setActiveModal,
    setModalData,
    selectedBranch,
    CUSTOMIZATION_STAGES,
    showToast
  } = useCrm();

  // Mode: 'atelier' (Visual Journey) vs 'excel' (Dense Table)
  const [viewMode, setViewMode] = useState('atelier');

  // Selected customization for atelier studio
  const [selectedCustId, setSelectedCustId] = useState(customizations[0]?.id || 'CUST-2026-081');
  const [studioTab, setStudioTab] = useState('cad'); // 'cad' | 'costing' | 'specs' | 'revisions'

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('All');
  const [filterDesigner, setFilterDesigner] = useState('All');

  // Filtered dataset
  const filteredCustomizations = useMemo(() => {
    return customizations.filter(c => {
      if (selectedBranch !== 'All Branches' && c.branch !== selectedBranch) return false;
      if (filterStage !== 'All' && c.currentStage !== filterStage) return false;
      if (filterDesigner !== 'All' && !c.designer.includes(filterDesigner)) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          c.clientName.toLowerCase().includes(q) ||
          c.productType.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.designer.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [customizations, selectedBranch, filterStage, filterDesigner, searchTerm]);

  const currentDetail = filteredCustomizations.find(c => c.id === selectedCustId) || filteredCustomizations[0] || customizations[0];

  // Metrics
  const activeCount = filteredCustomizations.length;
  const inProductionCount = filteredCustomizations.filter(c => c.currentStageIndex >= 8 && c.currentStageIndex < 10).length;
  const awaitingClientCount = filteredCustomizations.filter(c => c.currentStageIndex < 8 && c.currentStageIndex >= 4).length;
  const readyCount = filteredCustomizations.filter(c => c.currentStageIndex >= 10).length;
  const totalWipValue = filteredCustomizations.reduce((acc, c) => acc + (c.finalCost || 0), 0);

  const exportExcelCSV = () => {
    const headers = ['Order ID', 'Client Name', 'Product Type', 'Stage', 'Day Progress', 'Designer', 'Sales Rep', 'Branch', 'Total Quote', 'Advance Paid', 'Balance Due', 'Expected Delivery', 'Status'];
    const rows = filteredCustomizations.map(c => [
      c.id,
      `"${c.clientName}"`,
      `"${c.productType}"`,
      c.currentStage,
      `Day ${c.currentDay}/${c.totalDays}`,
      `"${c.designer}"`,
      `"${c.advisor}"`,
      c.branch,
      c.finalCost,
      c.advancePaid || 0,
      c.balanceDue || 0,
      c.expectedCompletion,
      `"${c.status}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Apala_Bespoke_Customizations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Customization production register exported to spreadsheet CSV');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>Bespoke Customization Atelier</h1>
            <span className="badge badge-gold font-mono" style={{ fontSize: '12px' }}>
              NPR {totalWipValue.toLocaleString()} WORK-IN-PROGRESS
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
            Twelve-stage jewelry fabrication lifecycle: design consultation, 3D CAD modeling, casting, gemstone setting, and hallmarking.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Excel vs Atelier Mode Switcher */}
          <div style={{
            display: 'flex',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-sm)',
            padding: '3px'
          }}>
            <button
              onClick={() => setViewMode('atelier')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: viewMode === 'atelier' ? 600 : 500,
                color: viewMode === 'atelier' ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: viewMode === 'atelier' ? 'var(--bg-subtle)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer'
              }}
            >
              <LayoutGrid size={13} />
              <span>Visual Atelier Journey</span>
            </button>
            <button
              onClick={() => setViewMode('excel')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: viewMode === 'excel' ? 600 : 500,
                color: viewMode === 'excel' ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: viewMode === 'excel' ? 'var(--bg-subtle)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer'
              }}
            >
              <Table size={13} />
              <span>Excel Production Grid</span>
            </button>
          </div>

          <button onClick={exportExcelCSV} className="btn btn-secondary btn-sm" title="Download spreadsheet CSV">
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          <button onClick={() => setActiveModal('add-customization')} className="btn btn-gold btn-sm">
            <Plus size={14} />
            <span>+ Commission Project</span>
          </button>
        </div>
      </div>

      {/* KPI Ribbon (Section 29) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' }}>
        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Active Commissions</div>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)', marginTop: '4px' }}>
            {activeCount}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>All active fabrication</div>
        </div>

        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>In Production Workshop</div>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: '#2E7D32', marginTop: '4px' }}>
            {inProductionCount}
          </div>
          <div style={{ fontSize: '11px', color: '#2E7D32', marginTop: '4px' }}>Casting & stone setting</div>
        </div>

        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Awaiting Client Review</div>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: '#E65100', marginTop: '4px' }}>
            {awaitingClientCount}
          </div>
          <div style={{ fontSize: '11px', color: '#E65100', marginTop: '4px' }}>CAD turntable / wax try-on</div>
        </div>

        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Ready in Vault</div>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: '#1976D2', marginTop: '4px' }}>
            {readyCount}
          </div>
          <div style={{ fontSize: '11px', color: '#1976D2', marginTop: '4px' }}>Awaiting patron collection</div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="luxury-card" style={{ padding: '12px 16px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={14} color="var(--text-tertiary)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search commissions by ID, client, product, designer..."
            className="form-control"
            style={{ paddingLeft: '30px' }}
          />
        </div>

        <select
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
          className="form-select"
          style={{ width: '180px' }}
        >
          <option value="All">All Stages (12)</option>
          {CUSTOMIZATION_STAGES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={filterDesigner}
          onChange={(e) => setFilterDesigner(e.target.value)}
          className="form-select"
          style={{ width: '180px' }}
        >
          <option value="All">All Designers</option>
          <option value="Sonam Lama">Sonam Lama (CAD)</option>
          <option value="Arun Bajracharya">Arun Bajracharya (Master)</option>
        </select>
      </div>

      {/* MODE 1: EXCEL PRODUCTION GRID MODE (For Excel Users!) */}
      {viewMode === 'excel' && (
        <div className="crm-table-container">
          <table className="crm-table table-dense">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Patron Client</th>
                <th>Commission Piece</th>
                <th>Current Stage</th>
                <th>Fabrication Day</th>
                <th>Progress</th>
                <th>Master Designer</th>
                <th>Sales Representative</th>
                <th>Store Branch</th>
                <th>Total Quote (NPR)</th>
                <th>Advance Paid</th>
                <th>Balance Due</th>
                <th>Expected Delivery</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomizations.map(c => (
                <tr key={c.id}>
                  <td>
                    <span className="font-mono text-gold" style={{ fontWeight: 700 }}>{c.id}</span>
                  </td>
                  <td>
                    <span
                      onClick={() => openClient360(c.clientId, 'customizations')}
                      style={{ fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}
                    >
                      {c.clientName}
                    </span>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{c.clientId}</div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 500 }}>{c.productType}</span>
                  </td>
                  <td>
                    {/* Inline Stage Switcher for Excel comfort */}
                    <select
                      value={c.currentStageIndex}
                      onChange={(e) => advanceCustomizationStage(c.id, Number(e.target.value))}
                      className="form-select"
                      style={{ fontSize: '11px', padding: '3px 6px', width: '130px' }}
                    >
                      {CUSTOMIZATION_STAGES.map((stg, sIdx) => (
                        <option key={stg} value={sIdx}>{stg}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <span className="font-mono" style={{ fontWeight: 600 }}>
                      Day {c.currentDay} / {c.totalDays}
                    </span>
                  </td>
                  <td style={{ minWidth: '90px' }}>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${(c.currentDay / c.totalDays) * 100}%`, height: '100%', backgroundColor: 'var(--gold-primary)' }} />
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{Math.round((c.currentDay / c.totalDays) * 100)}%</span>
                  </td>
                  <td>{c.designer.split(' ')[0]}</td>
                  <td>{c.advisor}</td>
                  <td>{c.branch}</td>
                  <td style={{ fontWeight: 700, color: 'var(--gold-dark)' }}>
                    {c.finalCost.toLocaleString()}
                  </td>
                  <td style={{ color: '#2E7D32', fontWeight: 600 }}>
                    {(c.advancePaid || 0).toLocaleString()}
                  </td>
                  <td style={{ color: (c.balanceDue || 0) > 0 ? '#C62828' : 'var(--text-tertiary)', fontWeight: 600 }}>
                    {(c.balanceDue || 0).toLocaleString()}
                  </td>
                  <td>{c.expectedCompletion}</td>
                  <td>
                    <span className="badge badge-gold" style={{ fontSize: '10px' }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => {
                        setSelectedCustId(c.id);
                        setViewMode('atelier');
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '11px', padding: '3px 8px' }}
                    >
                      Studio →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODE 2: VISUAL ATELIER JOURNEY & STUDIO DEEP DIVE */}
      {viewMode === 'atelier' && currentDetail && (
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '20px', alignItems: 'start' }}>
          {/* Left Column: Order Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
              Custom Orders ({filteredCustomizations.length})
            </div>

            {filteredCustomizations.map(c => {
              const isSelected = c.id === currentDetail.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCustId(c.id)}
                  className="luxury-card"
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#FAF7F0' : '#FFFFFF',
                    borderColor: isSelected ? 'var(--gold-primary)' : 'var(--border-subtle)',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
                      {c.clientName}
                    </span>
                    <span className="badge badge-gold font-mono" style={{ fontSize: '10.5px' }}>
                      DAY {c.currentDay} / {c.totalDays}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {c.productType}
                  </div>

                  {/* Progress bar */}
                  <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden', margin: '8px 0' }}>
                    <div style={{
                      width: `${(c.currentDay / c.totalDays) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #C5A880, #B89758)'
                    }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    <span>Stage: <strong style={{ color: 'var(--text-primary)' }}>{c.currentStage}</strong></span>
                    <span>NPR <strong style={{ color: 'var(--gold-dark)' }}>{c.finalCost.toLocaleString()}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Atelier Fabrication Studio Deep Dive */}
          <div className="luxury-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>{currentDetail.productType}</h2>
                  <span className="font-mono text-gold" style={{ fontWeight: 700, fontSize: '13px' }}>{currentDetail.id}</span>
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Patron: <strong style={{ color: 'var(--text-primary)', cursor: 'pointer' }} onClick={() => openClient360(currentDetail.clientId, 'customizations')}>
                    {currentDetail.clientName} ({currentDetail.clientId})
                  </strong> • Designer: <strong>{currentDetail.designer}</strong> • Store Branch: <strong>{currentDetail.branch}</strong>
                </div>
              </div>

              {/* Stage Navigation Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {currentDetail.currentStageIndex > 0 && (
                  <button
                    onClick={() => advanceCustomizationStage(currentDetail.id, currentDetail.currentStageIndex - 1)}
                    className="btn btn-secondary btn-sm"
                    title="Move back to previous stage"
                  >
                    <ChevronLeft size={13} />
                    <span>Previous</span>
                  </button>
                )}

                {currentDetail.currentStageIndex < CUSTOMIZATION_STAGES.length - 1 && (
                  <button
                    onClick={() => advanceCustomizationStage(currentDetail.id, currentDetail.currentStageIndex + 1)}
                    className="btn btn-gold btn-sm"
                    title="Advance to next milestone"
                  >
                    <span>Advance Stage →</span>
                  </button>
                )}

                <button
                  onClick={() => openClient360(currentDetail.clientId, 'customizations')}
                  className="btn btn-secondary btn-sm"
                >
                  <span>Client 360</span>
                </button>
              </div>
            </div>

            {/* DAY 18 / 45 Large Indicator (Section 30) */}
            <div style={{
              margin: '20px 0',
              padding: '16px 20px',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Production Schedule Tracker</div>
                <div style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)', marginTop: '2px' }}>
                  DAY {currentDetail.currentDay} OF {currentDetail.totalDays}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Expected Delivery: <strong>{currentDetail.expectedCompletion}</strong> ({Math.max(0, currentDetail.totalDays - currentDetail.currentDay)} days remaining)
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Financial Status</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  Total: NPR {currentDetail.finalCost.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#2E7D32', fontWeight: 600, marginTop: '2px' }}>
                  Paid: NPR {(currentDetail.advancePaid || 0).toLocaleString()} • Due: NPR {(currentDetail.balanceDue || 0).toLocaleString()}
                </div>
              </div>
            </div>

            {/* 12-Step Clickable Stepper (Section 30) */}
            <div style={{ margin: '20px 0', overflowX: 'auto', padding: '10px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: '880px' }}>
                {CUSTOMIZATION_STAGES.map((stage, idx) => {
                  const isPast = idx < currentDetail.currentStageIndex;
                  const isCurrent = idx === currentDetail.currentStageIndex;

                  return (
                    <div
                      key={stage}
                      onClick={() => advanceCustomizationStage(currentDetail.id, idx)}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative', cursor: 'pointer' }}
                      title={`Click to set stage to ${stage}`}
                    >
                      <div style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: isCurrent ? 'var(--gold-primary)' : isPast ? '#2E7D32' : '#FFFFFF',
                        border: '2px solid',
                        borderColor: isCurrent ? 'var(--gold-dark)' : isPast ? '#2E7D32' : 'var(--border-medium)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isCurrent || isPast ? '#FFFFFF' : 'var(--text-tertiary)',
                        fontSize: '11px',
                        fontWeight: 700,
                        boxShadow: isCurrent ? 'var(--shadow-gold)' : 'none',
                        transition: 'all 0.15s ease'
                      }}>
                        {isPast ? '✓' : idx + 1}
                      </div>
                      <span style={{
                        fontSize: '10px',
                        marginTop: '6px',
                        fontWeight: isCurrent ? 700 : 500,
                        color: isCurrent ? 'var(--gold-dark)' : isPast ? 'var(--text-primary)' : 'var(--text-tertiary)',
                        textAlign: 'center',
                        whiteSpace: 'nowrap'
                      }}>
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Atelier Detail Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-medium)', margin: '16px 0 14px' }}>
              {[
                { id: 'cad', label: '3D CAD & Design Visuals' },
                { id: 'costing', label: 'Costing Sheet Breakdown' },
                { id: 'specs', label: 'Stone & Metallurgy Specs' },
                { id: 'revisions', label: 'Revisions & Client Notes' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setStudioTab(t.id)}
                  style={{
                    padding: '8px 14px',
                    border: 'none',
                    borderBottom: studioTab === t.id ? '2px solid var(--gold-primary)' : '2px solid transparent',
                    backgroundColor: 'transparent',
                    color: studioTab === t.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: studioTab === t.id ? 600 : 500,
                    fontSize: '12.5px',
                    cursor: 'pointer'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* SUB-TAB 1: 3D CAD & DESIGN VISUALS (Section 31) */}
            {studioTab === 'cad' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {/* Visual CAD mockup card - Clean white version */}
                <div style={{
                  padding: '18px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--accent-dark)', textTransform: 'uppercase', fontWeight: 700 }}>
                      3D CAD Wireframe Turntable View
                    </span>
                    <span className="badge badge-accent" style={{ fontSize: '10px' }}>Matrix Gold CAD</span>
                  </div>

                  <div style={{
                    height: '140px',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed var(--border-medium)',
                    color: 'var(--accent-primary)'
                  }}>
                    <Sparkles size={28} />
                    <span style={{ fontSize: '11px', marginTop: '6px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      3D Turntable: {currentDetail.productType}
                    </span>
                    <span style={{ fontSize: '9.5px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                      Rendered at 60fps • Basket lowered by 0.8mm for flush fit
                    </span>
                  </div>

                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {currentDetail.designBrief}
                  </div>
                </div>

                {/* Milestone Sign-off card */}
                <div style={{ padding: '18px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                    Client Approval Status
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', fontSize: '13px', fontWeight: 600 }}>
                    <CheckCircle2 size={16} />
                    <span>Approved by {currentDetail.clientName}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Turntable video confirmed via WhatsApp concierge. 3D printed resin mock ring ready for private store try-on.
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', fontSize: '11.5px', color: 'var(--gold-dark)', fontWeight: 600 }}>
                    Next step: {currentDetail.nextStep}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: COSTING SHEET BREAKDOWN */}
            {studioTab === 'costing' && (
              <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Formal Jewelry Costing Sheet</h3>
                {currentDetail.costingBreakdown ? (
                  <table className="crm-table" style={{ backgroundColor: '#FFFFFF' }}>
                    <thead>
                      <tr>
                        <th>Material / Labor Component</th>
                        <th>Specifications & Purity</th>
                        <th style={{ textAlign: 'right' }}>Cost (NPR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Precious Metal Alloy</strong></td>
                        <td>{currentDetail.costingBreakdown.goldWeightGrams}g • {currentDetail.costingBreakdown.goldAlloy}</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{currentDetail.costingBreakdown.goldCost.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td><strong>Central Gemstone / Solitaire</strong></td>
                        <td>{currentDetail.costingBreakdown.centerDiamondCarat} ct • {currentDetail.costingBreakdown.centerDiamondCert}</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{currentDetail.costingBreakdown.centerDiamondCost.toLocaleString()}</td>
                      </tr>
                      {currentDetail.costingBreakdown.accentDiamondsCost > 0 && (
                        <tr>
                          <td><strong>Accent Pavé Diamonds</strong></td>
                          <td>{currentDetail.costingBreakdown.accentDiamondsCarat} ct micro-claw pavé diamonds</td>
                          <td style={{ textAlign: 'right', fontWeight: 600 }}>{currentDetail.costingBreakdown.accentDiamondsCost.toLocaleString()}</td>
                        </tr>
                      )}
                      <tr>
                        <td><strong>CAD Design & Master Handcraftsmanship</strong></td>
                        <td>Lost wax casting, stereomicroscope prong setting, and high rhodium finish</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{currentDetail.costingBreakdown.makingAndCadCharges.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td><strong>Gemological Certificate & Hallmark Testing</strong></td>
                        <td>Government Bureau of Standards Hallmark assay & GIA verification</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{currentDetail.costingBreakdown.hallmarkCertification.toLocaleString()}</td>
                      </tr>
                      <tr style={{ backgroundColor: 'var(--gold-surface)' }}>
                        <td colSpan="2" style={{ fontWeight: 700, fontSize: '13.5px' }}>Total Commission Cost</td>
                        <td style={{ textAlign: 'right', fontWeight: 800, fontSize: '15px', color: 'var(--gold-dark)', fontFamily: 'var(--font-serif)' }}>
                          NPR {currentDetail.finalCost.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" style={{ color: '#2E7D32', fontWeight: 600 }}>Advance Payment Settled</td>
                        <td style={{ textAlign: 'right', fontWeight: 700, color: '#2E7D32' }}>
                          - NPR {(currentDetail.advancePaid || 0).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" style={{ color: '#C62828', fontWeight: 600 }}>Remaining Balance Due at Delivery</td>
                        <td style={{ textAlign: 'right', fontWeight: 700, color: '#C62828' }}>
                          NPR {(currentDetail.balanceDue || 0).toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <div style={{ color: 'var(--text-secondary)' }}>Costing sheet being computed by production manager.</div>
                )}
              </div>
            )}

            {/* SUB-TAB 3: SPECS */}
            {studioTab === 'specs' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 700 }}>Gemstone Certifications</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '6px' }}>{currentDetail.stoneSpecs}</div>
                </div>
                <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 700 }}>Precious Metal Hallmarking</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '6px' }}>{currentDetail.metalSpecs}</div>
                </div>
              </div>
            )}

            {/* SUB-TAB 4: REVISIONS */}
            {studioTab === 'revisions' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentDetail.versions.map(v => (
                  <div key={v.version} style={{ padding: '12px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{v.version} ({v.date})</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{v.notes}</div>
                    </div>
                    <span className="badge badge-gold">{v.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
