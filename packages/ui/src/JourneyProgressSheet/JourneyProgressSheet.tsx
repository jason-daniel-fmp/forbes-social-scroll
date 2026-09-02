import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { JourneyStepProgressLabel } from '@forbes/types';

import { ActionLink } from '../ActionLink';
import { createJourneyProgressSheetStyles } from './JourneyProgressSheet.styles';

export interface JourneyProgressSheetItem {
  stepId: string;
  title: string;
  label: JourneyStepProgressLabel;
}

export interface JourneyProgressSheetPhaseGroup {
  phaseId: string;
  title: string;
  items: JourneyProgressSheetItem[];
}

interface JourneyProgressSheetProps {
  visible: boolean;
  journeyTitle: string;
  overallOpened: number;
  overallTotal: number;
  phases: JourneyProgressSheetPhaseGroup[];
  onClose: () => void;
  onStepPress: (stepId: string) => void;
}

const LABEL_DISPLAY: Record<JourneyStepProgressLabel, string> = {
  'not-started': 'Not started',
  opened: 'Opened',
  current: 'Current',
  next: 'Next',
  upcoming: 'Upcoming',
};

function isStepTappable(label: JourneyStepProgressLabel): boolean {
  return label === 'opened' || label === 'current' || label === 'next';
}

export function JourneyProgressSheet({
  visible,
  journeyTitle,
  overallOpened,
  overallTotal,
  phases,
  onClose,
  onStepPress,
}: JourneyProgressSheetProps) {
  const { theme } = useTheme();
  const styles = createJourneyProgressSheetStyles(theme);

  if (!visible) {
    return null;
  }

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.root}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close progress sheet"
        />

        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>{journeyTitle}</Text>
          <Text style={styles.subtitle}>
            {overallOpened} of {overallTotal} steps opened
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {phases.map((phase) => (
              <View key={phase.phaseId} style={styles.phaseGroup}>
                <Text style={styles.phaseTitle}>{phase.title}</Text>

                {phase.items.map((item) => {
                  const isHighlighted = item.label === 'current' || item.label === 'next';
                  const tappable = isStepTappable(item.label);

                  if (!tappable) {
                    return (
                      <View key={item.stepId} style={styles.stepRow}>
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
                  }

                  return (
                    <TouchableOpacity
                      key={item.stepId}
                      style={styles.stepRow}
                      onPress={() => onStepPress(item.stepId)}
                      activeOpacity={0.7}
                      accessibilityRole="button"
                      accessibilityLabel={`Open ${item.title}`}
                    >
                      <Text
                        style={[styles.stepTitle, isHighlighted && styles.stepTitleActive]}
                        numberOfLines={2}
                      >
                        {item.title}
                      </Text>
                      <Text style={[styles.stepLabel, isHighlighted && styles.stepLabelActive]}>
                        {LABEL_DISPLAY[item.label]}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </ScrollView>

          <View style={styles.closeButton}>
            <ActionLink label="Close" onPress={onClose} accessibilityLabel="Close" />
          </View>
        </View>
      </View>
    </Modal>
  );
}
