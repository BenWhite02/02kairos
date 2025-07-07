// =============================================================================
// KAIROS FRONTEND - ENHANCED THEME SYSTEM
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/contexts/ThemeContext.tsx
// Purpose: World-class theme system with switcher and creator capabilities
// =============================================================================

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Theme Types and Interfaces
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeColors {
  // Primary colors
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  
  // Secondary colors
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  
  // Accent colors
  accent: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  
  // Semantic colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Background and surface colors
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
    overlay: string;
  };
  
  // Text colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    disabled: string;
  };
  
  // Border colors
  border: {
    primary: string;
    secondary: string;
    focus: string;
    error: string;
  };
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  mode: 'light' | 'dark';
  colors: ThemeColors;
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    full: string;
  };
  typography: {
    fontFamily: {
      sans: string[];
      mono: string[];
      display: string[];
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
    };
  };
  animation: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      ease: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
}

// Pre-defined Professional Themes
const createLightTheme = (name: string, primaryColor: any, accentColor: any): ThemeConfig => ({
  id: `light-${name.toLowerCase().replace(/\s+/g, '-')}`,
  name: `${name} Light`,
  description: `Professional ${name.toLowerCase()} theme for marketing professionals`,
  mode: 'light',
  colors: {
    primary: primaryColor,
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    accent: accentColor,
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      elevated: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#ffffff',
      disabled: '#94a3b8',
    },
    border: {
      primary: '#e2e8f0',
      secondary: '#cbd5e1',
      focus: primaryColor[500],
      error: '#ef4444',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      display: ['Inter Display', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
});

const createDarkTheme = (name: string, primaryColor: any, accentColor: any): ThemeConfig => ({
  id: `dark-${name.toLowerCase().replace(/\s+/g, '-')}`,
  name: `${name} Dark`,
  description: `Professional dark ${name.toLowerCase()} theme for marketing professionals`,
  mode: 'dark',
  colors: {
    primary: primaryColor,
    secondary: {
      50: '#020617',
      100: '#0f172a',
      200: '#1e293b',
      300: '#334155',
      400: '#475569',
      500: '#64748b',
      600: '#94a3b8',
      700: '#cbd5e1',
      800: '#e2e8f0',
      900: '#f1f5f9',
      950: '#f8fafc',
    },
    accent: accentColor,
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    background: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      elevated: '#1e293b',
      overlay: 'rgba(0, 0, 0, 0.8)',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#e2e8f0',
      tertiary: '#cbd5e1',
      inverse: '#1e293b',
      disabled: '#64748b',
    },
    border: {
      primary: '#334155',
      secondary: '#475569',
      focus: primaryColor[400],
      error: '#ef4444',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.6)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.3)',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      display: ['Inter Display', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
});

// Professional Color Palettes
const colorPalettes = {
  executive: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  luxury: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
    950: '#4a044e',
  },
  modern: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  professional: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },
  energetic: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
};

const accentPalettes = {
  gold: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
  coral: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
};

// Pre-defined Professional Themes
export const PREDEFINED_THEMES: ThemeConfig[] = [
  createLightTheme('Executive', colorPalettes.executive, accentPalettes.gold),
  createDarkTheme('Executive', colorPalettes.executive, accentPalettes.gold),
  createLightTheme('Luxury', colorPalettes.luxury, accentPalettes.emerald),
  createDarkTheme('Luxury', colorPalettes.luxury, accentPalettes.emerald),
  createLightTheme('Modern', colorPalettes.modern, accentPalettes.coral),
  createDarkTheme('Modern', colorPalettes.modern, accentPalettes.coral),
  createLightTheme('Professional', colorPalettes.professional, accentPalettes.gold),
  createDarkTheme('Professional', colorPalettes.professional, accentPalettes.gold),
  createLightTheme('Energetic', colorPalettes.energetic, accentPalettes.emerald),
  createDarkTheme('Energetic', colorPalettes.energetic, accentPalettes.emerald),
];

