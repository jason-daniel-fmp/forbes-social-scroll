import { describe, expect, it } from 'vitest';

import { createInitialJourneyState, markStepOpened, startJourney } from '@forbes/config';
import { financialRecoveryJourney } from '@forbes/config';

import { appendJourneySlot } from './journeySlot';
import type { FeedItem } from './feedTypes';

const NOW = '2026-01-01T00:00:00.000Z';

describe('appendJourneySlot', () => {
  it('adds discovery when journey has not started', () => {
    const items: FeedItem[] = [];
    appendJourneySlot(items, 'financial-recovery', {});

    expect(items).toEqual([{ kind: 'journey-discovery', journeyId: 'financial-recovery' }]);
  });

  it('adds continue instead of discovery when journey is active', () => {
    const started = startJourney(
      createInitialJourneyState('financial-recovery'),
      financialRecoveryJourney,
      NOW,
    );
    const afterFirst = markStepOpened(started, 'debt-assessment', NOW);
    const items: FeedItem[] = [];

    appendJourneySlot(items, 'financial-recovery', { 'financial-recovery': afterFirst });

    expect(items).toEqual([{ kind: 'continue-journey', journeyId: 'financial-recovery' }]);
  });
});
