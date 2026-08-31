import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

const LANDING_HEADER_HEIGHT = 56;

export function createModeLandingStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      height: LANDING_HEADER_HEIGHT,
      backgroundColor: theme.colors.headerBackground,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title + 4,
      fontWeight: '700',
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.subtitle + 2,
      marginBottom: theme.spacing.xl,
    },
    buttons: {
      gap: theme.spacing.lg,
    },
    modeButton: {
      minHeight: 140,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
      justifyContent: 'center',
    },
    modeEyebrow: {
      color: theme.colors.accent,
      fontSize: theme.typography.editorTag,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: theme.spacing.sm,
    },
    modeTitle: {
      color: theme.colors.textPrimary,
      fontSize: 26,
      fontWeight: '700',
      marginBottom: theme.spacing.sm,
    },
    modeDescription: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body + 2,
      lineHeight: 20,
    },
    devResetButton: {
      marginTop: theme.spacing.xl,
      borderWidth: 1,
      borderColor: theme.colors.textMuted,
      borderRadius: 8,
      borderStyle: 'dashed',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
    },
    devResetLabel: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.body,
      fontWeight: '600',
      marginBottom: theme.spacing.xs,
    },
    devResetHint: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.swipeHint,
      lineHeight: 16,
    },
  });
}
