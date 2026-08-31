import { clearFeedScrollIndices } from '../feed/scrollPersistence';

interface ResetDevAppStateOptions {
  resetJourneyProgress: () => Promise<void>;
  clearHomePreference: () => Promise<void>;
}

/** Clears journey progress, home goal, and feed scroll positions for local testing. */
export async function resetDevAppState({
  resetJourneyProgress,
  clearHomePreference,
}: ResetDevAppStateOptions): Promise<void> {
  await Promise.all([resetJourneyProgress(), clearHomePreference(), clearFeedScrollIndices()]);
}
