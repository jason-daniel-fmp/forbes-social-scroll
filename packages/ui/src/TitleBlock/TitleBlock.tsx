import { Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';

import { createTitleBlockStyles } from './TitleBlock.styles';

interface TitleBlockProps {
  title: string;
  subtitle: string;
}

export function TitleBlock({ title, subtitle }: TitleBlockProps) {
  const { theme } = useTheme();
  const styles = createTitleBlockStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
