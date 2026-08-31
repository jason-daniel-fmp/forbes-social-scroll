import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../feed/scrollPersistence', () => ({
  clearFeedScrollIndices: vi.fn(async () => undefined),
}));

import { clearFeedScrollIndices } from '../feed/scrollPersistence';
import { resetDevAppState } from './resetDevAppState';

describe('resetDevAppState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('clears journey progress, home preference, and feed scroll positions', async () => {
    const resetJourneyProgress = vi.fn(async () => undefined);
    const clearHomePreference = vi.fn(async () => undefined);

    await resetDevAppState({ resetJourneyProgress, clearHomePreference });

    expect(resetJourneyProgress).toHaveBeenCalledOnce();
    expect(clearHomePreference).toHaveBeenCalledOnce();
    expect(clearFeedScrollIndices).toHaveBeenCalledOnce();
  });
});
