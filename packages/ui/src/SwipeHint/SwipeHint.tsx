import { Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';

import { createSwipeHintStyles } from './SwipeHint.styles';

interface SwipeHintProps {
  message?: string;
}

export function SwipeHint({ message = 'Swipe ↑ for next article' }: SwipeHintProps) {
  const { theme } = useTheme();
  const styles = createSwipeHintStyles(theme);

  return (
    <View style={styles.container} accessibilityRole="text">
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
