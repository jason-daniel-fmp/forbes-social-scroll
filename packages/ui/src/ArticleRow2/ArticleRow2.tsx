import { View } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { ArticleInteractions } from '@forbes/types';

import { ArticleContent } from '../ArticleContent';
import { Interactions } from '../Interactions';
import { createArticleRow2Styles } from './ArticleRow2.styles';

interface ArticleRow2Props {
  paragraphs: string[];
  interactions: ArticleInteractions;
}

export function ArticleRow2({ paragraphs, interactions }: ArticleRow2Props) {
  const { theme } = useTheme();
  const styles = createArticleRow2Styles(theme);

  return (
    <View style={styles.row}>
      <View style={styles.colContent}>
        <ArticleContent paragraphs={paragraphs} />
      </View>
      <View style={styles.colRail}>
        <Interactions interactions={interactions} />
      </View>
    </View>
  );
}
