import React from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Users2,
  Sparkles,
  ShoppingBag,
  Footprints,
  Clock,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail
} from 'lucide-react';

export const TeamView = () => {
  const { clients, opportunities, visits, followUps, openClient360, setCurrentView, showToast } = useCrm();

  const advisors = [
    {
      name: 'Jharna Dahal',
      role: 'Sales Representative',
      branch: 'Baluwatar Flagship',
      phone: '+977 9801122334',
      email: 'jharna@apalajewels.com',
      clientsCount: 184,
      opportunitiesCount: 21,
      followUpsCount: 8,
      visitsCount: 31,
      salesVolume: 'NPR 4.8M',
      topClient: 'Niraj Shrestha (26-BLW-001-NS)'
    },
    {
      name: 'Alina Nepali',
      role: 'Sales Representative',
      branch: 'Baluwatar Flagship',
      phone: '+977 9801122335',
      email: 'alina@apalajewels.com',
      clientsCount: 163,
      opportunitiesCount: 17,
      followUpsCount: 11,
      visitsCount: 26,
      salesVolume: 'NPR 3.9M',
      topClient: 'Rajesh Jung Rana (26-BLW-102-RJ)'
    },
    {
      name: 'Aditya Limbu',
      role: 'Sales Representative',
      branch: 'Labim Boutique',
      phone: '+977 9801122336',
      email: 'aditya@apalajewels.com',
      clientsCount: 142,
      opportunitiesCount: 19,
      followUpsCount: 9,
      visitsCount: 29,
      salesVolume: 'NPR 4.2M',
      topClient: 'Namrata Karki Shah (26-LBM-024-NKS)'
    },
    {
      name: 'Dikshyanshu Karki',
      role: 'Sales Representative',
      branch: 'Labim Boutique',
      phone: '+977 9801122337',
      email: 'dikshyanshu@apalajewels.com',
      clientsCount: 118,
      opportunitiesCount: 14,
      followUpsCount: 7,
      visitsCount: 22,
      salesVolume: 'NPR 2.8M',
      topClient: 'Suresh Khadka (26-LBM-055-SK)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>Sales Representative Performance</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
          Management oversight of sales representative clienteling activity, customer portfolios, and pipeline closing ratios.
        </p>
      </div>

      {/* Sales Representative Cards Grid (Section 42) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {advisors.map(adv => (
          <div key={adv.name} className="luxury-card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--gold-surface)',
                  border: '1.5px solid var(--gold-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--gold-dark)'
                }}>
                  {adv.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>{adv.name}</h3>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{adv.role}</div>
                  <div style={{ fontSize: '11px', color: 'var(--gold-dark)', fontWeight: 600 }}>{adv.branch}</div>
                </div>
              </div>

              <span className="badge badge-gold font-mono" style={{ fontSize: '12px', padding: '3px 8px' }}>
                {adv.salesVolume}
              </span>
            </div>

            {/* Performance KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', margin: '18px 0', textAlign: 'center' }}>
              <div style={{ padding: '8px 4px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Clients</div>
                <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px' }}>{adv.clientsCount}</div>
              </div>

              <div style={{ padding: '8px 4px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Deals</div>
                <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px' }}>{adv.opportunitiesCount}</div>
              </div>

              <div style={{ padding: '8px 4px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Follow-ups</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#C62828', marginTop: '2px' }}>{adv.followUpsCount}</div>
              </div>

              <div style={{ padding: '8px 4px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Visits</div>
                <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px' }}>{adv.visitsCount}</div>
              </div>
            </div>

            {/* Top client and contact */}
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>Top Patron: <strong style={{ color: 'var(--text-primary)' }}>{adv.topClient}</strong></div>
              <div>Direct: <span className="font-mono">{adv.phone}</span></div>
            </div>

            {/* Drilldown action */}
            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setCurrentView('clients');
                  showToast(`Filtered client directory to ${adv.name}'s portfolio`);
                }}
                className="btn btn-secondary btn-sm"
              >
                <span>View Assigned Clients</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
