import { Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import { NavBar } from '@forbes/ui';

import type { HomeBuyingPhaseOption } from '../data/homeBuyingPhases';
import { createHomeBuyingPhasePlaceholderStyles } from './HomeBuyingPhasePlaceholderScreen.styles';

interface HomeBuyingPhasePlaceholderScreenProps {
  phase: HomeBuyingPhaseOption;
  onBack: () => void;
}

export function HomeBuyingPhasePlaceholderScreen({
  phase,
  onBack,
}: HomeBuyingPhasePlaceholderScreenProps) {
  const { theme } = useTheme();
  const styles = createHomeBuyingPhasePlaceholderStyles(theme);

  return (
    <View style={styles.container}>
      <NavBar onBack={onBack} backLabel="Phases" />

      <View style={styles.content}>
        <Text style={styles.eyebrow}>{phase.title} phase</Text>
        <Text style={styles.title}>{phase.subtitle}</Text>
        <Text style={styles.message}>
          Tools and guided steps for this phase are coming in the next milestone. Head back to pick
          another phase or return to your goals.
        </Text>
      </View>
    </View>
  );
}
