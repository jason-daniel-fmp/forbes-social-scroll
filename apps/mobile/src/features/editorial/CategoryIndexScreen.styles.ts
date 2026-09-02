import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createCategoryIndexScreenStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
}
