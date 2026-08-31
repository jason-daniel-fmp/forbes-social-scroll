import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createHeaderStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      minHeight: 48,
      flexGrow: 0,
      flexShrink: 0,
      backgroundColor: theme.colors.headerBackground,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      zIndex: 10,
    },
    logoText: {
      color: theme.colors.headerLogo,
      fontSize: theme.typography.logo,
      fontWeight: '700',
      letterSpacing: 1,
      fontFamily: 'Georgia',
    },
  });
}
