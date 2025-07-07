// =============================================================================
// KAIROS FRONTEND - INLINE STYLES DASHBOARD
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/pages/Dashboard.tsx
// =============================================================================

import React from 'react';

const styles = {
  container: {
    padding: '2rem',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    color: '#ffffff',
    minHeight: '100vh',
    background: 'transparent'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem'
  },
  headerTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #00d9ff, #ff6b9d)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 0.5rem 0'
  },
  headerSubtitle: {
    color: '#9ca3af',
    margin: 0
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  btnSecondary: {
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(0, 217, 255, 0.2)',
    color: '#00d9ff',
    border: '1px solid rgba(0, 217, 255, 0.3)',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'background-color 0.2s'
  },
  btnPrimary: {
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, #00d9ff, #ff6b9d)',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'opacity 0.2s'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    background: 'rgba(17, 17, 17, 0.6)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '1rem',
    padding: '1.5rem',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
  },
  statCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  statIcon: {
    width: '3rem',
    height: '3rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem'
  },
  statBadge: {
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontWeight: '500'
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#ffffff',
    margin: '0 0 0.25rem 0'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    margin: 0
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    marginBottom: '2rem'
  },
  campaignsCard: {
    background: 'rgba(17, 17, 17, 0.6)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#ffffff',
    margin: 0
  },
  cardLink: {
    color: '#00d9ff',
    fontSize: '0.875rem',
    textDecoration: 'none',
    transition: 'opacity 0.2s'
  },
  campaignItem: {
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
    borderRadius: '0.75rem',
    padding: '1rem',
    border: '1px solid rgba(55, 65, 81, 0.5)',
    marginBottom: '1rem',
    transition: 'border-color 0.2s'
  },
  campaignHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.75rem'
  },
  campaignTitle: {
    fontWeight: '500',
    color: '#ffffff',
    margin: 0
  },
  statusBadge: {
    padding: '0.25rem 0.5rem',
    fontSize: '0.75rem',
    borderRadius: '9999px',
    fontWeight: '500'
  },
  campaignActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  actionBtn: {
    padding: '0.25rem',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    color: '#9ca3af',
    transition: 'background-color 0.2s'
  },
  campaignStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem'
  },
  campaignStat: {
    textAlign: 'center' as const
  },
  campaignStatLabel: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    margin: '0 0 0.25rem 0'
  },
  campaignStatValue: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#ffffff',
    margin: 0
  },
  atomsCard: {
    background: 'rgba(17, 17, 17, 0.6)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
  },
  atomItem: {
    marginBottom: '1rem'
  },
  atomHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.5rem'
  },
  atomName: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#d1d5db',
    margin: 0
  },
  atomUsage: {
    fontSize: '0.75rem',
    color: '#9ca3af'
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#1f2937',
    borderRadius: '9999px',
    height: '0.5rem',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: '9999px',
    transition: 'width 0.5s ease'
  },
  atomButton: {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(255, 107, 157, 0.2)',
    color: '#ff6b9d',
    border: '1px solid rgba(255, 107, 157, 0.3)',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginTop: '1.5rem',
    transition: 'background-color 0.2s'
  },
  chartCard: {
    background: 'rgba(17, 17, 17, 0.6)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
  },
  chartButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  chartBtn: {
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  chartBtnActive: {
    backgroundColor: 'rgba(0, 217, 255, 0.2)',
    color: '#00d9ff'
  },
  chartBtnInactive: {
    backgroundColor: 'transparent',
    color: '#9ca3af'
  },
  chartPlaceholder: {
    height: '16rem',
    background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.3), rgba(55, 65, 81, 0.3))',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(55, 65, 81, 0.5)',
    flexDirection: 'column' as const,
    gap: '0.75rem'
  },
  chartIcon: {
    fontSize: '3rem',
    color: '#6b7280'
  },
  chartText: {
    color: '#9ca3af',
    textAlign: 'center' as const,
    margin: 0
  },
  chartSubtext: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: '0.25rem 0 0 0'
  }
};

// Mock data
const dashboardStats = [
  {
    name: 'Active Campaigns',
    value: '12',
    icon: '⚡',
    change: '+2 this week',
    positive: true,
    color: '#00d9ff',
  },
  {
    name: 'EligibilityAtoms',
    value: '23',
    icon: '🧪',
    change: '+5 new atoms',
    positive: true,
    color: '#ff6b9d',
  },
  {
    name: 'Perfect Moments',
    value: '45',
    icon: '⏰',
    change: '+12 this month',
    positive: true,
    color: '#00ff88',
  },
  {
    name: 'Monthly Revenue',
    value: '$125k',
    icon: '💰',
    change: '+18.3%',
    positive: true,
    color: '#00ff88',
  },
];

const recentCampaigns = [
  {
    id: 1,
    name: 'Summer Sale 2024',
    status: 'active',
    ctr: 4.2,
    conversions: 1240,
    revenue: 45600,
  },
  {
    id: 2,
    name: 'Product Launch Campaign',
    status: 'active',
    ctr: 3.1,
    conversions: 890,
    revenue: 32100,
  },
  {
    id: 3,
    name: 'Retention Drive',
    status: 'paused',
    ctr: 2.8,
    conversions: 567,
    revenue: 21300,
  },
];

