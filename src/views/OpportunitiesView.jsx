import React, { useState, useMemo } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Sparkles, Plus, ArrowRight, ChevronLeft, ChevronRight,
  DollarSign, AlertCircle, CheckCircle2, Calendar, XCircle,
  Table, LayoutGrid, Download, Search, Clock, User,
  ShieldCheck, X, TrendingUp, TrendingDown, Target,
  MoreVertical, Phone, MessageSquare, Zap, Award
} from 'lucide-react';

// Stage color mapping — Apple-inspired system colors
const STAGE_CONFIG = {
  'Walk-in Interest':        { color: '#8E8E93', bg: '#F2F2F7', dot: '#8E8E93' },
  'Qualification':           { color: '#007AFF', bg: '#E8F1FF', dot: '#007AFF' },
  'Requirement Detailing':   { color: '#5856D6', bg: '#EEEEFF', dot: '#5856D6' },
  'Design Presentation':     { color: '#AF52DE', bg: '#F5EEFF', dot: '#AF52DE' },
  'Considering':             { color: '#FF9500', bg: '#FFF3E0', dot: '#FF9500' },
  'Costing / Design':        { color: '#FF6B00', bg: '#FFF0E0', dot: '#FF6B00' },
  'Client Decision':         { color: '#FF3B30', bg: '#FFEBEA', dot: '#FF3B30' },
  'Order Confirmed':         { color: '#34C759', bg: '#E8F8EC', dot: '#34C759' },
  'Closed Successfully':     { color: '#30B0C7', bg: '#E5F6FA', dot: '#30B0C7' },
  'Closed Without Sale':     { color: '#AEAEB2', bg: '#F5F5F7', dot: '#AEAEB2' },
};

// Probability by stage
const STAGE_PROBABILITY = {
  'Walk-in Interest': 10,
  'Qualification': 20,
  'Requirement Detailing': 30,
  'Design Presentation': 40,
  'Considering': 50,
  'Costing / Design': 60,
  'Client Decision': 75,
  'Order Confirmed': 95,
  'Closed Successfully': 100,
  'Closed Without Sale': 0,
};

const StagePill = ({ stage }) => {
  const config = STAGE_CONFIG[stage] || { color: '#8E8E93', bg: '#F2F2F7' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '3px 9px',
      borderRadius: '99px',
      background: config.bg,
      color: config.color,
      fontSize: '11.5px',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      border: `1px solid ${config.color}22`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: config.dot, flexShrink: 0 }} />
      {stage}
    </span>
  );
};

const ProbabilityBar = ({ probability }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <div style={{
      flex: 1, height: 4, borderRadius: '99px',
      background: '#E5E5EA', overflow: 'hidden'
    }}>
      <div style={{
        height: '100%',
        width: `${probability}%`,
        borderRadius: '99px',
        background: probability >= 75 ? '#34C759' : probability >= 50 ? '#FF9500' : '#007AFF',
        transition: 'width 0.4s ease',
      }} />
    </div>
    <span style={{ fontSize: '11px', fontWeight: 600, color: '#6E6E73', width: '28px', textAlign: 'right' }}>
      {probability}%
    </span>
  </div>
);

