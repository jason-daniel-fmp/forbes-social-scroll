import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createAppStyles(theme: Theme) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    landingRoot: {
      backgroundColor: '#000000',
    },
    debugBar: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.divider,
    },
    debugText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.swipeHint,
    },
    themeButton: {
      marginTop: theme.spacing.xs,
      alignSelf: 'flex-start',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 4,
    },
    themeButtonText: {
      color: theme.colors.accent,
      fontSize: theme.typography.swipeHint,
      fontWeight: '600',
    },
  });
}
