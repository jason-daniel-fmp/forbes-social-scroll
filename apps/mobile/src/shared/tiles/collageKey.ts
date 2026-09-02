import type { TileClickMap } from './tileFrequency';

export function scopedTileId(scope: string, id: string): string {
  return `${scope}:${id}`;
}

export function scopedClickMap(
  clicks: TileClickMap,
  scope: string,
  ids: readonly string[],
): TileClickMap {
  return Object.fromEntries(ids.map((id) => [id, clicks[scopedTileId(scope, id)] ?? 0]));
}
