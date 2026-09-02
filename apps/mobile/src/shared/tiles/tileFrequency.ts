export const MIN_WEIGHT = 1;
export const MAX_WEIGHT = 8;

export type TileClickMap = Record<string, number>;

export interface RankedTile<T extends { id: string }> {
  tile: T;
  clicks: number;
  score: number;
}

export function clampClicks(clicks: number): number {
  if (!Number.isFinite(clicks) || clicks < 0) {
    return 0;
  }

  return Math.min(Math.floor(clicks), MAX_WEIGHT);
}

export function scoreTile(clicks: number): number {
  return clampClicks(clicks) + MIN_WEIGHT;
}

export function incrementClicks(current: number): number {
  return clampClicks(current + 1);
}

export function rankTiles<T extends { id: string }>(
  tiles: readonly T[],
  clicks: TileClickMap,
): RankedTile<T>[] {
  return tiles
    .map((tile, catalogIndex) => ({
      tile,
      catalogIndex,
      clicks: clampClicks(clicks[tile.id] ?? 0),
      score: scoreTile(clicks[tile.id] ?? 0),
    }))
    .sort((left, right) => {
      if (right.clicks !== left.clicks) {
        return right.clicks - left.clicks;
      }

      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.catalogIndex - right.catalogIndex;
    })
    .map(({ catalogIndex: _catalogIndex, ...ranked }) => ranked);
}
