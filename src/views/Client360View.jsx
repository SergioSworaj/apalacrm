import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  User,
  Shield,
  Clock,
  Sparkles,
  Layers,
  Wrench,
  Footprints,
  Calendar,
  MessageSquare,
  ShoppingBag,
  Heart,
  FileText,
  Users2,
  Lock,
  Unlock,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Edit3,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Tag,
  ArrowLeft,
  Share2,
  Send,
  Camera,
  Info
} from 'lucide-react';

export const Client360View = () => {
  const {
    currentClient,
    clients,
    activeClient360Tab,
    setActiveClient360Tab,
    setCurrentView,
    openClient360,
    updateEngagement,
    addClientNote,
    setActiveModal,
    setModalData,
    customizations,
    visits,
    opportunities,
    followUps,
    appointments,
    serviceCases,
    communications,
    currentRole
  } = useCrm();

  const [newNoteText, setNewNoteText] = useState('');
  const [isPrivateNote, setIsPrivateNote] = useState(false);
  const [timelineFilter, setTimelineFilter] = useState('All');
  const [showActivitySignals, setShowActivitySignals] = useState(false);
  const [showEngagementMenu, setShowEngagementMenu] = useState(false);

  if (!currentClient) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Client profile not found</h2>
        <button onClick={() => setCurrentView('clients')} className="btn btn-secondary" style={{ marginTop: '16px' }}>
          Return to Directory
        </button>
      </div>
    );
  }

  // Client-specific related records
  const clientCustomizations = customizations.filter(c => c.clientId === currentClient.id);
  const clientVisits = visits.filter(v => v.clientId === currentClient.id);
  const clientOpportunities = opportunities.filter(o => o.clientId === currentClient.id);
  const clientFollowUps = followUps.filter(f => f.clientId === currentClient.id);
  const clientAppointments = appointments.filter(a => a.clientId === currentClient.id);
  const clientServiceCases = serviceCases.filter(s => s.clientId === currentClient.id);
  const clientCommunications = communications.filter(c => c.clientId === currentClient.id);

  // Check if client has active grievance
  const hasActiveGrievance = clientServiceCases.some(s => s.type.includes('Grievance') && s.status !== 'Resolved');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addClientNote(currentClient.id, newNoteText.trim(), isPrivateNote);
    setNewNoteText('');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'timeline', label: 'Timeline', icon: Clock, count: currentClient.auditHistory.length + clientVisits.length },
    { id: 'visits', label: 'Visits', icon: Footprints, count: clientVisits.length },
    { id: 'communications', label: 'Communications', icon: MessageSquare, count: clientCommunications.length },
    { id: 'opportunities', label: 'Opportunities', icon: Sparkles, count: clientOpportunities.length },
    { id: 'purchases', label: 'Purchases', icon: ShoppingBag, count: currentClient.purchasesCount },
    { id: 'customizations', label: 'Customizations', icon: Layers, count: clientCustomizations.length },
    { id: 'follow-ups', label: 'Follow-ups', icon: Clock, count: clientFollowUps.length },
    { id: 'appointments', label: 'Appointments', icon: Calendar, count: clientAppointments.length },
    { id: 'occasions', label: 'Occasions', icon: Heart, count: currentClient.occasions?.length || 0 },
    { id: 'service-cases', label: 'Service Cases', icon: Wrench, count: clientServiceCases.length },
    { id: 'family', label: 'Family', icon: Users2, count: currentClient.family?.length || 0 },
    { id: 'notes', label: 'Notes & Audit', icon: FileText, count: currentClient.notes?.length || 0 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Breadcrumb Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => setCurrentView('clients')}
          className="btn btn-ghost btn-sm"
          style={{ gap: '6px' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Client Directory</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => {
              setActiveModal('transfer-owner');
              setModalData(currentClient);
            }}
            className="btn btn-secondary btn-sm"
          >
            <Share2 size={13} />
            <span>Transfer Owner</span>
          </button>
          <button
            onClick={() => {
              setActiveModal('add-visit');
              setModalData({ clientId: currentClient.id, clientName: currentClient.name });
            }}
            className="btn btn-secondary btn-sm"
          >
            <Footprints size={13} />
            <span>+ Add Visit</span>
          </button>
          <button
            onClick={() => {
              setActiveModal('add-communication');
              setModalData({ clientId: currentClient.id, clientName: currentClient.name });
            }}
            className="btn btn-gold btn-sm"
          >
            <MessageSquare size={13} />
            <span>+ Log WhatsApp / Call</span>
          </button>
        </div>
      </div>

      {/* Flagship Client 360 Header (Section 10) */}
      <div className="luxury-card" style={{ padding: '24px 28px', backgroundColor: '#FFFFFF', position: 'relative' }}>
        {/* At Risk Grievance Banner if applicable */}
        {hasActiveGrievance && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#FFEBEE',
            border: '1px solid #FFCDD2',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '16px',
            color: '#B71C1C',
            fontSize: '12.5px',
            fontWeight: 600
          }}>
            <AlertTriangle size={18} />
            <span>CRITICAL CLIENT ALERT: Active Unresolved Service Grievance Flagged. Management Attention Required.</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2.4rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {currentClient.name}
              </h1>

              {/* Prominent Client ID (Section 6) */}
              <span className="font-mono" style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--gold-dark)',
                backgroundColor: 'var(--gold-surface)',
                border: '1px solid var(--gold-border)',
                padding: '3px 9px',
                borderRadius: 'var(--radius-xs)',
                letterSpacing: '0.04em'
              }}>
                {currentClient.id}
              </span>

              {/* Clickable Tier Badge (Section 16) */}
              <button
                onClick={() => {
                  setActiveModal('tier-privileges');
                  setModalData(currentClient);
                }}
                className={`badge badge-${currentClient.tier.toLowerCase()}`}
                style={{ cursor: 'pointer', padding: '4px 10px', fontSize: '11.5px', gap: '4px' }}
                title="Click to view Tier Privileges & VIP benefits"
              >
                <Sparkles size={12} />
                <span>{currentClient.tier} Tier</span>
                <Info size={11} style={{ opacity: 0.7 }} />
              </button>

              {/* Client Type Badge (Section 15) */}
              <span style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontSize: '11.5px',
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: 'var(--radius-xs)'
              }}>
                {currentClient.clientType} (Visit #{currentClient.visitCount})
              </span>

              {/* Status Badge (Section 17) */}
              <span className={`badge badge-${currentClient.status === 'Active' ? 'active' : currentClient.status === 'At Risk' ? 'risk' : currentClient.status === 'Stable' ? 'stable' : 'dormant'}`}>
                {currentClient.status}
              </span>

              {/* Engagement Dropdown & Activity Signals (Section 18) */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowEngagementMenu(!showEngagementMenu)}
                  className={`badge badge-${currentClient.engagement === 'Hot' ? 'hot' : currentClient.engagement === 'Drop-off' ? 'risk' : 'warm'}`}
                  style={{ cursor: 'pointer', padding: '4px 8px', fontSize: '11.5px' }}
                  title="Manual Engagement Level"
                >
                  <span>Engagement: {currentClient.engagement}</span>
                  <ChevronDown size={11} />
                </button>

                {showEngagementMenu && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 4px)',
                    left: 0,
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'var(--shadow-md)',
                    zIndex: 200,
                    width: '140px',
                    overflow: 'hidden'
                  }}>
                    {['Hot', 'Warm', 'Administrative', 'Drop-off', 'Cold'].map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => {
                          updateEngagement(currentClient.id, lvl);
                          setShowEngagementMenu(false);
                        }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '6px 10px',
                          textAlign: 'left',
                          fontSize: '11.5px',
                          border: 'none',
                          background: currentClient.engagement === lvl ? 'var(--bg-subtle)' : 'transparent',
                          cursor: 'pointer'
                        }}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Subtext: Ownership & Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <span>Boutique: <strong>{currentClient.branch}</strong></span>
              <span>•</span>
              <span>Client Owner: <strong style={{ color: 'var(--text-primary)' }}>{currentClient.owner}</strong></span>
              <span>•</span>
              <span>Supporting Rep: <strong>{currentClient.supportingRep}</strong></span>
              <span>•</span>
              <span>Occupation: <strong>{currentClient.occupation}</strong></span>
            </div>
          </div>

          {/* Quick Contact Permissions Status (Section 48) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '4px',
            fontSize: '11px',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>WhatsApp Permitted</span>
              <CheckCircle2 size={13} color="#2E7D32" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Promotional Opt-In</span>
              <CheckCircle2 size={13} color="#2E7D32" />
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Preferred: {currentClient.preferences.language}</span>
          </div>
        </div>

        {/* Quick Metrics Ribbon (Section 10) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          marginTop: '20px',
          paddingTop: '18px',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Lifetime Spend</div>
            <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)', marginTop: '2px' }}>
              NPR {currentClient.lifetimeValue.toLocaleString()}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Purchases</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
              {currentClient.purchasesCount} orders
            </div>
          </div>

          <div>
            <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Store Visits</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
              {currentClient.visitCount} visits
            </div>
          </div>

          <div>
            <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Open Deal</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#2E7D32', marginTop: '2px' }}>
              {currentClient.openOpportunity !== 'None' ? 'NPR 450,000' : 'None'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Customization</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold-dark)', marginTop: '2px' }}>
              {clientCustomizations.length > 0 ? `Day ${clientCustomizations[0].currentDay} / ${clientCustomizations[0].totalDays}` : 'None'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Last Contact</div>
            <div style={{ fontSize: '12.5px', fontWeight: 500, color: 'var(--text-primary)', marginTop: '2px' }}>
              {currentClient.lastContact}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Next Follow-up</div>
            <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#C62828', marginTop: '2px' }}>
              {currentClient.nextFollowUp}
            </div>
          </div>
        </div>
      </div>

      {/* 13 Interactive Tabs Bar (Section 10) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        borderBottom: '1px solid var(--border-medium)',
        overflowX: 'auto',
        paddingBottom: '2px'
      }}>
        {tabs.map(tab => {
          const isActive = activeClient360Tab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveClient360Tab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--gold-primary)' : '2px solid transparent',
                backgroundColor: 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '12.5px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={14} color={isActive ? 'var(--gold-dark)' : 'currentColor'} />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span style={{
                  fontSize: '10px',
                  padding: '1px 5px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isActive ? 'var(--gold-surface)' : 'var(--bg-subtle)',
                  color: isActive ? 'var(--gold-dark)' : 'var(--text-tertiary)',
                  fontWeight: 600
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT PANELS */}
      <div style={{ minHeight: '400px' }}>
        {/* TAB 1: OVERVIEW (Section 11) */}
        {activeClient360Tab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Personal Information */}
            <div className="luxury-card" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                Personal Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div><span style={{ color: 'var(--text-tertiary)', width: '120px', display: 'inline-block' }}>Full Name:</span> <strong>{currentClient.name}</strong></div>
                <div><span style={{ color: 'var(--text-tertiary)', width: '120px', display: 'inline-block' }}>Primary Phone:</span> <span className="font-mono">{currentClient.phone}</span></div>
                <div><span style={{ color: 'var(--text-tertiary)', width: '120px', display: 'inline-block' }}>Secondary Phone:</span> <span className="font-mono">{currentClient.secondaryPhone || 'None'}</span></div>
                <div><span style={{ color: 'var(--text-tertiary)', width: '120px', display: 'inline-block' }}>Email:</span> <span>{currentClient.email}</span></div>
                <div><span style={{ color: 'var(--text-tertiary)', width: '120px', display: 'inline-block' }}>Occupation:</span> <span>{currentClient.occupation}</span></div>
                <div><span style={{ color: 'var(--text-tertiary)', width: '120px', display: 'inline-block' }}>Address:</span> <span>{currentClient.address}</span></div>
                <div><span style={{ color: 'var(--text-tertiary)', width: '120px', display: 'inline-block' }}>Date of Birth:</span> <span>{currentClient.dob} (38 years)</span></div>
                <div><span style={{ color: 'var(--text-tertiary)', width: '120px', display: 'inline-block' }}>Acquisition Source:</span> <span className="badge badge-gold">{currentClient.source}</span></div>
              </div>
            </div>

            {/* Jewelry Preferences */}
            <div className="luxury-card" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                Jewelry & Style Preferences
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Product Categories</div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                    {currentClient.preferences.categories.map(cat => (
                      <span key={cat} className="badge" style={{ backgroundColor: 'var(--bg-subtle)' }}>{cat}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Preferred Precious Metals</div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                    {currentClient.preferences.metals.map(m => (
                      <span key={m} className="badge badge-gold">{m}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Gemstone Affinity</div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                    {currentClient.preferences.gemstones.map(g => (
                      <span key={g} className="badge badge-platinum">{g}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Design Aesthetic</div>
                  <div style={{ color: 'var(--text-primary)', marginTop: '2px', fontWeight: 500 }}>
                    {currentClient.preferences.style}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Price Range</div>
                  <div style={{ color: 'var(--gold-dark)', fontWeight: 700, marginTop: '2px' }}>
                    {currentClient.preferences.priceRange}
                  </div>
                </div>
              </div>
            </div>

            {/* Behaviour Tags (Section 11) */}
            <div className="luxury-card" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                Client Relationship DNA & Behaviour
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {currentClient.behaviorTags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: '5px 12px',
                      backgroundColor: 'rgba(197, 168, 128, 0.1)',
                      border: '1px solid var(--gold-border)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: 'var(--text-primary)'
                    }}
                  >
                    ✦ {tag}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '20px', padding: '14px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--gold-dark)', textTransform: 'uppercase' }}>
                  Next Scheduled Touchpoint
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>
                  22 Sep 2026 — 11:30 AM
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  3D resin ring prototype fitting in Baluwatar store with Anisha Rai and Sonam Lama.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TIMELINE (Section 12) */}
        {activeClient360Tab === 'timeline' && (
          <div className="luxury-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem' }}>Relationship Interaction Timeline</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Chronological trail across WhatsApp messages, store visits, purchases, CAD progress, and staff assignments.
                </p>
              </div>

              {/* Timeline Filter Pills (Section 12) */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {['All', 'Visits', 'Calls', 'WhatsApp', 'Sales', 'Follow-ups', 'Customization', 'Service'].map(f => (
                  <button
                    key={f}
                    onClick={() => setTimelineFilter(f)}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: timelineFilter === f ? 'var(--text-primary)' : 'var(--bg-subtle)',
                      color: timelineFilter === f ? '#FFFFFF' : 'var(--text-secondary)',
                      fontSize: '11px',
                      padding: '3px 8px'
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Vertical Chronological Feed */}
            <div style={{ position: 'relative', paddingLeft: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Vertical guideline */}
              <div style={{
                position: 'absolute',
                left: '11px',
                top: '10px',
                bottom: '10px',
                width: '2px',
                backgroundColor: 'var(--border-medium)'
              }} />

              {/* Event 1: Today WhatsApp */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-32px',
                  top: '2px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#E1F5FE',
                  border: '2px solid #0288D1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MessageSquare size={12} color="#0288D1" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold-dark)', textTransform: 'uppercase' }}>TODAY — 11:32 AM</span>
                    <span className="badge badge-hot">WhatsApp Conversation</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Advisor: Anisha Rai</span>
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, marginTop: '4px', color: 'var(--text-primary)' }}>
                    Discussed revised engagement ring design CAD turntable
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '3px', backgroundColor: 'var(--bg-subtle)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                    Client requested a smaller basket height so the diamond ring sits flush with wedding band. Sent revised 3D CAD turntable video. Niraj loved it and confirmed 3D resin sample try-on on Tuesday 11:30 AM.
                  </div>
                </div>
              </div>

              {/* Event 2: 19 Sep Store Visit */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-32px',
                  top: '2px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#E8F5E9',
                  border: '2px solid #2E7D32',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Footprints size={12} color="#2E7D32" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>19 SEP 2026 — 4:20 PM</span>
                    <span className="badge badge-active">Store Visit</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Baluwatar store • Assisted by Anisha Rai</span>
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, marginTop: '4px' }}>
                    Design Consultation with Niraj and Priya
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                    Outcome: Customization opportunity advanced to CAD stage. Client confirmed GIA 1.21ct Oval center stone parameters.
                  </div>
                </div>
              </div>

              {/* Event 3: 12 Sep Follow-up */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-32px',
                  top: '2px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#FFF3E0',
                  border: '2px solid #EF6C00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Clock size={12} color="#EF6C00" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>12 SEP 2026 — 2:10 PM</span>
                    <span className="badge badge-warm">Follow-up Completed</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>
                    Bridal Diamond Ring CAD Progress Review
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Client was travelling out of valley; rescheduled CAD review to 19 Sep boutique appointment.
                  </div>
                </div>
              </div>

              {/* Event 4: 02 Sep Purchase */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-32px',
                  top: '2px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#FDF6E9',
                  border: '2px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShoppingBag size={12} color="var(--gold-dark)" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold-dark)', textTransform: 'uppercase' }}>02 SEP 2026 — 3:15 PM</span>
                    <span className="badge badge-gold">Purchase Settled</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold-dark)' }}>NPR 425,000</span>
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, marginTop: '4px' }}>
                    18K Solitaire Gold Band & Matching Pavé Ring (Product #RNG-SOL-BND)
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Payment method: Bank Transfer • Upgraded client to VIP Gold Tier.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VISITS (Section 19, 20) */}
        {activeClient360Tab === 'visits' && (
          <div className="crm-table-container">
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.3rem' }}>Store Visit Records ({clientVisits.length})</h3>
              <button
                onClick={() => {
                  setActiveModal('add-visit');
                  setModalData({ clientId: currentClient.id, clientName: currentClient.name });
                }}
                className="btn btn-gold btn-sm"
              >
                + Record New Visit
              </button>
            </div>
            <table className="crm-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Store Branch</th>
                  <th>Sales Representative</th>
                  <th>Purpose</th>
                  <th>Outcome</th>
                  <th>Purchase</th>
                  <th>Sales Value</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {clientVisits.map(v => (
                  <tr key={v.id}>
                    <td><strong>{v.date}</strong> <span style={{ color: 'var(--text-tertiary)' }}>{v.time}</span></td>
                    <td>{v.branch}</td>
                    <td>{v.advisor}</td>
                    <td>{v.purpose}</td>
                    <td><span className="badge badge-gold">{v.outcome}</span></td>
                    <td>{v.purchase}</td>
                    <td style={{ fontWeight: 600, color: v.salesValue > 0 ? '#2E7D32' : 'inherit' }}>
                      {v.salesValue > 0 ? `NPR ${v.salesValue.toLocaleString()}` : '—'}
                    </td>
                    <td style={{ maxWidth: '280px', fontSize: '12px', color: 'var(--text-secondary)' }}>{v.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: COMMUNICATIONS (Section 24, 25) */}
        {activeClient360Tab === 'communications' && (
          <div>
            {/* Communication Log List */}
            <div className="luxury-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
                <h3 style={{ fontSize: '1.25rem' }}>All Logged Communications</h3>
                <button
                  onClick={() => {
                    setActiveModal('add-communication');
                    setModalData({ clientId: currentClient.id, clientName: currentClient.name });
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  + Log Call / Note
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {clientCommunications.map(c => (
                  <div key={c.id} style={{ padding: '12px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge badge-gold">{c.channel}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{c.date} • {c.time}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '6px' }}>{c.category}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{c.summary}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--gold-dark)', fontWeight: 600, marginTop: '4px' }}>
                      Next step: {c.nextStep}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: OPPORTUNITIES (Section 26, 27, 28) */}
        {activeClient360Tab === 'opportunities' && (
          <div className="luxury-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.35rem' }}>Active Pipeline & Commercial Deals</h3>
              <button
                onClick={() => {
                  setActiveModal('add-opportunity');
                  setModalData({ clientId: currentClient.id, clientName: currentClient.name });
                }}
                className="btn btn-gold btn-sm"
              >
                + New Opportunity
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {clientOpportunities.map(opp => (
                <div key={opp.id} style={{ padding: '16px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>{opp.product}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Deal Value: <strong style={{ color: 'var(--gold-dark)', fontSize: '14px' }}>NPR {opp.estimatedValue.toLocaleString()}</strong> • Sales Rep: {opp.owner}
                      </div>
                    </div>
                    <span className="badge badge-gold" style={{ fontSize: '12px', padding: '4px 10px' }}>{opp.stage}</span>
                  </div>

                  <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <strong>Last Activity:</strong> {opp.lastActivity}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <strong>Next Touchpoint:</strong> {opp.nextFollowUp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: PURCHASES (Section 10, 52) */}
        {activeClient360Tab === 'purchases' && (
          <div className="luxury-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.35rem' }}>Purchase History & Settled Invoices</h3>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gold-dark)' }}>
                Total Lifetime: NPR {currentClient.lifetimeValue.toLocaleString()}
              </div>
            </div>

            <table className="crm-table">
              <thead>
                <tr>
                  <th>Invoice Date</th>
                  <th>Product Item</th>
                  <th>Product Code</th>
                  <th>Inventory Type</th>
                  <th>Sales Representative</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>02 Sep 2026</strong></td>
                  <td>18K Solitaire Gold Band & Matching Pavé Ring</td>
                  <td><span className="font-mono">RNG-SOL-BND</span></td>
                  <td>Stock Product</td>
                  <td>Anisha Rai</td>
                  <td style={{ fontWeight: 700, color: '#2E7D32' }}>NPR 425,000</td>
                  <td><span className="badge badge-active">Settled</span></td>
                </tr>
                <tr>
                  <td><strong>14 Jan 2024</strong></td>
                  <td>Classic Diamond Huggie Earrings (18K White Gold)</td>
                  <td><span className="font-mono">EAR-DIA-014</span></td>
                  <td>Stock Product</td>
                  <td>Anisha Rai</td>
                  <td style={{ fontWeight: 700, color: '#2E7D32' }}>NPR 380,000</td>
                  <td><span className="badge badge-active">Settled</span></td>
                </tr>
                <tr>
                  <td><strong>18 Oct 2023</strong></td>
                  <td>Bespoke Emerald Cut Solitaire Pendant</td>
                  <td><span className="font-mono">PND-EMR-099</span></td>
                  <td>Custom Order</td>
                  <td>Rohan Shrestha</td>
                  <td style={{ fontWeight: 700, color: '#2E7D32' }}>NPR 445,000</td>
                  <td><span className="badge badge-active">Settled</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 7: CUSTOMIZATIONS (Section 29, 30, 31) */}
        {activeClient360Tab === 'customizations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {clientCustomizations.map(cust => (
              <div key={cust.id} className="luxury-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ fontSize: '1.6rem' }}>{cust.productType}</h3>
                      <span className="font-mono text-gold" style={{ fontWeight: 600 }}>{cust.id}</span>
                      <span className="badge badge-gold font-mono" style={{ fontSize: '11.5px', padding: '3px 8px' }}>
                        DAY {cust.currentDay} / {cust.totalDays}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', marginTop: '4px' }}>
                      Designer: <strong>{cust.designer}</strong> • Sales Rep: <strong>{cust.advisor}</strong> • Expected Completion: <strong>{cust.expectedCompletion}</strong>
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Agreed Cost</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)' }}>
                      NPR {cust.finalCost.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* 12-Stage Visual Progress Tracker (Section 30) */}
                <div style={{ margin: '24px 0', padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', overflowX: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: '850px' }}>
                    {[
                      'Request', 'Product Type', 'Designer Assigned', 'Design',
                      'Design Review', 'CAD', 'Costing', 'Client Approval',
                      'Production', 'Quality Check', 'Ready', 'Delivered'
                    ].map((stg, idx) => {
                      const isPast = idx < cust.currentStageIndex;
                      const isCurrent = idx === cust.currentStageIndex;

                      return (
                        <div key={stg} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', flex: 1 }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: isCurrent ? 'var(--gold-primary)' : isPast ? '#2E7D32' : '#FFFFFF',
                            border: '2px solid',
                            borderColor: isCurrent ? 'var(--gold-dark)' : isPast ? '#2E7D32' : 'var(--border-medium)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isCurrent || isPast ? '#FFFFFF' : 'var(--text-tertiary)',
                            fontSize: '10px',
                            fontWeight: 700,
                            zIndex: 2
                          }}>
                            {isPast ? '✓' : idx + 1}
                          </div>
                          <span style={{
                            fontSize: '9.5px',
                            marginTop: '6px',
                            fontWeight: isCurrent ? 700 : 500,
                            color: isCurrent ? 'var(--gold-dark)' : isPast ? 'var(--text-primary)' : 'var(--text-tertiary)',
                            textAlign: 'center',
                            whiteSpace: 'nowrap'
                          }}>
                            {stg}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Design Specifications & Version Carousel (Section 31) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                  <div style={{ padding: '14px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Gemstone & Diamond Specifications</div>
                    <div style={{ fontSize: '12.5px', marginTop: '4px', color: 'var(--text-primary)' }}>{cust.stoneSpecs}</div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600, marginTop: '12px' }}>Precious Metal Casting</div>
                    <div style={{ fontSize: '12.5px', marginTop: '4px', color: 'var(--text-primary)' }}>{cust.metalSpecs}</div>
                  </div>

                  <div style={{ padding: '14px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Design Version Revisions</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                      {cust.versions.map(v => (
                        <div key={v.version} style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '4px' }}>
                          <span><strong>{v.version}</strong>: {v.notes}</span>
                          <span className="badge badge-gold" style={{ fontSize: '10px' }}>{v.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 8: FOLLOW-UPS (Section 32, 33) */}
        {activeClient360Tab === 'follow-ups' && (
          <div className="luxury-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.35rem' }}>Active & Completed Follow-ups</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {clientFollowUps.map(f => (
                <div key={f.id} style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{f.reason}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                        Due: <strong>{f.dueDate} at {f.dueTime}</strong> • Owner: {f.owner}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`badge badge-${f.priority === 'High' ? 'risk' : 'gold'}`}>{f.priority} Priority</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Reschedules: {f.rescheduledCount} / 2</span>
                    </div>
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                    {f.notes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: APPOINTMENTS (Section 34) */}
        {activeClient360Tab === 'appointments' && (
          <div className="crm-table-container">
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.3rem' }}>Store Consultations & Appointments</h3>
            </div>
            <table className="crm-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Store Branch</th>
                  <th>Sales Representative</th>
                  <th>Purpose</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {clientAppointments.map(a => (
                  <tr key={a.id}>
                    <td><strong>{a.date}</strong> <span style={{ color: 'var(--text-tertiary)' }}>{a.time}</span></td>
                    <td>{a.branch} Store</td>
                    <td>{a.advisor}</td>
                    <td>{a.purpose}</td>
                    <td><span className="badge badge-active">{a.status}</span></td>
                    <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{a.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 10: OCCASIONS (Section 38) */}
        {activeClient360Tab === 'occasions' && (
          <div className="luxury-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem' }}>Important Client Occasions & Milestones</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Automated VIP gifting reminders and anniversary follow-ups.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {currentClient.occasions?.map(occ => (
                <div key={occ.id} style={{ padding: '14px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--text-primary)' }}>{occ.name}</span>
                    <span className="badge badge-gold">{occ.type}</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gold-dark)', marginTop: '4px' }}>
                    {occ.date}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    Reminder alert: {occ.reminder}
                  </div>
                  {occ.notes && (
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', fontStyle: 'italic' }}>
                      "{occ.notes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 11: SERVICE CASES (Section 35, 36, 37) */}
        {activeClient360Tab === 'service-cases' && (
          <div className="luxury-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '16px' }}>Service, Repair & Grievance Records</h3>
            {clientServiceCases.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No past service cases or complaints for this client.
              </div>
            ) : (
              clientServiceCases.map(sc => (
                <div key={sc.id} style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{sc.product} ({sc.type})</div>
                    <span className={`badge ${sc.status === 'Resolved' ? 'badge-active' : 'badge-risk'}`}>{sc.status}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <strong>Problem:</strong> {sc.problemDescription}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <strong>Resolution:</strong> {sc.resolutionAction}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--gold-dark)', fontWeight: 600, marginTop: '6px' }}>
                    Satisfaction: {sc.clientSatisfaction}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 12: FAMILY RELATIONSHIPS (Section 9) */}
        {activeClient360Tab === 'family' && (
          <div className="luxury-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem' }}>Family Relationship Tree</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Each family member maintains their own independent Client ID and purchasing history.
                </p>
              </div>
            </div>

            {/* Tree hierarchy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Primary Node */}
              <div style={{
                padding: '16px',
                backgroundColor: 'var(--bg-sidebar)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid var(--gold-primary)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 600 }}>{currentClient.name}</span>
                    <span className="font-mono" style={{ fontSize: '11px', color: 'var(--gold-primary)' }}>{currentClient.id}</span>
                    <span className="badge badge-gold">Primary Account</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--sidebar-text-muted)', marginTop: '2px' }}>
                    Patron since 2023 • Tier: {currentClient.tier}
                  </div>
                </div>
              </div>

              {/* Connected Family Members */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', paddingLeft: '20px', borderLeft: '2px dashed var(--gold-border)' }}>
                {currentClient.family?.map(member => (
                  <div
                    key={member.id}
                    style={{
                      padding: '14px',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: '13.5px' }}>{member.name}</span>
                      <span className="badge badge-gold font-mono" style={{ fontSize: '10.5px' }}>{member.relation}</span>
                    </div>
                    <div className="font-mono text-gold" style={{ fontSize: '11.5px', marginTop: '4px', fontWeight: 600 }}>
                      ID: {member.id}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      {member.notes}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 13: NOTES & AUDIT (Section 49, 50) */}
        {activeClient360Tab === 'notes' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Add Note Form */}
            <div className="luxury-card" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Add Client Relationship Note</h3>
              <form onSubmit={handleAddNote}>
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Record client observations, bespoke styling notes, or sensitive requests..."
                  className="form-control"
                  style={{ width: '100%', minHeight: '90px', marginBottom: '10px' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={isPrivateNote}
                      onChange={(e) => setIsPrivateNote(e.target.checked)}
                    />
                    <Lock size={12} color="var(--gold-dark)" />
                    <span>Private Note (Management Only)</span>
                  </label>

                  <button type="submit" className="btn btn-gold btn-sm">
                    Save Note
                  </button>
                </div>
              </form>

              {/* Existing Notes List */}
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentClient.notes?.map(note => (
                  <div key={note.id} style={{ padding: '12px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                      <span><strong>{note.author}</strong></span>
                      <span>{note.date}</span>
                    </div>
                    <div style={{ fontSize: '12.5px', marginTop: '6px', color: 'var(--text-primary)' }}>
                      {note.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit History Trail (Section 50) */}
            <div className="luxury-card" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Immutable Audit Log History</h3>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Every change of tier, assignment, or profile edit is logged permanently.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentClient.auditHistory?.map(aud => (
                  <div key={aud.id} style={{ padding: '10px 12px', borderLeft: '3px solid var(--gold-primary)', backgroundColor: 'var(--bg-subtle)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                      <span>{aud.date}</span>
                      <span className="badge badge-gold" style={{ fontSize: '9.5px' }}>{aud.author}</span>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', marginTop: '4px' }}>
                      {aud.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
