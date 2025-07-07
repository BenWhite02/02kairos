// =============================================================================
// KAIROS FRONTEND - ENHANCED DASHBOARD WITH REAL-TIME METRICS
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/pages/EnhancedDashboard.tsx
// Purpose: Advanced dashboard with real-time metrics and comprehensive analytics
// =============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartBarIcon,
  BoltIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  EyeIcon,
  PlayIcon,
  PauseIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  CalendarIcon,
  FunnelIcon,
  ExportIcon,
} from '@heroicons/react/24/outline';
import { useDashboardData, useRealTimeMetrics } from '@/hooks/useApi';
import { useAppStore } from '@/stores/useAppStore';
import { useTheme } from '@/contexts/ThemeContext';

// ============================================================================
// METRIC CARD COMPONENT
// ============================================================================

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  loading?: boolean;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  loading = false,
  onClick,
}) => {
  const colorMap = {
    primary: 'border-primary/30 bg-primary/5',
    secondary: 'border-secondary/30 bg-secondary/5',
    accent: 'border-accent/30 bg-accent/5',
    success: 'border-green-500/30 bg-green-500/5',
    warning: 'border-yellow-500/30 bg-yellow-500/5',
    error: 'border-red-500/30 bg-red-500/5',
  };

  const iconColorMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`
        relative overflow-hidden bg-gray-900/50 backdrop-blur-xl border rounded-2xl p-6
        hover:bg-gray-900/70 transition-all duration-300 cursor-pointer
        ${colorMap[color]}
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-800/20" />
      
      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gray-800/50 ${iconColorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        
        {change && (
          <div className={`
            flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium
            ${change.trend === 'up' ? 'bg-green-500/20 text-green-400' :
              change.trend === 'down' ? 'bg-red-500/20 text-red-400' :
              'bg-gray-500/20 text-gray-400'
            }
          `}>
            {change.trend === 'up' ? (
              <TrendingUpIcon className="w-4 h-4" />
            ) : change.trend === 'down' ? (
              <TrendingDownIcon className="w-4 h-4" />
            ) : null}
            <span>{change.value > 0 ? '+' : ''}{change.value}%</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
        
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">{value}</span>
            {change && (
              <span className="text-sm text-gray-500">vs {change.period}</span>
            )}
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 transform -skew-x-12" />
    </motion.div>
  );
};

// ============================================================================
// REAL-TIME METRICS COMPONENT
// ============================================================================

const RealTimeMetrics: React.FC = () => {
  const { data: metrics, isLoading } = useRealTimeMetrics();
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <BoltIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Real-Time Metrics</h2>
            <p className="text-sm text-gray-400">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-green-400">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {isLoading ? '---' : metrics?.activeUsers?.toLocaleString() || '0'}
          </div>
          <div className="text-sm text-gray-400">Active Users</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary mb-1">
            {isLoading ? '---' : metrics?.decisionsPerSecond || '0'}
          </div>
          <div className="text-sm text-gray-400">Decisions/sec</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-accent mb-1">
            {isLoading ? '---' : `${metrics?.responseTime || 0}ms`}
          </div>
          <div className="text-sm text-gray-400">Avg Response</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {isLoading ? '---' : `${((1 - (metrics?.errorRate || 0)) * 100).toFixed(2)}%`}
          </div>
          <div className="text-sm text-gray-400">Success Rate</div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CAMPAIGN PERFORMANCE COMPONENT
// ============================================================================

const CampaignPerformance: React.FC = () => {
  const { activeCampaigns, isLoading } = useDashboardData();
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  const timeframes = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
            <ChartBarIcon className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Campaign Performance</h2>
            <p className="text-sm text-gray-400">Active campaigns overview</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-primary"
          >
            {timeframes.map(tf => (
              <option key={tf.value} value={tf.value}>{tf.label}</option>
            ))}
          </select>
          
          <button className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-400 hover:text-gray-300 transition-colors">
            <ExportIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : activeCampaigns.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <ChartBarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No active campaigns</p>
          </div>
        ) : (
          activeCampaigns.map((campaign: any, index: number) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <BoltIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{campaign.name}</h3>
                    <p className="text-sm text-gray-400">{campaign.status}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-300 transition-colors">
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-300 transition-colors">
                    <Cog6ToothIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">CTR</div>
                  <div className="font-medium text-white">
                    {campaign.performance?.ctr?.toFixed(2) || '0.00'}%
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Conversions</div>
                  <div className="font-medium text-white">
                    {campaign.performance?.conversions?.toLocaleString() || '0'}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Revenue</div>
                  <div className="font-medium text-green-400">
                    ${campaign.performance?.revenue?.toLocaleString() || '0'}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">ROAS</div>
                  <div className="font-medium text-primary">
                    {campaign.performance?.roas?.toFixed(1) || '0.0'}x
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

// ============================================================================
// SYSTEM HEALTH COMPONENT
// ============================================================================

const SystemHealth: React.FC = () => {
  const [healthData] = useState({
    components: [
      { name: 'Decision Engine', status: 'healthy', response: 12, uptime: 99.9 },
      { name: 'Analytics Service', status: 'healthy', response: 45, uptime: 99.8 },
      { name: 'Database', status: 'healthy', response: 8, uptime: 100 },
      { name: 'Cache Layer', status: 'warning', response: 156, uptime: 98.5 },
      { name: 'API Gateway', status: 'healthy', response: 23, uptime: 99.7 },
    ],
    overall: 'healthy',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-400 bg-green-500/20';
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'error':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircleIcon className="w-4 h-4" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
            <BoltIcon className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">System Health</h2>
            <p className="text-sm text-gray-400">Infrastructure monitoring</p>
          </div>
        </div>
        
        <div className={`
          flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium
          ${getStatusColor(healthData.overall)}
        `}>
          {getStatusIcon(healthData.overall)}
          <span className="capitalize">{healthData.overall}</span>
        </div>
      </div>

      <div className="space-y-3">
        {healthData.components.map((component, index) => (
          <motion.div
            key={component.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${getStatusColor(component.status)}
              `}>
                {getStatusIcon(component.status)}
              </div>
              <span className="font-medium text-white">{component.name}</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-gray-400">Response</div>
                <div className="font-medium text-white">{component.response}ms</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Uptime</div>
                <div className="font-medium text-green-400">{component.uptime}%</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN ENHANCED DASHBOARD COMPONENT
