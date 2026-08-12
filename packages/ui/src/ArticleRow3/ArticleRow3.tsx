import { View } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { ArticleKpi } from '@forbes/types';

import { KpiRow } from '../KpiRow';
import { createArticleRow3Styles } from './ArticleRow3.styles';

interface ArticleRow3Props {
  kpis: ArticleKpi[];
}

export function ArticleRow3({ kpis }: ArticleRow3Props) {
  const { theme } = useTheme();
  const styles = createArticleRow3Styles(theme);

  return (
    <View style={styles.row}>
      <KpiRow kpis={kpis} />
    </View>
  );
}
