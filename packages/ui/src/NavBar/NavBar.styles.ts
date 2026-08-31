import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createNavBarStyles(theme: Theme) {
  return StyleSheet.create({
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 56,
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.headerBackground,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.divider,
    },
    side: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    center: {
      flex: 1.2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoText: {
      color: theme.colors.headerLogo,
      fontSize: theme.typography.logo,
      fontWeight: '700',
      letterSpacing: 1,
      fontFamily: 'Georgia',
    },
    backButton: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 4,
    },
    backButtonText: {
      color: theme.colors.accent,
      fontSize: theme.typography.swipeHint,
      fontWeight: '700',
    },
  });
}
