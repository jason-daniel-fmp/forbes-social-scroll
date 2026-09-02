import { Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';

import { ActionLink } from '../ActionLink';
import { JourneyProgressCard, type JourneyProgressItem } from '../JourneyProgressCard';
import { createContinueJourneyCardStyles } from './ContinueJourneyCard.styles';

interface ContinueJourneyCardProps {
  journeyTitle: string;
  summary: string;
  nextStepTitle: string;
  progressItems: JourneyProgressItem[];
  contextMessage?: string;
  ctaLabel?: string;
  onPress: () => void;
}

export function ContinueJourneyCard({
  journeyTitle,
  summary,
  nextStepTitle,
  progressItems,
  contextMessage,
  ctaLabel = 'Continue',
  onPress,
}: ContinueJourneyCardProps) {
  const { theme } = useTheme();
  const styles = createContinueJourneyCardStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Continue</Text>
      <Text style={styles.title}>Continue your {journeyTitle}</Text>
      <Text style={styles.description}>{summary}</Text>

      {contextMessage ? <Text style={styles.contextMessage}>{contextMessage}</Text> : null}

      <Text style={styles.nextLabel}>Next</Text>
      <Text style={styles.nextStep}>{nextStepTitle}</Text>

      <JourneyProgressCard items={progressItems} />

      <View style={styles.cta}>
        <ActionLink
          label={ctaLabel}
          onPress={onPress}
          delayPressIn={150}
          accessibilityLabel={ctaLabel}
        />
      </View>
    </View>
  );
}
