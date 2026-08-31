import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { advisorSem2026Theme, healthTheme } from './themes/index';
import type { Theme, ThemeName } from './theme.types';

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  toggleTheme: () => void;
}

const themes: Record<ThemeName, Theme> = {
  'advisor-sem-2026': advisorSem2026Theme,
  health: healthTheme,
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeName;
}

export function ThemeProvider({
  children,
  initialTheme = 'advisor-sem-2026',
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(initialTheme);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: themes[themeName],
      themeName,
      setThemeName,
      toggleTheme: () =>
        setThemeName((current) => (current === 'advisor-sem-2026' ? 'health' : 'advisor-sem-2026')),
    }),
    [themeName],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
