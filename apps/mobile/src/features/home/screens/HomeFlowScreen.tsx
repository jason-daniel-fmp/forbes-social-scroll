import { useCallback, useState } from 'react';

import { PlaceholderPathScreen } from '../../placeholder';
import { openForbesUrl } from '../browser/openForbesUrl';
import { useHomePreference } from '../context';
import type { HomeBuyingPhaseId, HomeBuyingPhaseTool } from '../data/homeBuyingPhases';
import { getHomeBuyingPhaseOption } from '../data/homeBuyingPhases';
import { homeEditorialDestinations, homeEditorialIndex } from '../data/homeEditorialIndex';
import { HomeBuyingPhaseToolsScreen } from './HomeBuyingPhaseToolsScreen';
import { HomeBuyingWebViewScreen } from './HomeBuyingWebViewScreen';
import { HomePreferenceScreen } from './HomePreferenceScreen';

type HomeStep = 'index' | 'buying-phase-detail' | 'buying-webview' | 'goal-placeholder';

interface HomeFlowScreenProps {
  onBackToModes: () => void;
}

export function HomeFlowScreen({ onBackToModes }: HomeFlowScreenProps) {
  const { isHydrated, setHomeNeed } = useHomePreference();
  const [step, setStep] = useState<HomeStep>('index');
  const [selectedPhaseId, setSelectedPhaseId] = useState<HomeBuyingPhaseId | null>(null);
  const [activeTool, setActiveTool] = useState<HomeBuyingPhaseTool | null>(null);
  const [placeholderTitle, setPlaceholderTitle] = useState('Coming soon');

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

  const openPhase = useCallback(
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

  const handleCommit = useCallback(
    (itemId: string) => {
      const destination = homeEditorialDestinations[itemId];
      const item = homeEditorialIndex.items.find((entry) => entry.id === itemId);

      if (itemId === 'buying' || itemId === 'afford') {
        void setHomeNeed('buying');
      } else if (itemId === 'mortgages') {
        void setHomeNeed('mortgage');
      } else if (itemId === 'moving') {
        void setHomeNeed('moving');
      } else if (itemId === 'selling') {
        void setHomeNeed('selling');
      } else if (itemId === 'find') {
        void setHomeNeed('find');
      }

      if (!destination || destination.kind === 'placeholder') {
        setPlaceholderTitle(item?.title ?? 'Coming soon');
        setStep('goal-placeholder');
        return;
      }

      openPhase(destination.phaseId);
    },
    [openPhase, setHomeNeed],
  );

  if (!isHydrated) {
    return null;
  }

  if (step === 'index') {
    return <HomePreferenceScreen onBack={onBackToModes} onSelect={handleCommit} />;
  }

  if (step === 'buying-webview' && activeTool) {
    return (
      <HomeBuyingWebViewScreen
        tool={activeTool}
        onBack={() => {
          setActiveTool(null);
          setStep(selectedPhaseId ? 'buying-phase-detail' : 'index');
        }}
      />
    );
  }

  if (step === 'buying-phase-detail' && selectedPhase) {
    return (
      <HomeBuyingPhaseToolsScreen
        phase={selectedPhase}
        onBack={() => setStep('index')}
        onOpenTool={openTool}
      />
    );
  }

  return (
    <PlaceholderPathScreen
      title={placeholderTitle}
      eyebrow="Home & Property"
      onBack={() => setStep('index')}
    />
  );
}
