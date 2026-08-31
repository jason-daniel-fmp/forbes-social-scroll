import type { JourneyId } from '@forbes/types';

import type { FeedItem } from './feedTypes';
import type { JourneyStateMap } from './feedVisibility';
import { shouldShowContinueJourney, shouldShowJourneyDiscovery } from './feedVisibility';

/** Inserts discovery or continue card — never both — for a stable feed slot. */
export function appendJourneySlot(
  items: FeedItem[],
  journeyId: JourneyId,
  states: JourneyStateMap,
): void {
  if (shouldShowJourneyDiscovery(journeyId, states)) {
    items.push({ kind: 'journey-discovery', journeyId });
    return;
  }

  if (shouldShowContinueJourney(journeyId, states)) {
    items.push({ kind: 'continue-journey', journeyId });
  }
}

export function getJourneySlotFeedIndex(
  slotAfterArticleIndex: number,
  includeSlot: boolean,
): number {
  return includeSlot ? slotAfterArticleIndex + 1 : -1;
}
