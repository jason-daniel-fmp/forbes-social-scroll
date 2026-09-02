import { useCallback, useMemo } from 'react';

import {
  CollageGrid,
  CollageTile,
  type CollageGridPlacement,
  type CollageTileDensity,
  type PathCardPalette,
} from '@forbes/ui';

import {
  COLLAGE_COLUMNS,
  COLLAGE_ROWS,
  assignCollageSlots,
  type AssignedCollageSlot,
} from './collageLayouts';
import { rankTiles, type TileClickMap } from './tileFrequency';

export interface CollageExplorerTile {
  id: string;
  title: string;
  eyebrow?: string;
  palette: PathCardPalette;
}

interface CollageExplorerProps {
  tiles: readonly CollageExplorerTile[];
  clicks: TileClickMap;
  onSelect: (id: string) => void;
}

function densityForArea(area: number): CollageTileDensity {
  if (area >= 4) {
    return 'featured';
  }

  if (area >= 2) {
    return 'medium';
  }

  return 'small';
}

export function CollageExplorer({ tiles, clicks, onSelect }: CollageExplorerProps) {
  const assigned = useMemo(() => assignCollageSlots(rankTiles(tiles, clicks)), [clicks, tiles]);

  const toPlacement = useCallback(
    (item: AssignedCollageSlot<CollageExplorerTile>): CollageGridPlacement => ({
      id: item.tile.id,
      col: item.slot.col,
      row: item.slot.row,
      colSpan: item.slot.colSpan,
      rowSpan: item.slot.rowSpan,
      backgroundColor: item.tile.palette.background,
      accessibilityLabel: `Open ${item.tile.title}`,
      onPress: () => onSelect(item.tile.id),
      children: (
        <CollageTile
          eyebrow={item.tile.eyebrow}
          title={item.tile.title}
          palette={item.tile.palette}
          density={densityForArea(item.area)}
        />
      ),
    }),
    [onSelect],
  );

  return (
    <CollageGrid
      columns={COLLAGE_COLUMNS}
      rows={COLLAGE_ROWS}
      placements={assigned.placements.map(toPlacement)}
    />
  );
}
