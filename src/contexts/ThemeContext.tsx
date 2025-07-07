// =============================================================================
// KAIROS FRONTEND - THEME CONTEXT
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/contexts/ThemeContext.tsx
// Purpose: Advanced theme management with multiple professional themes
// =============================================================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ============================================================================
// THEME DEFINITIONS
// ============================================================================

export type ThemeName = 
  | 'kairos-dark' 
  | 'kairos-light' 
  | 'kairos-purple' 
  | 'kairos-blue' 
  | 'kairos-green' 
  | 'kairos-orange';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: {
    primary: string;
    secondary: string;
  };
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

export interface Theme {
  name: ThemeName;
  displayName: string;
  colors: ThemeColors;
  cssVariables: Record<string, string>;
}

// ============================================================================
// THEME CONFIGURATIONS
// ============================================================================

const themes: Record<ThemeName, Theme> = {
  'kairos-dark': {
    name: 'kairos-dark',
    displayName: 'Kairos Dark',
    colors: {
      primary: '#3B82F6',      // Blue-500
      secondary: '#8B5CF6',    // Violet-500
      accent: '#06B6D4',       // Cyan-500
      background: {
        primary: '#0F172A',    // Slate-900
        secondary: '#1E293B',  // Slate-800
        tertiary: '#334155',   // Slate-700
      },
      text: {
        primary: '#F8FAFC',    // Slate-50
        secondary: '#CBD5E1',  // Slate-300
        muted: '#64748B',      // Slate-500
      },
      border: {
        primary: '#374151',    // Gray-700
        secondary: '#4B5563',  // Gray-600
      },
      status: {
        success: '#10B981',    // Emerald-500
        warning: '#F59E0B',    // Amber-500
        error: '#EF4444',      // Red-500
        info: '#3B82F6',       // Blue-500
      },
    },
    cssVariables: {
      '--color-primary': '59 130 246',
      '--color-secondary': '139 92 246',
      '--color-accent': '6 182 212',
      '--color-background': '15 23 42',
      '--color-surface': '30 41 59',
      '--color-text': '248 250 252',
    },
  },

  'kairos-light': {
    name: 'kairos-light',
    displayName: 'Kairos Light',
    colors: {
      primary: '#2563EB',      // Blue-600
      secondary: '#7C3AED',    // Violet-600
      accent: '#0891B2',       // Cyan-600
      background: {
        primary: '#FFFFFF',    // White
        secondary: '#F8FAFC',  // Slate-50
        tertiary: '#F1F5F9',   // Slate-100
      },
      text: {
        primary: '#0F172A',    // Slate-900
        secondary: '#475569',  // Slate-600
        muted: '#64748B',      // Slate-500
      },
      border: {
        primary: '#E2E8F0',    // Slate-200
        secondary: '#CBD5E1',  // Slate-300
      },
      status: {
        success: '#059669',    // Emerald-600
        warning: '#D97706',    // Amber-600
        error: '#DC2626',      // Red-600
        info: '#2563EB',       // Blue-600
      },
    },
    cssVariables: {
      '--color-primary': '37 99 235',
      '--color-secondary': '124 58 237',
      '--color-accent': '8 145 178',
      '--color-background': '255 255 255',
      '--color-surface': '248 250 252',
      '--color-text': '15 23 42',
    },
  },

  'kairos-purple': {
    name: 'kairos-purple',
    displayName: 'Kairos Purple',
    colors: {
      primary: '#8B5CF6',      // Violet-500
      secondary: '#A855F7',    // Purple-500
      accent: '#EC4899',       // Pink-500
      background: {
        primary: '#1E1B3A',    // Custom dark purple
        secondary: '#2D2A4A',  // Custom purple
        tertiary: '#3D3A5A',   // Custom light purple
      },
      text: {
        primary: '#F3F4F6',    // Gray-100
        secondary: '#D1D5DB',  // Gray-300
        muted: '#9CA3AF',      // Gray-400
      },
      border: {
        primary: '#4C4B6B',    // Custom border
        secondary: '#5C5B7B',  // Custom light border
      },
      status: {
        success: '#10B981',    // Emerald-500
        warning: '#F59E0B',    // Amber-500
        error: '#EF4444',      // Red-500
        info: '#8B5CF6',       // Violet-500
      },
    },
    cssVariables: {
      '--color-primary': '139 92 246',
      '--color-secondary': '168 85 247',
      '--color-accent': '236 72 153',
      '--color-background': '30 27 58',
      '--color-surface': '45 42 74',
      '--color-text': '243 244 246',
    },
  },

  'kairos-blue': {
    name: 'kairos-blue',
    displayName: 'Kairos Blue',
    colors: {
      primary: '#3B82F6',      // Blue-500
      secondary: '#1D4ED8',    // Blue-700
      accent: '#06B6D4',       // Cyan-500
      background: {
        primary: '#0C1E3E',    // Custom dark blue
        secondary: '#1E3A5F',  // Custom blue
        tertiary: '#2E4A6F',   // Custom light blue
      },
      text: {
        primary: '#F8FAFC',    // Slate-50
        secondary: '#CBD5E1',  // Slate-300
        muted: '#64748B',      // Slate-500
      },
      border: {
        primary: '#3E5A7F',    // Custom border
        secondary: '#4E6A8F',  // Custom light border
      },
      status: {
        success: '#10B981',    // Emerald-500
        warning: '#F59E0B',    // Amber-500
        error: '#EF4444',      // Red-500
        info: '#3B82F6',       // Blue-500
      },
    },
    cssVariables: {
      '--color-primary': '59 130 246',
      '--color-secondary': '29 78 216',
      '--color-accent': '6 182 212',
      '--color-background': '12 30 62',
      '--color-surface': '30 58 95',
      '--color-text': '248 250 252',
    },
  },

  'kairos-green': {
    name: 'kairos-green',
    displayName: 'Kairos Green',
    colors: {
      primary: '#10B981',      // Emerald-500
      secondary: '#059669',    // Emerald-600
      accent: '#14B8A6',       // Teal-500
      background: {
        primary: '#0F2A1E',    // Custom dark green
        secondary: '#1F3A2E',  // Custom green
        tertiary: '#2F4A3E',   // Custom light green
      },
      text: {
        primary: '#F0FDF4',    // Green-50
        secondary: '#BBFFD3',  // Custom light green
        muted: '#6EE7B7',      // Emerald-300
      },
      border: {
        primary: '#3F5A4E',    // Custom border
        secondary: '#4F6A5E',  // Custom light border
      },
      status: {
        success: '#10B981',    // Emerald-500
        warning: '#F59E0B',    // Amber-500
        error: '#EF4444',      // Red-500
        info: '#14B8A6',       // Teal-500
      },
    },
    cssVariables: {
      '--color-primary': '16 185 129',
      '--color-secondary': '5 150 105',
      '--color-accent': '20 184 166',
      '--color-background': '15 42 30',
      '--color-surface': '31 58 46',
      '--color-text': '240 253 244',
    },
  },

  'kairos-orange': {
    name: 'kairos-orange',
    displayName: 'Kairos Orange',
    colors: {
      primary: '#F97316',      // Orange-500
      secondary: '#EA580C',    // Orange-600
      accent: '#F59E0B',       // Amber-500
      background: {
        primary: '#2A1F0F',    // Custom dark orange
        secondary: '#3A2F1F',  // Custom orange
        tertiary: '#4A3F2F',   // Custom light orange
      },
      text: {
        primary: '#FFF7ED',    // Orange-50
        secondary: '#FFEDD5',  // Orange-100
        muted: '#FED7AA',      // Orange-200
      },
      border: {
        primary: '#5A4F3F',    // Custom border
        secondary: '#6A5F4F',  // Custom light border
      },
      status: {
        success: '#10B981',    // Emerald-500
        warning: '#F59E0B',    // Amber-500
        error: '#EF4444',      // Red-500
        info: '#F97316',       // Orange-500
      },
    },
    cssVariables: {
      '--color-primary': '249 115 22',
      '--color-secondary': '234 88 12',
      '--color-accent': '245 158 11',
      '--color-background': '42 31 15',
      '--color-surface': '58 47 31',
      '--color-text': '255 247 237',
    },
  },
};

