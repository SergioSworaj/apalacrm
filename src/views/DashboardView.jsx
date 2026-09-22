import React, { useState, useMemo } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Users,
  Sparkles,
  Clock,
  Calendar,
  Layers,
  Wrench,
  AlertTriangle,
  UserX,
  ArrowUpRight,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Filter,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export const DashboardView = () => {
  const {
    openClient360,
    setCurrentView,
    followUps,
    appointments,
    customizations,
    serviceCases,
    completeFollowUp,
    rescheduleFollowUp,
    setActiveModal,
    setModalData,
    currentRole,
    selectedBranch,
    clients,
    opportunities,
    visits
  } = useCrm();

  const [dateRange, setDateRange] = useState('Today');

  // Mock data for charts - in production, this would come from actual data aggregation
  const clientGrowthData = useMemo(() => [
    { month: 'Jan', clients: 2240, new: 42 },
    { month: 'Feb', clients: 2298, new: 58 },
    { month: 'Mar', clients: 2356, new: 58 },
    { month: 'Apr', clients: 2401, new: 45 },
    { month: 'May', clients: 2441, new: 40 },
    { month: 'Jun', clients: 2486, new: 45 },
  ], []);

  const tierDistributionData = useMemo(() => {
    const tierCounts = clients.reduce((acc, c) => {
      acc[c.tier] = (acc[c.tier] || 0) + 1;
      return acc;
    }, {});
    return [
      { name: 'Platinum', value: tierCounts['Platinum'] || 0, color: '#AF52DE' },
      { name: 'Gold', value: tierCounts['Gold'] || 0, color: '#0071E3' },
      { name: 'Silver', value: tierCounts['Silver'] || 0, color: '#8E8E93' },
      { name: 'Bronze', value: tierCounts['Bronze'] || 0, color: '#D1D1D6' },
    ];
  }, [clients]);

  const engagementData = useMemo(() => {
    const engagementCounts = clients.reduce((acc, c) => {
      acc[c.engagement] = (acc[c.engagement] || 0) + 1;
      return acc;
    }, {});
    return [
      { name: 'Hot', value: engagementCounts['Hot'] || 0, color: '#FF3B30' },
      { name: 'Warm', value: engagementCounts['Warm'] || 0, color: '#FF9500' },
      { name: 'Administrative', value: engagementCounts['Administrative'] || 0, color: '#007AFF' },
      { name: 'Drop-off', value: engagementCounts['Drop-off'] || 0, color: '#8E8E93' },
      { name: 'Cold', value: engagementCounts['Cold'] || 0, color: '#D1D1D6' },
    ];
  }, [clients]);

  const pipelineData = useMemo(() => [
    { stage: 'Walk-in', count: 12, value: 2.4 },
    { stage: 'Qualification', count: 18, value: 4.2 },
    { stage: 'Design', count: 24, value: 6.8 },
    { stage: 'Considering', count: 32, value: 8.6 },
    { stage: 'Decision', count: 21, value: 5.9 },
    { stage: 'Confirmed', count: 14, value: 6.3 },
  ], []);

  // Filter items for today's priority list
  const priorityFollowUps = followUps.slice(0, 3);
  const todayAppointments = appointments.slice(0, 3);
  const activeCustomizations = customizations.slice(0, 2);

  // Dynamic greeting based on current role
  const advisorName = currentRole === 'Executive' ? 'Anisha' : currentRole === 'Manager' ? 'Sanjay' : 'Siddharth';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header & Greeting */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '16px'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            Good morning, {advisorName} 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginTop: '4px' }}>
            Here's what needs your attention across Apala Jewels clienteling operations.
          </p>
        </div>

        {/* Date Selector — Apple segment control */}
        <div className="segment-control">
          {['Today', 'This Week', 'This Month'].map(period => (
            <button
              key={period}
              className={`segment-btn${dateRange === period ? ' active' : ''}`}
              onClick={() => setDateRange(period)}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid — Apple-inspired */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: '12px' }}>
        {[
          { label: 'Total Clients', value: '2,486', delta: '+14 this month', deltaUp: true, icon: <Users size={17} />, color: '#007AFF', view: 'clients' },
          { label: 'Opportunities', value: '186', delta: 'NPR 34.2M pipeline', icon: <TrendingUp size={17} />, color: '#5856D6', view: 'opportunities' },
          { label: 'Follow-ups Due', value: '24', delta: '5 priority today', urgent: true, icon: <Clock size={17} />, color: '#FF3B30', view: 'follow-ups' },
          { label: 'Appointments', value: '8', delta: 'Both stores booked', icon: <Calendar size={17} />, color: '#007AFF', view: 'appointments' },
          { label: 'Customizations', value: '17', delta: '4 awaiting sign-off', icon: <Layers size={17} />, color: '#B5935A', view: 'customizations' },
          { label: 'At-Risk Clients', value: '31', delta: 'Action required', urgent: true, icon: <AlertTriangle size={17} />, color: '#FF3B30', view: 'clients' },
          { label: 'Total Visits', value: '143', delta: 'This month', icon: <PhoneCall size={17} />, color: '#34C759', view: 'visits' },
        ].map((kpi, i) => (
          <div
            key={i}
            onClick={() => setCurrentView(kpi.view)}
            style={{
              background: '#FFFFFF', borderRadius: 'var(--radius-md)',
              padding: '16px', cursor: 'pointer',
              border: '1px solid var(--border-subtle)',
              borderTop: `3px solid ${kpi.color}`,
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {kpi.label}
              </span>
              <div style={{ color: kpi.color, background: kpi.color + '15', padding: '5px', borderRadius: '6px' }}>
                {kpi.icon}
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: kpi.urgent ? kpi.color : 'var(--text-primary)', letterSpacing: '-0.03em', fontFamily: 'var(--font-mono)' }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: '11px', color: kpi.urgent ? kpi.color : kpi.deltaUp ? '#34C759' : 'var(--text-tertiary)', marginTop: '4px', fontWeight: kpi.urgent ? 600 : 400 }}>
              {kpi.deltaUp && '↑ '}{kpi.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics & Visualizations Section */}
      <div>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>Business Insights</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Real-time analytics and performance metrics across client engagement and sales pipeline.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '16px' }}>
          {/* Client Growth Trend */}
          <div className="luxury-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Client Growth Trend</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Last 6 months · Total growth +246 clients
                </p>
              </div>
              <TrendingUp size={18} color="#34C759" />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={clientGrowthData}>
                <defs>
                  <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0071E3" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0071E3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6E6E73' }} stroke="#D1D1D6" />
                <YAxis tick={{ fontSize: 11, fill: '#6E6E73' }} stroke="#D1D1D6" />
                <Tooltip
                  contentStyle={{ background: '#FFFFFF', border: '1px solid #E5E5EA', borderRadius: '8px', fontSize: '12px' }}
                  labelStyle={{ fontWeight: 600, color: '#1D1D1F' }}
                />
                <Area type="monotone" dataKey="clients" stroke="#0071E3" strokeWidth={2} fillOpacity={1} fill="url(#colorClients)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Tier Distribution */}
          <div className="luxury-card" style={{ padding: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Client Tier Distribution</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Loyalty program segmentation
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie
                    data={tierDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {tierDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E5E5EA', borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {tierDistributionData.map((tier) => (
                  <div key={tier.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: 10, height: 10, borderRadius: '2px', background: tier.color }} />
                      <span style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{tier.name}</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {tier.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Engagement Levels */}
          <div className="luxury-card" style={{ padding: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Client Engagement Levels</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Current relationship temperature
              </p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={engagementData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6E6E73' }} stroke="#D1D1D6" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#6E6E73' }} stroke="#D1D1D6" width={100} />
                <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E5E5EA', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pipeline Funnel */}
          <div className="luxury-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Sales Pipeline Value</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  NPR 34.2M total pipeline · 121 active opportunities
                </p>
              </div>
              <Sparkles size={18} color="#0071E3" />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                <XAxis dataKey="stage" tick={{ fontSize: 10, fill: '#6E6E73' }} stroke="#D1D1D6" />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#6E6E73' }} stroke="#D1D1D6" />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#6E6E73' }} stroke="#D1D1D6" />
                <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E5E5EA', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar yAxisId="left" dataKey="count" fill="#007AFF" name="Deals" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="value" fill="#0071E3" name="Value (M)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Today's Priorities Action Section (Section 4) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>Today's Priorities</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Actionable tasks requiring client communication, appointments, and workshop oversight.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('follow-ups')}
            className="btn btn-secondary btn-sm"
          >
            <span>View All Follow-ups</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {/* Card 1: Follow-ups Due */}
          <div className="luxury-card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="var(--gold-dark)" />
                <span style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--text-primary)' }}>Follow-ups Due Today</span>
              </div>
              <span className="badge badge-risk">{priorityFollowUps.length} due</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {priorityFollowUps.map(f => (
                <div
                  key={f.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div
                        onClick={() => openClient360(f.clientId, 'follow-ups')}
                        style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}
                      >
                        {f.clientName}
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {f.reason}
                      </div>
                    </div>
                    <span className={`badge badge-${f.engagement === 'Hot' ? 'hot' : f.engagement === 'Drop-off' ? 'risk' : 'warm'}`}>
                      {f.engagement}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    <span>Advisor: <strong>{f.owner}</strong> • Due: <strong>{f.dueTime}</strong></span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => {
                          setActiveModal('add-communication');
                          setModalData({ clientId: f.clientId, clientName: f.clientName });
                        }}
                        className="btn btn-sm btn-gold"
                        style={{ padding: '3px 8px', fontSize: '11px' }}
                      >
                        Contact
                      </button>
                      <button
                        onClick={() => completeFollowUp(f.id)}
                        className="btn btn-sm btn-secondary"
                        style={{ padding: '3px 8px', fontSize: '11px' }}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Upcoming Appointments */}
          <div className="luxury-card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={16} color="#1976D2" />
                <span style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--text-primary)' }}>Upcoming Appointments</span>
              </div>
              <span className="badge badge-active">{todayAppointments.length} scheduled</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {todayAppointments.map(a => (
                <div
                  key={a.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      onClick={() => openClient360(a.clientId, 'appointments')}
                      style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}
                    >
                      {a.clientName}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gold-dark)' }}>
                      {a.time}
                    </span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                    {a.purpose}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    <span>store: <strong>{a.branch}</strong></span>
                    <span>Sales Rep: <strong>{a.advisor}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Customizations Requiring Attention */}
          <div className="luxury-card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={16} color="var(--gold-dark)" />
                <span style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--text-primary)' }}>Customization Journey</span>
              </div>
              <span className="badge badge-gold">Workshop</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeCustomizations.map(c => (
                <div
                  key={c.id}
                  onClick={() => openClient360(c.clientId, 'customizations')}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                      {c.clientName}
                    </span>
                    <span className="badge badge-gold font-mono" style={{ fontSize: '10px' }}>
                      DAY {c.currentDay} / {c.totalDays}
                    </span>
                  </div>

                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                    {c.productType}
                  </div>

                  {/* Progress bar */}
                  <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden', margin: '4px 0' }}>
                    <div style={{
                      width: `${(c.currentDay / c.totalDays) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #C5A880, #B89758)'
                    }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    <span>Stage: <strong style={{ color: 'var(--text-primary)' }}>{c.currentStage}</strong></span>
                    <span>Designer: <strong>{c.designer.split(' ')[0]}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
