import type { ReactNode } from 'react';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { createCollageGridStyles } from './CollageGrid.styles';

export interface CollageGridPlacement {
  id: string;
  col: number;
  row: number;
  colSpan: number;
  rowSpan: number;
  backgroundColor: string;
  onPress: () => void;
  accessibilityLabel: string;
  children: ReactNode;
}

interface CollageGridProps {
  columns: number;
  rows: number;
  placements: CollageGridPlacement[];
  gap?: number;
}

function cellSize(total: number, count: number, gap: number): number {
  if (count <= 0) {
    return 0;
  }

  return (total - gap * (count - 1)) / count;
}

export function CollageGrid({ columns, rows, placements, gap = 8 }: CollageGridProps) {
  const styles = createCollageGridStyles();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const cellWidth = cellSize(size.width, columns, gap);
  const cellHeight = cellSize(size.height, rows, gap);
  const ready = size.width > 0 && size.height > 0 && cellWidth > 0 && cellHeight > 0;

  return (
    <View
      style={styles.root}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        if (width !== size.width || height !== size.height) {
          setSize({ width, height });
        }
      }}
    >
      {ready
        ? placements.map((placement) => (
            <TouchableOpacity
              key={placement.id}
              style={[
                styles.tile,
                {
                  left: placement.col * (cellWidth + gap),
                  top: placement.row * (cellHeight + gap),
                  width: placement.colSpan * cellWidth + (placement.colSpan - 1) * gap,
                  height: placement.rowSpan * cellHeight + (placement.rowSpan - 1) * gap,
                  backgroundColor: placement.backgroundColor,
                },
              ]}
              onPress={placement.onPress}
              activeOpacity={0.88}
              accessibilityRole="button"
              accessibilityLabel={placement.accessibilityLabel}
            >
              {placement.children}
            </TouchableOpacity>
          ))
        : null}
    </View>
  );
}
