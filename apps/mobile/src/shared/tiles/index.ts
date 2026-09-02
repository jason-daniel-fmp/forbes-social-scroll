export {
  MAX_WEIGHT,
  MIN_WEIGHT,
  clampClicks,
  incrementClicks,
  rankTiles,
  scoreTile,
} from './tileFrequency';
export type { RankedTile, TileClickMap } from './tileFrequency';
export {
  COLLAGE_COLUMNS,
  COLLAGE_LAYOUTS,
  COLLAGE_ROWS,
  COLLAGE_VARIATIONS,
  assignCollageSlots,
  getCollageVariation,
  selectCollageVariation,
  slotArea,
} from './collageLayouts';
export type {
  AssignedCollageSlot,
  CollageSlot,
  CollageVariation,
  CollageVariationId,
} from './collageLayouts';
export { clearTileClicks, incrementTileClick, loadTileClicks } from './persistence';
export { scopedClickMap, scopedTileId } from './collageKey';
export { CollageExplorer } from './CollageExplorer';
export type { CollageExplorerTile } from './CollageExplorer';
