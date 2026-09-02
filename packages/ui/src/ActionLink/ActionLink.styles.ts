import { StyleSheet } from 'react-native';

import type { Theme } from '@forbes/theme';

export function createActionLinkStyles(theme: Theme, size: 'default' | 'compact') {
  const isCompact = size === 'compact';

  return StyleSheet.create({
    text: {
      color: theme.colors.textPrimary,
      fontSize: isCompact ? theme.typography.kpiLabel : theme.typography.subtitle,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: isCompact ? 0.4 : 0.8,
    },
  });
}
