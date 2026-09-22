import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  X,
  Play,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Search,
  User,
  Clock,
  Layers,
  Calendar,
  Wrench,
  Shield,
  RotateCcw
} from 'lucide-react';

export const DemoWalkthroughModal = () => {
  const {
    closeModal,
    setCurrentView,
    openClient360,
    setActiveClient360Tab,
    setCurrentRole,
    setSearchQuery,
    setIsSearchOpen,
    showToast,
    ROLES
  } = useCrm();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const demoSteps = [
    {
      step: 1,
      title: 'Step 1: Open Operational Dashboard',
      description: 'The main dashboard communicates the health of Apala Jewels operations with 8 live KPI cards and Today’s Priorities actionable queue.',
      action: () => {
        setCurrentView('overview');
        showToast('Step 1: Dashboard opened with today’s priorities');
      }
    },
    {
      step: 2,
      title: 'Step 2: Global Search for Flagship Patron',
      description: 'Demonstrates real-time lookup using unique Client ID (26-BLW-001-NS) or name (Niraj Shrestha).',
      action: () => {
        setSearchQuery('26-BLW-001-NS');
        showToast('Step 2: Searched for "26-BLW-001-NS"');
      }
    },
    {
      step: 3,
      title: 'Step 3: Open Niraj Shrestha Client 360',
      description: 'Opens the flagship Client 360 profile — the central command heart of the entire product.',
      action: () => {
        setSearchQuery('');
        openClient360('26-BLW-001-NS', 'overview');
        showToast('Step 3: Opened Niraj Shrestha Client 360');
      }
    },
    {
      step: 4,
      title: 'Step 4: Review Client Relationship DNA',
      description: 'Review Tier (Gold), Status (Active), Engagement (Hot), Owner (Anisha Rai), Family relationships, and luxury preferences.',
      action: () => {
        openClient360('26-BLW-001-NS', 'overview');
        showToast('Step 4: Reviewing personal details & jewelry preferences');
      }
    },
    {
      step: 5,
      title: 'Step 5: Review Store Visits History',
      description: 'Shows previous store visits at Baluwatar store including try-on consultations and purchases.',
      action: () => {
        openClient360('26-BLW-001-NS', 'visits');
        showToast('Step 5: Inspecting in-store visit records');
      }
    },
    {
      step: 6,
      title: 'Step 6: Review Omnichannel Timeline',
      description: 'Vertical chronological feed: WhatsApp message → Store Visit → Opportunity → Purchase → Follow-up.',
      action: () => {
        openClient360('26-BLW-001-NS', 'timeline');
        showToast('Step 6: Inspecting chronological interaction timeline');
      }
    },
    {
      step: 7,
      title: 'Step 7: Active Commercial Opportunity',
      description: 'Shows the active NPR 450,000 Solitaire Engagement Ring in the Costing / Design stage.',
      action: () => {
        openClient360('26-BLW-001-NS', 'opportunities');
        showToast('Step 7: Inspecting active NPR 450K opportunity');
      }
    },
    {
      step: 8,
      title: 'Step 8: Bespoke Customization Atelier (Day 18 / 45)',
      description: 'Shows the complete 12-stage CAD fabrication journey, designer Sonam Lama, and V1/V2 revisions.',
      action: () => {
        openClient360('26-BLW-001-NS', 'customizations');
        showToast('Step 8: Inspecting Day 18/45 CAD customization');
      }
    },
    {
      step: 9,
      title: 'Step 9: Scheduled Follow-up Touchpoint',
      description: 'Shows scheduled 3D resin sample fitting due 22 Sep with reschedule counter.',
      action: () => {
        openClient360('26-BLW-001-NS', 'follow-ups');
        showToast('Step 9: Inspecting follow-up queue');
      }
    },
    {
      step: 10,
      title: 'Step 10: Appointment Calendar',
      description: 'Navigates to the unified Appointment Calendar showing private store viewing bookings across branches.',
      action: () => {
        setCurrentView('appointments');
        showToast('Step 10: Opened store Appointment Calendar');
      }
    },
    {
      step: 11,
      title: 'Step 11: Service Care & Repairs',
      description: 'Navigates to Service Cases showing ring sizing resolution and grievance safeguards.',
      action: () => {
        setCurrentView('service-cases');
        showToast('Step 11: Opened Service & Repairs module');
      }
    },
    {
      step: 12,
      title: 'Step 12: Role Simulation — Executive (Anisha Rai)',
      description: 'Demonstrates the focused sales advisor experience: "My Clients", "My Leads", and streamlined tasks.',
      action: () => {
        setCurrentRole(ROLES.EXECUTIVE);
        setCurrentView('clients');
        showToast('Step 12: Switched to Executive Role (Anisha Rai)');
      }
    },
    {
      step: 13,
      title: 'Step 13: Role Simulation — Manager (Sanjay Shrestha)',
      description: 'Demonstrates manager dashboard: subordinate advisor performance and branch numbers.',
      action: () => {
        setCurrentRole(ROLES.MANAGER);
        setCurrentView('team');
        showToast('Step 13: Switched to Manager Role (Team oversight)');
      }
    },
    {
      step: 14,
      title: 'Step 14: Role Simulation — CRM Admin',
      description: 'Demonstrates full system governance: Data Quality Center, duplicate merging, and archive restore.',
      action: () => {
        setCurrentRole(ROLES.ADMIN);
        setCurrentView('settings');
        showToast('Step 14: Switched to CRM Admin (Full Governance)');
      }
    }
  ];

  const currentStep = demoSteps[currentStepIndex];

  const handleExecute = () => {
    currentStep.action();
  };

  const handleNext = () => {
    if (currentStepIndex < demoSteps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      demoSteps[nextIdx].action();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      demoSteps[prevIdx].action();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '580px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--gold-dark)" />
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>14-Step Presentation Tour</h2>
          </div>
          <button onClick={closeModal} className="btn btn-ghost btn-sm">
            <X size={18} />
          </button>
        </div>

        {/* Step Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0 8px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--gold-dark)', fontWeight: 700 }}>
            Section 57 Evaluation Flow
          </span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Step {currentStep.step} of 14
          </span>
        </div>

        {/* Current Step Card */}
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--gold-border)',
          margin: '10px 0 20px'
        }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
            {currentStep.title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {currentStep.description}
          </p>

          <button
            onClick={handleExecute}
            className="btn btn-gold"
            style={{ marginTop: '16px', gap: '6px' }}
          >
            <Play size={14} />
            <span>Apply & View This Step</span>
          </button>
        </div>

        {/* Step Navigation Dots */}
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '20px' }}>
          {demoSteps.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => {
                setCurrentStepIndex(idx);
                s.action();
              }}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: currentStepIndex === idx ? 'var(--gold-primary)' : 'var(--border-medium)',
                color: currentStepIndex === idx ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: '9px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {s.step}
            </button>
          ))}
        </div>

        {/* Modal Footer Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="btn btn-secondary"
            style={{ opacity: currentStepIndex === 0 ? 0.5 : 1 }}
          >
            <ArrowLeft size={14} />
            <span>Previous</span>
          </button>

          <button onClick={closeModal} className="btn btn-ghost btn-sm">
            Exit Tour
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === demoSteps.length - 1}
            className="btn btn-primary"
            style={{ opacity: currentStepIndex === demoSteps.length - 1 ? 0.5 : 1 }}
          >
            <span>Next Step</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
