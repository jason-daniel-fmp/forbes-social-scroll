import { describe, expect, it } from 'vitest';

import { createInitialJourneyState, markStepOpened, startJourney } from './state';
import { homeJourney } from './definitions/home-buying';
import { getSurfaceableRecommendedStep, shouldSurfaceJourneyInFeed } from './surfacing';

const NOW = '2026-01-01T00:00:00.000Z';

describe('journey surfacing', () => {
  it('surfaces affordability when journey has not started', () => {
    const state = createInitialJourneyState('home');
    expect(shouldSurfaceJourneyInFeed('home', state)).toBe(true);
    expect(getSurfaceableRecommendedStep('home', state)?.id).toBe('affordability');
  });

  it('surfaces mortgage after affordability is opened', () => {
    const started = startJourney(createInitialJourneyState('home'), homeJourney, NOW);
    const afterFirst = markStepOpened(started, 'affordability', NOW);

    expect(getSurfaceableRecommendedStep('home', afterFirst)?.id).toBe('mortgage');
  });

  it('does not surface move before finance phase steps are opened', () => {
    const started = startJourney(createInitialJourneyState('home'), homeJourney, NOW);
    const afterAffordability = markStepOpened(started, 'affordability', NOW);

    expect(getSurfaceableRecommendedStep('home', afterAffordability)?.id).not.toBe('packers-movers');
  });
});
