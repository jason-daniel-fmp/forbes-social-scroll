import { Text, View } from 'react-native';

import { CircleIconButton } from '../CircleIconButton';
import type { PathCardPalette } from '../PathCard';
import { createCollageTileStyles } from './CollageTile.styles';

export type CollageTileDensity = 'featured' | 'medium' | 'small';

interface CollageTileProps {
  eyebrow?: string;
  title: string;
  palette: PathCardPalette;
  density: CollageTileDensity;
}

export function CollageTile({ eyebrow, title, palette, density }: CollageTileProps) {
  const styles = createCollageTileStyles(density);
  const showCircle = density !== 'small';

  return (
    <View style={styles.inner}>
      <View style={styles.topRow}>
        <View style={styles.copy}>
          {eyebrow ? (
            <Text style={[styles.eyebrow, { color: palette.textMuted }]} numberOfLines={1}>
              {eyebrow}
            </Text>
          ) : null}
          <Text style={[styles.title, { color: palette.textPrimary }]} numberOfLines={2}>
            {title}
          </Text>
        </View>
        {showCircle ? (
          <CircleIconButton
            backgroundColor={palette.circle}
            size={density === 'featured' ? 36 : 28}
          />
        ) : null}
      </View>
    </View>
  );
}
