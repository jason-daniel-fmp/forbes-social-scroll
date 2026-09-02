import { describe, expect, it } from 'vitest';

import {
  MAX_WEIGHT,
  MIN_WEIGHT,
  clampClicks,
  incrementClicks,
  rankTiles,
  scoreTile,
} from './tileFrequency';

const catalog = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];

describe('clampClicks', () => {
  it('floors at 0 and caps at MAX_WEIGHT', () => {
    expect(clampClicks(-3)).toBe(0);
    expect(clampClicks(Number.NaN)).toBe(0);
    expect(clampClicks(MAX_WEIGHT + 4)).toBe(MAX_WEIGHT);
    expect(clampClicks(3.9)).toBe(3);
  });
});

describe('scoreTile', () => {
  it('adds MIN_WEIGHT so unused tiles still have a floor', () => {
    expect(scoreTile(0)).toBe(MIN_WEIGHT);
    expect(scoreTile(MAX_WEIGHT + 10)).toBe(MAX_WEIGHT + MIN_WEIGHT);
  });
});

describe('incrementClicks', () => {
  it('stops growing after MAX_WEIGHT', () => {
    expect(incrementClicks(0)).toBe(1);
    expect(incrementClicks(MAX_WEIGHT - 1)).toBe(MAX_WEIGHT);
    expect(incrementClicks(MAX_WEIGHT)).toBe(MAX_WEIGHT);
  });
});

describe('rankTiles', () => {
  it('sorts by visit count and keeps catalog order on ties', () => {
    const ranked = rankTiles(catalog, { c: 5, a: 5 });

    expect(ranked.map((item) => item.tile.id)).toEqual(['a', 'c', 'b', 'd']);
    expect(ranked[0].clicks).toBe(5);
    expect(ranked[2].clicks).toBe(0);
  });

  it('treats missing click keys as zero', () => {
    const ranked = rankTiles(catalog, {});

    expect(ranked.map((item) => item.tile.id)).toEqual(['a', 'b', 'c', 'd']);
    expect(ranked.every((item) => item.clicks === 0)).toBe(true);
  });
});
