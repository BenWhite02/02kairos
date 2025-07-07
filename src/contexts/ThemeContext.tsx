// =============================================================================
// KAIROS FRONTEND - ENHANCED THEME CONTEXT WITH DEEP BLACK
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/contexts/ThemeContext.tsx
// =============================================================================

import React, { createContext, useContext, useEffect, useState } from 'react';

// Enhanced theme configuration interface
interface Theme {
  name: string;
  displayName: string;
  description: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceGlass: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderElevated: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  // Enhanced visual properties
  glowIntensity: number;
  patternIntensity: number;
  gradients: {
    primary: string;
    surface: string;
    pattern: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    glow: string;
  };
}

// Enhanced themes with deep black focus
const themes: Record<string, Theme> = {
  'kairos-deep-black': {
    name: 'kairos-deep-black',
    displayName: 'Kairos Deep Black',
    description: 'Premium deep black theme with cyan accents',
    primary: '#00d9ff',
    secondary: '#ff6b9d',
    accent: '#00ff88',
    background: '#000000',
    surface: '#0a0a0a',
    surfaceElevated: '#111111',
    surfaceGlass: 'rgba(8, 8, 8, 0.95)',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    textMuted: '#808080',
    border: '#1a1a1a',
    borderElevated: '#2a2a2a',
    success: '#00ff88',
    warning: '#ffb800',
    error: '#ff4757',
    info: '#00d9ff',
    glowIntensity: 0.3,
    patternIntensity: 0.05,
    gradients: {
      primary: 'linear-gradient(135deg, #00d9ff, #ff6b9d)',
      surface: 'linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(20, 20, 20, 0.95))',
      pattern: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0), linear-gradient(45deg, rgba(0, 217, 255, 0.02) 0%, transparent 30%), linear-gradient(-45deg, rgba(255, 107, 157, 0.02) 0%, transparent 30%)',
    },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.8)',
      md: '0 4px 12px rgba(0, 0, 0, 0.7)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.6)',
      xl: '0 16px 48px rgba(0, 0, 0, 0.5)',
      glow: '0 0 20px rgba(0, 217, 255, 0.3)',
    },
  },
  'cyber-neon': {
    name: 'cyber-neon',
    displayName: 'Cyber Neon',
    description: 'High-contrast cyberpunk aesthetic',
    primary: '#ff0080',
    secondary: '#00ffff',
    accent: '#ffff00',
    background: '#000000',
    surface: '#0f0f0f',
    surfaceElevated: '#1a1a1a',
    surfaceGlass: 'rgba(15, 15, 15, 0.95)',
    text: '#ffffff',
    textSecondary: '#cccccc',
    textMuted: '#999999',
    border: '#333333',
    borderElevated: '#444444',
    success: '#00ff00',
    warning: '#ffaa00',
    error: '#ff0040',
    info: '#0080ff',
    glowIntensity: 0.5,
    patternIntensity: 0.08,
    gradients: {
      primary: 'linear-gradient(135deg, #ff0080, #00ffff)',
      surface: 'linear-gradient(135deg, rgba(15, 15, 15, 0.98), rgba(30, 30, 30, 0.95))',
      pattern: 'radial-gradient(circle at 2px 2px, rgba(255,0,128,0.08) 1px, transparent 0), linear-gradient(45deg, rgba(255, 0, 128, 0.03) 0%, transparent 30%), linear-gradient(-45deg, rgba(0, 255, 255, 0.03) 0%, transparent 30%)',
    },
    shadows: {
      sm: '0 1px 3px rgba(255, 0, 128, 0.3)',
      md: '0 4px 12px rgba(255, 0, 128, 0.4)',
      lg: '0 8px 24px rgba(255, 0, 128, 0.5)',
      xl: '0 16px 48px rgba(255, 0, 128, 0.6)',
      glow: '0 0 25px rgba(255, 0, 128, 0.5)',
    },
  },
  'elegant-dark': {
    name: 'elegant-dark',
    displayName: 'Elegant Dark',
    description: 'Sophisticated dark theme with purple accents',
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    background: '#0f172a',
    surface: '#1e293b',
    surfaceElevated: '#334155',
    surfaceGlass: 'rgba(30, 41, 59, 0.95)',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    border: '#475569',
    borderElevated: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    glowIntensity: 0.25,
    patternIntensity: 0.03,
    gradients: {
      primary: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      surface: 'linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(51, 65, 85, 0.95))',
      pattern: 'radial-gradient(circle at 2px 2px, rgba(99,102,241,0.03) 1px, transparent 0), linear-gradient(45deg, rgba(99, 102, 241, 0.02) 0%, transparent 30%), linear-gradient(-45deg, rgba(139, 92, 246, 0.02) 0%, transparent 30%)',
    },
    shadows: {
      sm: '0 1px 3px rgba(15, 23, 42, 0.8)',
      md: '0 4px 12px rgba(15, 23, 42, 0.7)',
      lg: '0 8px 24px rgba(15, 23, 42, 0.6)',
      xl: '0 16px 48px rgba(15, 23, 42, 0.5)',
      glow: '0 0 20px rgba(99, 102, 241, 0.25)',
    },
  },
};

