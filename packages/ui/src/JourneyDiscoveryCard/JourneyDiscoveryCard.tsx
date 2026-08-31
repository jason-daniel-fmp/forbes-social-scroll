import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { JourneyDiscoveryContent } from '@forbes/types';

import { createJourneyDiscoveryCardStyles } from './JourneyDiscoveryCard.styles';

interface JourneyDiscoveryCardProps {
  content: JourneyDiscoveryContent;
  onPress: () => void;
}

export function JourneyDiscoveryCard({ content, onPress }: JourneyDiscoveryCardProps) {
  const { theme } = useTheme();
  const styles = createJourneyDiscoveryCardStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Journey</Text>
      <Text style={styles.title}>{content.title}</Text>
      <Text style={styles.description}>{content.description}</Text>
      <TouchableOpacity
        style={styles.cta}
        onPress={onPress}
        delayPressIn={150}
        accessibilityRole="button"
        accessibilityLabel={content.ctaLabel}
      >
        <Text style={styles.ctaText}>{content.ctaLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
