import { describe, expect, it } from 'vitest';

import { createInitialJourneyState, markStepOpened, startJourney } from '@forbes/config';
import { homeJourney } from '@forbes/config';

import { shouldShowContinueJourney, shouldShowJourneyDiscovery } from './feedVisibility';

const NOW = '2026-01-01T00:00:00.000Z';

describe('feed visibility', () => {
  it('shows discovery when home journey has not started', () => {
    expect(shouldShowJourneyDiscovery('home', {})).toBe(true);
  });

  it('hides discovery when home journey is active', () => {
    const started = startJourney(createInitialJourneyState('home'), homeJourney, NOW);
    expect(shouldShowJourneyDiscovery('home', { home: started })).toBe(false);
  });

  it('shows continue when active journey has a next step', () => {
    const started = startJourney(createInitialJourneyState('home'), homeJourney, NOW);
    const afterFirst = markStepOpened(started, 'affordability', NOW);
    expect(shouldShowContinueJourney('home', { home: afterFirst })).toBe(true);
  });
});
