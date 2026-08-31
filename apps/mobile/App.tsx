import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from '@forbes/theme';

import { AppNavigator } from './src/app/AppNavigator';
import { createAppStyles } from './src/app/App.styles';
import type { AppMode } from './src/app/types';
import { HomeProvider } from './src/features/home';
import { JourneyProvider } from './src/shared/journey';

function AppContent() {
  const { theme } = useTheme();
  const styles = createAppStyles(theme);
  const [mode, setMode] = useState<AppMode>('landing');

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar style={theme.statusBarStyle} />
      <AppNavigator mode={mode} onModeChange={setMode} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider initialTheme="advisor-sem-2026">
        <JourneyProvider>
          <HomeProvider>
            <AppContent />
          </HomeProvider>
        </JourneyProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
