import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  initialClients,
  initialOpportunities,
  initialCustomizations,
  initialVisits,
  initialFollowUps,
  initialAppointments,
  initialServiceCases,
  initialCommunications,
  initialDataQualityIssues,
  initialArchivedRecords,
  ROLES,
  BRANCHES,
  ADVISORS,
  TIER_PRIVILEGES,
  PIPELINE_STAGES,
  CUSTOMIZATION_STAGES
} from '../data/mockData';

const CrmContext = createContext(null);

export const CrmProvider = ({ children }) => {
  // Navigation & Role State
  const [currentView, setCurrentView] = useState('overview');
  const [currentRole, setCurrentRole] = useState(ROLES.ADMIN);
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Flagship Client 360 State
  const [selectedClientId, setSelectedClientId] = useState('26-BLW-001-NS');
  const [activeClient360Tab, setActiveClient360Tab] = useState('overview');

  // Master Data Stores
  const [clients, setClients] = useState(initialClients);
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [customizations, setCustomizations] = useState(initialCustomizations);
  const [visits, setVisits] = useState(initialVisits);
  const [followUps, setFollowUps] = useState(initialFollowUps);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [serviceCases, setServiceCases] = useState(initialServiceCases);
  const [communications, setCommunications] = useState(initialCommunications);
  const [dataQualityIssues, setDataQualityIssues] = useState(initialDataQualityIssues);
  const [archivedRecords, setArchivedRecords] = useState(initialArchivedRecords);

  // Global Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Modal State
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  // Toast / Notification banner
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Open Client 360 Profile
  const openClient360 = (clientId, tab = 'overview') => {
    setSelectedClientId(clientId);
    setActiveClient360Tab(tab);
    setCurrentView('client-360');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Currently Selected Client
  const currentClient = useMemo(() => {
    return clients.find(c => c.id === selectedClientId) || clients[0];
  }, [clients, selectedClientId]);

  // Global Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return clients.filter(c => 
      c.id.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q))
    );
  }, [clients, searchQuery]);

  // Check Duplicates for Add Client
  const checkDuplicates = (name, phone) => {
    if (!name && !phone) return null;
    const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
    return clients.find(c => {
      const matchName = name && c.name.toLowerCase() === name.toLowerCase().trim();
      const existingCleanPhone = c.phone ? c.phone.replace(/[^0-9]/g, '') : '';
      const matchPhone = cleanPhone && existingCleanPhone && existingCleanPhone.includes(cleanPhone);
      return matchName || matchPhone;
    });
  };

  // Add Client
  const addClient = (clientData) => {
    const nextNum = clients.length + 1;
    const branchCode = (clientData.branch || 'Baluwatar') === 'Baluwatar' ? 'BLW' : 'LBM';
    const initials = clientData.name
      ? clientData.name.split(' ').map(n => n[0]).join('').toUpperCase()
      : 'XX';
    const newId = `26-${branchCode}-${String(nextNum).padStart(3, '0')}-${initials}`;

    const newClient = {
      id: newId,
      name: clientData.name,
      phone: clientData.phone,
      secondaryPhone: clientData.secondaryPhone || '',
      email: clientData.email || '',
      branch: clientData.branch || 'Baluwatar',
      owner: clientData.owner || 'Anisha Rai',
      supportingRep: clientData.supportingRep || 'Rohan Shrestha',
      tier: clientData.tier || 'Bronze',
      clientType: clientData.clientType || 'New',
      visitCount: 1,
      status: 'Active',
      engagement: clientData.engagement || 'Hot',
      occupation: clientData.occupation || 'Private Business',
      address: clientData.address || 'Kathmandu',
      gender: clientData.gender || 'Female',
      dob: clientData.dob || '',
      source: clientData.source || 'Walk-in Boutique',
      lifetimeValue: 0,
      purchasesCount: 0,
      lastVisit: new Date().toISOString().split('T')[0],
      lastPurchase: 'None',
      lastContact: 'Just now',
      nextFollowUp: 'Scheduled in 3 days',
      openOpportunity: 'None',
      activeCustomization: 'None',
      contactPermission: {
        contact: clientData.contactPermission ?? true,
        whatsapp: clientData.whatsappPermission ?? true,
        email: clientData.emailPermission ?? true,
        promotional: clientData.promotionalPermission ?? true,
      },
      preferences: {
        categories: clientData.categories || ['Rings', 'Earrings'],
        metals: clientData.metals || ['18K Yellow Gold'],
        gemstones: clientData.gemstones || ['Solitaire Diamond'],
        style: clientData.style || 'Contemporary Luxury',
        priceRange: clientData.priceRange || 'NPR 200,000 – NPR 400,000',
        communication: 'WhatsApp',
        language: 'English & Nepali',
      },
      behaviorTags: ['New Client Onboarding'],
      occasions: [],
      family: [],
      notes: clientData.notes ? [{
        id: `note-${Date.now()}`,
        author: clientData.owner || 'Anisha Rai',
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        content: clientData.notes,
        isPrivate: false
      }] : [],
      auditHistory: [{
        id: `aud-${Date.now()}`,
        date: new Date().toLocaleString(),
        author: currentRole,
        action: `Created new client record (${newId})`
      }]
    };

    setClients(prev => [newClient, ...prev]);
    showToast(`Client ${newClient.name} (${newClient.id}) created successfully`);
    return newClient;
  };

  // Transfer Ownership
  const transferOwnership = (clientId, { newOwner, supportingRep, reason }) => {
    setClients(prev => prev.map(c => {
      if (c.id !== clientId) return c;
      const oldOwner = c.owner;
      const auditEntry = {
        id: `aud-${Date.now()}`,
        date: new Date().toLocaleString(),
        author: currentRole,
        action: `Ownership transferred: ${oldOwner} → ${newOwner} (Supporting: ${supportingRep}). Reason: ${reason}`
      };
      return {
        ...c,
        owner: newOwner,
        supportingRep: supportingRep || c.supportingRep,
        auditHistory: [auditEntry, ...c.auditHistory]
      };
    }));
    showToast(`Ownership successfully transferred to ${newOwner}`);
  };

  // Update Engagement Manually
  const updateEngagement = (clientId, newEngagement) => {
    setClients(prev => prev.map(c => {
      if (c.id !== clientId) return c;
      const auditEntry = {
        id: `aud-${Date.now()}`,
        date: new Date().toLocaleString(),
        author: currentRole,
        action: `Engagement changed from ${c.engagement} → ${newEngagement}`
      };
      return {
        ...c,
        engagement: newEngagement,
        auditHistory: [auditEntry, ...c.auditHistory]
      };
    }));
    showToast(`Engagement updated to ${newEngagement}`);
  };

  // Add Note to Client
  const addClientNote = (clientId, content, isPrivate = false) => {
    setClients(prev => prev.map(c => {
      if (c.id !== clientId) return c;
      const newNote = {
        id: `note-${Date.now()}`,
        author: currentRole === ROLES.EXECUTIVE ? 'Anisha Rai' : `${currentRole}`,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        content,
        isPrivate
      };
      return {
        ...c,
        notes: [newNote, ...c.notes]
      };
    }));
    showToast('Note added to client file');
  };

  // Add Visit
  const addVisit = (visitData) => {
    const newVisit = {
      id: `vis-${Date.now()}`,
      date: visitData.date || new Date().toISOString().split('T')[0],
      time: visitData.time || '11:00 AM',
      clientId: visitData.clientId,
      clientName: visitData.clientName,
      branch: visitData.branch || 'Baluwatar',
      advisor: visitData.advisor || 'Anisha Rai',
      purpose: visitData.purpose || 'Sales & Consultation',
      outcome: visitData.outcome,
      purchase: visitData.purchase ? 'Yes' : 'No',
      salesValue: Number(visitData.salesValue) || 0,
      productCode: visitData.productCode || '',
      inventoryType: visitData.inventoryType || 'Stock Product',
      discount: visitData.discount || '0%',
      didNotPurchaseReason: visitData.didNotPurchaseReason || '',
      remarks: visitData.remarks || '',
      productInterest: visitData.productInterest || [],
      budget: visitData.budget || ''
    };

    setVisits(prev => [newVisit, ...prev]);

    // Update Client Stats and Timeline
    setClients(prev => prev.map(c => {
      if (c.id !== visitData.clientId) return c;
      const nextVisitCount = c.visitCount + 1;
      const updatedClientType = nextVisitCount >= 4 ? 'Apala Client' : `${nextVisitCount}${nextVisitCount === 2 ? 'nd' : 'rd'} Visit`;
      const isPurchased = visitData.purchase;
      const newLifetimeValue = isPurchased ? c.lifetimeValue + (Number(visitData.salesValue) || 0) : c.lifetimeValue;

      const timelineAudit = {
        id: `aud-${Date.now()}`,
        date: `${newVisit.date} ${newVisit.time}`,
        author: newVisit.advisor,
        action: `Store Visit at ${newVisit.branch}: ${newVisit.purpose}. Outcome: ${newVisit.outcome}${isPurchased ? ` (NPR ${Number(visitData.salesValue).toLocaleString()})` : ''}`
      };

      return {
        ...c,
        visitCount: nextVisitCount,
        clientType: updatedClientType,
        lastVisit: newVisit.date,
        lifetimeValue: newLifetimeValue,
        purchasesCount: isPurchased ? c.purchasesCount + 1 : c.purchasesCount,
        lastPurchase: isPurchased ? newVisit.date : c.lastPurchase,
        auditHistory: [timelineAudit, ...c.auditHistory]
      };
    }));

    showToast(`Visit recorded for ${visitData.clientName}`);
  };

  // Add Communication
  const addCommunication = (commData) => {
    const newComm = {
      id: `com-${Date.now()}`,
      date: commData.date || new Date().toISOString().split('T')[0],
      time: commData.time || '10:30 AM',
      clientId: commData.clientId,
      clientName: commData.clientName,
      channel: commData.channel || 'WhatsApp',
      direction: commData.direction || 'Outgoing',
      advisor: commData.advisor || 'Anisha Rai',
      category: commData.category || 'Product Enquiry',
      summary: commData.summary || '',
      clientResponse: commData.clientResponse || '',
      nextStep: commData.nextStep || '',
      followUpDate: commData.followUpDate || '',
      engagement: commData.engagement || 'Hot',
      chatTranscript: commData.chatTranscript || []
    };

    setCommunications(prev => [newComm, ...prev]);

    // Update Client Last Contact & Engagement
    setClients(prev => prev.map(c => {
      if (c.id !== commData.clientId) return c;
      const audit = {
        id: `aud-${Date.now()}`,
        date: `${newComm.date} ${newComm.time}`,
        author: newComm.advisor,
        action: `${newComm.channel} Communication: ${newComm.category}. Next Step: ${newComm.nextStep}`
      };
      return {
        ...c,
        lastContact: `Today, ${newComm.time}`,
        engagement: commData.engagement || c.engagement,
        nextFollowUp: commData.followUpDate || c.nextFollowUp,
        auditHistory: [audit, ...c.auditHistory]
      };
    }));

    showToast(`Communication logged for ${commData.clientName}`);
  };

  // Update Opportunity Stage (Kanban Move)
  const updateOpportunityStage = (oppId, newStage, lostData = null) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id !== oppId) return opp;
      const isConfirmed = newStage === 'Order Confirmed';
      return {
        ...opp,
        stage: newStage,
        advanceReceived: isConfirmed ? true : opp.advanceReceived,
        orderSheetCreated: isConfirmed ? true : opp.orderSheetCreated,
        lostReason: lostData ? lostData.reason : opp.lostReason,
        lostReasonNotes: lostData ? lostData.notes : opp.lostReasonNotes,
        lastActivity: `Stage moved to ${newStage} on ${new Date().toLocaleDateString()}`
      };
    }));
    showToast(`Opportunity stage updated to "${newStage}"`);
  };

  // Complete Follow-up
  const completeFollowUp = (id) => {
    setFollowUps(prev => prev.map(f => {
      if (f.id !== id) return f;
      return { ...f, status: 'Completed' };
    }));
    showToast('Follow-up marked as completed');
  };

  // Reschedule Follow-up
  const rescheduleFollowUp = (id, newDate, reason) => {
    setFollowUps(prev => prev.map(f => {
      if (f.id !== id) return f;
      const nextCount = (f.rescheduledCount || 0) + 1;
      return {
        ...f,
        dueDate: newDate,
        rescheduledCount: nextCount,
        notes: `${f.notes} | Rescheduled on ${new Date().toLocaleDateString()}: ${reason}`,
        priority: nextCount >= 2 ? 'At Risk' : f.priority
      };
    }));
    showToast(`Follow-up rescheduled to ${newDate}`);
  };

  // Update Customization Stage
  const advanceCustomizationStage = (custId, nextStageIndex) => {
    setCustomizations(prev => prev.map(cust => {
      if (cust.id !== custId) return cust;
      const stageName = [
        'Request', 'Product Type', 'Designer Assigned', 'Design',
        'Design Review', 'CAD', 'Costing', 'Client Approval',
        'Production', 'Quality Check', 'Ready', 'Delivered'
      ][nextStageIndex] || cust.currentStage;

      return {
        ...cust,
        currentStageIndex: nextStageIndex,
        currentStage: stageName
      };
    }));
    showToast(`Customization advanced to stage: ${nextStageIndex}`);
  };

  // Resolve Service Case
  const resolveServiceCase = (caseId, resolutionAction) => {
    setServiceCases(prev => prev.map(sc => {
      if (sc.id !== caseId) return sc;
      return {
        ...sc,
        status: 'Resolved',
        completedDate: new Date().toISOString().split('T')[0],
        resolutionAction
      };
    }));

    // If client had high grievance, check if we should clear at-risk flag
    showToast('Service case marked as resolved');
  };

  // Archive Record
  const archiveRecord = (record) => {
    const newArchived = {
      id: `ARC-${Date.now()}`,
      recordType: record.type || 'Client',
      title: record.title || record.name,
      details: record.details || `ID: ${record.id}`,
      deletedBy: `${currentRole}`,
      deletedDate: new Date().toISOString().split('T')[0],
      data: record
    };
    setArchivedRecords(prev => [newArchived, ...prev]);
    showToast('Record moved to archive');
  };

  // Restore Record
  const restoreRecord = (archiveId) => {
    setArchivedRecords(prev => prev.filter(a => a.id !== archiveId));
    showToast('Archived record successfully restored');
  };

  // Close Modals
  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  return (
    <CrmContext.Provider
      value={{
        // Navigation & Role
        currentView,
        setCurrentView,
        currentRole,
        setCurrentRole,
        selectedBranch,
        setSelectedBranch,
        sidebarCollapsed,
        setSidebarCollapsed,

        // Client 360
        selectedClientId,
        activeClient360Tab,
        setActiveClient360Tab,
        openClient360,
        currentClient,

        // Data Stores
        clients,
        setClients,
        opportunities,
        setOpportunities,
        customizations,
        setCustomizations,
        visits,
        setVisits,
        followUps,
        setFollowUps,
        appointments,
        setAppointments,
        serviceCases,
        setServiceCases,
        communications,
        setCommunications,
        dataQualityIssues,
        setDataQualityIssues,
        archivedRecords,
        setArchivedRecords,

        // Search
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearchOpen,
        setIsSearchOpen,

        // Modals
        activeModal,
        setActiveModal,
        modalData,
        setModalData,
        closeModal,

        // Toast
        toastMessage,
        showToast,

        // Actions
        addClient,
        checkDuplicates,
        transferOwnership,
        updateEngagement,
        addClientNote,
        addVisit,
        addCommunication,
        updateOpportunityStage,
        completeFollowUp,
        rescheduleFollowUp,
        advanceCustomizationStage,
        resolveServiceCase,
        archiveRecord,
        restoreRecord,

        // Consts
        ROLES,
        BRANCHES,
        ADVISORS,
        TIER_PRIVILEGES,
        PIPELINE_STAGES,
        CUSTOMIZATION_STAGES
      }}
    >
      {children}
    </CrmContext.Provider>
  );
};

export const useCrm = () => {
  const context = useContext(CrmContext);
  if (!context) throw new Error('useCrm must be used within a CrmProvider');
  return context;
};
