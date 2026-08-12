import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createSwipeHintStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: theme.spacing.sm,
      left: 0,
      right: 0,
      alignItems: 'center',
      pointerEvents: 'none',
    },
    text: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.swipeHint,
      textAlign: 'center',
    },
  });
}
