import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createInteractionsStyles(theme: Theme) {
  return StyleSheet.create({
    rail: {
      alignSelf: 'center',
      alignItems: 'center',
    },
    item: {
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    itemLast: {
      marginBottom: 0,
    },
    count: {
      color: theme.colors.interactionCount,
      fontSize: theme.typography.interactionCount,
      marginTop: 2,
      textAlign: 'center',
    },
  });
}
