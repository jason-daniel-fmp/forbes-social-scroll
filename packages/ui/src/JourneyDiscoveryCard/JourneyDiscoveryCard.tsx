import { Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { JourneyDiscoveryContent } from '@forbes/types';

import { ActionLink } from '../ActionLink';
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
      <View style={styles.cta}>
        <ActionLink
          label={content.ctaLabel}
          onPress={onPress}
          delayPressIn={150}
          accessibilityLabel={content.ctaLabel}
        />
      </View>
    </View>
  );
}
