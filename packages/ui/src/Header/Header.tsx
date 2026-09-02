import { Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';

import { createHeaderStyles } from './Header.styles';

interface HeaderProps {
  variant?: 'default' | 'brand';
}

export function Header({ variant = 'default' }: HeaderProps) {
  const { theme } = useTheme();
  const styles = createHeaderStyles(theme, variant);

  return (
    <View style={styles.container} accessibilityRole="header">
      <Text style={styles.logoText}>Forbes</Text>
    </View>
  );
}
