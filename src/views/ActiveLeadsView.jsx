import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  UserCheck,
  Plus,
  Search,
  MessageSquare,
  Footprints,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ActiveLeadsView = () => {
  const { clients, openClient360, setActiveModal, setModalData, currentRole } = useCrm();
  const [searchTerm, setSearchTerm] = useState('');

  // Leads are clients with 0 purchases or "New" type
  const leads = clients.filter(c => c.purchasesCount === 0 || c.clientType === 'New');

  const filteredLeads = leads.filter(l => {
    if (currentRole === 'Executive' && l.owner !== 'Anisha Rai') return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return l.name.toLowerCase().includes(q) || l.phone.toLowerCase().includes(q) || l.id.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>Active High-Interest Leads</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
            First-time inquirers and boutique walk-ins moving toward their initial bespoke Apala commission.
          </p>
        </div>

        <button onClick={() => setActiveModal('add-client')} className="btn btn-gold">
          <Plus size={15} />
          <span>+ Onboard New Lead</span>
        </button>
      </div>

      {/* Table */}
      <div className="crm-table-container">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Prospect Name</th>
              <th>Channel Source</th>
              <th>Assigned Sales Rep</th>
              <th>store Branch</th>
              <th>Product Interest</th>
              <th>Engagement</th>
              <th>Next Action</th>
              <th style={{ textAlign: 'right' }}>Direct Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id}>
                <td><span className="font-mono text-gold" style={{ fontWeight: 600 }}>{lead.id}</span></td>
                <td>
                  <span
                    onClick={() => openClient360(lead.id)}
                    style={{ fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}
                  >
                    {lead.name}
                  </span>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{lead.phone}</div>
                </td>
                <td><span className="badge badge-silver">{lead.source}</span></td>
                <td>{lead.owner}</td>
                <td>{lead.branch}</td>
                <td style={{ fontSize: '12px' }}>
                  {lead.preferences.categories.join(', ')} ({lead.preferences.priceRange})
                </td>
                <td>
                  <span className={`badge badge-${lead.engagement === 'Hot' ? 'hot' : 'warm'}`}>
                    {lead.engagement}
                  </span>
                </td>
                <td style={{ fontSize: '12px', color: 'var(--gold-dark)', fontWeight: 600 }}>
                  {lead.nextFollowUp}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                    <button
                      onClick={() => {
                        setActiveModal('add-communication');
                        setModalData({ clientId: lead.id, clientName: lead.name });
                      }}
                      className="btn btn-gold btn-sm"
                      title="Send WhatsApp or Call"
                    >
                      <MessageSquare size={12} />
                      <span>Contact</span>
                    </button>
                    <button
                      onClick={() => openClient360(lead.id)}
                      className="btn btn-secondary btn-sm"
                    >
                      <span>360</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
