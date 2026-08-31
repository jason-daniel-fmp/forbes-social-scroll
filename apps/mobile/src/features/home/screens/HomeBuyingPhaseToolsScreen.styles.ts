import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createHomeBuyingPhaseToolsStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title + 4,
      fontWeight: '700',
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.subtitle + 2,
      lineHeight: 22,
      marginBottom: theme.spacing.xl,
    },
    options: {
      flex: 1,
      gap: theme.spacing.md,
    },
    optionButton: {
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
    },
    optionTitle: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title,
      fontWeight: '700',
      marginBottom: theme.spacing.xs,
    },
    optionDescription: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body + 1,
      lineHeight: 18,
    },
  });
}
