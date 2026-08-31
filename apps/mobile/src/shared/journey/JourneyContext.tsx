import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  createInitialJourneyState,
  getJourneyById,
  getJourneyStep,
  getRecommendedStep,
  isStepOpenable,
  markStepOpened,
  startJourney,
} from '@forbes/config';
import { JourneyWebView } from '@forbes/ui';
import type { JourneyId, JourneyStep, UserJourneyState } from '@forbes/types';

import {
  loadJourneyStates,
  saveJourneyStates,
  clearJourneyStates,
  type JourneyStateMap,
} from './persistence';

interface WebViewSession {
  journeyId: JourneyId;
  stepId: string;
  url: string;
  title: string;
}

interface JourneyContextValue {
  states: JourneyStateMap;
  isHydrated: boolean;
  getJourneyState: (journeyId: JourneyId) => UserJourneyState;
  getRecommendedStepForJourney: (journeyId: JourneyId) => JourneyStep | undefined;
  activateJourney: (journeyId: JourneyId) => Promise<JourneyStep | undefined>;
  openRecommendedStep: (journeyId: JourneyId) => JourneyStep | undefined;
  openStep: (journeyId: JourneyId, stepId: string) => JourneyStep | undefined;
  closeWebView: () => void;
  resetAllProgress: () => Promise<void>;
  webViewSession: WebViewSession | null;
}

const JourneyContext = createContext<JourneyContextValue | null>(null);

interface JourneyProviderProps {
  children: ReactNode;
}

export function JourneyProvider({ children }: JourneyProviderProps) {
  const [states, setStates] = useState<JourneyStateMap>({});
  const [isHydrated, setIsHydrated] = useState(false);
  const [webViewSession, setWebViewSession] = useState<WebViewSession | null>(null);

  useEffect(() => {
    let cancelled = false;

    void loadJourneyStates().then((loaded) => {
      if (!cancelled) {
        setStates(loaded);
        setIsHydrated(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const updateJourneyState = useCallback(
    async (journeyId: JourneyId, updater: (current: UserJourneyState) => UserJourneyState) => {
      let computed: UserJourneyState | undefined;
      setStates((previous) => {
        const current = previous[journeyId] ?? createInitialJourneyState(journeyId);
        computed = updater(current);
        const next = { ...previous, [journeyId]: computed };
        void saveJourneyStates(next);
        return next;
      });
      return computed;
    },
    [],
  );

  const getJourneyState = useCallback(
    (journeyId: JourneyId): UserJourneyState => {
      return states[journeyId] ?? createInitialJourneyState(journeyId);
    },
    [states],
  );

  const getRecommendedStepForJourney = useCallback(
    (journeyId: JourneyId): JourneyStep | undefined => {
      return getRecommendedStep(journeyId, getJourneyState(journeyId));
    },
    [getJourneyState],
  );

  const openStepInternal = useCallback(
    async (journeyId: JourneyId, stepId: string): Promise<JourneyStep | undefined> => {
      const step = getJourneyStep(journeyId, stepId);
      if (!step || !isStepOpenable(step)) {
        return undefined;
      }

      await updateJourneyState(journeyId, (current) => markStepOpened(current, stepId));

      setWebViewSession({
        journeyId,
        stepId: step.id,
        url: step.url,
        title: step.title,
      });

      return step;
    },
    [updateJourneyState],
  );

  const activateJourney = useCallback(
    async (journeyId: JourneyId): Promise<JourneyStep | undefined> => {
      const journey = getJourneyById(journeyId);
      if (!journey || journey.enabled === false) {
        return undefined;
      }

      const current = getJourneyState(journeyId);
      if (current.status === 'active') {
        return getRecommendedStep(journeyId, current);
      }

      const started = startJourney(current, journey);
      const recommended = getRecommendedStep(journeyId, started);
      if (!recommended) {
        return undefined;
      }

      await updateJourneyState(journeyId, () => started);
      return recommended;
    },
    [getJourneyState, updateJourneyState],
  );

  const openRecommendedStep = useCallback(
    (journeyId: JourneyId): JourneyStep | undefined => {
      const recommended = getRecommendedStepForJourney(journeyId);
      if (!recommended) {
        return undefined;
      }
      void openStepInternal(journeyId, recommended.id);
      return recommended;
    },
    [getRecommendedStepForJourney, openStepInternal],
  );

  const openStep = useCallback(
    (journeyId: JourneyId, stepId: string): JourneyStep | undefined => {
      void openStepInternal(journeyId, stepId);
      return getJourneyStep(journeyId, stepId);
    },
    [openStepInternal],
  );

  const closeWebView = useCallback(() => {
    setWebViewSession(null);
  }, []);

  const resetAllProgress = useCallback(async () => {
    setWebViewSession(null);
    setStates({});
    await clearJourneyStates();
  }, []);

  const value = useMemo<JourneyContextValue>(
    () => ({
      states,
      isHydrated,
      getJourneyState,
      getRecommendedStepForJourney,
      activateJourney,
      openRecommendedStep,
      openStep,
      closeWebView,
      resetAllProgress,
      webViewSession,
    }),
    [
      states,
      isHydrated,
      getJourneyState,
      getRecommendedStepForJourney,
      activateJourney,
      openRecommendedStep,
      openStep,
      closeWebView,
      resetAllProgress,
      webViewSession,
    ],
  );

  return (
    <JourneyContext.Provider value={value}>
      {children}
      {webViewSession ? (
        <JourneyWebView
          visible
          journeyId={webViewSession.journeyId}
          stepId={webViewSession.stepId}
          url={webViewSession.url}
          title={webViewSession.title}
          onClose={closeWebView}
        />
      ) : null}
    </JourneyContext.Provider>
  );
}

export function useJourney(): JourneyContextValue {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
}
