import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  User,
  Shield,
  FileText,
  ChevronRight,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const ServiceCasesView = () => {
  const {
    serviceCases,
    openClient360,
    resolveServiceCase,
    selectedBranch
  } = useCrm();

  const [selectedCaseId, setSelectedCaseId] = useState(serviceCases[0]?.id || null);
  const [resolutionAction, setResolutionAction] = useState('');

  const filteredCases = serviceCases.filter(s => {
    if (selectedBranch !== 'All Branches' && s.branch !== selectedBranch) return false;
    return true;
  });

  const openCasesCount = filteredCases.filter(s => s.status !== 'Resolved').length;
  const urgentCount = filteredCases.filter(s => s.severity.includes('High')).length;
  const resolvedCount = filteredCases.filter(s => s.status === 'Resolved').length;

  const currentCase = filteredCases.find(s => s.id === selectedCaseId) || filteredCases[0];

  const handleResolve = () => {
    if (!currentCase || !resolutionAction) return;
    resolveServiceCase(currentCase.id, resolutionAction);
    setResolutionAction('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>Jewellery Service & Grievance Care</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
          Restorations, laser resizing, complimentary sonic cleaning, and patron grievance escalation.
        </p>
      </div>

      {/* KPI Cards (Section 35) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' }}>
        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Open Cases</div>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginTop: '4px' }}>
            {openCasesCount}
          </div>
        </div>

        <div className="luxury-card" style={{ padding: '16px', borderColor: '#FFCDD2' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#C62828', fontWeight: 600 }}>High Severity / Urgent</div>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: '#C62828', marginTop: '4px' }}>
            {urgentCount}
          </div>
        </div>

        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Resolved Successfully</div>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: '#2E7D32', marginTop: '4px' }}>
            {resolvedCount}
          </div>
        </div>

        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Patron CSAT Score</div>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)', marginTop: '4px' }}>
            4.9 / 5.0
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '20px', alignItems: 'start' }}>
        {/* Cases List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
            Service Tickets ({filteredCases.length})
          </div>

          {filteredCases.map(sc => {
            const isSelected = sc.id === currentCase?.id;
            const isGrievance = sc.type.includes('Grievance');

            return (
              <div
                key={sc.id}
                onClick={() => setSelectedCaseId(sc.id)}
                className="luxury-card"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  backgroundColor: isGrievance && sc.status !== 'Resolved' ? '#FFF5F5' : isSelected ? '#FAF7F0' : '#FFFFFF',
                  borderColor: isGrievance && sc.status !== 'Resolved' ? '#FFCDD2' : isSelected ? 'var(--gold-primary)' : 'var(--border-subtle)',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="font-mono" style={{ fontSize: '11px', color: 'var(--gold-dark)', fontWeight: 600 }}>{sc.id}</span>
                    <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '2px' }}>{sc.clientName}</div>
                  </div>
                  <span className={`badge ${sc.status === 'Resolved' ? 'badge-active' : isGrievance ? 'badge-risk' : 'badge-gold'}`}>
                    {sc.type}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {sc.product}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '6px' }}>
                  <span>Status: <strong>{sc.status}</strong></span>
                  <span style={{ color: sc.promisedResolutionDate.includes('Overdue') ? '#C62828' : 'inherit', fontWeight: sc.promisedResolutionDate.includes('Overdue') ? 700 : 400 }}>
                    Promised: {sc.promisedResolutionDate.split(' ')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Case Detail (Section 36 & 37) */}
        {currentCase && (
          <div className="luxury-card" style={{ padding: '24px' }}>
            {/* Grievance At-Risk Escalation Banner (Section 37) */}
            {currentCase.type.includes('Grievance') && currentCase.status !== 'Resolved' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#FFEBEE',
                border: '1px solid #FFCDD2',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                color: '#B71C1C',
                marginBottom: '18px'
              }}>
                <AlertCircle size={20} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>
                    HIGH SEVERITY PATRON GRIEVANCE — AT RISK CLIENT
                  </div>
                  <div style={{ fontSize: '11.5px', marginTop: '2px' }}>
                    Case escalated to Branch Director Sanjay Shrestha. All service fees waived.
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ fontSize: '1.7rem' }}>{currentCase.product}</h2>
                  <span className="font-mono text-gold" style={{ fontWeight: 600 }}>{currentCase.id}</span>
                  <span className={`badge ${currentCase.status === 'Resolved' ? 'badge-active' : 'badge-risk'}`}>
                    {currentCase.status}
                  </span>
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Client: <strong style={{ color: 'var(--text-primary)', cursor: 'pointer' }} onClick={() => openClient360(currentCase.clientId, 'service-cases')}>
                    {currentCase.clientName} ({currentCase.clientId})
                  </strong> • Accountable: <strong>{currentCase.accountablePerson}</strong>
                </div>
              </div>

              <button
                onClick={() => openClient360(currentCase.clientId, 'service-cases')}
                className="btn btn-secondary btn-sm"
              >
                <span>Client 360 Profile</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Problem & Resolution Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '20px' }}>
              <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Reported Issue & Condition</div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', marginTop: '6px', lineHeight: 1.4 }}>
                  {currentCase.problemDescription}
                </p>
                <div style={{ marginTop: '12px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  <div><strong>Severity Level:</strong> {currentCase.severity}</div>
                  <div style={{ marginTop: '3px' }}><strong>Promised Handover:</strong> {currentCase.promisedResolutionDate}</div>
                </div>
              </div>

              <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Workshop Resolution & Actions</div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', marginTop: '6px', lineHeight: 1.4 }}>
                  {currentCase.resolutionAction || 'Workshop actively completing laser welding and ultrasonic setting.'}
                </p>
                <div style={{ marginTop: '12px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  <div><strong>Client Satisfaction:</strong> {currentCase.clientSatisfaction}</div>
                  <div style={{ marginTop: '3px' }}><strong>Branch:</strong> {currentCase.branch} store</div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 600, marginBottom: '10px' }}>Service Progression Timeline</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentCase.timeline?.map(t => (
                  <div key={t.date + t.author} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px', fontSize: '12px' }}>
                    <span><strong>{t.date}</strong> — {t.action}</span>
                    <span style={{ color: 'var(--text-tertiary)' }}>{t.author}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolve Form if not resolved */}
            {currentCase.status !== 'Resolved' && (
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600, marginBottom: '6px' }}>Mark Case as Resolved</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={resolutionAction}
                    onChange={(e) => setResolutionAction(e.target.value)}
                    placeholder="Enter resolution notes (e.g. Clasp laser-welded and verified, client satisfied)..."
                    className="form-control"
                    style={{ flex: 1 }}
                  />
                  <button
                    onClick={handleResolve}
                    className="btn btn-gold"
                    disabled={!resolutionAction.trim()}
                  >
                    Resolve Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
