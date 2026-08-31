import { getSurfaceableRecommendedStep } from '@forbes/config';
import type { JourneyId, UserJourneyState } from '@forbes/types';

export type JourneyStateMap = Partial<Record<JourneyId, UserJourneyState>>;

export function shouldShowJourneyDiscovery(journeyId: JourneyId, states: JourneyStateMap): boolean {
  const state = states[journeyId];
  return !state || state.status === 'not-started';
}

export function shouldShowContinueJourney(journeyId: JourneyId, states: JourneyStateMap): boolean {
  const state = states[journeyId];
  if (!state || state.status !== 'active') {
    return false;
  }

  return getSurfaceableRecommendedStep(journeyId, state) !== undefined;
}
