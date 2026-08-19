import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createMonetizationRowStyles(_theme: Theme) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'stretch',
      width: '100%',
      overflow: 'hidden',
    },
  });
}
