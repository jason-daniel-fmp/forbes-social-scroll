import { Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import { NavBar } from '@forbes/ui';

import { createPlaceholderPathStyles } from './PlaceholderPathScreen.styles';

interface PlaceholderPathScreenProps {
  title: string;
  eyebrow?: string;
  onBack: () => void;
  canvasColor?: string;
}

export function PlaceholderPathScreen({
  title,
  eyebrow,
  onBack,
  canvasColor,
}: PlaceholderPathScreenProps) {
  const { theme } = useTheme();
  const styles = createPlaceholderPathStyles(theme, canvasColor);

  return (
    <View style={styles.container}>
      <NavBar onBack={onBack} backLabel="Modes" />
      <View style={styles.content}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>Coming soon. We&apos;ll add this path next.</Text>
      </View>
    </View>
  );
}
