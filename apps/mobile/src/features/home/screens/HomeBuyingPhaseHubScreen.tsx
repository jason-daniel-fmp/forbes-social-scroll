import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import { NavBar } from '@forbes/ui';

import type { HomeBuyingPhaseId } from '../data/homeBuyingPhases';
import { homeBuyingPhaseOptions } from '../data/homeBuyingPhases';
import { createHomeBuyingPhaseHubStyles } from './HomeBuyingPhaseHubScreen.styles';

interface HomeBuyingPhaseHubScreenProps {
  onBack: () => void;
  onSelectPhase: (phaseId: HomeBuyingPhaseId) => void;
}

export function HomeBuyingPhaseHubScreen({ onBack, onSelectPhase }: HomeBuyingPhaseHubScreenProps) {
  const { theme } = useTheme();
  const styles = createHomeBuyingPhaseHubStyles(theme);

  const [topRow, bottomRow] = [
    homeBuyingPhaseOptions.slice(0, 2),
    homeBuyingPhaseOptions.slice(2, 4),
  ];

  const renderPhaseButton = (phase: (typeof homeBuyingPhaseOptions)[number]) => (
    <TouchableOpacity
      key={phase.id}
      style={styles.phaseButton}
      onPress={() => onSelectPhase(phase.id)}
      accessibilityRole="button"
      accessibilityLabel={`${phase.title}. ${phase.subtitle}`}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={phase.icon} size={28} color={theme.colors.accent} />
      </View>
      <Text style={styles.phaseTitle}>{phase.title}</Text>
      <Text style={styles.phaseSubtitle} numberOfLines={2}>
        {phase.subtitle}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NavBar onBack={onBack} backLabel="Goals" />

      <View style={styles.content}>
        <Text style={styles.title}>Planning to buy a house</Text>
        <Text style={styles.subtitle}>
          Start wherever you are — pick a phase and we&apos;ll guide you from there.
        </Text>

        <View style={styles.grid}>
          <View style={styles.row}>{topRow.map(renderPhaseButton)}</View>
          <View style={styles.row}>{bottomRow.map(renderPhaseButton)}</View>
        </View>
      </View>
    </View>
  );
}
