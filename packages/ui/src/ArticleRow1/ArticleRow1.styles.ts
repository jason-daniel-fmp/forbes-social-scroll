import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createArticleRow1Styles(theme: Theme) {
  return StyleSheet.create({
    row: {
      width: '100%',
      height: `${theme.layout.row1Flex}%`,
      flexGrow: 0,
      flexShrink: 0,
      flexDirection: 'row',
      overflow: 'hidden',
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.divider,
    },
    colTitle: {
      width: `${theme.layout.row1Col1WidthPercent}%`,
      overflow: 'hidden',
    },
    colAuthor: {
      width: `${theme.layout.row1Col2WidthPercent}%`,
      overflow: 'hidden',
    },
  });
}
