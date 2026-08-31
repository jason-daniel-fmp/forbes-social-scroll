import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@forbes/theme';

import { createJourneyProgressRailStyles } from './JourneyProgressRail.styles';

export interface JourneyProgressRailPhase {
  phaseId: string;
  title: string;
  openedCount: number;
  totalCount: number;
  isComplete: boolean;
  isCurrent: boolean;
}

interface JourneyProgressRailProps {
  phases: JourneyProgressRailPhase[];
  overallOpened: number;
  overallTotal: number;
  onPress: () => void;
}

function segmentFillRatio(openedCount: number, totalCount: number): number {
  if (totalCount <= 0) {
    return 0;
  }
  return Math.min(1, openedCount / totalCount);
}

export function JourneyProgressRail({
  phases,
  overallOpened,
  overallTotal,
  onPress,
}: JourneyProgressRailProps) {
  const { theme } = useTheme();
  const styles = createJourneyProgressRailStyles(theme);

  if (phases.length === 0) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.touchTarget}
      onPress={onPress}
      activeOpacity={0.85}
      hitSlop={{ top: 4, bottom: 4, left: 0, right: 0 }}
      accessibilityRole="button"
      accessibilityLabel={`Journey progress ${overallOpened} of ${overallTotal}. Tap for details.`}
    >
      <View style={styles.row}>
        <View style={styles.segments}>
          {phases.map((phase) => {
            const isHighlighted = phase.isCurrent || phase.isComplete;

            return (
              <View key={phase.phaseId} style={styles.segment}>
                <Text
                  style={[
                    styles.segmentLabel,
                    phase.isComplete && styles.segmentLabelComplete,
                    phase.isCurrent && styles.segmentLabelActive,
                  ]}
                  numberOfLines={1}
                >
                  {phase.title}
                </Text>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      {
                        width: `${segmentFillRatio(phase.openedCount, phase.totalCount) * 100}%`,
                        opacity: isHighlighted ? 1 : 0.45,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>
        <Text style={styles.counter}>
          {overallOpened}/{overallTotal}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export { JOURNEY_PROGRESS_RAIL_HEIGHT } from './JourneyProgressRail.styles';
