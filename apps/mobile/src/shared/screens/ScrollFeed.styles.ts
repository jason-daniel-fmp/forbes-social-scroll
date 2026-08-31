import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createScrollFeedStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      overflow: 'hidden',
    },
    stickyHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      elevation: 100,
    },
    page: {
      overflow: 'hidden',
    },
    themeToggle: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 4,
      backgroundColor: theme.colors.headerBackground,
    },
    themeToggleText: {
      color: theme.colors.accent,
      fontSize: theme.typography.swipeHint,
      fontWeight: '600',
    },
  });
}
