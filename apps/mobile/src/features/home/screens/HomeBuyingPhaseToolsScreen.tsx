import { Text, View } from 'react-native';

import { NavBar, PathCard } from '@forbes/ui';

import { paletteForHomeTool } from '../data/homeJourneyTheme';
import type { HomeBuyingPhaseOption, HomeBuyingPhaseTool } from '../data/homeBuyingPhases';
import { createHomeBuyingPhaseToolsStyles } from './HomeBuyingPhaseToolsScreen.styles';

interface HomeBuyingPhaseToolsScreenProps {
  phase: HomeBuyingPhaseOption;
  onBack: () => void;
  onOpenTool: (tool: HomeBuyingPhaseTool) => void;
}

export function HomeBuyingPhaseToolsScreen({
  phase,
  onBack,
  onOpenTool,
}: HomeBuyingPhaseToolsScreenProps) {
  const styles = createHomeBuyingPhaseToolsStyles();

  return (
    <View style={styles.container}>
      <NavBar onBack={onBack} backLabel="Phases" />

      <View style={styles.content}>
        <Text style={styles.title}>{phase.title}</Text>
        <Text style={styles.subtitle}>{phase.subtitle}</Text>

        <View style={styles.options}>
          {phase.tools.map((tool, index) => (
            <PathCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              ctaLabel="Open"
              density="compact"
              palette={paletteForHomeTool(index)}
              onPress={() => onOpenTool(tool)}
              accessibilityLabel={tool.title}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
