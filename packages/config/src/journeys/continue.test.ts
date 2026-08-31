import { describe, expect, it } from 'vitest';

import { createInitialJourneyState, markStepOpened, startJourney } from './state';
import { homeJourney } from './definitions';
import { getContinueJourneyContent } from './continue';

const NOW = '2026-01-01T00:00:00.000Z';

describe('getContinueJourneyContent', () => {
  it('returns null when journey is not active', () => {
    const state = createInitialJourneyState('home');
    expect(getContinueJourneyContent('home', state)).toBeNull();
  });

  it('returns next step after first step is opened', () => {
    const started = startJourney(createInitialJourneyState('home'), homeJourney, NOW);
    const afterFirst = markStepOpened(started, 'affordability', NOW);
    const content = getContinueJourneyContent('home', afterFirst);

    expect(content?.nextStepTitle).toContain('Mortgage');
    expect(content?.summary).toContain('afford');
  });

  it('adds phase context before move step', () => {
    let state = startJourney(createInitialJourneyState('home'), homeJourney, NOW);
    state = markStepOpened(state, 'affordability', NOW);
    state = markStepOpened(state, 'mortgage', NOW);
    state = markStepOpened(state, 'home-loan', NOW);

    const content = getContinueJourneyContent('home', state);
    expect(content?.contextMessage).toContain('financially prepared');
    expect(content?.ctaLabel).toBe('Plan my move');
  });
});
