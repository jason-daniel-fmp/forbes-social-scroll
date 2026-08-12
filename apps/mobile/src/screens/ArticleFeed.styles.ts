import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createArticleFeedStyles(theme: Theme) {
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
      backgroundColor: theme.colors.headerBackground,
    },
    page: {
      overflow: 'hidden',
    },
    themeToggle: {
      position: 'absolute',
      right: theme.layout.screenPaddingHorizontal,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 4,
      backgroundColor: theme.colors.headerBackground,
      zIndex: 101,
      elevation: 101,
    },
    themeToggleText: {
      color: theme.colors.accent,
      fontSize: theme.typography.swipeHint,
      fontWeight: '600',
    },
  });
}
