import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { ArticleProductCta } from '@forbes/types';

import { createProductCardStyles } from './ProductCard.styles';

interface ProductCardProps {
  product: ArticleProductCta;
  onPress: (product: ArticleProductCta) => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const { theme } = useTheme();
  const styles = createProductCardStyles(theme);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(product)}
      accessibilityRole="button"
      accessibilityLabel={`${product.ctaLabel}: ${product.title}`}
    >
      {product.badge ? <Text style={styles.badge}>{product.badge}</Text> : null}
      <Text style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>
      <Text style={styles.price} numberOfLines={1}>
        {product.price}
      </Text>
      <View style={styles.cta}>
        <Text style={styles.ctaText}>{product.ctaLabel}</Text>
      </View>
    </TouchableOpacity>
  );
}
