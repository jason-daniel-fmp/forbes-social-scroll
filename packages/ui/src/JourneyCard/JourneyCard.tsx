import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { ArticleJourneyCta } from '@forbes/types';

import { createJourneyCardStyles } from './JourneyCard.styles';

interface JourneyCardProps {
  journey: ArticleJourneyCta;
  onPress: (journey: ArticleJourneyCta) => void;
}

export function JourneyCard({ journey, onPress }: JourneyCardProps) {
  const { theme } = useTheme();
  const styles = createJourneyCardStyles(theme);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(journey)}
      accessibilityRole="button"
      accessibilityLabel={`${journey.ctaLabel}: ${journey.title}`}
    >
      <Text style={styles.eyebrow}>Journey</Text>
      <Text style={styles.title} numberOfLines={2}>
        {journey.title}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {journey.description}
      </Text>
      <View style={styles.cta}>
        <Text style={styles.ctaText}>{journey.ctaLabel}</Text>
      </View>
    </TouchableOpacity>
  );
}
