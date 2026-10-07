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
  Filter,
  RefreshCw,
  Reply,
  Forward,
  MoreVertical,
  Star,
  BookmarkPlus,
  Smartphone,
  Inbox,
  Send as SendIcon,
  Archive,
  Trash2,
  Upload,
  FileText,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  BarChart3,
  Calendar,
  Eye,
  Download,
  AlertCircle,
  CheckCircle2
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
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [whatsappSearchTerm, setWhatsappSearchTerm] = useState('');
  const [showLogToCRMModal, setShowLogToCRMModal] = useState(false);
  const [selectedChatToLog, setSelectedChatToLog] = useState(null);
  
  // Email State
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailFilter, setEmailFilter] = useState('inbox');
  const [emailSearchTerm, setEmailSearchTerm] = useState('');
  const [showEmailLogModal, setShowEmailLogModal] = useState(false);
  const [selectedEmailToLog, setSelectedEmailToLog] = useState(null);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');

  const channels = ['All', 'WhatsApp', 'Phone', 'Email'];

  // WhatsApp Business Numbers (4 executives)
  const [waBusinessNumbers] = useState([
    { id: 'wa-num-1', phoneNumber: '+977-9841001001', executiveName: 'Anisha Rai', branch: 'Baluwatar', status: 'active' },
    { id: 'wa-num-2', phoneNumber: '+977-9841001002', executiveName: 'Rohan Shrestha', branch: 'Baluwatar', status: 'active' },
    { id: 'wa-num-3', phoneNumber: '+977-9841001003', executiveName: 'Priya Gurung', branch: 'Lazimpat', status: 'active' },
    { id: 'wa-num-4', phoneNumber: '+977-9841001004', executiveName: 'Suman Tamang', branch: 'Lazimpat', status: 'active' }
  ]);

  const [selectedWaNumber, setSelectedWaNumber] = useState(null);
  const [chatLabels, setChatLabels] = useState({});
  const [showLinkClientModal, setShowLinkClientModal] = useState(false);
  const [chatToLink, setChatToLink] = useState(null);

  // Mock WhatsApp chats from Coexistence API (Read-Only from 4 WA Business numbers)
  const [whatsappRawChats] = useState([
    {
      id: 'wa-001',
      waBusinessNumber: '+977-9841001001', // Anisha Rai's number
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
      waBusinessNumber: '+977-9841001001', // Anisha Rai's number
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
      waBusinessNumber: '+977-9841001002', // Rohan Shrestha's number
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
    },
    {
      id: 'wa-004',
      waBusinessNumber: '+977-9841001003', // Priya Gurung's number
      executiveName: 'Priya Gurung',
      customerNumber: '+977-9801445566',
      contactName: 'Kritika Singh',
      linkedClientId: '26-LBM-005-KS',
      isLinked: true,
      lastMessage: 'When will my custom necklace be ready?',
      lastMessageTime: '2026-10-05 10:15 AM',
      lastMessageDate: '2026-10-05',
      chatStatus: 'active',
      labels: ['VIP', 'Customization Follow-up'],
      messages: [
        { id: 'm1', sender: 'customer', text: 'Hi Priya, checking on my custom necklace order', time: '10:10 AM', date: '2026-10-05' },
        { id: 'm2', sender: 'executive', text: 'Hello Kritika! Let me check the status for you', time: '10:12 AM', date: '2026-10-05' },
        { id: 'm3', sender: 'customer', text: 'When will my custom necklace be ready?', time: '10:15 AM', date: '2026-10-05' }
      ],
      isLoggedToCRM: false,
      messageCount: 3,
      firstMessageDate: '2026-09-20',
      lastSyncedAt: '2026-10-05 10:20 AM'
    },
    {
      id: 'wa-005',
      waBusinessNumber: '+977-9841001004', // Suman Tamang's number
      executiveName: 'Suman Tamang',
      customerNumber: '+977-9801556677',
      contactName: 'Bikash Thapa',
      linkedClientId: null,
      isLinked: false,
      lastMessage: 'Do you do ring resizing?',
      lastMessageTime: '2026-10-05 12:30 PM',
      lastMessageDate: '2026-10-05',
      chatStatus: 'new',
      labels: ['Service Inquiry'],
      messages: [
        { id: 'm1', sender: 'customer', text: 'Hello, do you do ring resizing?', time: '12:28 PM', date: '2026-10-05' },
        { id: 'm2', sender: 'customer', text: 'Do you do ring resizing?', time: '12:30 PM', date: '2026-10-05' }
      ],
      isLoggedToCRM: false,
      messageCount: 2,
      firstMessageDate: '2026-10-05',
      lastSyncedAt: '2026-10-05 12:35 PM'
    }
  ]);

  // Mock emails
  const [emails] = useState([
    {
      id: 'email-001',
      fromEmail: 'priya.adhikari@gmail.com',
      fromName: 'Priya Adhikari',
      linkedClientId: '26-BLW-002-NS',
      subject: 'Inquiry about custom engagement ring design',
      preview: 'Hi, I saw your Instagram post about custom designs...',
      body: `Hi,

I saw your Instagram post about custom designs and I'm interested in creating a unique engagement ring for my fiancé.

Could you share more details about the process, timeline, and pricing?

Thank you,
Priya`,
      receivedTime: '2026-10-04 03:15 PM',
      isRead: true,
      isStarred: false,
      folder: 'inbox',
      attachments: [],
      isLoggedToCRM: true,
      hasAttachment: false,
      category: 'Product Enquiry',
      sentiment: 'Positive'
    },
    {
      id: 'email-002',
      fromEmail: 'suman.rana@hotmail.com',
      fromName: 'Suman Rana',
      linkedClientId: null,
      subject: 'Quote request for wedding jewelry set',
      preview: 'Dear Apala Team, We are planning our wedding in December...',
      body: `Dear Apala Team,

We are planning our wedding in December 2026 and would like to get a quote for:
- Bridal necklace set (22K gold)
- Matching earrings and bangles
- Groom's kada

Please send the catalog and price range.

Best regards,
Suman Rana`,
      receivedTime: '2026-10-05 09:40 AM',
      isRead: false,
      isStarred: true,
      folder: 'inbox',
      attachments: [],
      isLoggedToCRM: false,
      hasAttachment: false,
      category: 'Quote Request',
      sentiment: 'Neutral'
    },
    {
      id: 'email-003',
      fromEmail: 'kritika.singh@company.com',
      fromName: 'Kritika Singh',
      linkedClientId: '26-BLW-007-NS',
      subject: 'Thank you for the beautiful necklace!',
      preview: 'Hi Anisha, Just wanted to say thank you for helping me...',
      body: `Hi Anisha,

Just wanted to say thank you for helping me choose the perfect diamond necklace. My husband loved it and the craftsmanship is exceptional!

I'll definitely recommend Apala to my friends.

Warm regards,
Kritika`,
      receivedTime: '2026-10-03 11:20 AM',
      isRead: true,
      isStarred: true,
      folder: 'inbox',
      attachments: [],
      isLoggedToCRM: true,
      hasAttachment: false,
      category: 'Testimonial',
      sentiment: 'Very Positive'
    }
  ]);

  const filteredCommunications = useMemo(() => {
    return communications.filter(c => {
      if (selectedBranch !== 'All Branches' && c.branch !== selectedBranch) return false;
      if (selectedChannel !== 'All' && c.channel !== selectedChannel) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return c.clientName.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q);
      }
      return true;
    });
  }, [communications, selectedBranch, selectedChannel, searchTerm]);

  const filteredWhatsAppChats = useMemo(() => {
    let chats = whatsappRawChats;
    
    // Filter by selected WA Business number
    if (selectedWaNumber) {
      chats = chats.filter(c => c.waBusinessNumber === selectedWaNumber);
    }
    
    // Search filter
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

  const filteredEmails = useMemo(() => {
    let filtered = emails.filter(e => e.folder === emailFilter);
    if (emailSearchTerm.trim()) {
      const q = emailSearchTerm.toLowerCase();
      filtered = filtered.filter(e => 
        e.fromName.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q) ||
        e.preview.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [emails, emailFilter, emailSearchTerm]);

  // Analytics calculations
  const analytics = useMemo(() => {
    const last7Days = communications.filter(c => {
      const commDate = new Date(c.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return commDate >= weekAgo;
    });

    const last30Days = communications.filter(c => {
      const commDate = new Date(c.date);
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      return commDate >= monthAgo;
    });

    const channelBreakdown = {
      WhatsApp: communications.filter(c => c.channel === 'WhatsApp').length,
      Phone: communications.filter(c => c.channel === 'Phone').length,
      Email: communications.filter(c => c.channel === 'Email').length
    };

    const engagementBreakdown = {
      Hot: communications.filter(c => c.engagement === 'Hot').length,
      Warm: communications.filter(c => c.engagement === 'Warm').length,
      Cold: communications.filter(c => c.engagement === 'Cold').length,
      Administrative: communications.filter(c => c.engagement === 'Administrative').length
    };

    const categoryBreakdown = {};
    communications.forEach(c => {
      categoryBreakdown[c.category] = (categoryBreakdown[c.category] || 0) + 1;
    });

    const topCategories = Object.entries(categoryBreakdown)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const directionBreakdown = {
      Incoming: communications.filter(c => c.direction === 'Incoming').length,
      Outgoing: communications.filter(c => c.direction === 'Outgoing').length
    };

    return {
      totalLogs: communications.length,
      last7Days: last7Days.length,
      last30Days: last30Days.length,
      channelBreakdown,
      engagementBreakdown,
      topCategories,
      directionBreakdown,
      avgResponseTime: '2.3 hours',
      unloggedWhatsApp: whatsappRawChats.filter(c => !c.isLoggedToCRM).length,
      unloggedEmail: emails.filter(e => !e.isLoggedToCRM).length
    };
  }, [communications, whatsappRawChats, emails]);

  const handleLogWhatsAppChat = (chat) => {
    setSelectedChatToLog(chat);
    setShowLogToCRMModal(true);
  };

  const confirmLogWhatsAppChat = (targetType, targetId) => {
    const chatTranscript = selectedChatToLog.messages
      .map(m => `[${m.time}] ${m.sender === 'us' ? 'Us' : selectedChatToLog.contactName}: ${m.text}`)
      .join('\n');

    addCommunication({
      clientId: targetId,
      clientName: targetType === 'client' ? clients.find(c => c.id === targetId)?.name : 'New Lead',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      channel: 'WhatsApp',
      direction: selectedChatToLog.messages[0].sender === 'client' ? 'Incoming' : 'Outgoing',
      advisor: 'Anisha Rai',
      category: 'Product Enquiry',
      summary: `WhatsApp conversation with ${selectedChatToLog.contactName} (${selectedChatToLog.phoneNumber})`,
      clientResponse: selectedChatToLog.lastMessage,
      nextStep: 'Follow up on inquiry',
      followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      engagement: 'Hot',
      fullTranscript: chatTranscript
    });

    showToast(`Chat logged to ${targetType === 'client' ? 'client CRM' : 'lead'} successfully`);
    setShowLogToCRMModal(false);
    setSelectedChatToLog(null);
  };

  const handleLogEmail = (email) => {
    setSelectedEmailToLog(email);
    setShowEmailLogModal(true);
  };

  const confirmLogEmail = (targetType, targetId) => {
    addCommunication({
      clientId: targetId,
      clientName: targetType === 'client' ? clients.find(c => c.id === targetId)?.name : 'New Lead',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      channel: 'Email',
      direction: 'Incoming',
      advisor: 'Anisha Rai',
      category: selectedEmailToLog.category || 'Product Enquiry',
      summary: `Email: ${selectedEmailToLog.subject}`,
      clientResponse: selectedEmailToLog.preview,
      nextStep: 'Send detailed response',
      followUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      engagement: 'Warm',
      fullTranscript: selectedEmailToLog.body
    });

    showToast(`Email logged to ${targetType === 'client' ? 'client CRM' : 'lead'} successfully`);
    setShowEmailLogModal(false);
    setSelectedEmailToLog(null);
  };

  const handleLinkToClient = (chat) => {
    setChatToLink(chat);
    setShowLinkClientModal(true);
  };

  const confirmLinkToClient = (clientId) => {
    // In production, this would update via WhatsApp Coexistence API
    showToast(`Chat linked to client ${clients.find(c => c.id === clientId)?.name}`);
    setShowLinkClientModal(false);
    setChatToLink(null);
  };

  const handleAddLabel = (chatId, newLabel) => {
    // In production, update via API
    setChatLabels(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newLabel]
    }));
    showToast(`Label "${newLabel}" added to chat`);
  };

  const handleRemoveLabel = (chatId, labelToRemove) => {
    setChatLabels(prev => ({
      ...prev,
      [chatId]: (prev[chatId] || []).filter(l => l !== labelToRemove)
    }));
    showToast(`Label "${labelToRemove}" removed`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: 0 }}>Omnichannel Communications Hub</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              WhatsApp Business, Email, Phone - All interactions in one place
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
            { id: 'whatsapp', label: 'WhatsApp Business', icon: Smartphone },
            { id: 'email', label: 'Email Inbox', icon: Mail }
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
              </button>
            );
          })}
        </div>
      </div>

      {/* Communication Logs Tab */}
      {selectedTab === 'logs' && (
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', overflow: 'hidden' }}>
          {/* Left: Analytics */}
          <div style={{ borderRight: '1px solid var(--border-subtle)', overflowY: 'auto', padding: '20px', backgroundColor: '#F8F9FA' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>Analytics Overview</h3>

            {/* Total Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div className="luxury-card" style={{ padding: '16px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                  Total Logs
                </div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--gold-dark)' }}>
                  {analytics.totalLogs}
                </div>
              </div>

              <div className="luxury-card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                  Activity
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px' }}>Last 7 days</span>
                  <span style={{ fontSize: '14px', fontWeight: 700 }}>{analytics.last7Days}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px' }}>Last 30 days</span>
                  <span style={{ fontSize: '14px', fontWeight: 700 }}>{analytics.last30Days}</span>
                </div>
              </div>

              <div className="luxury-card" style={{ padding: '12px', backgroundColor: '#FFF3E0', borderColor: '#FFA726' }}>
                <div style={{ fontSize: '11px', color: '#E65100', marginBottom: '4px', fontWeight: 600 }}>
                  NEEDS ATTENTION
                </div>
                <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                  <AlertCircle size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  {analytics.unloggedWhatsApp} unlogged WhatsApp chats
                </div>
                <div style={{ fontSize: '12px' }}>
                  <AlertCircle size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  {analytics.unloggedEmail} unlogged emails
                </div>
              </div>
            </div>

            {/* Channel Breakdown */}
            <div className="luxury-card" style={{ padding: '16px', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>By Channel</h4>
              {Object.entries(analytics.channelBreakdown).map(([channel, count]) => (
                <div key={channel} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span>{channel}</span>
                    <span style={{ fontWeight: 700 }}>{count}</span>
                  </div>
                  <div style={{
                    height: '6px',
                    backgroundColor: 'var(--border-subtle)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${(count / analytics.totalLogs) * 100}%`,
                      height: '100%',
                      backgroundColor: channel === 'WhatsApp' ? 'var(--gold-primary)' : channel === 'Phone' ? '#4CAF50' : '#2196F3',
                      transition: 'width 0.3s'
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Engagement Level */}
            <div className="luxury-card" style={{ padding: '16px', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>Engagement Level</h4>
              {Object.entries(analytics.engagementBreakdown).map(([level, count]) => (
                <div key={level} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px',
                  marginBottom: '6px',
                  backgroundColor: level === 'Hot' ? '#FFEBEE' : 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px'
                }}>
                  <span style={{
                    fontWeight: 600,
                    color: level === 'Hot' ? '#C62828' : 'var(--text-primary)'
                  }}>
                    {level}
                  </span>
                  <span style={{ fontWeight: 700 }}>{count}</span>
                </div>
              ))}
            </div>

            {/* Top Categories */}
            <div className="luxury-card" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>Top Categories</h4>
              {analytics.topCategories.map(([category, count], idx) => (
                <div key={category} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  fontSize: '12px',
                  borderBottom: idx < analytics.topCategories.length - 1 ? '1px solid var(--border-subtle)' : 'none'
                }}>
                  <span>{category}</span>
                  <span style={{ fontWeight: 700, color: 'var(--gold-dark)' }}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Logs List */}
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Search & Filters */}
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
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
                <button className="btn btn-secondary btn-sm">
                  <Download size={14} />
                  <span>Export</span>
                </button>
              </div>

              {/* Channel Filter */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {channels.map(ch => (
                  <button
                    key={ch}
                    onClick={() => setSelectedChannel(ch)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-sm)',
                      border: selectedChannel === ch ? '2px solid var(--gold-primary)' : '1px solid var(--border-medium)',
                      backgroundColor: selectedChannel === ch ? 'var(--gold-light)' : 'white',
                      color: selectedChannel === ch ? 'var(--gold-dark)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Logs */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredCommunications.map(comm => (
                  <div
                    key={comm.id}
                    onClick={() => setSelectedLog(comm)}
                    className="luxury-card"
                    style={{
                      padding: '16px',
                      cursor: 'pointer',
                      backgroundColor: selectedLog?.id === comm.id ? 'var(--bg-subtle)' : 'white',
                      borderLeft: selectedLog?.id === comm.id ? '4px solid var(--gold-primary)' : '4px solid transparent'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                      <div>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            openClient360(comm.clientId);
                          }}
                          style={{
                            fontSize: '14px',
                            fontWeight: 700,
                            color: 'var(--gold-dark)',
                            cursor: 'pointer'
                          }}
                        >
                          {comm.clientName}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginLeft: '8px' }}>
                          {comm.date} • {comm.time}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span className="badge badge-gold" style={{ fontSize: '10px' }}>
                          {comm.channel}
                        </span>
                        <span style={{
                          fontSize: '10px',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          backgroundColor: comm.engagement === 'Hot' ? '#FFEBEE' : comm.engagement === 'Warm' ? '#FFF3E0' : 'var(--bg-subtle)',
                          color: comm.engagement === 'Hot' ? '#C62828' : comm.engagement === 'Warm' ? '#E65100' : 'var(--text-secondary)',
                          fontWeight: 700
                        }}>
                          {comm.engagement}
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      <strong>{comm.category}</strong> • {comm.direction} • by {comm.advisor}
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.5 }}>
                      {comm.summary}
                    </p>

                    {comm.clientResponse && (
                      <div style={{
                        padding: '8px 12px',
                        backgroundColor: 'var(--gold-light)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px'
                      }}>
                        <strong>Client Response:</strong> {comm.clientResponse}
                      </div>
                    )}

                    {comm.nextStep && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          <strong>Next:</strong> {comm.nextStep}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          Follow-up: {comm.followUpDate}
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                {filteredCommunications.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)' }}>
                    No communications found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Tab */}
      {selectedTab === 'whatsapp' && (
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '360px 1fr', overflow: 'hidden' }}>
          {/* Chat List */}
          <div style={{ borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-tertiary)' }} />
                <input
                  type="text"
                  value={whatsappSearchTerm}
                  onChange={(e) => setWhatsappSearchTerm(e.target.value)}
                  placeholder="Search chats..."
                  className="form-control"
                  style={{ paddingLeft: '36px', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filteredWhatsAppChats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChatToLog(chat)}
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    backgroundColor: selectedChatToLog?.id === chat.id ? 'var(--gold-light)' : chat.unreadCount > 0 ? '#FFFBF0' : 'white',
                    borderLeft: selectedChatToLog?.id === chat.id ? '4px solid var(--gold-primary)' : '4px solid transparent'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '6px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '2px' }}>
                        {chat.contactName}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        {chat.phoneNumber}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                        {chat.lastMessageTime}
                      </div>
                      {chat.unreadCount > 0 && (
                        <span style={{
                          padding: '2px 6px',
                          backgroundColor: 'var(--gold-primary)',
                          color: 'white',
                          borderRadius: '10px',
                          fontSize: '10px',
                          fontWeight: 700
                        }}>
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {chat.lastMessage}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {chat.isLinked && (
                      <span className="badge badge-active" style={{ fontSize: '9px' }}>
                        Linked: {chat.linkedClientId}
                      </span>
                    )}
                    {chat.isLoggedToCRM && (
                      <span className="badge" style={{ fontSize: '9px', backgroundColor: '#E8F5E9', color: '#2E7D32' }}>
                        ✓ Logged
                      </span>
                    )}
                    {!chat.isLoggedToCRM && (
                      <span className="badge" style={{ fontSize: '9px', backgroundColor: '#FFEBEE', color: '#C62828' }}>
                        Not Logged
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Detail */}
          {selectedChatToLog ? (
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F0F0F0' }}>
              {/* Chat Header */}
              <div style={{ padding: '16px 20px', backgroundColor: 'white', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
                      {selectedChatToLog.contactName}
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                      {selectedChatToLog.phoneNumber} • {selectedChatToLog.messageCount} messages
                    </div>
                  </div>
                  {!selectedChatToLog.isLoggedToCRM && (
                    <button
                      onClick={() => setShowLogToCRMModal(true)}
                      className="btn btn-gold btn-sm"
                    >
                      <BookmarkPlus size={14} />
                      <span>Log to CRM</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedChatToLog.messages.map(msg => (
                    <div
                      key={msg.id}
                      style={{
                        alignSelf: msg.sender === 'us' ? 'flex-end' : 'flex-start',
                        maxWidth: '70%'
                      }}
                    >
                      <div style={{
                        padding: '10px 14px',
                        backgroundColor: msg.sender === 'us' ? 'var(--gold-light)' : 'white',
                        borderRadius: 'var(--radius-md)',
                        border: msg.sender === 'client' ? '1px solid var(--border-subtle)' : 'none',
                        boxShadow: 'var(--shadow-sm)'
                      }}>
                        <p style={{ fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
                          {msg.text}
                        </p>
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: 'var(--text-tertiary)',
                        marginTop: '4px',
                        textAlign: msg.sender === 'us' ? 'right' : 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        justifyContent: msg.sender === 'us' ? 'flex-end' : 'flex-start'
                      }}>
                        {msg.time}
                        {msg.sender === 'us' && (
                          msg.status === 'read' ? <CheckCheck size={12} color="var(--gold-primary)" /> :
                          msg.status === 'delivered' ? <CheckCheck size={12} color="var(--text-tertiary)" /> :
                          <Check size={12} color="var(--text-tertiary)" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div style={{ padding: '16px 20px', backgroundColor: 'white', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-ghost btn-sm">
                    <Paperclip size={16} />
                  </button>
                  <input
                    type="text"
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="form-control"
                    style={{ flex: 1 }}
                  />
                  <button className="btn btn-gold">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
              <div style={{ textAlign: 'center' }}>
                <Smartphone size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                <p>Select a chat to view messages</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Email Tab */}
      {selectedTab === 'email' && (
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '360px 1fr', overflow: 'hidden' }}>
          {/* Email List */}
          <div style={{ borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-tertiary)' }} />
                <input
                  type="text"
                  value={emailSearchTerm}
                  onChange={(e) => setEmailSearchTerm(e.target.value)}
                  placeholder="Search emails..."
                  className="form-control"
                  style={{ paddingLeft: '36px', fontSize: '13px' }}
                />
              </div>

              {/* Folder Filter */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {['inbox', 'sent', 'archive'].map(folder => (
                  <button
                    key={folder}
                    onClick={() => setEmailFilter(folder)}
                    style={{
                      flex: 1,
                      padding: '6px 12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-sm)',
                      border: emailFilter === folder ? '2px solid var(--gold-primary)' : '1px solid var(--border-medium)',
                      backgroundColor: emailFilter === folder ? 'var(--gold-light)' : 'white',
                      color: emailFilter === folder ? 'var(--gold-dark)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {folder}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filteredEmails.map(email => (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  style={{
                    padding: '14px 16px',
                    borderBottom: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    backgroundColor: selectedEmail?.id === email.id ? 'var(--gold-light)' : !email.isRead ? '#FFFBF0' : 'white',
                    borderLeft: selectedEmail?.id === email.id ? '4px solid var(--gold-primary)' : '4px solid transparent'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '6px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: !email.isRead ? 700 : 600, marginBottom: '2px' }}>
                        {email.fromName}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        {email.fromEmail}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                        {email.receivedTime.split(' ')[0]}
                      </div>
                      {email.isStarred && (
                        <Star size={12} fill="var(--gold-primary)" color="var(--gold-primary)" style={{ marginTop: '4px' }} />
                      )}
                    </div>
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: !email.isRead ? 700 : 500, marginBottom: '4px' }}>
                    {email.subject}
                  </div>

                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {email.preview}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span className="badge" style={{ fontSize: '9px', backgroundColor: '#E3F2FD', color: '#1976D2' }}>
                      {email.category}
                    </span>
                    {email.linkedClientId && (
                      <span className="badge badge-active" style={{ fontSize: '9px' }}>
                        {email.linkedClientId}
                      </span>
                    )}
                    {email.isLoggedToCRM ? (
                      <span className="badge" style={{ fontSize: '9px', backgroundColor: '#E8F5E9', color: '#2E7D32' }}>
                        ✓ Logged
                      </span>
                    ) : (
                      <span className="badge" style={{ fontSize: '9px', backgroundColor: '#FFEBEE', color: '#C62828' }}>
                        Not Logged
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Detail */}
          {selectedEmail ? (
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', overflowY: 'auto' }}>
              <div style={{ padding: '24px' }}>
                {/* Email Header */}
                <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>
                    {selectedEmail.subject}
                  </h2>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>
                        {selectedEmail.fromName}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                        {selectedEmail.fromEmail}
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                      {selectedEmail.receivedTime}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setShowReplyBox(!showReplyBox)} className="btn btn-gold btn-sm">
                      <Reply size={14} />
                      <span>Reply</span>
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      <Forward size={14} />
                      <span>Forward</span>
                    </button>
                    {!selectedEmail.isLoggedToCRM && (
                      <button
                        onClick={() => handleLogEmail(selectedEmail)}
                        className="btn btn-secondary btn-sm"
                      >
                        <BookmarkPlus size={14} />
                        <span>Log to CRM</span>
                      </button>
                    )}
                    <button className="btn btn-secondary btn-sm">
                      <Archive size={14} />
                    </button>
                  </div>
                </div>

                {/* Email Body */}
                <div style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
                  {selectedEmail.body}
                </div>

                {/* Reply Box */}
                {showReplyBox && (
                  <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Reply</h4>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      className="form-textarea"
                      rows={6}
                    />
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                      <button className="btn btn-gold">
                        <Send size={14} />
                        <span>Send Reply</span>
                      </button>
                      <button onClick={() => setShowReplyBox(false)} className="btn btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
              <div style={{ textAlign: 'center' }}>
                <Mail size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                <p>Select an email to view</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Log WhatsApp to CRM Modal */}
      {showLogToCRMModal && selectedChatToLog && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '500px' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Log WhatsApp Chat to CRM</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Choose where to save this conversation: existing client or new lead
              </p>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '13px', fontWeight: 700 }}>{selectedChatToLog.contactName}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{selectedChatToLog.phoneNumber}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  {selectedChatToLog.messageCount} messages
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => {
                    if (selectedChatToLog.linkedClientId) {
                      confirmLogWhatsAppChat('client', selectedChatToLog.linkedClientId);
                    } else {
                      alert('Please select a client first');
                    }
                  }}
                  className="btn btn-gold"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Log to Existing Client {selectedChatToLog.linkedClientId && `(${selectedChatToLog.linkedClientId})`}
                </button>

                <button
                  onClick={() => confirmLogWhatsAppChat('lead', 'LEAD-NEW')}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Create as New Lead
                </button>

                <button
                  onClick={() => setShowLogToCRMModal(false)}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Email to CRM Modal */}
      {showEmailLogModal && selectedEmailToLog && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '500px' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Log Email to CRM</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Save this email to a client record or create a new lead
              </p>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '13px', fontWeight: 700 }}>{selectedEmailToLog.fromName}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{selectedEmailToLog.fromEmail}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Subject: {selectedEmailToLog.subject}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => {
                    if (selectedEmailToLog.linkedClientId) {
                      confirmLogEmail('client', selectedEmailToLog.linkedClientId);
                    } else {
                      alert('Please select a client first');
                    }
                  }}
                  className="btn btn-gold"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Log to Existing Client {selectedEmailToLog.linkedClientId && `(${selectedEmailToLog.linkedClientId})`}
                </button>

                <button
                  onClick={() => confirmLogEmail('lead', 'LEAD-NEW')}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Create as New Lead
                </button>

                <button
                  onClick={() => setShowEmailLogModal(false)}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'center' }}
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
