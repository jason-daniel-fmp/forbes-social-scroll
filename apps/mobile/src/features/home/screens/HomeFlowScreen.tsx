import { useEffect, useMemo, useState } from 'react';

import { ScrollFeed } from '../../../shared/screens';
import { useHomePreference } from '../context';
import type { HomeBuyingPhaseId } from '../data/homeBuyingPhases';
import { getHomeBuyingPhaseOption } from '../data/homeBuyingPhases';
import { buildHomeFeedItems } from '../feed/buildFeedItems';
import { HomeBuyingPhaseHubScreen } from './HomeBuyingPhaseHubScreen';
import { HomeBuyingPhasePlaceholderScreen } from './HomeBuyingPhasePlaceholderScreen';
import { HomePreferenceScreen } from './HomePreferenceScreen';

type HomeStep = 'preference' | 'buying-phase-hub' | 'buying-phase-detail' | 'feed';

interface HomeFlowScreenProps {
  onBackToModes: () => void;
}

export function HomeFlowScreen({ onBackToModes }: HomeFlowScreenProps) {
  const { preference, isHydrated, setHomeNeed } = useHomePreference();
  const [step, setStep] = useState<HomeStep>('preference');
  const [selectedPhaseId, setSelectedPhaseId] = useState<HomeBuyingPhaseId | null>(null);

  const feedItems = useMemo(() => buildHomeFeedItems({}, false), []);

  useEffect(() => {
    if (!isHydrated || !preference) {
      return;
    }

    if (preference.need === 'buying') {
      setStep('buying-phase-hub');
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
            setStep('buying-phase-hub');
            return;
          }
          setStep('feed');
        }}
      />
    );
  }

  if (step === 'buying-phase-hub') {
    return (
      <HomeBuyingPhaseHubScreen
        onBack={() => setStep('preference')}
        onSelectPhase={(phaseId) => {
          setSelectedPhaseId(phaseId);
          setStep('buying-phase-detail');
        }}
      />
    );
  }

  if (step === 'buying-phase-detail' && selectedPhaseId) {
    const phase = getHomeBuyingPhaseOption(selectedPhaseId);
    if (!phase) {
      setStep('buying-phase-hub');
      return null;
    }

    return (
      <HomeBuyingPhasePlaceholderScreen phase={phase} onBack={() => setStep('buying-phase-hub')} />
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
