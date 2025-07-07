// =============================================================================
// KAIROS FRONTEND - SETTINGS PAGE
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/pages/Settings.tsx
// =============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CogIcon, 
  UserIcon, 
  ShieldCheckIcon, 
  BellIcon,
  SwatchIcon 
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

export default function Settings() {
  const { currentTheme, themeName, setTheme, availableThemes } = useTheme();

  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: UserIcon,
      description: 'Manage your account information and preferences',
      items: ['Personal Information', 'Password & Security', 'Profile Picture']
    },
    {
      title: 'Security',
      icon: ShieldCheckIcon,
      description: 'Configure security and access controls',
      items: ['Two-Factor Authentication', 'API Keys', 'Access Logs']
    },
    {
      title: 'Notifications',
      icon: BellIcon,
      description: 'Control how and when you receive notifications',
      items: ['Email Notifications', 'Push Notifications', 'Alert Preferences']
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-400 mt-1">
            Configure your Kairos experience
          </p>
        </div>
      </motion.div>

      {/* Theme Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <SwatchIcon className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-white">Theme</h2>
        </div>
        <p className="text-gray-400 mb-6">Choose your preferred color scheme</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(availableThemes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${themeName === key 
                  ? 'border-primary bg-primary/10' 
                  : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div 
                  className="w-4 h-4 rounded-full border border-gray-600"
                  style={{ backgroundColor: theme.primary }}
                />
                <span className="font-medium text-white">{theme.displayName}</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.secondary }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.accent }} />
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <section.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">{section.description}</p>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item} className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                  • {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* System Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <CogIcon className="w-6 h-6 text-secondary" />
          <h2 className="text-xl font-semibold text-white">System Information</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Version</p>
            <p className="text-white font-medium">v1.0.0</p>
          </div>
          <div>
            <p className="text-gray-400">Environment</p>
            <p className="text-white font-medium">Development</p>
          </div>
          <div>
            <p className="text-gray-400">Theme</p>
            <p className="text-white font-medium">{currentTheme.displayName}</p>
          </div>
          <div>
            <p className="text-gray-400">Last Updated</p>
            <p className="text-white font-medium">Just now</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}