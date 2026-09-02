export interface EditorialIndexJourney {
  enabled: boolean;
  stages: string[];
  currentStage?: string;
}

export interface EditorialIndexItem {
  id: string;
  index: number;
  title: string;
  displayTitle?: string[];
  description?: string;
  articleCount?: number;
  toolCount?: number;
  journey?: EditorialIndexJourney;
}

export interface EditorialIndexDocument {
  id: string;
  title: string;
  displayTitle: string[];
  items: EditorialIndexItem[];
}

export function formatIndexNumber(index: number): string {
  if (!Number.isFinite(index) || index < 0) {
    return '00';
  }

  return String(Math.floor(index)).padStart(2, '0');
}

/** Estimated title-block height used for depth interpolation and first layout. */
export const EDITORIAL_INDEX_COLLAPSED_HEIGHT = 92;

/** @deprecated Use EDITORIAL_INDEX_COLLAPSED_HEIGHT. Kept for existing imports. */
export const EDITORIAL_INDEX_ITEM_SLOT_HEIGHT = EDITORIAL_INDEX_COLLAPSED_HEIGHT;

/** Extra pixels past a slot midpoint before focus moves, to avoid flicker on slow scrolls. */
export const EDITORIAL_INDEX_FOCUS_HYSTERESIS = 16;

/**
 * Position-based focus for uniform slots.
 * Prefer resolveFocusedIndexFromAnchors when row heights vary.
 */
export function resolveFocusedIndex(
  scrollY: number,
  itemCount: number,
  slotHeight: number = EDITORIAL_INDEX_COLLAPSED_HEIGHT,
  currentIndex: number = 0,
  hysteresis: number = EDITORIAL_INDEX_FOCUS_HYSTERESIS,
): number {
  if (itemCount <= 1) {
    return 0;
  }

  const y = Number.isFinite(scrollY) ? Math.max(0, scrollY) : 0;
  let index = Math.min(itemCount - 1, Math.max(0, currentIndex));

  while (index < itemCount - 1 && y >= (index + 0.5) * slotHeight + hysteresis) {
    index += 1;
  }

  while (index > 0 && y <= (index - 0.5) * slotHeight - hysteresis) {
    index -= 1;
  }

  return index;
}

/**
 * Position-based focus using measured title anchors in content coordinates.
 * Selects the item whose anchor is nearest scrollY + focalY, with hysteresis.
 */
export function resolveFocusedIndexFromAnchors(
  scrollY: number,
  anchors: readonly number[],
  focalY: number,
  currentIndex: number = 0,
  hysteresis: number = EDITORIAL_INDEX_FOCUS_HYSTERESIS,
): number {
  if (anchors.length <= 1) {
    return 0;
  }

  const y = Number.isFinite(scrollY) ? scrollY : 0;
  const target = y + focalY;
  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;

  for (let index = 0; index < anchors.length; index += 1) {
    const dist = Math.abs((anchors[index] ?? 0) - target);
    if (dist < bestDist) {
      bestDist = dist;
      best = index;
    }
  }

  const current = Math.min(anchors.length - 1, Math.max(0, currentIndex));
  if (best === current) {
    return current;
  }

  const currentDist = Math.abs((anchors[current] ?? 0) - target);
  if (currentDist - bestDist < hysteresis) {
    return current;
  }

  return best;
}

export function buildIndexAccessibilityLabel(
  title: string,
  options: {
    description?: string;
    index: number;
    total: number;
    selected?: boolean;
  },
): string {
  const section = `Section ${options.index} of ${options.total}`;
  const selected = options.selected ? 'Selected. ' : '';
  const descriptor = options.description ? `${options.description}. ` : '';

  return `${title}. ${selected}${descriptor}${section}.`;
}
