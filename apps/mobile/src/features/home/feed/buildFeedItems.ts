import type { FeedItem, JourneyStateMap } from '../../../shared/feed';
import { appendJourneySlot } from '../../../shared/feed/journeySlot';
import { homeArticles } from '../data';

/** One swipe after the first article — discovery or continue share this slot. */
const JOURNEY_SLOT_AFTER_ARTICLE_INDEX = 0;

export function buildHomeFeedItems(
  states: JourneyStateMap = {},
  includeJourneySlot = false,
): FeedItem[] {
  const items: FeedItem[] = [];

  homeArticles.forEach((article, index) => {
    items.push({ kind: 'article', article });

    if (includeJourneySlot && index === JOURNEY_SLOT_AFTER_ARTICLE_INDEX) {
      appendJourneySlot(items, 'home', states);
    }
  });

  return items;
}

export { JOURNEY_SLOT_AFTER_ARTICLE_INDEX as HOME_JOURNEY_SLOT_AFTER_ARTICLE_INDEX };
