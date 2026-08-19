import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createInAppWebViewStyles(theme: Theme) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    toolbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.divider,
      backgroundColor: theme.colors.surface,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.subtitle,
      fontWeight: '700',
      flex: 1,
      marginRight: theme.spacing.sm,
    },
    closeButton: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 4,
    },
    closeText: {
      color: theme.colors.accent,
      fontSize: theme.typography.swipeHint,
      fontWeight: '700',
    },
    webview: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
}
