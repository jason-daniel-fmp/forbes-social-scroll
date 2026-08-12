import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createTitleBlockStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      overflow: 'hidden',
      paddingRight: theme.spacing.sm,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title,
      fontWeight: '700',
      flexShrink: 1,
    },
    subtitle: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.subtitle,
      marginTop: theme.spacing.xs,
      flexShrink: 1,
    },
  });
}
