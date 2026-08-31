import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createJourneyProgressCardStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.lg,
      gap: theme.spacing.sm,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.sm,
    },
    stepTitle: {
      flex: 1,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body,
    },
    stepTitleActive: {
      color: theme.colors.textPrimary,
      fontWeight: '600',
    },
    stepLabel: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.editorTag,
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    stepLabelActive: {
      color: theme.colors.accent,
    },
  });
}
