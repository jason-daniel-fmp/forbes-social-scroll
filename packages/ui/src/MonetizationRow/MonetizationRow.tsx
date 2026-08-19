import { useCallback, useState } from 'react';
import { View } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { ArticleCard, ArticleJourneyCta, ArticleProductCta } from '@forbes/types';

import { InAppWebView } from '../InAppWebView';
import { JourneyCard } from '../JourneyCard';
import { KpiCard } from '../KpiCard';
import { ProductCard } from '../ProductCard';
import { createMonetizationRowStyles } from './MonetizationRow.styles';

interface MonetizationRowProps {
  cards: ArticleCard[];
}

interface WebViewTarget {
  url: string;
  title: string;
}

export function MonetizationRow({ cards }: MonetizationRowProps) {
  const { theme } = useTheme();
  const styles = createMonetizationRowStyles(theme);
  const [webViewTarget, setWebViewTarget] = useState<WebViewTarget | null>(null);

  const openProduct = useCallback((product: ArticleProductCta) => {
    setWebViewTarget({ url: product.url, title: product.title });
  }, []);

  const openJourney = useCallback((journey: ArticleJourneyCta) => {
    setWebViewTarget({ url: journey.url, title: journey.title });
  }, []);

  const closeWebView = useCallback(() => {
    setWebViewTarget(null);
  }, []);

  return (
    <>
      <View style={styles.row}>
        {cards.map((card) => {
          if (card.type === 'kpi') {
            return <KpiCard key={card.id} kpi={card} />;
          }
          if (card.type === 'product') {
            return <ProductCard key={card.id} product={card} onPress={openProduct} />;
          }
          return <JourneyCard key={card.id} journey={card} onPress={openJourney} />;
        })}
      </View>

      <InAppWebView
        visible={webViewTarget !== null}
        url={webViewTarget?.url ?? ''}
        title={webViewTarget?.title ?? ''}
        onClose={closeWebView}
      />
    </>
  );
}
