import { ScrollView, Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';

import { createArticleContentStyles } from './ArticleContent.styles';

interface ArticleContentProps {
  paragraphs: string[];
}

export function ArticleContent({ paragraphs }: ArticleContentProps) {
  const { theme } = useTheme();
  const styles = createArticleContentStyles(theme);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {paragraphs.map((paragraph) => (
          <View key={paragraph} style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.paragraph}>{paragraph}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
