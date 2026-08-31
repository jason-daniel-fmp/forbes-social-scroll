import { describe, expect, it } from 'vitest';

import { homeJourney } from './definitions';
import {
  getEnabledJourneys,
  getFirstOpenableStep,
  getJourneyById,
  getJourneyStep,
  isStepOpenable,
} from './registry';

describe('journey registry', () => {
  it('returns home journey by id', () => {
    const journey = getJourneyById('home');
    expect(journey?.id).toBe('home');
    expect(journey?.enabled).toBe(true);
  });

  it('returns only enabled journeys', () => {
    const enabled = getEnabledJourneys();
    expect(enabled.map((j) => j.id)).toEqual(['home', 'financial-recovery']);
  });

  it('finds journey steps by id', () => {
    const step = getJourneyStep('home', 'affordability');
    expect(step?.title).toContain('afford');
  });

  it('identifies openable vs disabled steps', () => {
    const first = getFirstOpenableStep(homeJourney);
    expect(first?.id).toBe('affordability');
    expect(isStepOpenable(first!)).toBe(true);

    const conversion = getJourneyStep('financial-recovery', 'conversion');
    expect(conversion).toBeDefined();
    expect(isStepOpenable(conversion!)).toBe(false);
  });
});
