import { View } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { ArticleKpi } from '@forbes/types';

import { KpiCard } from '../KpiCard';
import { createKpiRowStyles } from './KpiRow.styles';

interface KpiRowProps {
  kpis: ArticleKpi[];
}

export function KpiRow({ kpis }: KpiRowProps) {
  const { theme } = useTheme();
  const styles = createKpiRowStyles(theme);

  return (
    <View style={styles.row}>
      {kpis.map((kpi) => (
        <KpiCard key={`${kpi.value}-${kpi.label}`} kpi={kpi} />
      ))}
    </View>
  );
}
