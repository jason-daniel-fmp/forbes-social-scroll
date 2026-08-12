import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from '@forbes/theme';

import { createAppStyles } from './src/App.styles';
import { ArticleFeed } from './src/screens/ArticleFeed';

function AppContent() {
  const { theme } = useTheme();
  const styles = createAppStyles(theme);
  const statusBarStyle = theme.colors.headerBackground === '#FFFFFF' ? 'dark' : 'light';

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar style={statusBarStyle} />
      <ArticleFeed />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider initialTheme="dark">
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
