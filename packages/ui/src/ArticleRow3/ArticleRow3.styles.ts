import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createArticleRow3Styles(theme: Theme) {
  return StyleSheet.create({
    row: {
      width: '100%',
      height: `${theme.layout.row3Flex}%`,
      flexGrow: 0,
      flexShrink: 0,
      overflow: 'hidden',
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      paddingVertical: theme.spacing.sm,
      justifyContent: 'center',
    },
  });
}
