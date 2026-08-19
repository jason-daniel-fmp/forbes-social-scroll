import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createProductCardStyles(theme: Theme) {
  return StyleSheet.create({
    card: {
      flex: 1,
      minWidth: 0,
      backgroundColor: theme.colors.kpiCardBackground,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 8,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      marginHorizontal: theme.spacing.xs,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    badge: {
      color: theme.colors.accent,
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
    price: {
      color: theme.colors.accent,
      fontSize: theme.typography.kpiValue - 4,
      fontWeight: '700',
      marginTop: theme.spacing.xs,
    },
    cta: {
      marginTop: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 3,
      backgroundColor: theme.colors.accent,
      borderRadius: 4,
    },
    ctaText: {
      color: '#FFFFFF',
      fontSize: theme.typography.kpiLabel,
      fontWeight: '700',
    },
  });
}