const atomPerformance = [
  { name: 'Age Range Atom', usage: 89, performance: 'high' },
  { name: 'Geography Atom', usage: 76, performance: 'high' },
  { name: 'Purchase History Atom', usage: 65, performance: 'medium' },
  { name: 'Device Type Atom', usage: 54, performance: 'medium' },
  { name: 'Time Zone Atom', usage: 43, performance: 'low' },
];

export default function Dashboard() {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return { backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' };
      case 'paused':
        return { backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' };
      default:
        return { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' };
    }
  };

  const getPerformanceGradient = (performance: string) => {
    switch (performance) {
      case 'high':
        return 'linear-gradient(to right, #10b981, #34d399)';
      case 'medium':
        return 'linear-gradient(to right, #f59e0b, #fbbf24)';
      default:
        return 'linear-gradient(to right, #ef4444, #f87171)';
    }
  };

  return (
    <div style={styles.container}>
      {/* Page Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.headerTitle}>Dashboard</h1>
          <p style={styles.headerSubtitle}>
            Welcome back! Here's what's happening with your marketing campaigns.
          </p>
        </div>
        <div style={styles.actionButtons}>
          <button style={styles.btnSecondary}>
            <span>👁️</span>
            View Reports
          </button>
          <button style={styles.btnPrimary}>
            <span>⚡</span>
            Create Campaign
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {dashboardStats.map((stat, index) => (
          <div key={stat.name} style={styles.statCard}>
            <div style={styles.statCardHeader}>
              <div style={{
                ...styles.statIcon,
                backgroundColor: `${stat.color}20`
              }}>
                {stat.icon}
              </div>
              <div style={{
                ...styles.statBadge,
                backgroundColor: stat.positive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: stat.positive ? '#10b981' : '#ef4444'
              }}>
                {stat.change}
              </div>
            </div>
            <div>
              <p style={styles.statValue}>{stat.value}</p>
              <p style={styles.statLabel}>{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={styles.mainGrid}>
        {/* Recent Campaigns */}
        <div style={styles.campaignsCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Recent Campaigns</h2>
            <a href="#" style={styles.cardLink}>View All</a>
          </div>
          
          <div>
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} style={styles.campaignItem}>
                <div style={styles.campaignHeader}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                    <h3 style={styles.campaignTitle}>{campaign.name}</h3>
                    <span style={{
                      ...styles.statusBadge,
                      ...getStatusStyle(campaign.status)
                    }}>
                      {campaign.status}
                    </span>
                  </div>
                  <div style={styles.campaignActions}>
                    <button style={styles.actionBtn}>▶️</button>
                    <button style={styles.actionBtn}>⏸️</button>
                    <button style={styles.actionBtn}>⏹️</button>
                  </div>
                </div>
                
                <div style={styles.campaignStats}>
                  <div style={styles.campaignStat}>
                    <p style={styles.campaignStatLabel}>CTR</p>
                    <p style={styles.campaignStatValue}>{campaign.ctr}%</p>
                  </div>
                  <div style={styles.campaignStat}>
                    <p style={styles.campaignStatLabel}>Conversions</p>
                    <p style={styles.campaignStatValue}>{campaign.conversions.toLocaleString()}</p>
                  </div>
                  <div style={styles.campaignStat}>
                    <p style={styles.campaignStatLabel}>Revenue</p>
                    <p style={styles.campaignStatValue}>${campaign.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EligibilityAtom Performance */}
        <div style={styles.atomsCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Atom Performance</h2>
            <span style={{fontSize: '1.5rem'}}>🧪</span>
          </div>
          
          <div>
            {atomPerformance.map((atom, index) => (
              <div key={atom.name} style={styles.atomItem}>
                <div style={styles.atomHeader}>
                  <span style={styles.atomName}>{atom.name}</span>
                  <span style={styles.atomUsage}>{atom.usage}%</span>
                </div>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${atom.usage}%`,
                      background: getPerformanceGradient(atom.performance)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <button style={styles.atomButton}>
            Manage Atoms
          </button>
        </div>
      </div>

      {/* Performance Chart Section */}
      <div style={styles.chartCard}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>Performance Overview</h2>
          <div style={styles.chartButtons}>
            <button style={{...styles.chartBtn, ...styles.chartBtnActive}}>7d</button>
            <button style={{...styles.chartBtn, ...styles.chartBtnInactive}}>30d</button>
            <button style={{...styles.chartBtn, ...styles.chartBtnInactive}}>90d</button>
          </div>
        </div>
        
        <div style={styles.chartPlaceholder}>
          <div style={styles.chartIcon}>📊</div>
          <div>
            <p style={styles.chartText}>Performance chart will be rendered here</p>
            <p style={styles.chartSubtext}>Integration with charting library needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}