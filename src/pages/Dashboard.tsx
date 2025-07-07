// =============================================================================
// KAIROS FRONTEND - DASHBOARD PAGE
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/pages/Dashboard.tsx
// =============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  BoltIcon,
  BeakerIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  EyeIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

// Mock data for dashboard
const dashboardStats = {
  activeCampaigns: 12,
  totalMoments: 45,
  eligibilityAtoms: 23,
  monthlyRevenue: 125400,
  conversionRate: 3.8,
  activeUsers: 8429,
};

const recentCampaigns = [
  {
    id: 1,
    name: 'Summer Sale 2024',
    status: 'active',
    performance: 'excellent',
    ctr: 4.2,
    conversions: 1240,
    revenue: 45600,
  },
  {
    id: 2,
    name: 'Product Launch Campaign',
    status: 'active',
    performance: 'good',
    ctr: 3.1,
    conversions: 890,
    revenue: 32100,
  },
  {
    id: 3,
    name: 'Retention Drive',
    status: 'paused',
    performance: 'moderate',
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
  const { currentTheme } = useTheme();

  const statCards = [
    {
      name: 'Active Campaigns',
      value: dashboardStats.activeCampaigns,
      icon: BoltIcon,
      change: '+2 this week',
      positive: true,
      color: 'primary',
    },
    {
      name: 'EligibilityAtoms',
      value: dashboardStats.eligibilityAtoms,
      icon: BeakerIcon,
      change: '+5 new atoms',
      positive: true,
      color: 'secondary',
    },
    {
      name: 'Perfect Moments',
      value: dashboardStats.totalMoments,
      icon: ClockIcon,
      change: '+12 this month',
      positive: true,
      color: 'accent',
    },
    {
      name: 'Monthly Revenue',
      value: `$${(dashboardStats.monthlyRevenue / 1000).toFixed(0)}k`,
      icon: CurrencyDollarIcon,
      change: '+18.3%',
      positive: true,
      color: 'success',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Welcome back! Here's what's happening with your marketing campaigns.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-xl hover:bg-primary/30 transition-colors">
            <EyeIcon className="w-4 h-4 inline mr-2" />
            View Reports
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:opacity-90 transition-opacity">
            <BoltIcon className="w-4 h-4 inline mr-2" />
            Create Campaign
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <div className={`text-sm px-2 py-1 rounded-full bg-${stat.positive ? 'green' : 'red'}-500/20 text-${stat.positive ? 'green' : 'red'}-400`}>
                {stat.change}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Campaigns */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Campaigns</h2>
            <button className="text-primary hover:text-primary/80 text-sm">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div 
                key={campaign.id}
                className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-white">{campaign.name}</h3>
                    <span className={`
                      px-2 py-1 text-xs rounded-full
                      ${campaign.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : campaign.status === 'paused'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                      }
                    `}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-700/50 rounded">
                      <PlayIcon className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-700/50 rounded">
                      <PauseIcon className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-700/50 rounded">
                      <StopIcon className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">CTR</p>
                    <p className="text-lg font-semibold text-white">{campaign.ctr}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Conversions</p>
                    <p className="text-lg font-semibold text-white">{campaign.conversions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Revenue</p>
                    <p className="text-lg font-semibold text-white">${campaign.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* EligibilityAtom Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Atom Performance</h2>
            <BeakerIcon className="w-6 h-6 text-secondary" />
          </div>
          
          <div className="space-y-4">
            {atomPerformance.map((atom, index) => (
              <div key={atom.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">{atom.name}</span>
                  <span className="text-xs text-gray-400">{atom.usage}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${atom.usage}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`
                      h-2 rounded-full
                      ${atom.performance === 'high' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                        : atom.performance === 'medium'
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                        : 'bg-gradient-to-r from-red-500 to-pink-400'
                      }
                    `}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-700">
            <button className="w-full px-4 py-2 bg-secondary/20 text-secondary border border-secondary/30 rounded-xl hover:bg-secondary/30 transition-colors">
              Manage Atoms
            </button>
          </div>
        </motion.div>
      </div>

      {/* Performance Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Performance Overview</h2>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-primary/20 text-primary rounded-lg">7d</button>
            <button className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300">30d</button>
            <button className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300">90d</button>
          </div>
        </div>
        
        {/* Placeholder for chart */}
        <div className="h-64 bg-gradient-to-br from-gray-800/30 to-gray-700/30 rounded-xl flex items-center justify-center border border-gray-700/50">
          <div className="text-center">
            <ChartBarIcon className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">Performance chart will be rendered here</p>
            <p className="text-sm text-gray-500 mt-1">Integration with charting library needed</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}