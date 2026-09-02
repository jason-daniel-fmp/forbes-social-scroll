import { StyleSheet } from 'react-native';

import type { CollageTileDensity } from './CollageTile';

export function createCollageTileStyles(density: CollageTileDensity) {
  const isFeatured = density === 'featured';
  const isSmall = density === 'small';

  return StyleSheet.create({
    inner: {
      flex: 1,
      minWidth: 0,
      justifyContent: isSmall ? 'flex-end' : 'space-between',
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 8,
    },
    copy: {
      flex: 1,
      minWidth: 0,
    },
    eyebrow: {
      fontSize: isSmall ? 9 : 10,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 4,
    },
    title: {
      fontSize: isFeatured ? 22 : isSmall ? 14 : 16,
      fontWeight: '700',
      lineHeight: isFeatured ? 26 : isSmall ? 17 : 20,
    },
  });
}
