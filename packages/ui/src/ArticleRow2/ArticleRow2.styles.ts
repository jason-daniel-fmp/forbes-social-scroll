import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createArticleRow2Styles(theme: Theme) {
  return StyleSheet.create({
    row: {
      width: '100%',
      height: `${theme.layout.row2Flex}%`,
      flexGrow: 0,
      flexShrink: 1,
      minHeight: 0,
      flexDirection: 'row',
      overflow: 'hidden',
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.divider,
    },
    colContent: {
      width: `${theme.layout.row2Col1WidthPercent}%`,
      height: '100%',
      overflow: 'hidden',
      paddingRight: theme.spacing.sm,
    },
    colRail: {
      width: `${theme.layout.row2Col2WidthPercent}%`,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
  });
}
