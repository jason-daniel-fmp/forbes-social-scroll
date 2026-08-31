import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createHomeBuyingPhasePlaceholderStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      paddingTop: theme.spacing.xl,
      justifyContent: 'center',
    },
    eyebrow: {
      color: theme.colors.accent,
      fontSize: theme.typography.editorTag,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: theme.spacing.sm,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title + 6,
      fontWeight: '700',
      marginBottom: theme.spacing.md,
    },
    message: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.subtitle + 2,
      lineHeight: 24,
    },
  });
}
