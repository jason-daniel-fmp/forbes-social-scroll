import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export const JOURNEY_PROGRESS_RAIL_HEIGHT = 52;

export function createJourneyProgressRailStyles(theme: Theme) {
  return StyleSheet.create({
    touchTarget: {
      height: JOURNEY_PROGRESS_RAIL_HEIGHT,
      backgroundColor: theme.colors.headerBackground,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.textMuted,
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    segments: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    segment: {
      flex: 1,
      gap: 4,
    },
    segmentLabel: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.swipeHint,
      fontWeight: '600',
      textAlign: 'center',
    },
    segmentLabelActive: {
      color: theme.colors.accent,
    },
    segmentLabelComplete: {
      color: theme.colors.textPrimary,
    },
    track: {
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.surface,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      borderRadius: 2,
      backgroundColor: theme.colors.accent,
    },
    counter: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.editorTag,
      fontWeight: '700',
      minWidth: 28,
      textAlign: 'right',
    },
  });
}
