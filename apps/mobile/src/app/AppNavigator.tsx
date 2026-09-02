import { StyleSheet, View } from 'react-native';

import type { AppMode } from './types';
import { isPlaceholderAppMode } from './types';
import { FinancialRecoveryFlowScreen } from '../features/financial-recovery';
import { HomeFlowScreen } from '../features/home';
import { getModeOption } from '../features/landing/data/modeOptions';
import { ModeLandingScreen } from '../features/landing';
import { PlaceholderPathScreen } from '../features/placeholder';
import { TrendsScreen } from '../features/trends';

interface AppNavigatorProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

export function AppNavigator({ mode, onModeChange }: AppNavigatorProps) {
  const landing = <ModeLandingScreen onSelectMode={(next) => onModeChange(next)} />;

  if (mode === 'landing') {
    return landing;
  }

  let foreground = landing;

  if (mode === 'trends') {
    foreground = <TrendsScreen onBack={() => onModeChange('landing')} />;
  } else if (mode === 'home') {
    foreground = <HomeFlowScreen onBackToModes={() => onModeChange('landing')} />;
  } else if (mode === 'financial-recovery') {
    foreground = <FinancialRecoveryFlowScreen onBack={() => onModeChange('landing')} />;
  } else if (isPlaceholderAppMode(mode)) {
    const option = getModeOption(mode);
    foreground = (
      <PlaceholderPathScreen
        title={option?.title ?? 'Coming soon'}
        eyebrow={option?.eyebrow}
        onBack={() => onModeChange('landing')}
      />
    );
  }

  const showLandingUnderlay = mode === 'home' || mode === 'financial-recovery';

  return (
    <View style={styles.stack}>
      {showLandingUnderlay ? (
        <View style={styles.underlay} pointerEvents="none">
          {landing}
        </View>
      ) : null}
      <View style={styles.foreground}>{foreground}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
  },
  foreground: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
