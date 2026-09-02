import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createEditorialIndexStyles(theme: Theme) {
  const type = theme.editorialTypography;

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
      overflow: 'hidden',
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
    },
    headlineOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 8,
      elevation: 8,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.md,
    },
    headline: {
      color: theme.colors.textPrimary,
      fontSize: type.headline,
      fontWeight: '600',
      lineHeight: type.headline + 6,
      letterSpacing: -0.8,
    },
    item: {
      minHeight: 44,
      paddingBottom: theme.spacing.md,
    },
    number: {
      color: theme.colors.textMuted,
      fontSize: type.number,
      fontWeight: '500',
      letterSpacing: 1.2,
      marginBottom: theme.spacing.xs,
    },
    numberSelected: {
      color: theme.colors.textPrimary,
    },
    itemCopy: {
      gap: 4,
    },
    categoryTitle: {
      color: theme.colors.textSecondary,
      fontSize: type.category,
      fontWeight: '500',
      lineHeight: type.category + 4,
      letterSpacing: -0.4,
    },
    categoryTitleSelected: {
      color: theme.colors.textPrimary,
      fontWeight: '600',
    },
    details: {
      overflow: 'hidden',
    },
    detailsInner: {
      paddingTop: theme.spacing.sm,
      gap: 6,
      paddingBottom: theme.spacing.xs,
    },
    descriptor: {
      color: theme.colors.textMuted,
      fontSize: type.descriptor,
      lineHeight: 18,
    },
    descriptorSelected: {
      color: theme.colors.textSecondary,
    },
    meta: {
      color: theme.colors.textMuted,
      fontSize: type.meta,
      fontWeight: '500',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
    },
    rule: {
      height: StyleSheet.hairlineWidth,
      width: '100%',
      backgroundColor: theme.colors.divider,
      marginTop: theme.spacing.xs,
    },
    empty: {
      gap: theme.spacing.lg,
    },
    emptyCopy: {
      color: theme.colors.textSecondary,
      fontSize: type.descriptor,
      lineHeight: 22,
    },
    commitButtonWrap: {
      position: 'absolute',
      right: theme.layout.screenPaddingHorizontal,
      zIndex: 9,
    },
    commitButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.textPrimary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