// Theme Context
interface ThemeContextType {
  currentTheme: ThemeConfig;
  themeMode: ThemeMode;
  availableThemes: ThemeConfig[];
  setTheme: (themeId: string) => void;
  setThemeMode: (mode: ThemeMode) => void;
  createCustomTheme: (theme: ThemeConfig) => void;
  deleteCustomTheme: (themeId: string) => void;
  exportTheme: (themeId: string) => string;
  importTheme: (themeData: string) => boolean;
  resetToDefault: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider Component
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  defaultMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light-executive',
  defaultMode = 'auto',
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultMode);
  const [currentThemeId, setCurrentThemeId] = useState<string>(defaultTheme);
  const [customThemes, setCustomThemes] = useState<ThemeConfig[]>([]);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem('kairos-theme-id');
    const savedThemeMode = localStorage.getItem('kairos-theme-mode') as ThemeMode;
    const savedCustomThemes = localStorage.getItem('kairos-custom-themes');

    if (savedThemeId) setCurrentThemeId(savedThemeId);
    if (savedThemeMode) setThemeModeState(savedThemeMode);
    if (savedCustomThemes) {
      try {
        setCustomThemes(JSON.parse(savedCustomThemes));
      } catch (error) {
        console.warn('Failed to parse custom themes from localStorage');
      }
    }
  }, []);

  // Monitor system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Determine effective theme mode
  const effectiveMode = themeMode === 'auto' ? (systemPrefersDark ? 'dark' : 'light') : themeMode;

  // Get all available themes
  const availableThemes = [...PREDEFINED_THEMES, ...customThemes];

  // Get current theme
  const currentTheme = availableThemes.find(theme => theme.id === currentThemeId) || PREDEFINED_THEMES[0];

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    Object.entries(currentTheme.colors.primary).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value);
    });
    
    Object.entries(currentTheme.colors.secondary).forEach(([key, value]) => {
      root.style.setProperty(`--color-secondary-${key}`, value);
    });
    
    Object.entries(currentTheme.colors.accent).forEach(([key, value]) => {
      root.style.setProperty(`--color-accent-${key}`, value);
    });
    
    Object.entries(currentTheme.colors.background).forEach(([key, value]) => {
      root.style.setProperty(`--color-background-${key}`, value);
    });
    
    Object.entries(currentTheme.colors.text).forEach(([key, value]) => {
      root.style.setProperty(`--color-text-${key}`, value);
    });
    
    Object.entries(currentTheme.colors.border).forEach(([key, value]) => {
      root.style.setProperty(`--color-border-${key}`, value);
    });

    // Apply semantic colors
    root.style.setProperty('--color-success', currentTheme.colors.success);
    root.style.setProperty('--color-warning', currentTheme.colors.warning);
    root.style.setProperty('--color-error', currentTheme.colors.error);
    root.style.setProperty('--color-info', currentTheme.colors.info);

    // Apply other design tokens
    Object.entries(currentTheme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    Object.entries(currentTheme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });

    // Set theme mode class
    root.className = effectiveMode;
  }, [currentTheme, effectiveMode]);

  // Theme management functions
  const setTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
    localStorage.setItem('kairos-theme-id', themeId);
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('kairos-theme-mode', mode);
  };

  const createCustomTheme = (theme: ThemeConfig) => {
    const newCustomThemes = [...customThemes, theme];
    setCustomThemes(newCustomThemes);
    localStorage.setItem('kairos-custom-themes', JSON.stringify(newCustomThemes));
  };

  const deleteCustomTheme = (themeId: string) => {
    const filteredThemes = customThemes.filter(theme => theme.id !== themeId);
    setCustomThemes(filteredThemes);
    localStorage.setItem('kairos-custom-themes', JSON.stringify(filteredThemes));
    
    // Switch to default if current theme is deleted
    if (currentThemeId === themeId) {
      setTheme(PREDEFINED_THEMES[0].id);
    }
  };

  const exportTheme = (themeId: string): string => {
    const theme = availableThemes.find(t => t.id === themeId);
    return theme ? JSON.stringify(theme, null, 2) : '';
  };

  const importTheme = (themeData: string): boolean => {
    try {
      const theme = JSON.parse(themeData) as ThemeConfig;
      // Validate theme structure
      if (theme.id && theme.name && theme.colors && theme.mode) {
        createCustomTheme(theme);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const resetToDefault = () => {
    setTheme(PREDEFINED_THEMES[0].id);
    setThemeMode('auto');
    setCustomThemes([]);
    localStorage.removeItem('kairos-custom-themes');
  };

  const contextValue: ThemeContextType = {
    currentTheme,
    themeMode,
    availableThemes,
    setTheme,
    setThemeMode,
    createCustomTheme,
    deleteCustomTheme,
    exportTheme,
    importTheme,
    resetToDefault,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Utility function to get CSS variables
export const getCSSVariable = (variable: string): string => {
  return `var(--${variable})`;
};

// Utility function to create theme-aware class names
export const createThemeClass = (baseClass: string, variant?: string): string => {
  return variant ? `${baseClass}-${variant}` : baseClass;
};

export default ThemeProvider;