export const OpportunitiesView = () => {
  const {
    opportunities, updateOpportunityStage, openClient360,
    setActiveModal, PIPELINE_STAGES, selectedBranch, showToast
  } = useCrm();

  const [viewMode, setViewMode] = useState('kanban');
  const [selectedOppId, setSelectedOppId] = useState(null);
  const [lostModalOpp, setLostModalOpp] = useState(null);
  const [lostReason, setLostReason] = useState('Price');
  const [lostNotes, setLostNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('All');
  const [filterOwner, setFilterOwner] = useState('All');
  const [sortBy, setSortBy] = useState('value-desc');

  const filteredOpps = useMemo(() => {
    let result = opportunities.filter(o => {
      if (selectedBranch !== 'All Branches' && o.branch !== selectedBranch) return false;
      if (filterStage !== 'All' && o.stage !== filterStage) return false;
      if (filterOwner !== 'All' && o.owner !== filterOwner) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          o.clientName.toLowerCase().includes(q) ||
          o.product.toLowerCase().includes(q) ||
          o.owner.toLowerCase().includes(q) ||
          o.id.toLowerCase().includes(q)
        );
      }
      return true;
    });

    // Sort
    result = [...result];
    switch (sortBy) {
      case 'value-desc': result.sort((a, b) => (b.estimatedValue || 0) - (a.estimatedValue || 0)); break;
      case 'value-asc':  result.sort((a, b) => (a.estimatedValue || 0) - (b.estimatedValue || 0)); break;
      case 'name':       result.sort((a, b) => a.clientName.localeCompare(b.clientName)); break;
      case 'stage':      result.sort((a, b) => PIPELINE_STAGES.indexOf(b.stage) - PIPELINE_STAGES.indexOf(a.stage)); break;
    }
    return result;
  }, [opportunities, selectedBranch, filterStage, filterOwner, searchTerm, sortBy, PIPELINE_STAGES]);

  // KPI Metrics
  const metrics = useMemo(() => {
    const active = filteredOpps.filter(o => o.stage !== 'Closed Without Sale');
    const won = filteredOpps.filter(o => o.stage === 'Closed Successfully' || o.stage === 'Order Confirmed');
    const lost = filteredOpps.filter(o => o.stage === 'Closed Without Sale');
    const totalValue = active.reduce((s, o) => s + (o.estimatedValue || 0), 0);
    const wonValue = won.reduce((s, o) => s + (o.estimatedValue || 0), 0);
    const weightedValue = active.reduce((s, o) => s + ((o.estimatedValue || 0) * (STAGE_PROBABILITY[o.stage] || 50) / 100), 0);
    const winRate = (active.length + lost.length) > 0
      ? Math.round((won.length / (won.length + lost.length)) * 100) : 0;
    return { totalValue, wonValue, weightedValue, winRate, activeCount: active.length, wonCount: won.length, lostCount: lost.length };
  }, [filteredOpps]);

  const currentOppDetail = opportunities.find(o => o.id === selectedOppId);

  const handleStageMove = (opp, targetStage) => {
    if (targetStage === 'Closed Without Sale') { setLostModalOpp(opp); return; }
    updateOpportunityStage(opp.id, targetStage);
    showToast(`${opp.clientName} moved to "${targetStage}"`);
  };

  const handleConfirmLost = () => {
    if (!lostModalOpp) return;
    updateOpportunityStage(lostModalOpp.id, 'Closed Without Sale', { reason: lostReason, notes: lostNotes });
    setLostModalOpp(null);
    setLostNotes('');
    showToast(`Opportunity marked as Closed Without Sale: ${lostReason}`);
  };

  const exportCSV = () => {
    const headers = ['Deal ID','Client Name','Branch','Sales Rep','Stage','Product','Value (NPR)','Probability','Expected Close','Next Follow-up'];
    const rows = filteredOpps.map(o => [o.id, `"${o.clientName}"`, o.branch, `"${o.owner}"`, `"${o.stage}"`, `"${o.product}"`, o.estimatedValue, STAGE_PROBABILITY[o.stage]+'%', o.expectedCloseDate, `"${o.nextFollowUp}"`]);
    const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const a = document.createElement('a');
    a.href = encodeURI(csv);
    a.download = `Apala_Pipeline_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    showToast('Pipeline exported to CSV');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* ── Page Header ─────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
              Sales Pipeline
            </h1>
            <span style={{
              background: 'linear-gradient(135deg, #E8F1FF, #DDEEFF)',
              color: '#007AFF', fontSize: '12px', fontWeight: 700,
              padding: '3px 10px', borderRadius: '99px',
              border: '1px solid rgba(0,122,255,0.2)'
            }}>
              {metrics.activeCount} Active Deals
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '3px' }}>
            10-stage clienteling conversion pipeline · NPR {metrics.totalValue.toLocaleString()} total pipeline value
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Segment Control */}
          <div className="segment-control">
            <button className={`segment-btn${viewMode === 'kanban' ? ' active' : ''}`} onClick={() => setViewMode('kanban')}>
              <LayoutGrid size={13} /> Kanban
            </button>
            <button className={`segment-btn${viewMode === 'table' ? ' active' : ''}`} onClick={() => setViewMode('table')}>
              <Table size={13} /> Table
            </button>
          </div>
          <button onClick={exportCSV} className="btn btn-secondary" style={{ fontSize: '12.5px' }}>
            <Download size={14} /> Export CSV
          </button>
          <button onClick={() => setActiveModal('add-opportunity')} className="btn btn-gold">
            <Plus size={14} /> New Opportunity
          </button>
        </div>
      </div>

      {/* ── KPI Cards ─────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
        {[
          { label: 'Pipeline Value', value: `NPR ${(metrics.totalValue / 100000).toFixed(1)}L`, icon: <TrendingUp size={18} />, color: '#007AFF', desc: 'active deals total' },
          { label: 'Weighted Forecast', value: `NPR ${(metrics.weightedValue / 100000).toFixed(1)}L`, icon: <Target size={18} />, color: '#5856D6', desc: 'probability-adjusted' },
          { label: 'Confirmed Value', value: `NPR ${(metrics.wonValue / 100000).toFixed(1)}L`, icon: <Award size={18} />, color: '#34C759', desc: 'won & confirmed' },
          { label: 'Win Rate', value: `${metrics.winRate}%`, icon: <Zap size={18} />, color: '#FF9500', desc: `${metrics.wonCount} won · ${metrics.lostCount} lost` },
        ].map((m, i) => (
          <div key={i} style={{
            background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '16px 18px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-xs)',
            borderTop: `3px solid ${m.color}`,
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '3px' }}>{m.desc}</div>
              </div>
              <div style={{ color: m.color, background: m.color + '15', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                {m.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter Bar ─────────────────────────────────── */}
      <div style={{
        background: '#FFFFFF', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)', padding: '12px 14px',
        display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={14} color="var(--text-tertiary)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by client, product, sales rep, deal ID..."
            className="form-control"
            style={{ paddingLeft: '32px', fontSize: '13px' }}
          />
        </div>
        <select value={filterStage} onChange={e => setFilterStage(e.target.value)} className="form-select" style={{ width: '185px', fontSize: '12.5px' }}>
          <option value="All">All 10 Stages</option>
          {PIPELINE_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterOwner} onChange={e => setFilterOwner(e.target.value)} className="form-select" style={{ width: '160px', fontSize: '12.5px' }}>
          <option value="All">All Sales Reps</option>
          {['Jharna Dahal', 'Alina Nepali', 'Aditya Limbu', 'Dikshyanshu Karki'].map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="form-select" style={{ width: '155px', fontSize: '12.5px' }}>
          <option value="value-desc">Value: High → Low</option>
          <option value="value-asc">Value: Low → High</option>
          <option value="name">Client Name</option>
          <option value="stage">Stage Progress</option>
        </select>
        {(searchTerm || filterStage !== 'All' || filterOwner !== 'All') && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => { setSearchTerm(''); setFilterStage('All'); setFilterOwner('All'); }}
            style={{ fontSize: '12px', color: 'var(--apple-red)' }}
          >
            <X size={13} /> Clear
          </button>
        )}
        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginLeft: 'auto' }}>
          {filteredOpps.length} deals
        </span>
      </div>

      {/* ── KANBAN VIEW ─────────────────────────────────── */}
      {viewMode === 'kanban' && (
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '20px', minHeight: '560px' }}>
          {PIPELINE_STAGES.map((stage, sIdx) => {
            const stageOpps = filteredOpps.filter(o => o.stage === stage);
            const stageTotal = stageOpps.reduce((acc, o) => acc + (o.estimatedValue || 0), 0);
            const cfg = STAGE_CONFIG[stage] || { color: '#8E8E93', bg: '#F2F2F7' };
            const isWon = stage === 'Order Confirmed' || stage === 'Closed Successfully';
            const isLost = stage === 'Closed Without Sale';

            return (
              <div key={stage} style={{
                flex: '0 0 270px',
                background: isWon ? '#F8FFF9' : isLost ? '#F5F5F7' : '#FAFAFA',
                border: `1px solid ${isWon ? '#C3EDCC' : isLost ? '#E5E5EA' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                display: 'flex', flexDirection: 'column', maxHeight: '820px',
              }}>
                {/* Column header */}
                <div style={{
                  padding: '12px 13px',
                  borderBottom: `1px solid ${isWon ? '#D8F0DC' : 'var(--border-subtle)'}`,
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                        {stage}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '11px', fontWeight: 700,
                      background: stageOpps.length > 0 ? cfg.bg : '#F2F2F7',
                      color: stageOpps.length > 0 ? cfg.color : '#8E8E93',
                      padding: '1px 7px', borderRadius: '99px',
                      border: `1px solid ${cfg.color}22`
                    }}>
                      {stageOpps.length}
                    </span>
                  </div>
                  {stageTotal > 0 && (
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold-dark)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                      NPR {stageTotal.toLocaleString()}
                    </div>
                  )}
                  {stage === 'Order Confirmed' && (
                    <div style={{ marginTop: '5px', fontSize: '10px', color: '#1A8C45', background: '#E8F8EC', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      ✓ Advance received · Order sheet created
                    </div>
                  )}
                </div>

                {/* Cards */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '8px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {stageOpps.length === 0 ? (
                    <div style={{ padding: '28px 10px', textAlign: 'center', color: 'var(--text-quaternary)', fontSize: '12px' }}>
                      No deals here
                    </div>
                  ) : stageOpps.map(opp => (
                    <div key={opp.id}
                      onClick={() => setSelectedOppId(opp.id)}
                      style={{
                        background: '#FFFFFF',
                        border: `1px solid var(--border-subtle)`,
                        borderLeft: `3px solid ${cfg.color}`,
                        borderRadius: 'var(--radius-sm)',
                        padding: '11px 12px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = cfg.color + '66'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.borderLeftColor = cfg.color; }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                          {opp.clientName}
                        </span>
                        <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', flexShrink: 0 }}>{opp.branch}</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: 1.3 }}>
                        {opp.product.length > 55 ? opp.product.slice(0, 55) + '…' : opp.product}
                      </div>
                      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: isWon ? '#1A8C45' : 'var(--gold-dark)', fontFamily: 'var(--font-mono)' }}>
                          NPR {opp.estimatedValue.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '10.5px', color: 'var(--text-tertiary)' }}>{opp.owner.split(' ')[0]}</span>
                      </div>
                      {isLost && opp.lostReason && (
                        <div style={{ marginTop: '6px', fontSize: '10.5px', color: '#FF3B30', background: '#FFEBEA', padding: '3px 7px', borderRadius: '4px', fontWeight: 600 }}>
                          Lost: {opp.lostReason}
                        </div>
                      )}
                      <div style={{ marginTop: '7px', paddingTop: '7px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Follow-up: <strong style={{ color: 'var(--text-secondary)' }}>{opp.nextFollowUp}</strong></span>
                        <div style={{ display: 'flex', gap: '3px' }}>
                          {sIdx > 0 && (
                            <button
                              onClick={e => { e.stopPropagation(); handleStageMove(opp, PIPELINE_STAGES[sIdx - 1]); }}
                              style={{ border: 'none', background: 'var(--bg-subtle)', padding: '2px 5px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', color: 'var(--text-secondary)' }}
                              title={`Move back: ${PIPELINE_STAGES[sIdx - 1]}`}
                            >
                              <ChevronLeft size={11} />
                            </button>
                          )}
                          {sIdx < PIPELINE_STAGES.length - 1 && (
                            <button
                              onClick={e => { e.stopPropagation(); handleStageMove(opp, PIPELINE_STAGES[sIdx + 1]); }}
                              style={{
                                border: 'none',
                                background: cfg.color + '15', color: cfg.color,
                                padding: '2px 7px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600,
                                display: 'flex', alignItems: 'center', gap: '2px'
                              }}
                              title={`Advance: ${PIPELINE_STAGES[sIdx + 1]}`}
                            >
                              Next <ChevronRight size={10} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── TABLE VIEW ─────────────────────────────────── */}
      {viewMode === 'table' && (
        <div className="crm-table-container">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Deal ID</th>
                <th>Client</th>
                <th>Branch</th>
                <th>Sales Representative</th>
                <th>Stage</th>
                <th>Jewellery</th>
                <th>Value (NPR)</th>
                <th>Probability</th>
                <th>Expected Close</th>
                <th>Follow-up</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOpps.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-tertiary)' }}>
                    No opportunities match your filters
                  </td>
                </tr>
              ) : filteredOpps.map(opp => {
                const prob = STAGE_PROBABILITY[opp.stage] || 50;
                const cfg = STAGE_CONFIG[opp.stage] || { color: '#8E8E93', bg: '#F2F2F7' };
                const isWon = opp.stage === 'Order Confirmed' || opp.stage === 'Closed Successfully';

                return (
                  <tr key={opp.id}>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--gold-dark)' }}>{opp.id}</span>
                    </td>
                    <td>
                      <span onClick={() => openClient360(opp.clientId, 'opportunities')}
                        style={{ fontWeight: 600, color: 'var(--apple-blue)', cursor: 'pointer', fontSize: '13px' }}>
                        {opp.clientName}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '12.5px' }}>{opp.branch}</td>
                    <td style={{ fontSize: '12.5px' }}>{opp.owner}</td>
                    <td>
                      <StagePill stage={opp.stage} />
                    </td>
                    <td style={{ maxWidth: '200px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opp.product}</div>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '13px', color: isWon ? '#1A8C45' : 'var(--gold-dark)' }}>
                        {opp.estimatedValue.toLocaleString()}
                      </span>
                    </td>
                    <td style={{ width: '120px' }}>
                      <ProbabilityBar probability={prob} />
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{opp.expectedCloseDate}</td>
                    <td>
                      <span style={{ fontSize: '12px', color: '#FF3B30', fontWeight: 500 }}>{opp.nextFollowUp}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                        <select
                          value={opp.stage}
                          onChange={e => handleStageMove(opp, e.target.value)}
                          className="form-select"
                          style={{ fontSize: '11px', padding: '3px 6px', width: '130px', height: '28px' }}
                          onClick={e => e.stopPropagation()}
                        >
                          {PIPELINE_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <button onClick={() => setSelectedOppId(opp.id)} className="btn btn-secondary btn-sm">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredOpps.length > 0 && (
            <div style={{ padding: '10px 16px', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <span>{filteredOpps.length} deals · Total Pipeline: <strong style={{ color: 'var(--gold-dark)', fontFamily: 'var(--font-mono)' }}>NPR {filteredOpps.reduce((s, o) => s + (o.estimatedValue || 0), 0).toLocaleString()}</strong></span>
              <button onClick={exportCSV} className="btn btn-ghost btn-sm" style={{ fontSize: '11.5px' }}>
                <Download size={12} /> Export this view
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── DEAL DETAIL DRAWER ─────────────────────────── */}
      {currentOppDetail && (
        <div className="modal-overlay" style={{ justifyContent: 'flex-end', padding: 0 }}>
          <div style={{
            width: '540px', height: '100vh', background: '#FFFFFF',
            display: 'flex', flexDirection: 'column',
            boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
            animation: 'slideInRight 0.25s cubic-bezier(0.4,0,0.2,1)'
          }}>
            {/* Drawer Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.04em' }}>
                    {currentOppDetail.id}
                  </span>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '3px', letterSpacing: '-0.02em' }}>
                    {currentOppDetail.clientName}
                  </h2>
                  <StagePill stage={currentOppDetail.stage} />
                </div>
                <button onClick={() => setSelectedOppId(null)} className="btn btn-ghost btn-sm" style={{ marginTop: '-2px' }}>
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Drawer Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Value card */}
              <div style={{
                background: 'linear-gradient(135deg, #F8FEFF, #EBF5FF)',
                border: '1px solid var(--apple-blue-light)',
                borderRadius: 'var(--radius-md)', padding: '16px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Jewellery Requirement
                </div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px', lineHeight: 1.35 }}>
                  {currentOppDetail.product}
                </div>
                <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-tertiary)' }}>Estimated Value</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gold-dark)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.02em' }}>
                      NPR {currentOppDetail.estimatedValue.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-tertiary)' }}>Expected Close</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{currentOppDetail.expectedCloseDate}</div>
                  </div>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                    Close Probability — {STAGE_PROBABILITY[currentOppDetail.stage]}%
                  </div>
                  <ProbabilityBar probability={STAGE_PROBABILITY[currentOppDetail.stage] || 50} />
                </div>
              </div>

              {/* Meta info grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { label: 'Boutique Branch', value: currentOppDetail.branch },
                  { label: 'Sales Representative', value: currentOppDetail.owner },
                  { label: 'Next Follow-up', value: currentOppDetail.nextFollowUp, urgent: true },
                  { label: 'Last Activity', value: currentOppDetail.lastActivity || '—' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'var(--bg-subtle)', padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: item.urgent ? '1px solid rgba(255,59,48,0.15)' : '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.label}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: item.urgent ? '#FF3B30' : 'var(--text-primary)', marginTop: '3px' }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Order Confirmed section */}
              {currentOppDetail.stage === 'Order Confirmed' ? (
                <div style={{
                  padding: '14px 16px', background: '#F0FFF4',
                  border: '1.5px solid #A3D9B1', borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1A8C45', fontWeight: 700, fontSize: '13px' }}>
                    <ShieldCheck size={17} />
                    <span>ORDER CONFIRMED & VALIDATED</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#2E7D32', marginTop: '8px', lineHeight: 1.6 }}>
                    ✓ <strong>Advance Payment:</strong> NPR {(currentOppDetail.advanceAmount || 150000).toLocaleString()} received<br />
                    ✓ <strong>Order Sheet:</strong> #{currentOppDetail.orderSheetId || 'ORD-2026-CONF-01'}<br />
                    ✓ Handed over to Master Goldsmith Workshop
                  </div>
                </div>
              ) : (
                <div style={{ padding: '12px', background: '#FFFBF0', border: '1px solid rgba(181,147,90,0.3)', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--gold-dark)' }}>Policy Note (Section 28):</strong> Move to "Order Confirmed" only after advance payment received and formal fabrication order sheet generated. Verbal commitments stay in "Costing / Design" or "Considering".
                </div>
              )}

              {/* Stage Selector */}
              <div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Update Pipeline Stage
                </div>
                <select
                  value={currentOppDetail.stage}
                  onChange={e => handleStageMove(currentOppDetail, e.target.value)}
                  className="form-select"
                  style={{ fontSize: '13.5px' }}
                >
                  {PIPELINE_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Notes */}
              <div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Activity Log & Notes
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', padding: '12px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', lineHeight: 1.6 }}>
                  {currentOppDetail.notes || 'Client evaluated diamond cut parameters and requested 3D render preview of the custom solitaire setting.'}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => { setSelectedOppId(null); openClient360(currentOppDetail.clientId, 'opportunities'); }}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '13.5px', padding: '10px' }}
              >
                Open Full Client 360 Profile →
              </button>
              <button onClick={() => setSelectedOppId(null)} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── LOST REASON MODAL ─────────────────────────── */}
      {lostModalOpp && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '460px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FF3B30', marginBottom: '14px' }}>
              <div style={{ background: '#FFEBEA', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                <AlertCircle size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Mark as Lost</h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
              Section 27 requires a verified reason why <strong>{lostModalOpp.clientName}</strong> did not proceed with <strong>{lostModalOpp.product}</strong>.
            </p>
            <div className="form-group">
              <label className="form-label">Primary Lost Reason (Required)</label>
              <select value={lostReason} onChange={e => setLostReason(e.target.value)} className="form-select">
                <option value="Price">Price / Over Budget</option>
                <option value="Not interested">Not Interested</option>
                <option value="Timing">Timing / Postponed</option>
                <option value="Product unavailable">Product Unavailable</option>
                <option value="Competitor">Chose Competitor</option>
                <option value="Waiting for occasion">Waiting for Occasion</option>
                <option value="Design not suitable">Design Not Suitable</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Sales Rep Observations</label>
              <textarea
                value={lostNotes}
                onChange={e => setLostNotes(e.target.value)}
                placeholder="Client feedback, pricing concerns, design objections..."
                className="form-textarea"
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setLostModalOpp(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleConfirmLost} className="btn btn-danger">Confirm Lost</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
