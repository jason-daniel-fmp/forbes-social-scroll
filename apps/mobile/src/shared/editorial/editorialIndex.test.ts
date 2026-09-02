import { describe, expect, it } from 'vitest';

import {
  EDITORIAL_INDEX_COLLAPSED_HEIGHT,
  buildIndexAccessibilityLabel,
  formatIndexNumber,
  resolveFocusedIndex,
  resolveFocusedIndexFromAnchors,
} from '@forbes/types';

import { financialRecoveryEditorialIndex } from '../../features/financial-recovery/data/financialRecoveryEditorialIndex';
import { homeEditorialIndex } from '../../features/home/data/homeEditorialIndex';
import { businessEditorialIndex } from './businessEditorialIndex';

describe('formatIndexNumber', () => {
  it('pads section numbers', () => {
    expect(formatIndexNumber(1)).toBe('01');
    expect(formatIndexNumber(12)).toBe('12');
    expect(formatIndexNumber(-1)).toBe('00');
  });
});

describe('buildIndexAccessibilityLabel', () => {
  it('includes title, selection, descriptor, and position', () => {
    expect(
      buildIndexAccessibilityLabel('Affording a home', {
        description: 'Budget · Payments · Planning',
        index: 2,
        total: 6,
        selected: true,
      }),
    ).toBe('Affording a home. Selected. Budget · Payments · Planning. Section 2 of 6.');
  });
});

describe('resolveFocusedIndex', () => {
  const slot = EDITORIAL_INDEX_COLLAPSED_HEIGHT;

  it('keeps the first item focused at rest', () => {
    expect(resolveFocusedIndex(0, 6, slot, 0)).toBe(0);
  });

  it('advances only after the slot midpoint plus hysteresis', () => {
    expect(resolveFocusedIndex(slot * 0.5, 6, slot, 0)).toBe(0);
    expect(resolveFocusedIndex(slot * 0.5 + 16, 6, slot, 0)).toBe(1);
  });

  it('returns to the previous item when scrolling back past the threshold', () => {
    expect(resolveFocusedIndex(slot * 0.5 - 16, 6, slot, 1)).toBe(0);
    expect(resolveFocusedIndex(slot * 0.5, 6, slot, 1)).toBe(1);
  });

  it('clamps to the last item', () => {
    expect(resolveFocusedIndex(slot * 20, 6, slot, 4)).toBe(5);
  });
});

describe('resolveFocusedIndexFromAnchors', () => {
  const anchors = [200, 320, 460, 580];
  const focalY = 200;

  it('selects the item whose anchor is nearest the focal line', () => {
    expect(resolveFocusedIndexFromAnchors(0, anchors, focalY, 0)).toBe(0);
    expect(resolveFocusedIndexFromAnchors(140, anchors, focalY, 0)).toBe(1);
  });

  it('holds the current item inside the hysteresis band', () => {
    expect(resolveFocusedIndexFromAnchors(52, anchors, focalY, 0)).toBe(0);
  });
});

describe('editorial catalogs', () => {
  it('uses different section counts and sequential numbering', () => {
    expect(homeEditorialIndex.items).toHaveLength(6);
    expect(financialRecoveryEditorialIndex.items).toHaveLength(4);
    expect(businessEditorialIndex.items).toHaveLength(5);

    for (const document of [
      homeEditorialIndex,
      financialRecoveryEditorialIndex,
      businessEditorialIndex,
    ]) {
      expect(document.displayTitle.length).toBeGreaterThan(0);
      expect(document.items.map((item) => item.index)).toEqual(
        document.items.map((_, index) => index + 1),
      );
    }
  });
});
