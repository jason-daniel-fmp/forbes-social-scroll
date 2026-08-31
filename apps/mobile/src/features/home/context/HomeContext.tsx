import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { HomeNeed, HomePreference } from '@forbes/types';

import { loadHomePreference, saveHomePreference } from './persistence';

interface HomeContextValue {
  preference: HomePreference | null;
  isHydrated: boolean;
  setHomeNeed: (need: HomeNeed) => Promise<void>;
  clearPreference: () => Promise<void>;
}

const HomeContext = createContext<HomeContextValue | null>(null);

interface HomeProviderProps {
  children: ReactNode;
}

export function HomeProvider({ children }: HomeProviderProps) {
  const [preference, setPreference] = useState<HomePreference | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void loadHomePreference().then((loaded) => {
      if (!cancelled) {
        setPreference(loaded);
        setIsHydrated(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const setHomeNeed = useCallback(async (need: HomeNeed) => {
    const next: HomePreference = {
      need,
      selectedAt: new Date().toISOString(),
    };
    setPreference(next);
    await saveHomePreference(next);
  }, []);

  const clearPreference = useCallback(async () => {
    setPreference(null);
    const { clearHomePreference } = await import('./persistence');
    await clearHomePreference();
  }, []);

  const value = useMemo<HomeContextValue>(
    () => ({
      preference,
      isHydrated,
      setHomeNeed,
      clearPreference,
    }),
    [preference, isHydrated, setHomeNeed, clearPreference],
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHomePreference(): HomeContextValue {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHomePreference must be used within a HomeProvider');
  }
  return context;
}
