import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createJourneyWebViewStyles(theme: Theme) {
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
    webviewContainer: {
      flex: 1,
      position: 'relative',
    },
    webview: {
      flex: 1,
      backgroundColor: theme.colors.background,
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
    stateContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
    },
    stateTitle: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title,
      fontWeight: '700',
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    stateMessage: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body,
      textAlign: 'center',
      marginBottom: theme.spacing.lg,
    },
  });
}
