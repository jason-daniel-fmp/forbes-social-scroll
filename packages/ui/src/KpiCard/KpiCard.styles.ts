import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createKpiCardStyles(theme: Theme) {
  return StyleSheet.create({
    card: {
      flex: 1,
      minWidth: 0,
      backgroundColor: theme.colors.kpiCardBackground,
      borderWidth: 1,
      borderColor: theme.colors.kpiCardBorder,
      borderRadius: 8,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      marginHorizontal: theme.spacing.xs,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    value: {
      color: theme.colors.accent,
      fontSize: theme.typography.kpiValue,
      fontWeight: '700',
      textAlign: 'center',
      flexShrink: 1,
    },
    label: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.kpiLabel,
      fontWeight: '700',
      textAlign: 'center',
      marginTop: theme.spacing.xs,
      flexShrink: 1,
    },
    sublabel: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.kpiLabel,
      fontWeight: '700',
      textAlign: 'center',
      flexShrink: 1,
    },
  });
}
