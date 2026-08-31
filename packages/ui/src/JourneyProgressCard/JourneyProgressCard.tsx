import { Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { JourneyStepProgressLabel } from '@forbes/types';

import { createJourneyProgressCardStyles } from './JourneyProgressCard.styles';

export interface JourneyProgressItem {
  title: string;
  label: JourneyStepProgressLabel;
}

const LABEL_DISPLAY: Record<JourneyStepProgressLabel, string> = {
  'not-started': 'Not started',
  opened: 'Opened',
  current: 'Current',
  next: 'Next',
  upcoming: 'Upcoming',
};

interface JourneyProgressCardProps {
  items: JourneyProgressItem[];
}

export function JourneyProgressCard({ items }: JourneyProgressCardProps) {
  const { theme } = useTheme();
  const styles = createJourneyProgressCardStyles(theme);

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isHighlighted = item.label === 'current' || item.label === 'next';

        return (
          <View key={item.title} style={styles.row}>
            <Text
              style={[styles.stepTitle, isHighlighted && styles.stepTitleActive]}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <Text style={[styles.stepLabel, isHighlighted && styles.stepLabelActive]}>
              {LABEL_DISPLAY[item.label]}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
