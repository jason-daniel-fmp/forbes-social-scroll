import { describe, expect, it } from 'vitest';

import { createInitialJourneyState, markStepOpened, startJourney } from './state';
import { homeJourney } from './definitions/home-buying';
import { getJourneyPhaseProgress } from './phases';

const NOW = '2026-01-01T00:00:00.000Z';

describe('getJourneyPhaseProgress', () => {
  it('returns null when journey has no phases', () => {
    expect(getJourneyPhaseProgress(homeJourney, createInitialJourneyState('home'))).not.toBeNull();
  });

  it('marks plan complete after affordability is opened', () => {
    const started = startJourney(createInitialJourneyState('home'), homeJourney, NOW);
    const afterFirst = markStepOpened(started, 'affordability', NOW);
    const progress = getJourneyPhaseProgress(homeJourney, afterFirst);

    expect(progress?.overallOpened).toBe(1);
    expect(progress?.overallTotal).toBe(5);
    expect(progress?.phases[0]).toMatchObject({
      phaseId: 'plan',
      isComplete: true,
      isCurrent: false,
    });
    expect(progress?.phases[1]).toMatchObject({
      phaseId: 'finance',
      isCurrent: true,
    });
  });
});
