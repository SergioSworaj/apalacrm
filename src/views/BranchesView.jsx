import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Building2,
  Users,
  Footprints,
  ShoppingBag,
  Sparkles,
  Layers,
  Wrench,
  Clock,
  ArrowRight
} from 'lucide-react';

export const BranchesView = () => {
  const { clients, visits, opportunities, customizations, serviceCases, setSelectedBranch, openClient360 } = useCrm();

  const branches = [
    {
      name: 'Baluwatar',
      address: 'Baluwatar Main Road, Near Embassy Zone, Kathmandu',
      director: 'Sanjay Shrestha',
      vipSuites: 2,
      masterGoldsmiths: 4,
      clientsCount: clients.filter(c => c.branch === 'Baluwatar').length,
      visitsCount: visits.filter(v => v.branch === 'Baluwatar').length,
      salesTotal: 'NPR 28.4M',
      activeCustomizations: customizations.filter(c => c.branch === 'Baluwatar').length,
      activeOpportunities: opportunities.filter(o => o.branch === 'Baluwatar').length,
      serviceCases: serviceCases.filter(s => s.branch === 'Baluwatar').length,
      advisors: ['Anisha Rai (Lead)', 'Rohan Shrestha']
    },
    {
      name: 'Labim',
      address: 'Labim Mall Luxury Promenade, Ground Level, Lalitpur',
      director: 'Sunil Shakya',
      vipSuites: 1,
      masterGoldsmiths: 2,
      clientsCount: clients.filter(c => c.branch === 'Labim').length,
      visitsCount: visits.filter(v => v.branch === 'Labim').length,
      salesTotal: 'NPR 20.2M',
      activeCustomizations: customizations.filter(c => c.branch === 'Labim').length,
      activeOpportunities: opportunities.filter(o => o.branch === 'Labim').length,
      serviceCases: serviceCases.filter(s => s.branch === 'Labim').length,
      advisors: ['Priyanka Joshi (Lead)', 'Bikash Tamang']
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>Boutique Branch Management</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
          Comparative showroom performance between Baluwatar Flagship and Labim Mall Luxury Boutique.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        {branches.map(b => (
          <div key={b.name} className="luxury-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={18} color="var(--gold-dark)" />
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>{b.name} Boutique</h2>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {b.address}
                </div>
              </div>

              <button
                onClick={() => setSelectedBranch(b.name)}
                className="btn btn-secondary btn-sm"
              >
                <span>Filter to {b.name}</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Metrics Grid (Section 41) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', margin: '20px 0' }}>
              <div style={{ padding: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Active Patrons</div>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '2px' }}>{b.clientsCount}</div>
              </div>

              <div style={{ padding: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Sales Total</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gold-dark)', marginTop: '2px' }}>{b.salesTotal}</div>
              </div>

              <div style={{ padding: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Bespoke Orders</div>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '2px' }}>{b.activeCustomizations}</div>
              </div>

              <div style={{ padding: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Visits Logged</div>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '2px' }}>{b.visitsCount}</div>
              </div>

              <div style={{ padding: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Opportunities</div>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '2px' }}>{b.activeOpportunities}</div>
              </div>

              <div style={{ padding: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Service Cases</div>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '2px' }}>{b.serviceCases}</div>
              </div>
            </div>

            {/* Team details */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <div>Branch Director: <strong>{b.director}</strong></div>
              <div style={{ marginTop: '3px' }}>Client Advisors: <strong>{b.advisors.join(', ')}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
