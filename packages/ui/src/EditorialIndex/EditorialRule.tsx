import { View } from 'react-native';

import { useTheme } from '@forbes/theme';

import { createEditorialIndexStyles } from './EditorialIndex.styles';

interface EditorialRuleProps {
  accent?: boolean;
}

export function EditorialRule({ accent = false }: EditorialRuleProps) {
  const { theme } = useTheme();
  const styles = createEditorialIndexStyles(theme);

  return (
    <View
      style={[styles.rule, accent ? { backgroundColor: theme.colors.accentMuted } : null]}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
}
