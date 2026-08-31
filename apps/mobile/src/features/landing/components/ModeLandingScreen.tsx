import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import { Header } from '@forbes/ui';

import type { ActiveAppMode } from '../../../app/types';
import { useHomePreference } from '../../home/context';
import { resetDevAppState } from '../../../shared/dev/resetDevAppState';
import { useJourney } from '../../../shared/journey';
import { modeOptions } from '../data/modeOptions';
import { createModeLandingStyles } from './ModeLandingScreen.styles';

interface ModeLandingScreenProps {
  onSelectMode: (mode: ActiveAppMode) => void;
}

export function ModeLandingScreen({ onSelectMode }: ModeLandingScreenProps) {
  const { theme } = useTheme();
  const styles = createModeLandingStyles(theme);
  const { resetAllProgress } = useJourney();
  const { clearPreference } = useHomePreference();

  const handleDevReset = () => {
    Alert.alert(
      'Reset app state?',
      'Clears journey progress, home goal selection, and saved feed scroll positions.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            void resetDevAppState({
              resetJourneyProgress: resetAllProgress,
              clearHomePreference: clearPreference,
            });
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What would you like to explore?</Text>
        <Text style={styles.subtitle}>Choose a path to get started.</Text>

        <View style={styles.buttons}>
          {modeOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.modeButton}
              onPress={() => onSelectMode(option.id)}
              accessibilityRole="button"
              accessibilityLabel={`Open ${option.title}`}
            >
              <Text style={styles.modeEyebrow}>{option.eyebrow}</Text>
              <Text style={styles.modeTitle}>{option.title}</Text>
              <Text style={styles.modeDescription}>{option.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {__DEV__ ? (
          <TouchableOpacity
            style={styles.devResetButton}
            onPress={handleDevReset}
            accessibilityRole="button"
            accessibilityLabel="Reset app state for development testing"
          >
            <Text style={styles.devResetLabel}>Reset app state (dev)</Text>
            <Text style={styles.devResetHint}>
              Clears journeys, home goal, and feed scroll positions
            </Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </View>
  );
}
