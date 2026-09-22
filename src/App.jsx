import React from 'react';
import { CrmProvider, useCrm } from './context/CrmContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

// Views
import { DashboardView } from './views/DashboardView';
import { ClientDirectoryView } from './views/ClientDirectoryView';
import { Client360View } from './views/Client360View';
import { ActiveLeadsView } from './views/ActiveLeadsView';
import { VisitsView } from './views/VisitsView';
import { OpportunitiesView } from './views/OpportunitiesView';
import { CustomizationsView } from './views/CustomizationsView';
import { FollowUpsView } from './views/FollowUpsView';
import { AppointmentsView } from './views/AppointmentsView';
import { CommunicationsView } from './views/CommunicationsView';
import { ServiceCasesView } from './views/ServiceCasesView';
import { AnalyticsView } from './views/AnalyticsView';
import { BranchesView } from './views/BranchesView';
import { TeamView } from './views/TeamView';
import { SettingsView } from './views/SettingsView';

// Modals
import { AddClientModal } from './components/modals/AddClientModal';
import { AddVisitModal } from './components/modals/AddVisitModal';
import { AddCommunicationModal } from './components/modals/AddCommunicationModal';
import { AddOpportunityModal } from './components/modals/AddOpportunityModal';
import { TierPrivilegesDrawer } from './components/modals/TierPrivilegesDrawer';
import { TransferOwnershipModal } from './components/modals/TransferOwnershipModal';
import { DemoWalkthroughModal } from './components/demo/DemoWalkthroughModal';

const AppContent = () => {
  const { currentView, activeModal, toastMessage } = useCrm();

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <DashboardView />;
      case 'clients':
        return <ClientDirectoryView />;
      case 'client-360':
        return <Client360View />;
      case 'leads':
        return <ActiveLeadsView />;
      case 'visits':
        return <VisitsView />;
      case 'opportunities':
        return <OpportunitiesView />;
      case 'customizations':
        return <CustomizationsView />;
      case 'follow-ups':
        return <FollowUpsView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'communications':
        return <CommunicationsView />;
      case 'service-cases':
        return <ServiceCasesView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'branches':
        return <BranchesView />;
      case 'team':
        return <TeamView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-layout">
      {/* Persistent Luxury Sidebar */}
      <Sidebar />

      {/* Main Column */}
      <div className="app-main">
        <Header />

        <main className="app-content">
          {renderView()}
        </main>
      </div>

      {/* Dynamic Modals */}
      {activeModal === 'add-client' && <AddClientModal />}
      {activeModal === 'add-visit' && <AddVisitModal />}
      {activeModal === 'add-communication' && <AddCommunicationModal />}
      {activeModal === 'add-opportunity' && <AddOpportunityModal />}
      {activeModal === 'tier-privileges' && <TierPrivilegesDrawer />}
      {activeModal === 'transfer-owner' && <TransferOwnershipModal />}
      {activeModal === 'demo-tour' && <DemoWalkthroughModal />}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#151518',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '13px',
          fontWeight: 500,
          borderLeft: '4px solid var(--gold-primary)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <span>✦ {toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <CrmProvider>
      <AppContent />
    </CrmProvider>
  );
}
