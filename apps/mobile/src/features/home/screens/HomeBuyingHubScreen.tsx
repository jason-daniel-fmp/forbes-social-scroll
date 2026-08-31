import { useCallback, useMemo, useState } from 'react';
import { InteractionManager, View } from 'react-native';

import {
  getJourneyById,
  getJourneyPhaseProgress,
  getJourneyProgressSheetPhases,
} from '@forbes/config';
import {
  JOURNEY_PROGRESS_RAIL_HEIGHT,
  JourneyProgressRail,
  JourneyProgressSheet,
} from '@forbes/ui';

import type { FeedItem } from '../../../shared/feed';
import { shouldShowJourneyDiscovery } from '../../../shared/feed';
import { ScrollFeed } from '../../../shared/screens';
import { useJourney } from '../../../shared/journey';
import { HomeHubFlowHint, HOME_HUB_FLOW_HINT_HEIGHT } from '../components/HomeHubFlowHint';

interface HomeBuyingHubScreenProps {
  feedItems: FeedItem[];
  onBack: () => void;
}

export function HomeBuyingHubScreen({ feedItems, onBack }: HomeBuyingHubScreenProps) {
  const { getJourneyState, openStep, states } = useJourney();
  const [isProgressSheetVisible, setProgressSheetVisible] = useState(false);

  const journey = getJourneyById('home');
  const state = getJourneyState('home');

  const phaseProgress = useMemo(() => {
    if (!journey) {
      return null;
    }
    return getJourneyPhaseProgress(journey, state);
  }, [journey, state]);

  const progressSheetPhases = useMemo(() => {
    if (!journey) {
      return [];
    }
    return getJourneyProgressSheetPhases(journey, state);
  }, [journey, state]);

  const flowHintMessage = useMemo(() => {
    if (shouldShowJourneyDiscovery('home', states)) {
      return 'Swipe up for your home buying journey';
    }

    if (state.openedStepIds.length === 0) {
      return 'Swipe up to continue your home buying journey';
    }

    return 'Swipe up for articles and your next step';
  }, [state.openedStepIds.length, states]);

  const handleCloseProgressSheet = useCallback(() => {
    setProgressSheetVisible(false);
  }, []);

  const handleOpenProgressSheet = useCallback(() => {
    setProgressSheetVisible(true);
  }, []);

  const handleStepPress = useCallback(
    (stepId: string) => {
      setProgressSheetVisible(false);

      InteractionManager.runAfterInteractions(() => {
        openStep('home', stepId);
      });
    },
    [openStep],
  );

  const headerChrome = (
    <View>
      {phaseProgress && journey ? (
        <JourneyProgressRail
          phases={phaseProgress.phases}
          overallOpened={phaseProgress.overallOpened}
          overallTotal={phaseProgress.overallTotal}
          onPress={handleOpenProgressSheet}
        />
      ) : null}
      <HomeHubFlowHint message={flowHintMessage} />
    </View>
  );

  const headerExtensionHeight = JOURNEY_PROGRESS_RAIL_HEIGHT + HOME_HUB_FLOW_HINT_HEIGHT;

  return (
    <>
      <ScrollFeed
        feedId="home"
        feedItems={feedItems}
        onBack={onBack}
        backLabel="Goals"
        headerExtension={headerChrome}
        headerExtensionHeight={headerExtensionHeight}
      />

      {journey && phaseProgress ? (
        <JourneyProgressSheet
          visible={isProgressSheetVisible}
          journeyTitle={journey.title}
          overallOpened={phaseProgress.overallOpened}
          overallTotal={phaseProgress.overallTotal}
          phases={progressSheetPhases}
          onClose={handleCloseProgressSheet}
          onStepPress={handleStepPress}
        />
      ) : null}
    </>
  );
}
