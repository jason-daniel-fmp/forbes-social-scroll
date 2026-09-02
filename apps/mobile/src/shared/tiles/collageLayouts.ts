export const COLLAGE_COLUMNS = 2;
export const COLLAGE_ROWS = 6;

export type CollageVariationId = 'balanced' | 'hero' | 'split';

export interface CollageSlot {
  col: number;
  row: number;
  colSpan: number;
  rowSpan: number;
}

export interface CollageVariation {
  id: CollageVariationId;
  slots: CollageSlot[];
}

const layoutsFor7: Record<CollageVariationId, CollageVariation> = {
  balanced: {
    id: 'balanced',
    slots: [
      { col: 0, row: 0, colSpan: 1, rowSpan: 2 },
      { col: 1, row: 0, colSpan: 1, rowSpan: 2 },
      { col: 0, row: 2, colSpan: 1, rowSpan: 2 },
      { col: 1, row: 2, colSpan: 1, rowSpan: 2 },
      { col: 0, row: 4, colSpan: 1, rowSpan: 2 },
      { col: 1, row: 4, colSpan: 1, rowSpan: 1 },
      { col: 1, row: 5, colSpan: 1, rowSpan: 1 },
    ],
  },
  hero: {
    id: 'hero',
    slots: [
      { col: 0, row: 0, colSpan: 2, rowSpan: 2 },
      { col: 0, row: 2, colSpan: 1, rowSpan: 2 },
      { col: 1, row: 2, colSpan: 1, rowSpan: 2 },
      { col: 0, row: 4, colSpan: 1, rowSpan: 1 },
      { col: 1, row: 4, colSpan: 1, rowSpan: 1 },
      { col: 0, row: 5, colSpan: 1, rowSpan: 1 },
      { col: 1, row: 5, colSpan: 1, rowSpan: 1 },
    ],
  },
  split: {
    id: 'split',
    slots: [
      { col: 0, row: 0, colSpan: 1, rowSpan: 3 },
      { col: 1, row: 0, colSpan: 1, rowSpan: 3 },
      { col: 0, row: 3, colSpan: 1, rowSpan: 2 },
      { col: 1, row: 3, colSpan: 1, rowSpan: 1 },
      { col: 1, row: 4, colSpan: 1, rowSpan: 1 },
      { col: 0, row: 5, colSpan: 1, rowSpan: 1 },
      { col: 1, row: 5, colSpan: 1, rowSpan: 1 },
    ],
  },
};

const layoutsFor5: Record<CollageVariationId, CollageVariation> = {
  balanced: {
    id: 'balanced',
    slots: [
      { col: 0, row: 0, colSpan: 1, rowSpan: 3 },
      { col: 1, row: 0, colSpan: 1, rowSpan: 3 },
      { col: 0, row: 3, colSpan: 1, rowSpan: 2 },
      { col: 1, row: 3, colSpan: 1, rowSpan: 2 },
      { col: 0, row: 5, colSpan: 2, rowSpan: 1 },
    ],
  },
  hero: {
    id: 'hero',
    slots: [
      { col: 0, row: 0, colSpan: 2, rowSpan: 2 },
      { col: 0, row: 2, colSpan: 1, rowSpan: 2 },
      { col: 1, row: 2, colSpan: 1, rowSpan: 2 },
      { col: 0, row: 4, colSpan: 1, rowSpan: 2 },
      { col: 1, row: 4, colSpan: 1, rowSpan: 2 },
    ],
  },
  split: {
    id: 'split',
    slots: [
      { col: 0, row: 0, colSpan: 1, rowSpan: 3 },
      { col: 1, row: 0, colSpan: 1, rowSpan: 3 },
      { col: 0, row: 3, colSpan: 1, rowSpan: 2 },
      { col: 1, row: 3, colSpan: 1, rowSpan: 2 },
      { col: 0, row: 5, colSpan: 2, rowSpan: 1 },
    ],
  },
};

const layoutsFor4: Record<CollageVariationId, CollageVariation> = {
  balanced: {
    id: 'balanced',
    slots: [
      { col: 0, row: 0, colSpan: 1, rowSpan: 3 },
      { col: 1, row: 0, colSpan: 1, rowSpan: 3 },
      { col: 0, row: 3, colSpan: 1, rowSpan: 3 },
      { col: 1, row: 3, colSpan: 1, rowSpan: 3 },
    ],
  },
  hero: {
    id: 'hero',
    slots: [
      { col: 0, row: 0, colSpan: 2, rowSpan: 2 },
      { col: 0, row: 2, colSpan: 1, rowSpan: 4 },
      { col: 1, row: 2, colSpan: 1, rowSpan: 2 },
      { col: 1, row: 4, colSpan: 1, rowSpan: 2 },
    ],
  },
  split: {
    id: 'split',
    slots: [
      { col: 0, row: 0, colSpan: 1, rowSpan: 4 },
      { col: 1, row: 0, colSpan: 1, rowSpan: 4 },
      { col: 0, row: 4, colSpan: 1, rowSpan: 2 },
      { col: 1, row: 4, colSpan: 1, rowSpan: 2 },
    ],
  },
};

export const COLLAGE_LAYOUTS: Record<number, Record<CollageVariationId, CollageVariation>> = {
  4: layoutsFor4,
  5: layoutsFor5,
  7: layoutsFor7,
};

/** @deprecated Use COLLAGE_LAYOUTS[7] — kept for existing landing tests. */
export const COLLAGE_VARIATIONS = layoutsFor7;

export function slotArea(slot: CollageSlot): number {
  return slot.colSpan * slot.rowSpan;
}

export function selectCollageVariation(scores: readonly number[]): CollageVariationId {
  if (scores.length === 0) {
    return 'balanced';
  }

  const first = scores[0];
  const allEqual = scores.every((score) => score === first);

  if (allEqual) {
    return 'balanced';
  }

  if (scores.length === 1 || first > scores[1]) {
    return 'hero';
  }

  return 'split';
}

export function getCollageVariation(
  tileCount: number,
  variationId: CollageVariationId,
): CollageVariation {
  const layouts = COLLAGE_LAYOUTS[tileCount] ?? COLLAGE_LAYOUTS[7];
  return layouts[variationId];
}

export interface AssignedCollageSlot<T extends { id: string }> {
  tile: T;
  clicks: number;
  score: number;
  rank: number;
  slot: CollageSlot;
  area: number;
}

export function assignCollageSlots<T extends { id: string }>(
  ranked: readonly { tile: T; clicks: number; score: number }[],
): { variation: CollageVariationId; placements: AssignedCollageSlot<T>[] } {
  const variationId = selectCollageVariation(ranked.map((item) => item.score));
  const variation = getCollageVariation(ranked.length, variationId);

  return {
    variation: variationId,
    placements: ranked.map((item, rank) => {
      const slot = variation.slots[rank] ?? variation.slots[variation.slots.length - 1];

      return {
        ...item,
        rank,
        slot,
        area: slotArea(slot),
      };
    }),
  };
}
