import React, { useState, useRef, useEffect } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Search,
  Plus,
  Bell,
  ChevronDown,
  Building2,
  Shield,
  User,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle2,
  X,
  FileText,
  MessageSquare,
  Sparkles,
  Footprints,
  Menu,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';

export const Header = () => {
  const {
    currentRole,
    setCurrentRole,
    selectedBranch,
    setSelectedBranch,
    searchQuery,
    setSearchQuery,
    searchResults,
    openClient360,
    setActiveModal,
    showToast,
    BRANCHES,
    ROLES,
    sidebarCollapsed,
    setSidebarCollapsed
  } = useCrm();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const searchRef = useRef(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    setIsRoleMenuOpen(false);
    const messages = {
      'CRM Admin': 'Switched to CRM Admin: Full system access, data governance & archive unlocked.',
      'Manager': 'Switched to Manager: Executive oversight, team analytics & approvals active.',
      'Executive': 'Switched to Executive (Anisha Rai): Focused on My Clients, Leads & Follow-ups.',
      'Assistant': 'Switched to Assistant: Streamlined visit entry & communication logging enabled.'
    };
    showToast(messages[role]);
  };

  return (
    <header style={{
      height: 'var(--header-height)',
      backgroundColor: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Left: Sidebar Toggle + Global Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
            e.currentTarget.style.color = 'var(--accent-primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          {sidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </button>

        {/* Global Search */}
        <div ref={searchRef} style={{ position: 'relative', width: '380px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: isSearchFocused ? '#FFFFFF' : 'var(--bg-subtle)',
          border: '1.5px solid',
          borderColor: isSearchFocused ? 'var(--apple-blue)' : 'var(--border-medium)',
          borderRadius: 'var(--radius-sm)',
          padding: '7px 12px',
          boxShadow: isSearchFocused ? '0 0 0 3px rgba(0, 122, 255, 0.15)' : 'none',
          transition: 'all 0.15s ease'
        }}>
          <Search size={15} color={isSearchFocused ? 'var(--apple-blue)' : 'var(--text-tertiary)'} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search by Client ID (26-BLW-001-NS), name, phone..."
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              width: '100%',
              color: 'var(--text-primary)'
            }}
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-tertiary)' }}
            >
              <X size={14} />
            </button>
          ) : (
            <kbd style={{
              fontSize: '10px',
              backgroundColor: 'var(--border-subtle)',
              padding: '1px 5px',
              borderRadius: '3px',
              color: 'var(--text-tertiary)'
            }}>
              /
            </kbd>
          )}
        </div>

        {/* Live Search Results Dropdown */}
        {isSearchFocused && searchQuery.trim() && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            width: '100%',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            maxHeight: '380px',
            overflowY: 'auto',
            zIndex: 1000
          }}>
            <div style={{
              padding: '8px 12px',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--text-tertiary)',
              borderBottom: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-subtle)'
            }}>
              Matching Clients ({searchResults.length})
            </div>

            {searchResults.length === 0 ? (
              <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No client records match "{searchQuery}"
              </div>
            ) : (
              searchResults.map(client => (
                <div
                  key={client.id}
                  onClick={() => {
                    openClient360(client.id);
                    setIsSearchFocused(false);
                    setSearchQuery('');
                  }}
                  style={{
                    padding: '10px 14px',
                    borderBottom: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--text-primary)' }}>
                        {client.name}
                      </span>
                      <span className={`badge badge-${client.tier.toLowerCase()}`}>
                        {client.tier}
                      </span>
                      <span className={`badge badge-${client.engagement === 'Hot' ? 'hot' : 'warm'}`}>
                        {client.engagement}
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      <span className="font-mono text-gold" style={{ fontWeight: 600 }}>{client.id}</span>
                      <span style={{ margin: '0 6px' }}>•</span>
                      <span>{client.phone}</span>
                      <span style={{ margin: '0 6px' }}>•</span>
                      <span>Advisor: {client.owner}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--gold-dark)', fontWeight: 600 }}>
                    Open 360 →
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      </div>

      {/* Right Controls Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Branch Selector (Section 41) */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsBranchMenuOpen(!isBranchMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'var(--bg-subtle)',
              border: '1.5px solid var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12.5px',
              fontWeight: 500,
              cursor: 'pointer',
              color: 'var(--text-primary)',
              transition: 'all 0.12s ease'
            }}
          >
            <Building2 size={14} color="var(--gold-dark)" />
            <span>{selectedBranch}</span>
            <ChevronDown size={13} color="var(--text-tertiary)" />
          </button>

          {isBranchMenuOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              right: 0,
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-md)',
              minWidth: '150px',
              zIndex: 100,
              overflow: 'hidden'
            }}>
              {['All Branches', ...BRANCHES].map(b => (
                <button
                  key={b}
                  onClick={() => {
                    setSelectedBranch(b);
                    setIsBranchMenuOpen(false);
                    showToast(`Active branch filter set to: ${b}`);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 12px',
                    textAlign: 'left',
                    background: selectedBranch === b ? 'var(--bg-subtle)' : 'transparent',
                    border: 'none',
                    fontSize: '12.5px',
                    color: selectedBranch === b ? 'var(--gold-dark)' : 'var(--text-primary)',
                    fontWeight: selectedBranch === b ? 600 : 400,
                    cursor: 'pointer'
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Add Button with Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
            className="btn btn-gold"
            style={{ gap: '6px' }}
          >
            <Plus size={15} />
            <span>Action</span>
            <ChevronDown size={13} />
          </button>

          {isAddMenuOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              right: 0,
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              width: '210px',
              zIndex: 100,
              padding: '4px'
            }}>
              <button
                onClick={() => { setActiveModal('add-client'); setIsAddMenuOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  color: 'var(--text-primary)',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <User size={15} color="var(--gold-dark)" />
                <span>+ New Client</span>
              </button>

              <button
                onClick={() => { setActiveModal('add-visit'); setIsAddMenuOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  color: 'var(--text-primary)',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Footprints size={15} color="#2E7D32" />
                <span>+ Record Store Visit</span>
              </button>

              <button
                onClick={() => { setActiveModal('add-communication'); setIsAddMenuOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  color: 'var(--text-primary)',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <MessageSquare size={15} color="#0288D1" />
                <span>+ Log Communication</span>
              </button>

              <button
                onClick={() => { setActiveModal('add-opportunity'); setIsAddMenuOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  color: 'var(--text-primary)',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Sparkles size={15} color="#7B1FA2" />
                <span>+ New Opportunity</span>
              </button>
            </div>
          )}
        </div>

        {/* 9:30 AM Daily Summary Notification Bell (Section 39) */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            style={{
              position: 'relative',
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: isNotifOpen ? 'var(--bg-subtle)' : '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)'
            }}
            title="Daily Notifications & Morning Briefing"
          >
            <Bell size={16} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#D32F2F',
              border: '1.5px solid #FFFFFF'
            }} />
          </button>

          {isNotifOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              right: 0,
              width: '320px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 100,
              padding: '12px 14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  9:30 AM Daily Briefing
                </span>
                <span style={{ fontSize: '10px', color: 'var(--gold-dark)', fontWeight: 600, backgroundColor: 'var(--gold-surface)', padding: '2px 6px', borderRadius: '3px' }}>
                  TODAY
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '4px', backgroundColor: '#FFF3E0', color: '#E65100' }}>
                  <Clock size={14} />
                  <span><strong>5 Follow-ups due today</strong> (2 overdue)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '4px', backgroundColor: '#FFEBEE', color: '#C62828' }}>
                  <AlertTriangle size={14} />
                  <span><strong>1 Gold client at risk:</strong> Dr. Deepak Rajbhandari</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '4px', backgroundColor: '#E8F5E9', color: '#2E7D32' }}>
                  <Calendar size={14} />
                  <span><strong>3 Upcoming appointments</strong> in Baluwatar store</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '4px', backgroundColor: '#EDE7F6', color: '#512DA8' }}>
                  <Sparkles size={14} />
                  <span><strong>2 Customizations due this week:</strong> Niraj Shrestha (Day 18)</span>
                </div>
              </div>

              <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                <span>Delivery: In-Portal & Executive Email</span>
                <span style={{ color: 'var(--gold-dark)', cursor: 'pointer', fontWeight: 600 }} onClick={() => setIsNotifOpen(false)}>Close</span>
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher (Section 47) */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '6px 12px',
              backgroundColor: 'var(--bg-subtle)',
              border: '1.5px solid var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12.5px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.12s ease'
            }}
          >
            <Shield size={14} color="var(--apple-blue)" />
            <span>Role: <span style={{ color: 'var(--apple-blue)', fontWeight: 600 }}>{currentRole}</span></span>
            <ChevronDown size={13} color="var(--text-tertiary)" />
          </button>

          {isRoleMenuOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              right: 0,
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              width: '230px',
              zIndex: 100,
              padding: '6px'
            }}>
              <div style={{ padding: '6px 10px', fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                Demo Role Simulation
              </div>
              {Object.values(ROLES).map(role => (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: currentRole === role ? 'var(--gold-surface)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: currentRole === role ? 'var(--gold-dark)' : 'var(--text-primary)' }}>
                    {role}
                  </span>
                  <span style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    {role === 'CRM Admin' && 'Full permissions, archive, data center'}
                    {role === 'Manager' && 'Advisor performance, approvals'}
                    {role === 'Executive' && 'My clients & opportunities (Anisha Rai)'}
                    {role === 'Assistant' && 'Rapid visit & communication entry'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
