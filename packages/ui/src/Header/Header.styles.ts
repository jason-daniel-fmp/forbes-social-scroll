import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createHeaderStyles(theme: Theme, variant: 'default' | 'brand' = 'default') {
  const isBrand = variant === 'brand';

  return StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      minHeight: 48,
      flexGrow: 0,
      flexShrink: 0,
      backgroundColor: isBrand ? '#000000' : theme.colors.headerBackground,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      zIndex: 10,
    },
    logoText: {
      color: isBrand ? '#FFFFFF' : theme.colors.headerLogo,
      fontSize: theme.typography.logo,
      fontWeight: '700',
      letterSpacing: 1,
      fontFamily: 'Georgia',
    },
  });
}
