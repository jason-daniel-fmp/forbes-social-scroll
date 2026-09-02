import { Text, TouchableOpacity, View } from 'react-native';

import { ActionLink } from '../ActionLink';
import { CircleIconButton } from '../CircleIconButton';
import { createPathCardStyles } from './PathCard.styles';

export interface PathCardPalette {
  background: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  circle: string;
}

interface PathCardProps {
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel: string;
  palette: PathCardPalette;
  onPress: () => void;
  density?: 'comfortable' | 'compact';
  accessibilityLabel?: string;
}

export function PathCard({
  eyebrow,
  title,
  description,
  ctaLabel,
  palette,
  onPress,
  density = 'comfortable',
  accessibilityLabel,
}: PathCardProps) {
  const styles = createPathCardStyles(density);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: palette.background }]}
      onPress={onPress}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
    >
      <View style={styles.topRow}>
        <View style={styles.copy}>
          {eyebrow ? (
            <Text style={[styles.eyebrow, { color: palette.textMuted }]}>{eyebrow}</Text>
          ) : null}
          <Text style={[styles.title, { color: palette.textPrimary }]}>{title}</Text>
        </View>
        <CircleIconButton backgroundColor={palette.circle} size={density === 'compact' ? 36 : 40} />
      </View>

      <Text style={[styles.description, { color: palette.textSecondary }]}>{description}</Text>
      <ActionLink label={ctaLabel} color={palette.textPrimary} />
    </TouchableOpacity>
  );
}
