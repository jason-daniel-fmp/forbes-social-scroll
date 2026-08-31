import { describe, expect, it } from 'vitest';

import { clampScrollIndex } from './scrollIndex';

describe('clampScrollIndex', () => {
  it('returns 0 for empty feeds', () => {
    expect(clampScrollIndex(3, 0)).toBe(0);
  });

  it('clamps high indices to the last item', () => {
    expect(clampScrollIndex(9, 4)).toBe(3);
  });

  it('floors fractional indices', () => {
    expect(clampScrollIndex(2.9, 5)).toBe(2);
  });

  it('returns 0 for invalid indices', () => {
    expect(clampScrollIndex(-1, 5)).toBe(0);
    expect(clampScrollIndex(Number.NaN, 5)).toBe(0);
  });
});
