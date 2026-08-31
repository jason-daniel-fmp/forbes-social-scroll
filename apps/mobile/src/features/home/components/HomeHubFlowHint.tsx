import { StyleSheet, Text, View } from 'react-native';

import { useTheme, type Theme } from '@forbes/theme';

export const HOME_HUB_FLOW_HINT_HEIGHT = 36;

export function createHomeHubFlowHintStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      height: HOME_HUB_FLOW_HINT_HEIGHT,
      justifyContent: 'center',
      paddingHorizontal: theme.layout.screenPaddingHorizontal,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.textMuted,
    },
    text: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.swipeHint,
      textAlign: 'center',
    },
  });
}

interface HomeHubFlowHintProps {
  message: string;
}

export function HomeHubFlowHint({ message }: HomeHubFlowHintProps) {
  const { theme } = useTheme();
  const styles = createHomeHubFlowHintStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
