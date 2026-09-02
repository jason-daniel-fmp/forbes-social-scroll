import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createJourneyCardStyles(theme: Theme) {
  return StyleSheet.create({
    card: {
      flex: 1,
      minWidth: 0,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.divider,
      borderRadius: 8,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      marginHorizontal: theme.spacing.xs,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    eyebrow: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.editorTag,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
      marginBottom: 2,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.kpiLabel + 1,
      fontWeight: '700',
      textAlign: 'center',
      flexShrink: 1,
    },
    description: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.kpiLabel,
      textAlign: 'center',
      marginTop: 2,
      flexShrink: 1,
      marginBottom: theme.spacing.xs,
    },
  });
}
