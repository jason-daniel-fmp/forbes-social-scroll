import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

const LANDING_HEADER_HEIGHT = 56;
const LANDING_CANVAS = '#F8F7F2';

export function createModeLandingStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: LANDING_CANVAS,
    },
    header: {
      height: LANDING_HEADER_HEIGHT,
      backgroundColor: '#000000',
    },
    intro: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 12,
    },
    kicker: {
      color: theme.colors.textMuted,
      fontSize: 11,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 1.4,
      marginBottom: 6,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 28,
    },
    collage: {
      flex: 1,
      minHeight: 0,
      paddingHorizontal: 12,
    },
    devResetButton: {
      marginHorizontal: 20,
      marginTop: 12,
      borderWidth: 1,
      borderColor: '#D5D2CB',
      borderRadius: 12,
      borderStyle: 'dashed',
      backgroundColor: '#EFEDE8',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    devResetLabel: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.body,
      fontWeight: '700',
      marginBottom: theme.spacing.xs,
    },
    devResetHint: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.swipeHint,
      lineHeight: 16,
    },
    footer: {
      marginTop: 10,
      marginBottom: 12,
      textAlign: 'center',
      color: theme.colors.textMuted,
      fontSize: 10,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 1.4,
    },
  });
}
