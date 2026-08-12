import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createArticleContentStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      overflow: 'hidden',
    },
    scrollContent: {
      flexGrow: 1,
      paddingRight: theme.spacing.sm,
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.sm,
    },
    bullet: {
      color: theme.colors.accent,
      fontSize: theme.typography.body + 6,
      lineHeight: theme.typography.body + 8,
      marginRight: theme.spacing.xs,
      flexShrink: 0,
    },
    paragraph: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.body,
      lineHeight: theme.typography.body + 6,
      flex: 1,
      flexShrink: 1,
    },
  });
}
