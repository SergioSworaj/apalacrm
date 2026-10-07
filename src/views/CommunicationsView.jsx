import React, { useState, useMemo, useEffect } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  MessageSquare,
  Plus,
  Phone,
  Mail,
  Search,
  Send,
  Paperclip,
  Clock,
  Check,
  CheckCheck,
  Bell,
  BellRing,
  BookmarkPlus,
  Smartphone,
  AlertCircle,
  CheckCircle2,
  Users,
  BarChart3,
  Download,
  TrendingUp,
  Calendar,
  Zap,
  Target,
  AlertTriangle,
  Info,
  Wrench,
  X
} from 'lucide-react';

export const CommunicationsView = ({ defaultTab = 'logs' }) => {
  const { communications, openClient360, setActiveModal, selectedBranch, clients, addCommunication, showToast } = useCrm();
  
  const [selectedChannel, setSelectedChannel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [selectedLog, setSelectedLog] = useState(null);
  
  // Update tab when route changes
  useEffect(() => {
    setSelectedTab(defaultTab);
  }, [defaultTab]);
  
  // WhatsApp State
  const [whatsappSearchTerm, setWhatsappSearchTerm] = useState('');
  const [showLogToCRMModal, setShowLogToCRMModal] = useState(false);
  const [selectedChatToLog, setSelectedChatToLog] = useState(null);
  const [selectedWaNumber, setSelectedWaNumber] = useState(null);
  const [showLinkClientModal, setShowLinkClientModal] = useState(false);
  const [chatToLink, setChatToLink] = useState(null);
  
  // Email Alert State
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [alertFilter, setAlertFilter] = useState('pending'); // 'pending' | 'sent' | 'all'
  const [alertSearchTerm, setAlertSearchTerm] = useState('');
  const [showCreateAlertModal, setShowCreateAlertModal] = useState(false);

  const channels = ['All', 'WhatsApp', 'Phone', 'Email'];

  // WhatsApp Business Numbers (4 executives)
  const [waBusinessNumbers] = useState([
    { id: 'wa-num-1', phoneNumber: '+977-9841001001', executiveName: 'Anisha Rai', branch: 'Baluwatar', status: 'active' },
    { id: 'wa-num-2', phoneNumber: '+977-9841001002', executiveName: 'Rohan Shrestha', branch: 'Baluwatar', status: 'active' },
    { id: 'wa-num-3', phoneNumber: '+977-9841001003', executiveName: 'Priya Gurung', branch: 'Lazimpat', status: 'active' },
    { id: 'wa-num-4', phoneNumber: '+977-9841001004', executiveName: 'Suman Tamang', branch: 'Lazimpat', status: 'active' }
  ]);

  // Mock WhatsApp chats from Coexistence API (Read-Only)
  const [whatsappRawChats] = useState([
    {
      id: 'wa-001',
      waBusinessNumber: '+977-9841001001',
      executiveName: 'Anisha Rai',
      customerNumber: '+977-9841234567',
      contactName: 'Maya Sharma',
      linkedClientId: '26-BLW-001-NS',
      isLinked: true,
      lastMessage: 'Thank you for showing me the diamond rings today!',
      lastMessageTime: '2026-10-05 11:30 AM',
      lastMessageDate: '2026-10-05',
      chatStatus: 'active',
      labels: ['Hot Lead', 'Engagement Ring'],
      messages: [
        { id: 'm1', sender: 'customer', text: 'Hello, I am interested in engagement rings', time: '10:15 AM', date: '2026-10-05' },
        { id: 'm2', sender: 'executive', text: 'Hello Maya! We have beautiful solitaire diamond rings. Would you like to visit our showroom?', time: '10:18 AM', date: '2026-10-05' },
        { id: 'm3', sender: 'customer', text: 'Yes, I can come today at 11 AM', time: '10:20 AM', date: '2026-10-05' },
        { id: 'm4', sender: 'executive', text: 'Perfect! We will be waiting for you at our Baluwatar boutique', time: '10:22 AM', date: '2026-10-05' },
        { id: 'm5', sender: 'customer', text: 'Thank you for showing me the diamond rings today!', time: '11:30 AM', date: '2026-10-05' }
      ],
      isLoggedToCRM: false,
      messageCount: 5,
      firstMessageDate: '2026-10-05',
      lastSyncedAt: '2026-10-05 11:35 AM'
    },
    {
      id: 'wa-002',
      waBusinessNumber: '+977-9841001001',
      executiveName: 'Anisha Rai',
      customerNumber: '+977-9851234888',
      contactName: 'Unknown Contact',
      linkedClientId: null,
      isLinked: false,
      lastMessage: 'Do you have gold necklace sets?',
      lastMessageTime: '2026-10-05 03:45 PM',
      lastMessageDate: '2026-10-05',
      chatStatus: 'new',
      labels: ['New Inquiry'],
      messages: [
        { id: 'm1', sender: 'customer', text: 'Do you have gold necklace sets?', time: '03:45 PM', date: '2026-10-05' },
        { id: 'm2', sender: 'customer', text: 'What is the price range?', time: '03:46 PM', date: '2026-10-05' }
      ],
      isLoggedToCRM: false,
      messageCount: 2,
      firstMessageDate: '2026-10-05',
      lastSyncedAt: '2026-10-05 03:50 PM'
    },
    {
      id: 'wa-003',
      waBusinessNumber: '+977-9841001002',
      executiveName: 'Rohan Shrestha',
      customerNumber: '+977-9801334455',
      contactName: 'Rajesh Kumar',
      linkedClientId: '26-BLW-003-NS',
      isLinked: true,
      lastMessage: 'Can I reschedule my appointment to next week?',
      lastMessageTime: '2026-10-04 02:20 PM',
      lastMessageDate: '2026-10-04',
      chatStatus: 'active',
      labels: ['Existing Client', 'Wedding Bands'],
      messages: [
        { id: 'm1', sender: 'customer', text: 'Hi, I need to discuss the wedding band designs', time: '01:15 PM', date: '2026-10-04' },
        { id: 'm2', sender: 'executive', text: 'Sure! I have some new designs to show you', time: '01:20 PM', date: '2026-10-04' },
        { id: 'm3', sender: 'customer', text: 'Can I reschedule my appointment to next week?', time: '02:20 PM', date: '2026-10-04' }
      ],
      isLoggedToCRM: true,
      messageCount: 3,
      firstMessageDate: '2026-09-15',
      lastSyncedAt: '2026-10-04 02:25 PM'
    }
  ]);

  // Automated Email Alerts (sent to executives)
  const [emailAlerts] = useState([
    {
      id: 'alert-001',
      type: 'follow-up-reminder',
      recipientExecutive: 'Anisha Rai',
      recipientEmail: 'anisha.rai@apalajewels.com',
      subject: 'Follow-up Reminder: Maya Sharma - Engagement Ring',
      body: `Hi Anisha,

This is an automated reminder to follow up with Maya Sharma regarding the 1.5 carat solitaire diamond engagement ring discussion.

Client Details:
- Name: Maya Sharma
- ID: 26-BLW-001-NS
- Last Contact: 2026-10-05
- Next Follow-up: Today

Action Required: Call or WhatsApp client to confirm appointment

Best regards,
Apala CRM System`,
      triggerType: 'scheduled',
      triggerDate: '2026-10-07',
      triggerTime: '09:00 AM',
      status: 'pending',
      linkedClientId: '26-BLW-001-NS',
      linkedClientName: 'Maya Sharma',
      priority: 'high',
      sentAt: null,
      createdAt: '2026-10-05 11:30 AM',
      createdBy: 'System'
    },
    {
      id: 'alert-002',
      type: 'deadline-warning',
      recipientExecutive: 'Rohan Shrestha',
      recipientEmail: 'rohan.shrestha@apalajewels.com',
      subject: '⚠️ Deadline Alert: Wedding Band Customization Due Tomorrow',
      body: `Hi Rohan,

URGENT: The following customization is due tomorrow.

Project: Wedding Band Set for Rajesh Kumar
Client ID: 26-BLW-003-NS
Promised Date: 2026-10-08
Current Stage: Final Polishing

Please ensure timely completion or update the client about any delays.

Apala CRM System`,
      triggerType: 'event-based',
      triggerDate: '2026-10-07',
      triggerTime: '08:00 AM',
      status: 'sent',
      linkedClientId: '26-BLW-003-NS',
      linkedClientName: 'Rajesh Kumar',
      priority: 'critical',
      sentAt: '2026-10-07 08:05 AM',
      createdAt: '2026-10-05 06:00 PM',
      createdBy: 'System'
    },
    {
      id: 'alert-003',
      type: 'client-activity',
      recipientExecutive: 'Priya Gurung',
      recipientEmail: 'priya.gurung@apalajewels.com',
      subject: '📱 New WhatsApp Message: Kritika Singh',
      body: `Hi Priya,

You have a new WhatsApp message from Kritika Singh.

Message: "When will my custom necklace be ready?"
Time: 2026-10-05 10:15 AM
Client: Kritika Singh (26-LBM-005-KS)

Please respond to the customer at your earliest convenience.

Apala CRM System`,
      triggerType: 'event-based',
      triggerDate: '2026-10-05',
      triggerTime: '10:20 AM',
      status: 'sent',
      linkedClientId: '26-LBM-005-KS',
      linkedClientName: 'Kritika Singh',
      priority: 'medium',
      sentAt: '2026-10-05 10:20 AM',
      createdAt: '2026-10-05 10:18 AM',
      createdBy: 'System'
    },
    {
      id: 'alert-004',
      type: 'task-reminder',
      recipientExecutive: 'Suman Tamang',
      recipientEmail: 'suman.tamang@apalajewels.com',
      subject: 'Task Reminder: Send Catalog to Bikash Thapa',
      body: `Hi Suman,

Reminder to complete the following task:

Task: Send ring resizing service catalog
Client: Bikash Thapa
Phone: +977-9801556677
Due: Today

The client inquired about ring resizing services via WhatsApp.

Best regards,
Apala CRM System`,
      triggerType: 'scheduled',
      triggerDate: '2026-10-07',
      triggerTime: '10:00 AM',
      status: 'pending',
      linkedClientId: null,
      linkedClientName: 'Bikash Thapa',
      priority: 'medium',
      sentAt: null,
      createdAt: '2026-10-05 12:40 PM',
      createdBy: 'System'
    },
    {
      id: 'alert-005',
      type: 'opportunity-update',
      recipientExecutive: 'Anisha Rai',
      recipientEmail: 'anisha.rai@apalajewels.com',
      subject: '💰 Opportunity Update: Maya Sharma moved to Proposal Sent',
      body: `Hi Anisha,

Good news! The opportunity for Maya Sharma has progressed.

Client: Maya Sharma (26-BLW-001-NS)
Opportunity: Diamond Solitaire Ring
Stage: Qualification → Proposal Sent
Value: NPR 250,000

Next Action: Follow up to confirm proposal acceptance

Keep up the great work!

Apala CRM System`,
      triggerType: 'event-based',
      triggerDate: '2026-10-06',
      triggerTime: '03:30 PM',
      status: 'sent',
      linkedClientId: '26-BLW-001-NS',
      linkedClientName: 'Maya Sharma',
      priority: 'low',
      sentAt: '2026-10-06 03:32 PM',
      createdAt: '2026-10-06 03:30 PM',
      createdBy: 'System'
    },
    {
      id: 'alert-006',
      type: 'service-case-escalation',
      recipientExecutive: 'Branch Manager',
      recipientEmail: 'manager.baluwatar@apalajewels.com',
      subject: '🚨 URGENT: Service Case Escalation - Quality Concern',
      body: `URGENT ESCALATION

A critical service case has been escalated to management:

Case ID: SC-026-005
Client: Priya Adhikari (26-BLW-002-NS)
Issue: Quality concern - stone setting loose
Severity: High Priority
Opened: 2 days ago
Status: Unresolved

Immediate action required. Please review and contact client.

Apala CRM System`,
      triggerType: 'event-based',
      triggerDate: '2026-10-07',
      triggerTime: '09:30 AM',
      status: 'pending',
      linkedClientId: '26-BLW-002-NS',
      linkedClientName: 'Priya Adhikari',
      priority: 'critical',
      sentAt: null,
      createdAt: '2026-10-07 09:00 AM',
      createdBy: 'System'
    }
  ]);

  const filteredCommunications = useMemo(() => {
    return communications.filter(c => {
      if (selectedBranch !== 'All Branches' && c.branch !== selectedBranch) return false;
      if (selectedChannel !== 'All' && c.channel !== selectedChannel) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return c.clientName.toLowerCase().includes(q) || c.summary?.toLowerCase().includes(q);
      }
      return true;
    });
  }, [communications, selectedBranch, selectedChannel, searchTerm]);

  const filteredWhatsAppChats = useMemo(() => {
    let chats = whatsappRawChats;
    if (selectedWaNumber) {
      chats = chats.filter(c => c.waBusinessNumber === selectedWaNumber);
    }
    if (whatsappSearchTerm.trim()) {
      const q = whatsappSearchTerm.toLowerCase();
      chats = chats.filter(chat => 
        chat.contactName.toLowerCase().includes(q) ||
        chat.customerNumber.includes(q) ||
        chat.lastMessage.toLowerCase().includes(q) ||
        chat.executiveName.toLowerCase().includes(q) ||
        chat.labels.some(label => label.toLowerCase().includes(q))
      );
    }
    return chats;
  }, [whatsappRawChats, whatsappSearchTerm, selectedWaNumber]);

  const filteredEmailAlerts = useMemo(() => {
    let alerts = emailAlerts;
    
    // Filter by status
    if (alertFilter !== 'all') {
      alerts = alerts.filter(a => a.status === alertFilter);
    }
    
    // Search filter
    if (alertSearchTerm.trim()) {
      const q = alertSearchTerm.toLowerCase();
      alerts = alerts.filter(alert => 
        alert.subject.toLowerCase().includes(q) ||
        alert.recipientExecutive.toLowerCase().includes(q) ||
        alert.linkedClientName?.toLowerCase().includes(q) ||
        alert.type.toLowerCase().includes(q)
      );
    }
    
    return alerts;
  }, [emailAlerts, alertFilter, alertSearchTerm]);

  // Analytics calculations
  const analytics = useMemo(() => {
    const last7Days = communications.filter(c => {
      const commDate = new Date(c.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return commDate >= weekAgo;
    });

    const channelBreakdown = {
      WhatsApp: communications.filter(c => c.channel === 'WhatsApp').length,
      Phone: communications.filter(c => c.channel === 'Phone').length,
      Email: communications.filter(c => c.channel === 'Email').length
    };

    return {
      totalLogs: communications.length,
      last7Days: last7Days.length,
      channelBreakdown,
      unloggedWhatsApp: whatsappRawChats.filter(c => !c.isLoggedToCRM).length,
      pendingAlerts: emailAlerts.filter(a => a.status === 'pending').length
    };
  }, [communications, whatsappRawChats, emailAlerts]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return { bg: '#FFEBEE', border: '#EF5350', text: '#C62828' };
      case 'high': return { bg: '#FFF3E0', border: '#FFA726', text: '#E65100' };
      case 'medium': return { bg: '#E3F2FD', border: '#42A5F5', text: '#1565C0' };
      case 'low': return { bg: '#E8F5E9', border: '#66BB6A', text: '#2E7D32' };
      default: return { bg: 'var(--bg-subtle)', border: 'var(--border-medium)', text: 'var(--text-secondary)' };
    }
  };

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case 'follow-up-reminder': return <Clock size={16} />;
      case 'deadline-warning': return <AlertTriangle size={16} />;
      case 'client-activity': return <Smartphone size={16} />;
      case 'task-reminder': return <CheckCircle2 size={16} />;
      case 'opportunity-update': return <TrendingUp size={16} />;
      case 'service-case-escalation': return <Wrench size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const handleSendAlertNow = (alertId) => {
    showToast('Alert email sent to executive');
    // In production: trigger email send via API
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: 0 }}>Omnichannel Communications Hub</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              WhatsApp Monitoring • Automated Executive Alerts • Communication Logs
            </p>
          </div>
          <button onClick={() => setActiveModal('add-communication')} className="btn btn-gold">
            <Plus size={16} />
            <span>Log Communication</span>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', borderBottom: '2px solid var(--border-subtle)' }}>
          {[
            { id: 'logs', label: 'Communication Logs', icon: MessageSquare },
            { id: 'whatsapp', label: 'WhatsApp Monitor', icon: Smartphone },
            { id: 'alerts', label: 'Executive Alerts', icon: BellRing }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                style={{
                  padding: '12px 20px',
                  backgroundColor: isActive ? 'var(--gold-light)' : 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '3px solid var(--gold-primary)' : '3px solid transparent',
                  color: isActive ? 'var(--gold-dark)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  marginBottom: '-2px'
                }}
              >
                <Icon size={16} />
                {tab.label}
                {tab.id === 'alerts' && analytics.pendingAlerts > 0 && (
                  <span style={{
                    padding: '2px 6px',
                    backgroundColor: '#EF5350',
                    color: 'white',
                    borderRadius: '10px',
                    fontSize: '10px',
                    fontWeight: 700
                  }}>
                    {analytics.pendingAlerts}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Communication Logs Tab */}
      {selectedTab === 'logs' && (
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search communications..."
                className="form-control"
                style={{ paddingLeft: '36px', fontSize: '13px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {channels.map(ch => (
                <button
                  key={ch}
                  onClick={() => setSelectedChannel(ch)}
                  className={`chip ${selectedChannel === ch ? 'chip-gold' : ''}`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredCommunications.map(comm => (
              <div key={comm.id} className="luxury-card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span
                    onClick={() => openClient360(comm.clientId)}
                    style={{ fontSize: '15px', fontWeight: 700, cursor: 'pointer', color: 'var(--gold-dark)' }}
                  >
                    {comm.clientName}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    {comm.date} • {comm.time}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <span className="badge badge-gold" style={{ marginRight: '8px' }}>{comm.channel}</span>
                  {comm.category} • by {comm.advisor}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0 }}>
                  {comm.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WhatsApp Monitor Tab - Coexistence Mode (Read-Only) */}
      {selectedTab === 'whatsapp' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
          {/* WhatsApp Numbers Bar */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', backgroundColor: '#F8F9FA', flexShrink: 0 }}>
            <div style={{ marginBottom: '12px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-secondary)' }}>
                📱 WhatsApp Business Numbers (Read-Only Monitoring)
              </h4>
              <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', margin: 0 }}>
                Executives chat from their own devices • Managers can view, label & link to CRM • No sending (zero API charges)
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
              <button
                onClick={() => setSelectedWaNumber(null)}
                style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: !selectedWaNumber ? '2px solid var(--gold-primary)' : '1px solid var(--border-medium)',
                  backgroundColor: !selectedWaNumber ? 'var(--gold-light)' : 'white',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '140px'
                }}
              >
                <div style={{ fontSize: '14px', marginBottom: '2px' }}>All Numbers</div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                  {whatsappRawChats.length} chats
                </div>
              </button>

              {waBusinessNumbers.map(waNum => {
                const chatCount = whatsappRawChats.filter(c => c.waBusinessNumber === waNum.phoneNumber).length;
                const isSelected = selectedWaNumber === waNum.phoneNumber;
                
                return (
                  <button
                    key={waNum.id}
                    onClick={() => setSelectedWaNumber(waNum.phoneNumber)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '2px solid var(--gold-primary)' : '1px solid var(--border-medium)',
                      backgroundColor: isSelected ? 'var(--gold-light)' : 'white',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      minWidth: '160px',
                      position: 'relative'
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '2px', color: 'var(--text-primary)' }}>
                      {waNum.executiveName}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                      {waNum.phoneNumber}
                    </div>
                    <div style={{ fontSize: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span className="badge badge-active" style={{ fontSize: '9px', padding: '2px 6px' }}>
                        {waNum.branch}
                      </span>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {chatCount} chats
                      </span>
                    </div>
                    
                    {waNum.status === 'active' && (
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#4CAF50',
                        boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.3)'
                      }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content: Chat List + Detail */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '380px 1fr', overflow: 'hidden', minHeight: 0 }}>
            {/* Chat List */}
            <div style={{ borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', backgroundColor: 'white', overflow: 'hidden' }}>
              {/* Search */}
              <div style={{ padding: '12px', borderBottom: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                <div style={{ position: 'relative' }}>
                  <Search size={14} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-tertiary)' }} />
                  <input
                    type="text"
                    value={whatsappSearchTerm}
                    onChange={(e) => setWhatsappSearchTerm(e.target.value)}
                    placeholder="Search chats, labels, executives..."
                    className="form-control"
                    style={{ paddingLeft: '36px', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Stats Bar */}
              <div style={{ padding: '12px', backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)', fontSize: '12px', flexShrink: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gold-dark)' }}>
                      {filteredWhatsAppChats.length}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Total Chats</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#4CAF50' }}>
                      {filteredWhatsAppChats.filter(c => c.isLinked).length}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Linked</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#FF9800' }}>
                      {filteredWhatsAppChats.filter(c => !c.isLinked).length}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Unlinked</div>
                  </div>
                </div>
              </div>

              {/* Chat List */}
              <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
                {filteredWhatsAppChats.length === 0 ? (
                  <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                    <Smartphone size={32} style={{ opacity: 0.3, marginBottom: '12px' }} />
                    <p style={{ fontSize: '13px' }}>No chats found</p>
                  </div>
                ) : (
                  filteredWhatsAppChats.map(chat => {
                    const isSelected = selectedChatToLog?.id === chat.id;
                    
                    return (
                      <div
                        key={chat.id}
                        onClick={() => setSelectedChatToLog(chat)}
                        style={{
                          padding: '14px',
                          borderBottom: '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          backgroundColor: isSelected ? 'var(--gold-light)' : chat.chatStatus === 'new' ? '#FFFBF0' : 'white',
                          borderLeft: isSelected ? '4px solid var(--gold-primary)' : '4px solid transparent',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = chat.chatStatus === 'new' ? '#FFFBF0' : 'white';
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '6px' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '2px' }}>
                              {chat.contactName}
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                              {chat.customerNumber}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                              {chat.lastMessageTime}
                            </div>
                            {chat.chatStatus === 'new' && (
                              <span style={{
                                padding: '2px 6px',
                                backgroundColor: '#FF9800',
                                color: 'white',
                                borderRadius: '8px',
                                fontSize: '9px',
                                fontWeight: 700
                              }}>
                                NEW
                              </span>
                            )}
                          </div>
                        </div>

                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {chat.lastMessage}
                        </p>

                        {/* Executive Badge */}
                        <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
                          👤 {chat.executiveName}
                        </div>

                        {/* Status Badges */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {chat.isLinked ? (
                            <span className="badge" style={{ fontSize: '9px', backgroundColor: '#E8F5E9', color: '#2E7D32' }}>
                              ✓ Linked: {chat.linkedClientId}
                            </span>
                          ) : (
                            <span className="badge" style={{ fontSize: '9px', backgroundColor: '#FFEBEE', color: '#C62828' }}>
                              ⚠ Not Linked
                            </span>
                          )}
                          {chat.isLoggedToCRM && (
                            <span className="badge" style={{ fontSize: '9px', backgroundColor: 'var(--gold-light)', color: 'var(--gold-dark)' }}>
                              📋 Logged
                            </span>
                          )}
                        </div>

                        {/* Labels */}
                        {chat.labels && chat.labels.length > 0 && (
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                            {chat.labels.map((label, idx) => (
                              <span
                                key={idx}
                                style={{
                                  fontSize: '9px',
                                  padding: '3px 6px',
                                  backgroundColor: '#E3F2FD',
                                  color: '#1976D2',
                                  borderRadius: '4px',
                                  fontWeight: 600
                                }}
                              >
                                🏷️ {label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Chat Detail View (Read-Only) */}
            {selectedChatToLog ? (
              <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F5F5F5', overflow: 'hidden' }}>
                {/* Chat Header */}
                <div style={{ padding: '16px 20px', backgroundColor: 'white', borderBottom: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
                        {selectedChatToLog.contactName}
                      </h3>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
                        {selectedChatToLog.customerNumber} • {selectedChatToLog.messageCount} messages
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        <strong>Executive:</strong> {selectedChatToLog.executiveName} ({selectedChatToLog.waBusinessNumber})
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                        Last synced: {selectedChatToLog.lastSyncedAt}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      {!selectedChatToLog.isLinked && (
                        <button
                          onClick={() => {
                            setChatToLink(selectedChatToLog);
                            setShowLinkClientModal(true);
                          }}
                          className="btn btn-gold btn-sm"
                        >
                          <Users size={14} />
                          <span>Link to Client</span>
                        </button>
                      )}
                      {!selectedChatToLog.isLoggedToCRM && (
                        <button
                          onClick={() => setShowLogToCRMModal(true)}
                          className="btn btn-secondary btn-sm"
                        >
                          <BookmarkPlus size={14} />
                          <span>Log to CRM</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Labels Section */}
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                      Labels:
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {selectedChatToLog.labels.map((label, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '11px',
                            padding: '4px 10px',
                            backgroundColor: '#E3F2FD',
                            color: '#1976D2',
                            borderRadius: '12px',
                            fontWeight: 600
                          }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Messages (Read-Only) - FIXED SCROLLING */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '20px', minHeight: 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedChatToLog.messages.map(msg => (
                      <div
                        key={msg.id}
                        style={{
                          alignSelf: msg.sender === 'executive' ? 'flex-end' : 'flex-start',
                          maxWidth: '70%'
                        }}
                      >
                        <div style={{
                          padding: '10px 14px',
                          backgroundColor: msg.sender === 'executive' ? 'var(--gold-light)' : 'white',
                          borderRadius: 'var(--radius-md)',
                          border: msg.sender === 'customer' ? '1px solid var(--border-subtle)' : 'none',
                          boxShadow: 'var(--shadow-sm)'
                        }}>
                          <p style={{ fontSize: '13px', margin: 0, lineHeight: 1.5, color: 'var(--text-primary)' }}>
                            {msg.text}
                          </p>
                        </div>
                        <div style={{
                          fontSize: '10px',
                          color: 'var(--text-tertiary)',
                          marginTop: '4px',
                          textAlign: msg.sender === 'executive' ? 'right' : 'left'
                        }}>
                          {msg.time} • {msg.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Read-Only Notice (No Message Input) */}
                <div style={{
                  padding: '16px 20px',
                  backgroundColor: '#FFF3E0',
                  borderTop: '1px solid #FFB74D',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flexShrink: 0
                }}>
                  <AlertCircle size={20} color="#F57C00" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#E65100', marginBottom: '2px' }}>
                      Read-Only Mode (Coexistence API)
                    </div>
                    <div style={{ fontSize: '11px', color: '#F57C00' }}>
                      Executives chat from their own WhatsApp Business app. Managers can monitor, label & link chats. No sending = Zero API charges from Meta.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
                <div style={{ textAlign: 'center' }}>
                  <Smartphone size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                  <p style={{ fontSize: '14px', marginBottom: '6px' }}>Select a chat to monitor</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    View conversations, add labels, link to clients
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Executive Alerts Tab (Email → Alerts) */}
      {selectedTab === 'alerts' && (
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '380px 1fr', overflow: 'hidden' }}>
          {/* Alert List */}
          <div style={{ borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
            {/* Toolbar */}
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <button
                  onClick={() => setAlertFilter('pending')}
                  className={`chip ${alertFilter === 'pending' ? 'chip-gold' : ''}`}
                  style={{ flex: 1 }}
                >
                  <Clock size={14} />
                  Pending
                </button>
                <button
                  onClick={() => setAlertFilter('sent')}
                  className={`chip ${alertFilter === 'sent' ? 'chip-gold' : ''}`}
                  style={{ flex: 1 }}
                >
                  <CheckCircle2 size={14} />
                  Sent
                </button>
                <button
                  onClick={() => setAlertFilter('all')}
                  className={`chip ${alertFilter === 'all' ? 'chip-gold' : ''}`}
                  style={{ flex: 1 }}
                >
                  All
                </button>
              </div>

              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-tertiary)' }} />
                <input
                  type="text"
                  value={alertSearchTerm}
                  onChange={(e) => setAlertSearchTerm(e.target.value)}
                  placeholder="Search alerts..."
                  className="form-control"
                  style={{ paddingLeft: '36px', fontSize: '13px' }}
                />
              </div>
            </div>

            {/* Stats */}
            <div style={{ padding: '12px', backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)', fontSize: '11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#FF9800' }}>
                    {emailAlerts.filter(a => a.status === 'pending').length}
                  </div>
                  <div style={{ color: 'var(--text-tertiary)' }}>Pending</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#4CAF50' }}>
                    {emailAlerts.filter(a => a.status === 'sent').length}
                  </div>
                  <div style={{ color: 'var(--text-tertiary)' }}>Sent</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#EF5350' }}>
                    {emailAlerts.filter(a => a.priority === 'critical').length}
                  </div>
                  <div style={{ color: 'var(--text-tertiary)' }}>Critical</div>
                </div>
              </div>
            </div>

            {/* Alert List */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filteredEmailAlerts.map(alert => {
                const priorityColors = getPriorityColor(alert.priority);
                const isSelected = selectedAlert?.id === alert.id;

                return (
                  <div
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    style={{
                      padding: '14px',
                      borderBottom: '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? 'var(--gold-light)' : 'white',
                      borderLeft: isSelected ? '4px solid var(--gold-primary)' : `4px solid ${priorityColors.border}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '6px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          {getAlertTypeIcon(alert.type)}
                          <span style={{ fontSize: '13px', fontWeight: 700 }}>
                            {alert.recipientExecutive}
                          </span>
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                          {alert.recipientEmail}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        {alert.status === 'pending' ? (
                          <span style={{
                            padding: '3px 8px',
                            backgroundColor: '#FFF3E0',
                            color: '#E65100',
                            borderRadius: '8px',
                            fontSize: '9px',
                            fontWeight: 700
                          }}>
                            PENDING
                          </span>
                        ) : (
                          <CheckCircle2 size={16} color="#4CAF50" />
                        )}
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: 'var(--text-primary)' }}>
                      {alert.subject}
                    </div>

                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
                      {alert.triggerDate} at {alert.triggerTime}
                    </div>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '9px',
                        padding: '3px 6px',
                        backgroundColor: priorityColors.bg,
                        color: priorityColors.text,
                        borderRadius: '4px',
                        fontWeight: 700,
                        textTransform: 'uppercase'
                      }}>
                        {alert.priority}
                      </span>
                      <span style={{
                        fontSize: '9px',
                        padding: '3px 6px',
                        backgroundColor: '#E3F2FD',
                        color: '#1976D2',
                        borderRadius: '4px',
                        fontWeight: 600
                      }}>
                        {alert.type.replace(/-/g, ' ')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alert Detail */}
          {selectedAlert ? (
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', overflowY: 'auto', padding: '24px' }}>
              {/* Header */}
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
                      {selectedAlert.subject}
                    </h2>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      <strong>To:</strong> {selectedAlert.recipientExecutive} ({selectedAlert.recipientEmail})
                    </div>
                    {selectedAlert.linkedClientId && (
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <strong>Client:</strong>{' '}
                        <span
                          onClick={() => openClient360(selectedAlert.linkedClientId)}
                          style={{ color: 'var(--gold-dark)', cursor: 'pointer', fontWeight: 600 }}
                        >
                          {selectedAlert.linkedClientName} ({selectedAlert.linkedClientId})
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{
                    padding: '8px 16px',
                    backgroundColor: getPriorityColor(selectedAlert.priority).bg,
                    color: getPriorityColor(selectedAlert.priority).text,
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>
                    {selectedAlert.priority}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ padding: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                      Trigger Type
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, textTransform: 'capitalize' }}>
                      {selectedAlert.triggerType.replace('-', ' ')}
                    </div>
                  </div>
                  <div style={{ padding: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                      Scheduled Time
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>
                      {selectedAlert.triggerDate} {selectedAlert.triggerTime}
                    </div>
                  </div>
                  <div style={{ padding: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                      Status
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, textTransform: 'capitalize' }}>
                      {selectedAlert.status}
                      {selectedAlert.sentAt && ` (${selectedAlert.sentAt})`}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {selectedAlert.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleSendAlertNow(selectedAlert.id)}
                      className="btn btn-gold btn-sm"
                    >
                      <Send size={14} />
                      <span>Send Now</span>
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      <Calendar size={14} />
                      <span>Reschedule</span>
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      <X size={14} />
                      <span>Cancel Alert</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Email Body */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Email Content</h3>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace'
                }}>
                  {selectedAlert.body}
                </div>
              </div>

              {/* Metadata */}
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  Created by {selectedAlert.createdBy} on {selectedAlert.createdAt}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                <BellRing size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                <p style={{ fontSize: '14px' }}>Select an alert to view details</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Log WhatsApp to CRM Modal */}
      {showLogToCRMModal && selectedChatToLog && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '500px' }}>
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Log WhatsApp Chat to CRM</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Save this conversation to client record or create new lead
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button className="btn btn-gold" style={{ width: '100%' }}>
                  Log to Client {selectedChatToLog.linkedClientId}
                </button>
                <button className="btn btn-secondary" style={{ width: '100%' }}>
                  Create as New Lead
                </button>
                <button
                  onClick={() => setShowLogToCRMModal(false)}
                  className="btn btn-ghost"
                  style={{ width: '100%' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
