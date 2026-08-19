import { View } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { ArticleCard } from '@forbes/types';

import { MonetizationRow } from '../MonetizationRow';
import { createArticleRow3Styles } from './ArticleRow3.styles';

interface ArticleRow3Props {
  cards: ArticleCard[];
}

export function ArticleRow3({ cards }: ArticleRow3Props) {
  const { theme } = useTheme();
  const styles = createArticleRow3Styles(theme);

  return (
    <View style={styles.row}>
      <MonetizationRow cards={cards} />
    </View>
  );
}
