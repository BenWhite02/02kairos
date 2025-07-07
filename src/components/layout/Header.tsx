// =============================================================================
// KAIROS FRONTEND - HEADER COMPONENT
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/components/layout/Header.tsx
// =============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  SwatchIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, Transition } from '@headlessui/react';

interface HeaderProps {
  sidebarCollapsed: boolean;
}

export function Header({ sidebarCollapsed }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentTheme, themeName, setTheme, availableThemes, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const notifications = [
    { id: 1, title: 'Campaign Performance Alert', message: 'Summer Campaign CTR increased by 15%', time: '5m ago', unread: true },
    { id: 2, title: 'New EligibilityAtom Available', message: 'Weather-based targeting atom released', time: '1h ago', unread: true },
    { id: 3, title: 'System Update Complete', message: 'Platform updated to v2.1.0', time: '3h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 flex items-center justify-between px-6">
      {/* Left Section - Search */}
      <div className="flex items-center space-x-4 flex-1">
        <motion.div
          className={`relative transition-all duration-300 ${
            searchFocused ? 'w-96' : 'w-80'
          }`}
          layout
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon 
              className={`h-5 w-5 transition-colors ${
                searchFocused ? 'text-primary' : 'text-gray-400'
              }`} 
            />
          </div>
          <input
            type="text"
            placeholder="Search campaigns, atoms, moments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`
              w-full pl-10 pr-4 py-2 
              bg-gray-800/50 border rounded-xl
              text-gray-100 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
              transition-all duration-200
              ${searchFocused ? 'border-primary/50 bg-gray-800/80' : 'border-gray-700 hover:border-gray-600'}
            `}
          />
          
          {/* Search Results Dropdown */}
          <AnimatePresence>
            {searchFocused && searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto"
              >
                <div className="p-3">
                  <div className="text-sm text-gray-400 mb-2">Quick Results</div>
                  <div className="space-y-1">
                    <div className="p-2 hover:bg-gray-700/50 rounded-lg cursor-pointer">
                      <div className="text-sm text-gray-200">Summer Campaign 2024</div>
                      <div className="text-xs text-gray-400">Active campaign</div>
                    </div>
                    <div className="p-2 hover:bg-gray-700/50 rounded-lg cursor-pointer">
                      <div className="text-sm text-gray-200">Age Range Atom</div>
                      <div className="text-xs text-gray-400">EligibilityAtom</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Section - Actions & Profile */}
      <div className="flex items-center space-x-4">
        {/* Theme Switcher */}
        <Menu as="div" className="relative">
          <Menu.Button className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-gray-300 transition-colors">
            <SwatchIcon className="w-5 h-5" />
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 p-2">
              <div className="text-xs text-gray-400 px-3 py-2 mb-1">Choose Theme</div>
              {Object.entries(availableThemes).map(([key, theme]) => (
                <Menu.Item key={key}>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme(key)}
                      className={`
                        w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors
                        ${themeName === key 
                          ? 'bg-primary/20 text-primary' 
                          : active 
                          ? 'bg-gray-700/50 text-gray-200' 
                          : 'text-gray-400'
                        }
                      `}
                    >
                      <div 
                        className="w-3 h-3 rounded-full mr-3 border border-gray-600"
                        style={{ backgroundColor: theme.primary }}
                      />
                      {theme.displayName}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>

        {/* Notifications */}
        <Menu as="div" className="relative">
          <Menu.Button className="relative p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-gray-300 transition-colors">
            {unreadCount > 0 ? (
              <BellIconSolid className="w-5 h-5 text-primary" />
            ) : (
              <BellIcon className="w-5 h-5" />
            )}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-gray-200">Notifications</h3>
                <p className="text-sm text-gray-400">{unreadCount} unread notifications</p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <Menu.Item key={notification.id}>
                    {({ active }) => (
                      <div className={`
                        p-4 border-b border-gray-700/50 cursor-pointer transition-colors
                        ${active ? 'bg-gray-700/30' : ''}
                        ${notification.unread ? 'border-l-2 border-l-primary' : ''}
                      `}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${notification.unread ? 'text-gray-100' : 'text-gray-300'}`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">{notification.time}</span>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </div>
              <div className="p-3 border-t border-gray-700">
                <button className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors">
                  View All Notifications
                </button>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        {/* User Profile */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-200">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-400">{user?.role || 'Administrator'}</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {(user?.name || 'A').charAt(0).toUpperCase()}
              </span>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 p-2">
              <Menu.Item>
                {({ active }) => (
                  <button className={`
                    w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors
                    ${active ? 'bg-gray-700/50 text-gray-200' : 'text-gray-400'}
                  `}>
                    <UserCircleIcon className="w-5 h-5 mr-3" />
                    Profile Settings
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button className={`
                    w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors
                    ${active ? 'bg-gray-700/50 text-gray-200' : 'text-gray-400'}
                  `}>
                    <Cog6ToothIcon className="w-5 h-5 mr-3" />
                    Preferences
                  </button>
                )}
              </Menu.Item>
              <div className="my-1 border-t border-gray-700" />
              <Menu.Item>
                {({ active }) => (
                  <button 
                    onClick={logout}
                    className={`
                      w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors
                      ${active ? 'bg-red-500/20 text-red-400' : 'text-gray-400 hover:text-red-400'}
                    `}
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
}

export default Header;