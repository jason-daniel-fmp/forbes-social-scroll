import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createJourneyProgressSheetStyles(theme: Theme) {
  return StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.45)',
    },
    sheet: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
      maxHeight: '75%',
    },
    handle: {
      alignSelf: 'center',
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.textMuted,
      marginBottom: theme.spacing.md,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.title,
      fontWeight: '700',
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body,
      marginBottom: theme.spacing.lg,
    },
    phaseGroup: {
      marginBottom: theme.spacing.md,
    },
    phaseTitle: {
      color: theme.colors.accent,
      fontSize: theme.typography.editorTag,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: theme.spacing.sm,
    },
    stepRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.surface,
      gap: theme.spacing.sm,
    },
    stepTitle: {
      flex: 1,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body,
    },
    stepTitleActive: {
      color: theme.colors.textPrimary,
      fontWeight: '600',
    },
    stepLabel: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.editorTag,
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    stepLabelActive: {
      color: theme.colors.accent,
    },
    closeButton: {
      marginTop: theme.spacing.lg,
      alignSelf: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      minHeight: 44,
      justifyContent: 'center',
    },
    closeText: {
      color: theme.colors.accent,
      fontSize: theme.typography.subtitle,
      fontWeight: '600',
    },
  });
}
