import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createHomeBuyingWebViewStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    webview: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    webviewSurface: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    loadingText: {
      marginTop: theme.spacing.sm,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.swipeHint,
    },
  });
}
