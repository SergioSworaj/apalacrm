import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Users,
  ShoppingBag,
  Sparkles,
  Building2,
  Calendar
} from 'lucide-react';

export const AnalyticsView = () => {
  const { clients, opportunities, visits, selectedBranch } = useCrm();
  const [timeRange, setTimeRange] = useState('Year to Date');

  // Tier counts
  const bronzeCount = clients.filter(c => c.tier === 'Bronze').length;
  const silverCount = clients.filter(c => c.tier === 'Silver').length;
  const goldCount = clients.filter(c => c.tier === 'Gold').length;
  const platinumCount = clients.filter(c => c.tier === 'Platinum').length;

  // Engagement counts
  const hotCount = clients.filter(c => c.engagement === 'Hot').length;
  const warmCount = clients.filter(c => c.engagement === 'Warm').length;
  const adminCount = clients.filter(c => c.engagement === 'Administrative').length;
  const dropoffCount = clients.filter(c => c.engagement === 'Drop-off').length;
  const coldCount = clients.filter(c => c.engagement === 'Cold').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>Executive Clienteling Analytics</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
            High-net-worth client growth, tier migration, and boutique showroom conversion insights.
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-sm)',
          padding: '3px'
        }}>
          {['This Month', 'This Quarter', 'Year to Date'].map(r => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              style={{
                padding: '5px 12px',
                fontSize: '12px',
                fontWeight: timeRange === r ? 600 : 500,
                color: timeRange === r ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: timeRange === r ? 'var(--bg-subtle)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer'
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Top Level Financial Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        <div className="luxury-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Total Revenue Realized</div>
          <div style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)', marginTop: '4px' }}>
            NPR 48.6M
          </div>
          <div style={{ fontSize: '11px', color: '#2E7D32', marginTop: '4px' }}>↑ +18.4% vs last year</div>
        </div>

        <div className="luxury-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Active Pipeline Value</div>
          <div style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginTop: '4px' }}>
            NPR 34.2M
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>186 open opportunities</div>
        </div>

        <div className="luxury-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Showroom Try-on Conversion</div>
          <div style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-serif)', color: '#2E7D32', marginTop: '4px' }}>
            42.8%
          </div>
          <div style={{ fontSize: '11px', color: '#2E7D32', marginTop: '4px' }}>Industry leading for luxury</div>
        </div>

        <div className="luxury-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>Average Transaction Size</div>
          <div style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginTop: '4px' }}>
            NPR 518,000
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Bespoke solitaires & Polki</div>
        </div>
      </div>

      {/* Analytics Visual Grid (Section 40) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Tier Distribution */}
        <div className="luxury-card" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '14px' }}>Patron Tier Distribution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600 }}>Platinum (&gt; NPR 3M spend)</span>
                <span>{platinumCount} patrons ({(platinumCount / clients.length * 100).toFixed(1)}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(platinumCount / clients.length) * 100}%`, height: '100%', backgroundColor: '#6A1B9A' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600 }}>Gold (NPR 1M – 3M spend)</span>
                <span>{goldCount} patrons ({(goldCount / clients.length * 100).toFixed(1)}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(goldCount / clients.length) * 100}%`, height: '100%', backgroundColor: 'var(--gold-primary)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600 }}>Silver (NPR 300K – 1M spend)</span>
                <span>{silverCount} patrons ({(silverCount / clients.length * 100).toFixed(1)}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(silverCount / clients.length) * 100}%`, height: '100%', backgroundColor: '#78909C' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600 }}>Bronze (Under NPR 300K / New)</span>
                <span>{bronzeCount} patrons ({(bronzeCount / clients.length * 100).toFixed(1)}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(bronzeCount / clients.length) * 100}%`, height: '100%', backgroundColor: '#8D6E63' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Breakdown */}
        <div className="luxury-card" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '14px' }}>Client Engagement Funnel</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: '#FBE9E7', borderRadius: '4px' }}>
              <span style={{ fontWeight: 600, color: '#D84315' }}>🔥 Hot (Active Buying Intent)</span>
              <span style={{ fontWeight: 700 }}>{hotCount} patrons</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: '#FFF3E0', borderRadius: '4px' }}>
              <span style={{ fontWeight: 600, color: '#EF6C00' }}>⚡ Warm (Browsing / Inquiry)</span>
              <span style={{ fontWeight: 700 }}>{warmCount} patrons</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: '#ECEFF1', borderRadius: '4px' }}>
              <span style={{ fontWeight: 600, color: '#455A64' }}>📋 Administrative / Service</span>
              <span style={{ fontWeight: 700 }}>{adminCount} patrons</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: '#FCE4EC', borderRadius: '4px' }}>
              <span style={{ fontWeight: 600, color: '#AD1457' }}>⚠ Drop-off / Delayed</span>
              <span style={{ fontWeight: 700 }}>{dropoffCount} patrons</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: '#EEEEEE', borderRadius: '4px' }}>
              <span style={{ fontWeight: 600, color: '#616161' }}>❄ Cold (&gt; 120 days)</span>
              <span style={{ fontWeight: 700 }}>{coldCount} patrons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
