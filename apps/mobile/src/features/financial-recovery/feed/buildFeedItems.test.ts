import { describe, expect, it } from 'vitest';

import { createInitialJourneyState, markStepOpened, startJourney } from '@forbes/config';
import { financialRecoveryJourney } from '@forbes/config';

import { buildFinancialRecoveryFeedItems } from './buildFeedItems';

const NOW = '2026-01-01T00:00:00.000Z';

describe('buildFinancialRecoveryFeedItems', () => {
  it('shows discovery card when journey has not started', () => {
    const items = buildFinancialRecoveryFeedItems({});
    const discovery = items.filter((item) => item.kind === 'journey-discovery');

    expect(discovery).toHaveLength(1);
    expect(discovery[0]).toMatchObject({ journeyId: 'financial-recovery' });
  });

  it('shows continue card after journey starts', () => {
    const started = startJourney(
      createInitialJourneyState('financial-recovery'),
      financialRecoveryJourney,
      NOW,
    );
    const afterFirst = markStepOpened(started, 'debt-assessment', NOW);

    const items = buildFinancialRecoveryFeedItems({ 'financial-recovery': afterFirst });
    const discovery = items.filter((item) => item.kind === 'journey-discovery');
    const continueCards = items.filter((item) => item.kind === 'continue-journey');

    expect(discovery).toHaveLength(0);
    expect(continueCards).toHaveLength(1);
  });

  it('keeps the journey card at the same feed index before and after start', () => {
    const before = buildFinancialRecoveryFeedItems({});
    const started = startJourney(
      createInitialJourneyState('financial-recovery'),
      financialRecoveryJourney,
      NOW,
    );
    const afterFirst = markStepOpened(started, 'debt-assessment', NOW);
    const after = buildFinancialRecoveryFeedItems({ 'financial-recovery': afterFirst });

    expect(before[1]).toMatchObject({ kind: 'journey-discovery', journeyId: 'financial-recovery' });
    expect(after[1]).toMatchObject({ kind: 'continue-journey', journeyId: 'financial-recovery' });
  });
});
