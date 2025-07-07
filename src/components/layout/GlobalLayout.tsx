// =============================================================================
// KAIROS FRONTEND - INLINE STYLES GLOBAL LAYOUT
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/components/layout/GlobalLayout.tsx
// =============================================================================

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface GlobalLayoutProps {
  children: React.ReactNode;
}

const styles = {
  container: {
    minHeight: '100vh',
    color: '#f3f4f6',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
  },
  layout: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden'
  },
  sidebar: {
    width: '280px',
    background: 'rgba(17, 17, 17, 0.8)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: 'none',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
    transition: 'width 0.3s ease'
  },
  sidebarCollapsed: {
    width: '80px'
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  logoIcon: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '0.75rem',
    background: 'linear-gradient(135deg, #00d9ff, #ff6b9d)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column' as const
  },
  logoTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #00d9ff, #ff6b9d)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  },
  logoSubtitle: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    margin: 0
  },
  toggleBtn: {
    padding: '0.5rem',
    borderRadius: '0.5rem',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  nav: {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto' as const
  },
  navList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  navItem: {
    position: 'relative' as const
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'all 0.2s',
    color: '#9ca3af',
    marginLeft: '0',
    marginRight: '0'
  },
  navLinkActive: {
    color: '#00d9ff',
    backgroundColor: 'rgba(17, 17, 17, 0.6)',
    marginLeft: '1rem',
    marginRight: '0.5rem',
    borderLeft: '3px solid #00d9ff',
    paddingLeft: '0.5rem'
  },
  navLinkHover: {
    color: '#ffffff',
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
    marginLeft: '0.5rem'
  },
  navIcon: {
    fontSize: '1.25rem',
    marginRight: '0.75rem',
    minWidth: '1.25rem'
  },
  navText: {
    flex: 1
  },
  navBadge: {
    padding: '0.125rem 0.5rem',
    fontSize: '0.75rem',
    backgroundColor: 'rgba(0, 217, 255, 0.2)',
    color: '#00d9ff',
    borderRadius: '9999px',
    marginLeft: '0.5rem'
  },
  activeIndicator: {
    position: 'absolute' as const,
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '3px',
    height: '1.5rem',
    backgroundColor: '#00d9ff',
    borderRadius: '0 2px 2px 0'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden'
  },
  header: {
    height: '4rem',
    background: 'rgba(17, 17, 17, 0.8)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1.5rem'
  },
  searchContainer: {
    position: 'relative' as const,
    width: '20rem'
  },
  searchInput: {
    width: '100%',
    padding: '0.5rem 1rem 0.5rem 2.5rem',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    border: '1px solid rgba(55, 65, 81, 1)',
    borderRadius: '0.75rem',
    color: '#f3f4f6',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s'
  },
  searchIcon: {
    position: 'absolute' as const,
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    fontSize: '1rem'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  headerBtn: {
    position: 'relative' as const,
    padding: '0.5rem',
    borderRadius: '0.5rem',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  notificationBadge: {
    position: 'absolute' as const,
    top: '-2px',
    right: '-2px',
    width: '1.25rem',
    height: '1.25rem',
    backgroundColor: '#ef4444',
    color: 'white',
    fontSize: '0.75rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  userInfo: {
    textAlign: 'right' as const
  },
  userName: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#d1d5db',
    margin: 0
  },
  userRole: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    margin: 0
  },
  userAvatar: {
    width: '2rem',
    height: '2rem',
    background: 'linear-gradient(135deg, #00d9ff, #ff6b9d)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '600'
  },
  content: {
    flex: 1,
    overflow: 'auto',
    background: 'transparent'
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  spinner: {
    width: '2rem',
    height: '2rem',
    border: '2px solid rgba(0, 217, 255, 0.3)',
    borderTop: '2px solid #00d9ff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    color: '#d1d5db',
    fontSize: '1.125rem'
  }
};

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠', description: 'Overview & insights' },
  { name: 'EligibilityAtoms', href: '/atoms', icon: '🧪', description: 'Decision components' },
  { name: 'Moments', href: '/moments', icon: '⏰', description: 'Perfect timing delivery' },
  { name: 'Campaigns', href: '/campaigns', icon: '⚡', badge: '3', description: 'Active campaigns' },
  { name: 'Analytics', href: '/analytics', icon: '📊', description: 'Performance metrics' },
  { name: 'Settings', href: '/settings', icon: '⚙️', description: 'Configuration' },
];

export function GlobalLayout({ children }: GlobalLayoutProps) {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <div style={styles.spinner}></div>
          <span style={styles.loadingText}>Loading Kairos...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isActiveRoute = (href: string) => {
    return location.pathname === href || (href === '/dashboard' && location.pathname === '/');
  };

  return (
    <div style={styles.container}>
      {/* Background Pattern */}
      <div style={{
        position: 'fixed',
        inset: 0,
        opacity: 0.05,
        pointerEvents: 'none',
        background: `
          radial-gradient(circle at 25% 25%, rgba(0, 217, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(255, 107, 157, 0.1) 0%, transparent 50%)
        `
      }}></div>

      <div style={styles.layout}>
        {/* Sidebar */}
        <div style={{
          ...styles.sidebar,
          ...(sidebarCollapsed ? styles.sidebarCollapsed : {})
        }}>
          {/* Sidebar Header */}
          <div style={styles.sidebarHeader}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>⏰</div>
              {!sidebarCollapsed && (
                <div style={styles.logoText}>
                  <h1 style={styles.logoTitle}>Kairos</h1>
                  <p style={styles.logoSubtitle}>Marketing Decisioning</p>
                </div>
              )}
            </div>
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={styles.toggleBtn}
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>

          {/* Navigation */}
          <nav style={styles.nav}>
            <ul style={styles.navList}>
              {navigation.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <li key={item.name} style={styles.navItem}>
                    {isActive && <div style={styles.activeIndicator}></div>}
                    <a
                      href={item.href}
                      style={{
                        ...styles.navLink,
                        ...(isActive ? styles.navLinkActive : {})
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          Object.assign(e.currentTarget.style, styles.navLinkHover);
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#9ca3af';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <span style={styles.navIcon}>{item.icon}</span>
                      {!sidebarCollapsed && (
                        <>
                          <span style={styles.navText}>{item.name}</span>
                          {item.badge && (
                            <span style={styles.navBadge}>{item.badge}</span>
                          )}
                        </>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Header */}
          <header style={styles.header}>
            {/* Search */}
            <div style={styles.searchContainer}>
              <div style={styles.searchIcon}>🔍</div>
              <input
                type="text"
                placeholder="Search campaigns, atoms, moments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(0, 217, 255, 0.5)';
                  e.target.style.boxShadow = '0 0 0 2px rgba(0, 217, 255, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(55, 65, 81, 1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Header Actions */}
            <div style={styles.headerActions}>
              {/* Theme Switcher */}
              <button style={styles.headerBtn}>
                🎨
              </button>

              {/* Notifications */}
              <button style={styles.headerBtn}>
                🔔
                <span style={styles.notificationBadge}>2</span>
              </button>

              {/* User Profile */}
              <div 
                style={styles.userProfile}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={logout}
              >
                <div style={styles.userInfo}>
                  <p style={styles.userName}>{user?.name || 'Admin User'}</p>
                  <p style={styles.userRole}>{user?.role || 'Administrator'}</p>
                </div>
                <div style={styles.userAvatar}>
                  {(user?.name || 'A').charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main style={styles.content}>
            {children}
          </main>
        </div>
      </div>

      {/* Add CSS animation for spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default GlobalLayout;