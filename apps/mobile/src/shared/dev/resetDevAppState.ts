import { clearFeedScrollIndices } from '../feed/scrollPersistence';
import { clearTileClicks } from '../tiles/persistence';

interface ResetDevAppStateOptions {
  resetJourneyProgress: () => Promise<void>;
  clearHomePreference: () => Promise<void>;
}

/** Clears journey progress, home goal, feed scroll, and landing tile click weights. */
export async function resetDevAppState({
  resetJourneyProgress,
  clearHomePreference,
}: ResetDevAppStateOptions): Promise<void> {
  await Promise.all([
    resetJourneyProgress(),
    clearHomePreference(),
    clearFeedScrollIndices(),
    clearTileClicks(),
  ]);
}
