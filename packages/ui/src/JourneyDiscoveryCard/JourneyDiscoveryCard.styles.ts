import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createJourneyDiscoveryCardStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      paddingVertical: theme.spacing.lg,
    },
    eyebrow: {
      color: theme.colors.accent,
      fontSize: theme.typography.editorTag,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: theme.spacing.sm,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title,
      fontWeight: '700',
      marginBottom: theme.spacing.sm,
    },
    description: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body + 2,
      lineHeight: 20,
      marginBottom: theme.spacing.lg,
    },
    cta: {
      alignSelf: 'flex-start',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 4,
      backgroundColor: theme.colors.surface,
    },
    ctaText: {
      color: theme.colors.accent,
      fontSize: theme.typography.subtitle,
      fontWeight: '700',
    },
  });
}
