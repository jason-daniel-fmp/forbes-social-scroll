import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import { NavBar } from '@forbes/ui';

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
  const { theme } = useTheme();
  const styles = createHomeBuyingPhaseToolsStyles(theme);

  return (
    <View style={styles.container}>
      <NavBar onBack={onBack} backLabel="Phases" />

      <View style={styles.content}>
        <Text style={styles.title}>{phase.title}</Text>
        <Text style={styles.subtitle}>{phase.subtitle}</Text>

        <View style={styles.options}>
          {phase.tools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={styles.optionButton}
              onPress={() => onOpenTool(tool)}
              accessibilityRole="button"
              accessibilityLabel={tool.title}
            >
              <Text style={styles.optionTitle}>{tool.title}</Text>
              <Text style={styles.optionDescription}>{tool.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
