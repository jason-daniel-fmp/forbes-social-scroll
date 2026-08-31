import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('react-native', () => ({
  NativeModules: {},
}));

import { loadFeedScrollIndex, saveFeedScrollIndex } from './scrollPersistence';

describe('feed scroll persistence', () => {
  beforeEach(async () => {
    const { clearFeedScrollIndices } = await import('./scrollPersistence');
    await clearFeedScrollIndices();
  });

  it('persists indices per feed in memory', async () => {
    await saveFeedScrollIndex('trends', 2);
    await saveFeedScrollIndex('home', 1);

    expect(await loadFeedScrollIndex('trends')).toBe(2);
    expect(await loadFeedScrollIndex('home')).toBe(1);
    expect(await loadFeedScrollIndex('financial-recovery')).toBe(0);
  });
});
