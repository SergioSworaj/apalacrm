import React, { useState, useMemo } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Download,
  Table,
  LayoutGrid,
  ChevronRight,
  Eye,
  Building2,
  Sparkles,
  Phone,
  Mail,
  X
} from 'lucide-react';

export const ClientDirectoryView = () => {
  const {
    clients,
    openClient360,
    setActiveModal,
    currentRole,
    selectedBranch,
    showToast
  } = useCrm();

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('All');
  const [filterOwner, setFilterOwner] = useState(currentRole === 'Executive' ? 'Anisha Rai' : 'All');
  const [filterTier, setFilterTier] = useState('All');
  const [filterClientType, setFilterClientType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterEngagement, setFilterEngagement] = useState('All');

  // Excel Dense Mode Toggle
  const [isDenseMode, setIsDenseMode] = useState(false);

  // Sorting
  const [sortField, setSortField] = useState('lastVisit');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filtered & Sorted Clients
  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      // Global branch selector in header
      if (selectedBranch !== 'All Branches' && c.branch !== selectedBranch) return false;

      // Local filters
      if (filterBranch !== 'All' && c.branch !== filterBranch) return false;
      if (filterOwner !== 'All' && c.owner !== filterOwner) return false;
      if (filterTier !== 'All' && c.tier !== filterTier) return false;
      if (filterClientType !== 'All' && c.clientType !== filterClientType) return false;
      if (filterStatus !== 'All' && c.status !== filterStatus) return false;
      if (filterEngagement !== 'All' && c.engagement !== filterEngagement) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          (c.email && c.email.toLowerCase().includes(q))
        );
      }
      return true;
    }).sort((a, b) => {
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [
    clients,
    selectedBranch,
    filterBranch,
    filterOwner,
    filterTier,
    filterClientType,
    filterStatus,
    filterEngagement,
    searchTerm,
    sortField,
    sortDirection
  ]);

  const resetFilters = () => {
    setSearchTerm('');
    setFilterBranch('All');
    setFilterOwner('All');
    setFilterTier('All');
    setFilterClientType('All');
    setFilterStatus('All');
    setFilterEngagement('All');
  };

  const exportExcelCSV = () => {
    const headers = ['Client ID', 'Name', 'Phone', 'Email', 'Tier', 'Client Type', 'Owner', 'Branch', 'Status', 'Engagement', 'Lifetime Value', 'Last Visit'];
    const rows = filteredClients.map(c => [
      c.id,
      `"${c.name}"`,
      c.phone,
      c.email,
      c.tier,
      c.clientType,
      c.owner,
      c.branch,
      c.status,
      c.engagement,
      c.lifetimeValue,
      c.lastVisit
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Apala_Clients_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Client directory exported to spreadsheet CSV');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Title & Top Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              {currentRole === 'Executive' && filterOwner === 'Anisha Rai' ? 'My Clients' : 'Client Directory'}
            </h1>
            <span style={{
              background: 'linear-gradient(135deg, #E8F1FF, #DDEEFF)',
              color: '#007AFF', fontSize: '12px', fontWeight: 700,
              padding: '3px 10px', borderRadius: '99px',
              border: '1px solid rgba(0,122,255,0.2)'
            }}>
              {filteredClients.length} Profiles
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '3px' }}>
            Permanent Client ID system linking store visits, custom jewellery commissions, and family relations.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Dense Excel Mode Toggle */}
          <button
            onClick={() => setIsDenseMode(!isDenseMode)}
            className="btn btn-secondary btn-sm"
            title="Toggle dense spreadsheet grid"
            style={{ backgroundColor: isDenseMode ? 'var(--bg-subtle)' : '#FFFFFF' }}
          >
            <Table size={14} />
            <span>{isDenseMode ? 'Comfortable View' : 'Excel Dense Grid'}</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={exportExcelCSV}
            className="btn btn-secondary btn-sm"
            title="Download CSV for Excel / Sheets"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          {/* Add Client */}
          <button
            onClick={() => setActiveModal('add-client')}
            className="btn btn-gold btn-sm"
          >
            <Plus size={14} />
            <span>+ Add Client</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar (Section 5) */}
      <div className="luxury-card" style={{ padding: '14px 16px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '10px',
          alignItems: 'center'
        }}>
          {/* Quick Search */}
          <div style={{ position: 'relative', gridColumn: 'span 2' }}>
            <Search size={14} color="var(--text-tertiary)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, name, phone, email..."
              className="form-control"
              style={{ paddingLeft: '30px', fontSize: '12.5px' }}
            />
          </div>

          {/* Branch Filter */}
          <div>
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="form-select"
              style={{ fontSize: '12px', padding: '7px 10px' }}
            >
              <option value="All">Branch: All</option>
              <option value="Baluwatar">Baluwatar</option>
              <option value="Labim">Labim</option>
            </select>
          </div>

          {/* Owner Filter */}
          <div>
            <select
              value={filterOwner}
              onChange={(e) => setFilterOwner(e.target.value)}
              className="form-select"
              style={{ fontSize: '12px', padding: '7px 10px' }}
            >
              <option value="All">Owner: All Advisors</option>
              <option value="Anisha Rai">Anisha Rai</option>
              <option value="Rohan Shrestha">Rohan Shrestha</option>
              <option value="Priyanka Joshi">Priyanka Joshi</option>
              <option value="Bikash Tamang">Bikash Tamang</option>
            </select>
          </div>

          {/* Tier Filter */}
          <div>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="form-select"
              style={{ fontSize: '12px', padding: '7px 10px' }}
            >
              <option value="All">Tier: All</option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>

          {/* Client Type Filter */}
          <div>
            <select
              value={filterClientType}
              onChange={(e) => setFilterClientType(e.target.value)}
              className="form-select"
              style={{ fontSize: '12px', padding: '7px 10px' }}
            >
              <option value="All">Type: All</option>
              <option value="New">New</option>
              <option value="2nd Visit">2nd Visit</option>
              <option value="3rd Visit">3rd Visit</option>
              <option value="Apala Client">Apala Client</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-select"
              style={{ fontSize: '12px', padding: '7px 10px' }}
            >
              <option value="All">Status: All</option>
              <option value="Active">Active</option>
              <option value="Stable">Stable</option>
              <option value="At Risk">At Risk</option>
              <option value="Dormant">Dormant</option>
            </select>
          </div>

          {/* Engagement Filter */}
          <div>
            <select
              value={filterEngagement}
              onChange={(e) => setFilterEngagement(e.target.value)}
              className="form-select"
              style={{ fontSize: '12px', padding: '7px 10px' }}
            >
              <option value="All">Engagement: All</option>
              <option value="Hot">Hot</option>
              <option value="Warm">Warm</option>
              <option value="Administrative">Administrative</option>
              <option value="Drop-off">Drop-off</option>
              <option value="Cold">Cold</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div>
            <button
              onClick={resetFilters}
              className="btn btn-ghost btn-sm"
              style={{ width: '100%', fontSize: '11.5px', color: 'var(--text-secondary)' }}
            >
              <X size={13} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Client Data Table (Section 5) */}
      <div className="crm-table-container">
        <table className={`crm-table ${isDenseMode ? 'table-dense' : ''}`}>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Client ID</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Client</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th>Tier</th>
              <th>Type</th>
              <th>Advisor / Owner</th>
              <th>Branch</th>
              <th>Engagement</th>
              <th onClick={() => handleSort('lastVisit')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Last Visit</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th>Open Opportunity</th>
              <th>Next Follow-up</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan="11" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
                  No clients match the selected filter criteria.
                </td>
              </tr>
            ) : (
              filteredClients.map(client => {
                // Check if restricted in Executive mode
                const isAssignedToMe = client.owner === 'Anisha Rai';
                const isRestrictedExecutive = currentRole === 'Executive' && !isAssignedToMe;

                return (
                  <tr
                    key={client.id}
                    onClick={() => openClient360(client.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Client ID */}
                    <td>
                      <span className="font-mono text-gold" style={{ fontWeight: 600, fontSize: isDenseMode ? '11px' : '12px' }}>
                        {client.id}
                      </span>
                    </td>

                    {/* Client Name & Phone */}
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: isDenseMode ? '12px' : '13.5px' }}>
                          {client.name}
                        </span>
                        {!isRestrictedExecutive && (
                          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                            {client.phone}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Tier */}
                    <td>
                      <span className={`badge badge-${client.tier.toLowerCase()}`}>
                        {client.tier}
                      </span>
                    </td>

                    {/* Client Type */}
                    <td>
                      <span style={{
                        fontSize: '11.5px',
                        fontWeight: client.clientType === 'Apala Client' ? 600 : 500,
                        color: client.clientType === 'Apala Client' ? 'var(--gold-dark)' : 'var(--text-secondary)'
                      }}>
                        {client.clientType}
                      </span>
                    </td>

                    {/* Owner */}
                    <td>
                      <span style={{ fontSize: '12px', fontWeight: 500 }}>
                        {client.owner}
                      </span>
                    </td>

                    {/* Branch */}
                    <td>
                      <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                        {client.branch}
                      </span>
                    </td>

                    {/* Engagement */}
                    <td>
                      <span className={`badge badge-${client.engagement === 'Hot' ? 'hot' : client.engagement === 'Drop-off' ? 'risk' : 'warm'}`}>
                        {client.engagement}
                      </span>
                    </td>

                    {/* Last Visit */}
                    <td>
                      <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                        {client.lastVisit}
                      </span>
                    </td>

                    {/* Open Opportunity */}
                    <td>
                      <span style={{
                        fontSize: '11.5px',
                        color: client.openOpportunity !== 'None' ? '#2E7D32' : 'var(--text-tertiary)',
                        fontWeight: client.openOpportunity !== 'None' ? 600 : 400
                      }}>
                        {client.openOpportunity !== 'None' ? client.openOpportunity.split('(')[0] : '—'}
                      </span>
                    </td>

                    {/* Next Follow-up */}
                    <td>
                      <span style={{
                        fontSize: '11.5px',
                        color: client.nextFollowUp.includes('2026') || client.nextFollowUp.includes('Today') ? '#C62828' : 'var(--text-secondary)',
                        fontWeight: 500
                      }}>
                        {client.nextFollowUp}
                      </span>
                    </td>

                    {/* Action */}
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openClient360(client.id);
                        }}
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--gold-dark)', fontWeight: 600 }}
                      >
                        <span>360</span>
                        <ChevronRight size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
