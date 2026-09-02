import { describe, expect, it } from 'vitest';

import {
  COLLAGE_COLUMNS,
  COLLAGE_LAYOUTS,
  COLLAGE_ROWS,
  COLLAGE_VARIATIONS,
  assignCollageSlots,
  selectCollageVariation,
  slotArea,
  type CollageSlot,
} from './collageLayouts';
import { rankTiles, type TileClickMap } from './tileFrequency';

const seven = [
  { id: 'a' },
  { id: 'b' },
  { id: 'c' },
  { id: 'd' },
  { id: 'e' },
  { id: 'f' },
  { id: 'g' },
];
const five = seven.slice(0, 5);

function coversBoard(slots: CollageSlot[]): boolean {
  const cells = new Set<string>();

  for (const slot of slots) {
    for (let row = slot.row; row < slot.row + slot.rowSpan; row += 1) {
      for (let col = slot.col; col < slot.col + slot.colSpan; col += 1) {
        const key = `${col},${row}`;
        if (cells.has(key)) {
          return false;
        }
        cells.add(key);
      }
    }
  }

  return cells.size === COLLAGE_COLUMNS * COLLAGE_ROWS;
}

describe('precomputed collage variations', () => {
  it('fills the 2×6 board with no overlaps or gaps for every tile count', () => {
    for (const [count, layouts] of Object.entries(COLLAGE_LAYOUTS)) {
      for (const variation of Object.values(layouts)) {
        expect(variation.slots).toHaveLength(Number(count));
        expect(coversBoard(variation.slots)).toBe(true);
        expect(
          variation.slots.every(
            (slot, index, all) => index === 0 || slotArea(slot) <= slotArea(all[index - 1]),
          ),
        ).toBe(true);
      }
    }
  });
});

describe('selectCollageVariation', () => {
  it('uses balanced when every score is equal', () => {
    expect(selectCollageVariation([1, 1, 1, 1, 1])).toBe('balanced');
  });

  it('uses hero when there is a unique most-visited tile', () => {
    expect(selectCollageVariation([6, 3, 3, 1, 1])).toBe('hero');
  });

  it('uses split when the top two are tied above the rest', () => {
    expect(selectCollageVariation([5, 5, 2, 1, 1])).toBe('split');
  });
});

describe('assignCollageSlots', () => {
  it('maps visit rank onto the 7-tile hero template', () => {
    const assigned = assignCollageSlots(rankTiles(seven, { g: 7, c: 3, a: 1 }));

    expect(assigned.variation).toBe('hero');
    expect(assigned.placements.map((item) => item.tile.id)).toEqual([
      'g',
      'c',
      'a',
      'b',
      'd',
      'e',
      'f',
    ]);
    expect(assigned.placements[0].slot).toEqual(COLLAGE_VARIATIONS.hero.slots[0]);
  });

  it('maps five home tiles onto the 5-tile templates', () => {
    const assigned = assignCollageSlots(rankTiles(five, { e: 4 }));

    expect(assigned.variation).toBe('hero');
    expect(assigned.placements).toHaveLength(5);
    expect(assigned.placements[0].tile.id).toBe('e');
    expect(assigned.placements[0].area).toBeGreaterThanOrEqual(assigned.placements[1].area);
  });

  it('never makes a more-visited tile smaller than a less-visited one', () => {
    const cases: { catalog: { id: string }[]; clicks: TileClickMap }[] = [
      { catalog: seven, clicks: {} },
      { catalog: seven, clicks: { a: 4 } },
      { catalog: five, clicks: {} },
      { catalog: five, clicks: { d: 6, b: 2, a: 2 } },
      { catalog: five, clicks: { a: 3, b: 3, c: 3, d: 3, e: 3 } },
    ];

    for (const { catalog, clicks } of cases) {
      const assigned = assignCollageSlots(rankTiles(catalog, clicks));

      for (const left of assigned.placements) {
        for (const right of assigned.placements) {
          if (left.clicks > right.clicks) {
            expect(left.area).toBeGreaterThanOrEqual(right.area);
          }
        }
      }
    }
  });
});
