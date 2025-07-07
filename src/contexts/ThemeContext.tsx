// =============================================================================
// KAIROS FRONTEND - THEME CONTEXT PROVIDER
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/contexts/ThemeContext.tsx
// =============================================================================

import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme configuration interface
interface Theme {
  name: string;
  displayName: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

// Available themes
const themes: Record<string, Theme> = {
  'kairos-dark': {
    name: 'kairos-dark',
    displayName: 'Kairos Dark',
    primary: '#00d9ff', // Bright cyan - electric blue
    secondary: '#ff6b9d', // Vibrant pink
    accent: '#00ff88', // Electric green
    background: '#0a0a0a', // Deep black
    surface: '#111111', // Slightly lighter black
    text: '#ffffff', // Pure white
    textSecondary: '#a0a0a0', // Light gray
    border: '#222222', // Dark gray
    success: '#00ff88', // Electric green
    warning: '#ffb800', // Electric yellow
    error: '#ff4757', // Bright red
    info: '#00d9ff', // Bright cyan
  },
  'kairos-light': {
    name: 'kairos-light',
    displayName: 'Kairos Light',
    primary: '#0ea5e9',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  'kairos-neon': {
    name: 'kairos-neon',
    displayName: 'Kairos Neon',
    primary: '#ff0080', // Hot pink
    secondary: '#00ffff', // Cyan
    accent: '#ffff00', // Bright yellow
    background: '#000000', // Pure black
    surface: '#0f0f0f', // Almost black
    text: '#ffffff', // Pure white
    textSecondary: '#cccccc', // Light gray
    border: '#333333', // Dark gray
    success: '#00ff00', // Bright green
    warning: '#ffaa00', // Orange
    error: '#ff0040', // Bright red
    info: '#0080ff', // Bright blue
  }
};

interface ThemeContextType {
  currentTheme: Theme;
  themeName: string;
  setTheme: (themeName: string) => void;
  availableThemes: Record<string, Theme>;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<string>(() => {
    const saved = localStorage.getItem('kairos-theme');
    return saved && themes[saved] ? saved : 'kairos-dark';
  });

  const currentTheme = themes[themeName];

  const setTheme = (newThemeName: string) => {
    if (themes[newThemeName]) {
      setThemeName(newThemeName);
      localStorage.setItem('kairos-theme', newThemeName);
    }
  };

  const toggleTheme = () => {
    const themeNames = Object.keys(themes);
    const currentIndex = themeNames.indexOf(themeName);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    setTheme(themeNames[nextIndex]);
  };

  // Apply theme to CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(currentTheme).forEach(([key, value]) => {
      if (key !== 'name' && key !== 'displayName') {
        root.style.setProperty(`--color-${key}`, value);
      }
    });
    
    // Add theme class to body
    document.body.className = `theme-${themeName}`;
  }, [currentTheme, themeName]);

  const value: ThemeContextType = {
    currentTheme,
    themeName,
    setTheme,
    availableThemes: themes,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { themes };