import { describe, expect, it } from 'vitest';

import { createInitialJourneyState, markStepOpened, startJourney } from '@forbes/config';
import { homeJourney } from '@forbes/config';

import { buildHomeFeedItems } from './buildFeedItems';

const NOW = '2026-01-01T00:00:00.000Z';

describe('buildHomeFeedItems', () => {
  it('shows articles only when buying journey slot is disabled', () => {
    const items = buildHomeFeedItems({}, false);
    expect(items.every((item) => item.kind === 'article')).toBe(true);
  });

  it('shows discovery card when buying journey has not started', () => {
    const items = buildHomeFeedItems({}, true);
    expect(items[1]).toMatchObject({ kind: 'journey-discovery', journeyId: 'home' });
  });

  it('inserts continue card at the stable slot when journey is active', () => {
    const started = startJourney(createInitialJourneyState('home'), homeJourney, NOW);
    const afterFirst = markStepOpened(started, 'affordability', NOW);

    const items = buildHomeFeedItems({ home: afterFirst }, true);
    expect(items[1]).toMatchObject({ kind: 'continue-journey', journeyId: 'home' });
  });
});
