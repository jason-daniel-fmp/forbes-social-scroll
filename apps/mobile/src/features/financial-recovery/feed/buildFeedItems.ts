import type { FeedItem, JourneyStateMap } from '../../../shared/feed';
import { appendJourneySlot } from '../../../shared/feed/journeySlot';
import { financialRecoveryArticles } from '../data';

/** One swipe after the first article — discovery or continue share this slot. */
const JOURNEY_SLOT_AFTER_ARTICLE_INDEX = 0;

export function buildFinancialRecoveryFeedItems(states: JourneyStateMap = {}): FeedItem[] {
  const items: FeedItem[] = [];

  financialRecoveryArticles.forEach((article, index) => {
    items.push({ kind: 'article', article });

    if (index === JOURNEY_SLOT_AFTER_ARTICLE_INDEX) {
      appendJourneySlot(items, 'financial-recovery', states);
    }
  });

  return items;
}

export { JOURNEY_SLOT_AFTER_ARTICLE_INDEX as FINANCIAL_RECOVERY_JOURNEY_SLOT_AFTER_ARTICLE_INDEX };
