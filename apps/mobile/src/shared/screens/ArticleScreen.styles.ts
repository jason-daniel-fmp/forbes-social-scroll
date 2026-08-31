import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createArticleScreenStyles(theme: Theme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
      overflow: 'hidden',
    },
    body: {
      flex: 1,
      width: '100%',
      overflow: 'hidden',
    },
  });
}
