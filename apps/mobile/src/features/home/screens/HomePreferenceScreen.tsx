import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import { NavBar } from '@forbes/ui';
import type { HomeNeed } from '@forbes/types';

import { homeNeedOptions } from '../data/homeNeeds';
import { createHomePreferenceScreenStyles } from './HomePreferenceScreen.styles';

interface HomePreferenceScreenProps {
  onSelect: (need: HomeNeed) => void;
  onBack: () => void;
}

export function HomePreferenceScreen({ onSelect, onBack }: HomePreferenceScreenProps) {
  const { theme } = useTheme();
  const styles = createHomePreferenceScreenStyles(theme);

  return (
    <View style={styles.container}>
      <NavBar onBack={onBack} backLabel="Modes" />

      <View style={styles.content}>
        <Text style={styles.title}>What brings you here?</Text>
        <Text style={styles.subtitle}>Choose the option that best matches your goal.</Text>

        <View style={styles.options}>
          {homeNeedOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionButton}
              onPress={() => onSelect(option.id)}
              accessibilityRole="button"
              accessibilityLabel={option.title}
            >
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
