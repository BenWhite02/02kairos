// =============================================================================
// KAIROS FRONTEND - SIDEBAR NAVIGATION COMPONENT
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/components/layout/Sidebar.tsx
// =============================================================================

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  BeakerIcon,
  ClockIcon,
  ChartBarIcon,
  CogIcon,
  BoltIcon,
  AdjustmentsHorizontalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  BeakerIcon as BeakerIconSolid,
  ClockIcon as ClockIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  CogIcon as CogIconSolid,
  BoltIcon as BoltIconSolid,
} from '@heroicons/react/24/solid';
import { useTheme } from '@/contexts/ThemeContext';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconSolid: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: string;
  description: string;
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
    iconSolid: HomeIconSolid,
    description: 'Overview & insights',
  },
  {
    name: 'EligibilityAtoms',
    href: '/atoms',
    icon: BeakerIcon,
    iconSolid: BeakerIconSolid,
    description: 'Decision components',
  },
  {
    name: 'Moments',
    href: '/moments',
    icon: ClockIcon,
    iconSolid: ClockIconSolid,
    description: 'Perfect timing delivery',
  },
  {
    name: 'Campaigns',
    href: '/campaigns',
    icon: BoltIcon,
    iconSolid: BoltIconSolid,
    badge: '3',
    description: 'Active campaigns',
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: ChartBarIcon,
    iconSolid: ChartBarIconSolid,
    description: 'Performance metrics',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: CogIcon,
    iconSolid: CogIconSolid,
    description: 'Configuration',
  },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { currentTheme } = useTheme();

  return (
    <div className="h-full flex flex-col">
      {/* Logo & Brand */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Kairos
                </h1>
                <p className="text-xs text-gray-400">Marketing Decisioning</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center mx-auto"
            >
              <ClockIcon className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={onToggle}
          className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-gray-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {collapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item, index) => {
          const isActive = location.pathname === item.href || 
                          (item.href === '/dashboard' && location.pathname === '/');
          const Icon = isActive ? item.iconSolid : item.icon;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.href}
                className={({ isActive: linkIsActive }) => {
                  const active = linkIsActive || isActive;
                  return `
                    group relative flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${active
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white shadow-lg shadow-primary/20 border border-primary/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }
                  `;
                }}
              >
                {/* Active indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute left-0 w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-r-full"
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <div className="flex-shrink-0">
                  <Icon 
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-primary' : 'text-current'
                    }`} 
                  />
                </div>

                {/* Label & Description */}
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 flex-1 overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{item.name}</span>
                        {item.badge && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-400">{item.description}</div>
                  </div>
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-800">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-3">
                <AdjustmentsHorizontalIcon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-300">Quick Actions</span>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left text-xs text-gray-400 hover:text-gray-300 transition-colors">
                  Create New Campaign
                </button>
                <button className="w-full text-left text-xs text-gray-400 hover:text-gray-300 transition-colors">
                  View Performance
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex justify-center"
            >
              <button className="p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors group">
                <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Sidebar;