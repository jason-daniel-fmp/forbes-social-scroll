import { describe, expect, it } from 'vitest';

import { homeJourney } from './definitions';
import {
  createInitialJourneyState,
  getNextOpenableStep,
  getRecommendedStep,
  markStepOpened,
  startJourney,
} from './state';

const NOW = '2026-01-01T00:00:00.000Z';

describe('journey state', () => {
  it('creates initial not-started state', () => {
    const state = createInitialJourneyState('home');
    expect(state.status).toBe('not-started');
    expect(state.openedStepIds).toEqual([]);
  });

  it('starts a journey at the first openable step', () => {
    const initial = createInitialJourneyState('home');
    const started = startJourney(initial, homeJourney, NOW);

    expect(started.status).toBe('active');
    expect(started.currentStepId).toBe('affordability');
    expect(started.startedAt).toBe(NOW);
  });

  it('marks a step as opened without implying completion', () => {
    const started = startJourney(createInitialJourneyState('home'), homeJourney, NOW);
    const opened = markStepOpened(started, 'affordability', NOW);

    expect(opened.openedStepIds).toEqual(['affordability']);
    expect(opened.currentStepId).toBe('affordability');
  });

  it('recommends the next unopened step after one is opened', () => {
    const started = startJourney(createInitialJourneyState('home'), homeJourney, NOW);
    const afterFirst = markStepOpened(started, 'affordability', NOW);

    expect(getRecommendedStep('home', afterFirst)?.id).toBe('mortgage');
    expect(getNextOpenableStep('home', afterFirst)?.id).toBe('mortgage');
  });
});
