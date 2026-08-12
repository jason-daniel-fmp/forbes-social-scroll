import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createAuthorBlockStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingLeft: theme.spacing.xs,
    },
    avatarRing: {
      borderWidth: 2,
      borderColor: theme.colors.accent,
      borderRadius: 999,
      padding: 2,
    },
    avatar: {
      width: 52,
      height: 52,
      borderRadius: 26,
    },
    editorTag: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.editorTag,
      fontWeight: '700',
      marginTop: theme.spacing.xs,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    name: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.editorName,
      fontWeight: '700',
      marginTop: theme.spacing.xs,
      textAlign: 'center',
      flexShrink: 1,
    },
    role: {
      color: theme.colors.accent,
      fontSize: theme.typography.editorRole,
      marginTop: 2,
      textAlign: 'center',
      flexShrink: 1,
    },
  });
}
