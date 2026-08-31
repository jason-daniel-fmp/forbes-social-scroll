import { useCallback, useEffect, useMemo, useState } from 'react';

import { ScrollFeed } from '../../../shared/screens';
import { openForbesUrl } from '../browser/openForbesUrl';
import { useHomePreference } from '../context';
import type { HomeBuyingPhaseId, HomeBuyingPhaseTool } from '../data/homeBuyingPhases';
import { getHomeBuyingPhaseOption } from '../data/homeBuyingPhases';
import { buildHomeFeedItems } from '../feed/buildFeedItems';
import { HomeBuyingPhaseHubScreen } from './HomeBuyingPhaseHubScreen';
import { HomeBuyingPhaseToolsScreen } from './HomeBuyingPhaseToolsScreen';
import { HomeBuyingWebViewScreen } from './HomeBuyingWebViewScreen';
import { HomePreferenceScreen } from './HomePreferenceScreen';

type HomeStep =
  'preference' | 'buying-phase-hub' | 'buying-phase-detail' | 'buying-webview' | 'feed';

const BUYING_STEPS: HomeStep[] = ['buying-phase-hub', 'buying-phase-detail', 'buying-webview'];

interface HomeFlowScreenProps {
  onBackToModes: () => void;
}

export function HomeFlowScreen({ onBackToModes }: HomeFlowScreenProps) {
  const { preference, isHydrated, setHomeNeed } = useHomePreference();
  const [step, setStep] = useState<HomeStep>('preference');
  const [selectedPhaseId, setSelectedPhaseId] = useState<HomeBuyingPhaseId | null>(null);
  const [activeTool, setActiveTool] = useState<HomeBuyingPhaseTool | null>(null);

  const feedItems = useMemo(() => buildHomeFeedItems({}, false), []);
  const selectedPhase = selectedPhaseId ? getHomeBuyingPhaseOption(selectedPhaseId) : undefined;

  const openTool = useCallback((tool: HomeBuyingPhaseTool) => {
    void openForbesUrl(tool.url).then((openedInApp) => {
      if (openedInApp) {
        return;
      }
      setActiveTool(tool);
      setStep('buying-webview');
    });
  }, []);

  const handleSelectPhase = useCallback(
    (phaseId: HomeBuyingPhaseId) => {
      const phase = getHomeBuyingPhaseOption(phaseId);
      if (!phase || phase.tools.length === 0) {
        return;
      }

      if (phase.tools.length === 1) {
        openTool(phase.tools[0]);
        return;
      }

      setSelectedPhaseId(phaseId);
      setStep('buying-phase-detail');
    },
    [openTool],
  );

  useEffect(() => {
    if (!isHydrated || !preference) {
      return;
    }

    if (preference.need === 'buying') {
      setStep((current) => (BUYING_STEPS.includes(current) ? current : 'buying-phase-hub'));
      return;
    }

    setStep('feed');
  }, [isHydrated, preference]);

  if (!isHydrated) {
    return null;
  }

  if (step === 'preference') {
    return (
      <HomePreferenceScreen
        onBack={onBackToModes}
        onSelect={async (need) => {
          await setHomeNeed(need);
          if (need === 'buying') {
            setSelectedPhaseId(null);
            setActiveTool(null);
            setStep('buying-phase-hub');
            return;
          }
          setStep('feed');
        }}
      />
    );
  }

  if (step === 'buying-webview' && activeTool) {
    return (
      <HomeBuyingWebViewScreen
        tool={activeTool}
        onBack={() => {
          setActiveTool(null);
          setStep(selectedPhaseId ? 'buying-phase-detail' : 'buying-phase-hub');
        }}
      />
    );
  }

  if (step === 'buying-phase-detail' && selectedPhase) {
    return (
      <HomeBuyingPhaseToolsScreen
        phase={selectedPhase}
        onBack={() => setStep('buying-phase-hub')}
        onOpenTool={openTool}
      />
    );
  }

  if (step === 'buying-phase-hub' || step === 'buying-phase-detail' || step === 'buying-webview') {
    return (
      <HomeBuyingPhaseHubScreen
        onBack={() => setStep('preference')}
        onSelectPhase={handleSelectPhase}
      />
    );
  }

  return (
    <ScrollFeed
      feedId="home"
      feedItems={feedItems}
      onBack={() => setStep('preference')}
      backLabel="Goals"
    />
  );
}
