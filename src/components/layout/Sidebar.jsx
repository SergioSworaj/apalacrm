import React from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  LayoutDashboard,
  Users,
  User,
  UserCheck,
  Footprints,
  Calendar,
  Sparkles,
  TrendingUp,
  Layers,
  Wrench,
  Clock,
  MessageSquare,
  BarChart3,
  Building2,
  Users2,
  Settings,
  PlayCircle,
  ChevronRight
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    label: 'CRM',
    items: [
      { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'clients', label: 'Clients', icon: Users, badgeKey: 'clients' },
      { id: 'leads', label: 'Active Leads', icon: UserCheck },
    ]
  },
  {
    label: 'Sales',
    items: [
      { id: 'visits', label: 'Visits', icon: Footprints },
      { id: 'appointments', label: 'Appointments', icon: Calendar },
      { id: 'opportunities', label: 'Opportunities', icon: TrendingUp, badgeKey: 'opps' },
      { id: 'customizations', label: 'Customizations', icon: Layers, badgeKey: 'custs' },
      { id: 'follow-ups', label: 'Follow-ups', icon: Clock, badgeKey: 'followups', badgeAlert: true },
      { id: 'communications', label: 'Communications', icon: MessageSquare },
    ]
  },
  {
    label: 'Insights',
    items: [
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'branches', label: 'Branches', icon: Building2 },
      { id: 'team', label: 'Team', icon: Users2 },
      { id: 'settings', label: 'Settings', icon: Settings, adminOnly: true },
    ]
  }
];

export const Sidebar = () => {
  const {
    currentView,
    setCurrentView,
    currentRole,
    selectedBranch,
    clients,
    followUps,
    customizations,
    serviceCases,
    opportunities,
    setActiveModal,
    sidebarCollapsed,
    setSidebarCollapsed
  } = useCrm();

  const badges = {
    clients:   clients.length,
    opps:      opportunities.filter(o => o.stage !== 'Closed Successfully' && o.stage !== 'Closed Without Sale').length,
    custs:     customizations.length,
    service:   serviceCases.filter(s => s.status !== 'Resolved').length,
    followups: followUps.filter(f => f.status === 'Today' || f.status === 'Overdue').length,
  };

  const userProfile = {
    name: 'My Account',
    initials: 'MA',
    role: 'User Account',
    color: '#007AFF'
  };

  return (
    <aside style={{
      width: sidebarCollapsed ? '70px' : 'var(--sidebar-width)',
      height: '100vh',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--sidebar-border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      userSelect: 'none',
      overflowY: 'auto',
      overflowX: 'hidden',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      {/* Brand */}
      <div style={{
        padding: sidebarCollapsed ? '20px 10px 16px' : '20px 18px 16px',
        borderBottom: '1px solid var(--sidebar-border)',
        flexShrink: 0,
        transition: 'padding 0.3s ease'
      }}>
        {!sidebarCollapsed ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/src/assets/apala-logo.png" 
              alt="Apala Jewels"
              style={{
                height: 38,
                width: 'auto',
                flexShrink: 0,
                filter: 'brightness(0) invert(1)',
                objectFit: 'contain'
              }}
            />
            <div>
              <div style={{
                fontSize: '10px', color: 'var(--sidebar-text-muted)',
                fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '1px'
              }}>
                Client Relationship
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src="/src/assets/apala-logo.png" 
              alt="Apala"
              style={{
                height: 32,
                width: 'auto',
                filter: 'brightness(0) invert(1)',
                objectFit: 'contain'
              }}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '10px 10px', overflowY: 'auto' }}>
        {NAV_SECTIONS.map(section => (
          <div key={section.label} style={{ marginBottom: '4px' }}>
            {!sidebarCollapsed && (
              <div style={{
                fontSize: '10px', fontWeight: 600, color: 'var(--sidebar-text-muted)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '10px 8px 4px'
              }}>
                {section.label}
              </div>
            )}
            {section.items.map(item => {
              if (item.adminOnly && currentRole !== 'CRM Admin') return null;
              const isActive = currentView === item.id;
              const Icon = item.icon;
              const badgeCount = item.badgeKey ? badges[item.badgeKey] : null;

              return (
                <button
                  key={item.id}
                  onClick={() => { setCurrentView(item.id); window.scrollTo({ top: 0 }); }}
                  title={sidebarCollapsed ? item.label : ''}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'space-between',
                    width: '100%',
                    padding: sidebarCollapsed ? '10px' : '7.5px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.13)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--sidebar-text-muted)',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.12s ease',
                    textAlign: 'left',
                    marginBottom: '1px',
                    position: 'relative'
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#E0DDD8'; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--sidebar-text-muted)'; } }}
                >
                  {sidebarCollapsed ? (
                    <>
                      <Icon size={18} color={isActive ? '#0071E3' : 'currentColor'} strokeWidth={isActive ? 2.2 : 1.8} />
                      {badgeCount > 0 && (
                        <span style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          fontSize: '9px',
                          fontWeight: 700,
                          padding: '1px 4px',
                          borderRadius: '99px',
                          minWidth: '16px',
                          textAlign: 'center',
                          backgroundColor: item.badgeAlert ? '#FF3B30' : '#0071E3',
                          color: '#FFFFFF',
                        }}>
                          {badgeCount > 9 ? '9+' : badgeCount}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                        <Icon size={15} color={isActive ? '#0071E3' : 'currentColor'} strokeWidth={isActive ? 2.2 : 1.8} />
                        <span style={{ fontSize: '13px', fontWeight: isActive ? 600 : 450, letterSpacing: '-0.01em' }}>
                          {item.label === 'Clients' && currentRole === 'Executive' ? 'My Clients' : item.label}
                          {item.label === 'Active Leads' && currentRole === 'Executive' ? ' (Mine)' : ''}
                        </span>
                      </div>
                      {badgeCount > 0 && (
                        <span style={{
                          fontSize: '10px', fontWeight: 700,
                          padding: '1px 6px', borderRadius: '99px', minWidth: '18px', textAlign: 'center',
                          backgroundColor: item.badgeAlert ? '#FF3B30' : 'rgba(255,255,255,0.12)',
                          color: '#FFFFFF',
                        }}>
                          {badgeCount}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div style={{
        padding: sidebarCollapsed ? '12px 8px' : '12px 14px',
        borderTop: '1px solid var(--sidebar-border)',
        backgroundColor: 'var(--bg-sidebar-elevated)',
        flexShrink: 0,
        transition: 'padding 0.3s ease'
      }}>
        {!sidebarCollapsed ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div style={{
              width: 32, height: 32,
              borderRadius: '50%',
              backgroundColor: userProfile.color + '22',
              border: `1.5px solid ${userProfile.color}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: userProfile.color, fontSize: '12px', fontWeight: 700, flexShrink: 0
            }}>
              <User size={16} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#FFFFFF', fontSize: '12.5px', fontWeight: 600, lineHeight: 1.2 }}>My Account</div>
              <div style={{ color: 'var(--sidebar-text-muted)', fontSize: '10.5px', marginTop: '1px' }}>Settings & Profile</div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: '50%',
              backgroundColor: userProfile.color + '22',
              border: `1.5px solid ${userProfile.color}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: userProfile.color, fontSize: '13px', fontWeight: 700
            }}>
              <User size={18} />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