interface ThemeContextType {
  currentTheme: Theme;
  themeName: string;
  setTheme: (themeName: string) => void;
  availableThemes: Record<string, Theme>;
  toggleTheme: () => void;
  isDarkMode: boolean;
  themeConfig: {
    animationDuration: number;
    enableGlowEffects: boolean;
    enablePatterns: boolean;
    enableAnimations: boolean;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<string>(() => {
    const saved = localStorage.getItem('kairos-theme');
    return saved && themes[saved] ? saved : 'kairos-deep-black';
  });

  const currentTheme = themes[themeName];

  // Theme configuration from environment variables
  const themeConfig = {
    animationDuration: parseInt(import.meta.env.VITE_ANIMATION_DURATION || '300'),
    enableGlowEffects: import.meta.env.VITE_ENABLE_GLOW_EFFECTS === 'true',
    enablePatterns: import.meta.env.VITE_ENABLE_GRADIENT_BACKGROUNDS === 'true',
    enableAnimations: import.meta.env.VITE_ENABLE_SMOOTH_ANIMATIONS === 'true',
  };

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

  // Apply theme to CSS custom properties with enhanced properties
  useEffect(() => {
    const root = document.documentElement;
    const theme = currentTheme;
    
    // Apply all theme properties
    Object.entries(theme).forEach(([key, value]) => {
      if (typeof value === 'string' && key !== 'name' && key !== 'displayName' && key !== 'description') {
        root.style.setProperty(`--color-${key}`, value);
      }
    });

    // Apply gradients
    Object.entries(theme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });

    // Apply shadows
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Apply intensity values
    root.style.setProperty('--glow-intensity', theme.glowIntensity.toString());
    root.style.setProperty('--pattern-intensity', theme.patternIntensity.toString());

    // Add theme class to body
    document.body.className = `theme-${themeName}`;
    
    // Apply background pattern
    if (themeConfig.enablePatterns) {
      document.body.style.backgroundImage = theme.gradients.pattern;
      document.body.style.backgroundSize = '40px 40px, 200% 200%, 200% 200%';
    }

    // Animation configuration
    root.style.setProperty('--animation-duration', `${themeConfig.animationDuration}ms`);
    
    console.log(`🎨 Theme applied: ${theme.displayName}`);
  }, [currentTheme, themeName, themeConfig]);

  const value: ThemeContextType = {
    currentTheme,
    themeName,
    setTheme,
    availableThemes: themes,
    toggleTheme,
    isDarkMode: true, // All themes are dark for now
    themeConfig,
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

// Theme utility functions
export const getThemeColor = (colorName: string, themeName?: string): string => {
  const theme = themeName ? themes[themeName] : themes['kairos-deep-black'];
  return (theme as any)[colorName] || '#ffffff';
};

export const generateThemeCSS = (theme: Theme): string => {
  return `
    :root {
      --color-primary: ${theme.primary};
      --color-secondary: ${theme.secondary};
      --color-accent: ${theme.accent};
      --color-background: ${theme.background};
      --color-surface: ${theme.surface};
      --color-surface-elevated: ${theme.surfaceElevated};
      --color-surface-glass: ${theme.surfaceGlass};
      --color-text: ${theme.text};
      --color-text-secondary: ${theme.textSecondary};
      --color-text-muted: ${theme.textMuted};
      --color-border: ${theme.border};
      --color-border-elevated: ${theme.borderElevated};
      --color-success: ${theme.success};
      --color-warning: ${theme.warning};
      --color-error: ${theme.error};
      --color-info: ${theme.info};
      --gradient-primary: ${theme.gradients.primary};
      --gradient-surface: ${theme.gradients.surface};
      --gradient-pattern: ${theme.gradients.pattern};
      --shadow-sm: ${theme.shadows.sm};
      --shadow-md: ${theme.shadows.md};
      --shadow-lg: ${theme.shadows.lg};
      --shadow-xl: ${theme.shadows.xl};
      --shadow-glow: ${theme.shadows.glow};
      --glow-intensity: ${theme.glowIntensity};
      --pattern-intensity: ${theme.patternIntensity};
    }
  `;
};

export { themes };