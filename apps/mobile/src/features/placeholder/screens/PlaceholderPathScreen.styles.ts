import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createPlaceholderPathStyles(theme: Theme, canvasColor?: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: canvasColor ?? theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      paddingTop: theme.spacing.xl,
    },
    eyebrow: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.editorTag,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: theme.spacing.sm,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title + 4,
      fontWeight: '700',
      marginBottom: theme.spacing.sm,
    },
    body: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.subtitle + 2,
      lineHeight: 22,
    },
  });
}