// ============================================================================
// THEME CONTEXT
// ============================================================================

interface ThemeContextType {
  currentTheme: Theme;
  currentThemeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
  availableThemes: Theme[];
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================================================
// THEME PROVIDER
// ============================================================================

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'kairos-dark',
}) => {
  const [currentThemeName, setCurrentThemeName] = useState<ThemeName>(() => {
    // Try to load theme from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kairos-theme') as ThemeName;
      return saved && themes[saved] ? saved : defaultTheme;
    }
    return defaultTheme;
  });

  const currentTheme = themes[currentThemeName];
  const isDarkMode = currentThemeName.includes('dark') || 
                    currentThemeName === 'kairos-purple' || 
                    currentThemeName === 'kairos-blue' ||
                    currentThemeName === 'kairos-green' ||
                    currentThemeName === 'kairos-orange';

  // Apply CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    
    Object.entries(currentTheme.cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Save to localStorage
    localStorage.setItem('kairos-theme', currentThemeName);

    // Add theme class to body for any theme-specific styles
    document.body.className = document.body.className
      .replace(/kairos-theme-\w+/g, '')
      .concat(` kairos-theme-${currentThemeName}`);
  }, [currentTheme, currentThemeName]);

  const setTheme = (themeName: ThemeName) => {
    if (themes[themeName]) {
      setCurrentThemeName(themeName);
    }
  };

  const toggleTheme = () => {
    const themeNames = Object.keys(themes) as ThemeName[];
    const currentIndex = themeNames.indexOf(currentThemeName);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    setTheme(themeNames[nextIndex]);
  };

  const value: ThemeContextType = {
    currentTheme,
    currentThemeName,
    setTheme,
    availableThemes: Object.values(themes),
    toggleTheme,
    isDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// THEME HOOK
// ============================================================================

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ============================================================================
// THEME UTILITIES
// ============================================================================

export const getThemeColor = (colorPath: string, theme?: Theme): string => {
  const currentTheme = theme || themes['kairos-dark'];
  const paths = colorPath.split('.');
  
  let value: any = currentTheme.colors;
  for (const path of paths) {
    value = value?.[path];
  }
  
  return value || '#000000';
};

export const createThemeVariant = (
  basetheme: ThemeName,
  overrides: Partial<ThemeColors>
): Theme => {
  const base = themes[basetheme];
  return {
    ...base,
    colors: {
      ...base.colors,
      ...overrides,
    },
  };
};

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default ThemeProvider;