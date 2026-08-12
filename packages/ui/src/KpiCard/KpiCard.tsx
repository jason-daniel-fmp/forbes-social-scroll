import { Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { ArticleKpi } from '@forbes/types';

import { createKpiCardStyles } from './KpiCard.styles';

interface KpiCardProps {
  kpi: ArticleKpi;
}

export function KpiCard({ kpi }: KpiCardProps) {
  const { theme } = useTheme();
  const styles = createKpiCardStyles(theme);

  return (
    <View style={styles.card} accessibilityRole="summary">
      <Text style={styles.value} numberOfLines={1}>
        {kpi.value}
      </Text>
      <Text style={styles.label} numberOfLines={2}>
        {kpi.label}
      </Text>
      {kpi.sublabel ? (
        <Text style={styles.sublabel} numberOfLines={2}>
          {kpi.sublabel}
        </Text>
      ) : null}
    </View>
  );
}
