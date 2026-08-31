import type { AppMode } from './types';
import { FinancialRecoveryScreen } from '../features/financial-recovery';
import { HomeFlowScreen } from '../features/home';
import { ModeLandingScreen } from '../features/landing';
import { TrendsScreen } from '../features/trends';

interface AppNavigatorProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

export function AppNavigator({ mode, onModeChange }: AppNavigatorProps) {
  if (mode === 'landing') {
    return <ModeLandingScreen onSelectMode={(next) => onModeChange(next)} />;
  }

  if (mode === 'trends') {
    return <TrendsScreen onBack={() => onModeChange('landing')} />;
  }

  if (mode === 'home') {
    return <HomeFlowScreen onBackToModes={() => onModeChange('landing')} />;
  }

  return <FinancialRecoveryScreen onBack={() => onModeChange('landing')} />;
}