// ============================================================================

export const EnhancedDashboard: React.FC = () => {
  const { analytics, isLoading } = useDashboardData();
  const { currentTheme } = useTheme();
  const [timeframe, setTimeframe] = useState('7d');

  const metrics = [
    {
      title: 'Total Campaigns',
      value: analytics?.overview?.totalCampaigns || 0,
      change: { value: 8.2, period: 'last month', trend: 'up' as const },
      icon: BoltIcon,
      color: 'primary' as const,
    },
    {
      title: 'Decision Points',
      value: `${((analytics?.overview?.totalDecisions || 0) / 1000000).toFixed(1)}M`,
      change: { value: 12.4, period: 'last month', trend: 'up' as const },
      icon: ClockIcon,
      color: 'secondary' as const,
    },
    {
      title: 'Conversion Rate',
      value: `${(analytics?.overview?.avgConversionRate || 0).toFixed(2)}%`,
      change: { value: 0.8, period: 'last month', trend: 'up' as const },
      icon: TrendingUpIcon,
      color: 'accent' as const,
    },
    {
      title: 'Revenue Impact',
      value: `$${((analytics?.overview?.totalRevenue || 0) / 1000000).toFixed(1)}M`,
      change: { value: 15.6, period: 'last month', trend: 'up' as const },
      icon: CurrencyDollarIcon,
      color: 'success' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Campaign Intelligence Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Real-time insights and performance metrics for your marketing campaigns
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2 text-gray-300 focus:outline-none focus:border-primary"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            
            <button className="px-4 py-2 bg-gray-900/50 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-900/70 transition-colors flex items-center space-x-2">
              <ArrowPathIcon className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            
            <button className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity flex items-center space-x-2">
              <ExportIcon className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard {...metric} loading={isLoading} />
          </motion.div>
        ))}
      </div>

      {/* Real-time Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <RealTimeMetrics />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Campaign Performance - 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="xl:col-span-2"
        >
          <CampaignPerformance />
        </motion.div>

        {/* System Health - 1 column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <SystemHealth />
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Create Campaign', icon: PlusIcon, href: '/campaigns/new' },
            { label: 'Build Atom', icon: BeakerIcon, href: '/atoms/new' },
            { label: 'View Analytics', icon: ChartBarIcon, href: '/analytics' },
            { label: 'System Settings', icon: Cog6ToothIcon, href: '/settings' },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl hover:bg-gray-800/50 transition-colors text-left group"
            >
              <action.icon className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-medium text-white">{action.label}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedDashboard;