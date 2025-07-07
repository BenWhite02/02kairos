// =============================================================================
// KAIROS FRONTEND - PROFESSIONAL ENTERPRISE DASHBOARD
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/pages/Dashboard.tsx
// =============================================================================

import React from 'react';

const styles = {
  // Main container - Professional black
  container: {
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#ffffff',
    background: '#000000',
    backgroundImage: `
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.01) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.01) 0%, transparent 50%)
    `,
  },
  
  // Header section - Clean and minimal
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    paddingBottom: '2rem',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  headerTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#ffffff',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.95rem',
    margin: 0,
    fontWeight: '400',
  },
  
  // Action buttons - Minimal and professional
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  btnSecondary: {
    padding: '0.6rem 1.2rem',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
  },
  btnPrimary: {
    padding: '0.6rem 1.2rem',
    background: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
  },
  
  // Stats grid - Clean cards with left border highlight
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderLeft: '3px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0 8px 8px 0',
    padding: '1.5rem',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
  },
  statHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0,
    fontWeight: '500',
  },
  statBadge: {
    fontSize: '0.75rem',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    fontWeight: '500',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    color: '#22c55e',
    border: '1px solid rgba(34, 197, 94, 0.2)',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 0.25rem 0',
    letterSpacing: '-0.02em',
  },
  statDescription: {
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
  },
  
  // Main content grid - Professional layout
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    marginBottom: '2rem',
  },
  
  // Campaign section - Enterprise look with left border
  campaignsSection: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderLeft: '3px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0 8px 8px 0',
    padding: '1.5rem',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#ffffff',
    margin: 0,
  },
  sectionLink: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.85rem',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    fontWeight: '500',
  },
  
  // Campaign items - Clean rows with left border highlight
  campaignList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  campaignItem: {
    padding: '1.25rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderLeft: '3px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '0 6px 6px 0',
    transition: 'all 0.2s ease',
    background: 'rgba(255, 255, 255, 0.01)',
  },
  campaignHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  campaignTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  campaignTitle: {
    fontWeight: '600',
    color: '#ffffff',
    margin: 0,
    fontSize: '0.95rem',
  },
  statusBadge: {
    padding: '0.2rem 0.6rem',
    fontSize: '0.7rem',
    borderRadius: '12px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  statusActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    color: '#22c55e',
    border: '1px solid rgba(34, 197, 94, 0.3)',
  },
  statusPaused: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    color: '#f59e0b',
    border: '1px solid rgba(245, 158, 11, 0.3)',
  },
  
  // Campaign actions - Minimal buttons
  campaignActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  actionBtn: {
    padding: '0.4rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.8rem',
  },
  
  // Campaign metrics - Clean data presentation
  campaignMetrics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  },
  metric: {
    textAlign: 'center' as const,
  },
  metricLabel: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: '0 0 0.25rem 0',
    fontWeight: '500',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  metricValue: {
    fontSize: '1.3rem',
    fontWeight: '700',
    margin: 0,
    letterSpacing: '-0.01em',
  },
  
  // Sidebar section - Minimal design with left border
  sidebarSection: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderLeft: '3px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0 8px 8px 0',
    padding: '1.5rem',
  },
  
  // Performance items - Clean progress bars with hover highlights
  performanceList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.25rem',
  },
  performanceItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
    padding: '0.75rem',
    border: '1px solid rgba(255, 255, 255, 0.03)',
    borderLeft: '2px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '0 4px 4px 0',
    transition: 'all 0.2s ease',
    background: 'rgba(255, 255, 255, 0.005)',
  },
  performanceHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  performanceName: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: 0,
  },
  performanceValue: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#ffffff',
  },
  progressTrack: {
    width: '100%',
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '2px',
    transition: 'width 0.8s ease',
  },
  
  // Bottom action
  bottomAction: {
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  },
  bottomBtn: {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  
  // Chart section - Professional placeholder with left border
  chartSection: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderLeft: '3px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0 8px 8px 0',
    padding: '1.5rem',
    gridColumn: '1 / -1',
  },
  chartControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  chartBtn: {
    padding: '0.4rem 0.8rem',
    fontSize: '0.8rem',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: '500',
  },
  chartBtnActive: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
  },
  chartBtnInactive: {
    background: 'transparent',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  chartPlaceholder: {
    height: '200px',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderLeft: '2px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '0 6px 6px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1.5rem',
  },
  chartPlaceholderText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
};

// Professional data - Realistic numbers
const dashboardStats = [
  {
    label: 'Active Campaigns',
    value: '24',
    change: '+8.2%',
    description: 'vs. last month',
  },
  {
    label: 'Decision Points',
    value: '1.2M',
    change: '+12.4%',
    description: 'monthly decisions',
  },
  {
    label: 'Conversion Rate',
    value: '3.24%',
    change: '+0.8%',
    description: 'avg. across campaigns',
  },
  {
    label: 'Revenue Impact',
    value: '$2.1M',
    change: '+15.6%',
    description: 'attributed revenue',
  },
];

const recentCampaigns = [
  {
    id: 1,
    name: 'Q4 Customer Acquisition',
    status: 'active',
    ctr: 2.84,
    conversions: 3420,
    revenue: 284600,
  },
  {
    id: 2,
    name: 'Premium Upsell Campaign',
    status: 'active',
    ctr: 4.12,
    conversions: 1890,
    revenue: 156300,
  },
  {
    id: 3,
    name: 'Retention Optimization',
    status: 'paused',
    ctr: 1.95,
    conversions: 967,
    revenue: 89400,
  },
];

const performanceMetrics = [
  { name: 'Decision Accuracy', value: 94, color: '#ffffff' },
  { name: 'Response Time', value: 87, color: '#ffffff' },
  { name: 'Model Performance', value: 91, color: '#ffffff' },
  { name: 'Data Quality', value: 96, color: '#ffffff' },
  { name: 'System Uptime', value: 99, color: '#ffffff' },
];

export default function Dashboard() {
  return (
    <div style={styles.container}>
      {/* Professional Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Campaign Intelligence</h1>
          <p style={styles.headerSubtitle}>
            Real-time insights and performance metrics for your marketing campaigns
          </p>
        </div>
        <div style={styles.actionButtons}>
          <button 
            style={styles.btnSecondary}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            Export Data
          </button>
          <button 
            style={styles.btnPrimary}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
            }}
          >
            New Campaign
          </button>
        </div>
      </div>

      {/* Professional Stats Grid */}
      <div style={styles.statsGrid}>
        {dashboardStats.map((stat, index) => (
          <div 
            key={stat.label} 
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderLeftColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderLeftColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
            }}
          >
            <div style={styles.statHeader}>
              <p style={styles.statLabel}>{stat.label}</p>
              <span style={styles.statBadge}>{stat.change}</span>
            </div>
            <div>
              <p style={styles.statValue}>{stat.value}</p>
              <p style={styles.statDescription}>{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={styles.mainGrid}>
        {/* Campaign Performance */}
        <div style={styles.campaignsSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Campaign Performance</h2>
            <a 
              href="#" 
              style={styles.sectionLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
              }}
            >
              View All Campaigns
            </a>
          </div>
          
          <div style={styles.campaignList}>
            {recentCampaigns.map((campaign) => (
              <div 
                key={campaign.id} 
                style={styles.campaignItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderLeftColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderLeftColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                }}
              >
                <div style={styles.campaignHeader}>
                  <div style={styles.campaignTitleRow}>
                    <h3 style={styles.campaignTitle}>{campaign.name}</h3>
                    <span style={{
                      ...styles.statusBadge,
                      ...(campaign.status === 'active' ? styles.statusActive : styles.statusPaused)
                    }}>
                      {campaign.status}
                    </span>
                  </div>
                  <div style={styles.campaignActions}>
                    <button 
                      style={styles.actionBtn}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      style={styles.actionBtn}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                    >
                      Analyze
                    </button>
                  </div>
                </div>
                
                <div style={styles.campaignMetrics}>
                  <div style={styles.metric}>
                    <p style={styles.metricLabel}>CTR</p>
                    <p style={{...styles.metricValue, color: '#ffffff'}}>{campaign.ctr}%</p>
                  </div>
                  <div style={styles.metric}>
                    <p style={styles.metricLabel}>Conversions</p>
                    <p style={{...styles.metricValue, color: '#ffffff'}}>{campaign.conversions.toLocaleString()}</p>
                  </div>
                  <div style={styles.metric}>
                    <p style={styles.metricLabel}>Revenue</p>
                    <p style={{...styles.metricValue, color: '#ffffff'}}>${campaign.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Performance */}
        <div style={styles.sidebarSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>System Performance</h2>
          </div>
          
          <div style={styles.performanceList}>
            {performanceMetrics.map((metric, index) => (
              <div key={metric.name} style={styles.performanceItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeftColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.015)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeftColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.005)';
                }}
              >
                <div style={styles.performanceHeader}>
                  <span style={styles.performanceName}>{metric.name}</span>
                  <span style={styles.performanceValue}>{metric.value}%</span>
                </div>
                <div style={styles.progressTrack}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${metric.value}%`,
                      background: metric.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div style={styles.bottomAction}>
            <button 
              style={styles.bottomBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              System Health Report
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Chart Section */}
      <div style={styles.chartSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Performance Analytics</h2>
          <div style={styles.chartControls}>
            {['7D', '30D', '90D', 'YTD'].map((period, index) => (
              <button
                key={period}
                style={{
                  ...styles.chartBtn,
                  ...(index === 1 ? styles.chartBtnActive : styles.chartBtnInactive)
                }}
                onMouseEnter={(e) => {
                  if (index !== 1) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== 1) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
                  }
                }}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        
        <div style={styles.chartPlaceholder}>
          <span style={styles.chartPlaceholderText}>
            Analytics Dashboard • Advanced charting integration in progress
          </span>
        </div>
      </div>
    </div>
  );
}