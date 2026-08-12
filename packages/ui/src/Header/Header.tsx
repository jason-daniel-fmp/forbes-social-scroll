import { Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';

import { createHeaderStyles } from './Header.styles';

export function Header() {
  const { theme } = useTheme();
  const styles = createHeaderStyles(theme);

  return (
    <View style={styles.container} accessibilityRole="header">
      <Text style={styles.logoText}>Forbes</Text>
    </View>
  );
}
