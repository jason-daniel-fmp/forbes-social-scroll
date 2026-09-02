import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import {
  buildIndexAccessibilityLabel,
  formatIndexNumber,
  type EditorialIndexItem as EditorialIndexItemData,
} from '@forbes/types';

import { EditorialRule } from './EditorialRule';
import { createEditorialIndexStyles } from './EditorialIndex.styles';

interface EditorialIndexItemProps {
  item: EditorialIndexItemData;
  total: number;
  selected: boolean;
  reduceMotion: boolean;
  opacity: Animated.AnimatedInterpolation<number> | number;
  scale: Animated.AnimatedInterpolation<number> | number;
  metaOpacity: Animated.AnimatedInterpolation<number> | number;
  onPress: () => void;
  onAnchorLayout: (y: number) => void;
}

export function EditorialIndexItem({
  item,
  total,
  selected,
  reduceMotion,
  opacity,
  scale,
  metaOpacity,
  onPress,
  onAnchorLayout,
}: EditorialIndexItemProps) {
  const { theme } = useTheme();
  const styles = createEditorialIndexStyles(theme);
  const lines = item.displayTitle ?? [item.title];
  const number = formatIndexNumber(item.index);
  const metaParts = [
    item.articleCount != null ? `${item.articleCount} stories` : null,
    item.toolCount != null ? `${item.toolCount} tools` : null,
  ].filter(Boolean);
  const journeyLabel = item.journey?.enabled ? item.journey.stages.join('  →  ') : null;
  const hasDetails = Boolean(item.description || metaParts.length > 0 || journeyLabel);
  const [detailsHeight, setDetailsHeight] = useState(64);
  const expand = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(expand, {
      toValue: selected ? 1 : 0,
      duration: reduceMotion ? 0 : 260,
      useNativeDriver: false,
    }).start();
  }, [expand, reduceMotion, selected]);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={buildIndexAccessibilityLabel(item.title, {
        description: item.description,
        index: item.index,
        total,
        selected,
      })}
      style={styles.item}
      onLayout={(event) => onAnchorLayout(event.nativeEvent.layout.y)}
    >
      <Animated.View
        style={{
          opacity,
          transformOrigin: 'left top',
          transform: reduceMotion ? undefined : [{ scale }],
        }}
      >
        <Text style={[styles.number, selected && styles.numberSelected]}>{number}</Text>
        <View style={styles.itemCopy}>
          {lines.map((line) => (
            <Text
              key={line}
              style={[styles.categoryTitle, selected && styles.categoryTitleSelected]}
            >
              {line}
            </Text>
          ))}
        </View>
      </Animated.View>

      {hasDetails ? (
        <Animated.View
          style={[
            styles.details,
            {
              height: expand.interpolate({
                inputRange: [0, 1],
                outputRange: [0, Math.max(detailsHeight, 1)],
              }),
            },
          ]}
        >
          <Animated.View style={{ opacity: metaOpacity }}>
            <View
              style={styles.detailsInner}
              onLayout={(event) => {
                const next = Math.ceil(event.nativeEvent.layout.height);
                if (next > 0 && next !== detailsHeight) {
                  setDetailsHeight(next);
                }
              }}
            >
              {item.description ? (
                <Text style={[styles.descriptor, selected && styles.descriptorSelected]}>
                  {item.description}
                </Text>
              ) : null}

              <EditorialRule accent={selected} />

              {metaParts.length > 0 ? (
                <Text style={styles.meta}>{metaParts.join('  ·  ')}</Text>
              ) : null}

              {journeyLabel ? <Text style={styles.meta}>{journeyLabel}</Text> : null}
            </View>
          </Animated.View>
        </Animated.View>
      ) : null}
    </Pressable>
  );
}
