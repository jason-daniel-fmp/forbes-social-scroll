import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createHomeBuyingPhaseHubStyles(theme: Theme) {
  const tileGap = theme.layout.screenPaddingHorizontal;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: tileGap,
      paddingTop: theme.spacing.lg,
      paddingBottom: tileGap,
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
      lineHeight: 22,
      marginBottom: tileGap,
    },
    grid: {
      gap: tileGap,
    },
    row: {
      flexDirection: 'row',
      gap: tileGap,
    },
    phaseButton: {
      flex: 1,
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 16,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.md,
    },
    iconWrap: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      marginBottom: theme.spacing.md,
    },
    phaseTitle: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title,
      fontWeight: '700',
      marginBottom: theme.spacing.xs,
      textAlign: 'center',
    },
    phaseSubtitle: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body,
      lineHeight: 18,
      textAlign: 'center',
    },
  });
}
