import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  ScrollView,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { useTheme } from '@forbes/theme';
import {
  EDITORIAL_INDEX_COLLAPSED_HEIGHT,
  resolveFocusedIndex,
  resolveFocusedIndexFromAnchors,
  type EditorialIndexItem as EditorialIndexItemData,
} from '@forbes/types';

import { ActionLink } from '../ActionLink';
import { EDITORIAL_COMMIT_BUTTON_SIZE, EditorialCommitButton } from './EditorialCommitButton';
import { EditorialIndexItem } from './EditorialIndexItem';
import { createEditorialIndexStyles } from './EditorialIndex.styles';

interface EditorialIndexProps {
  displayTitle: string[];
  items: EditorialIndexItemData[];
  onCommit?: (id: string) => void;
  onFocusChange?: (id: string) => void;
  commitLabel?: string;
  emptyLabel?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
}

export function EditorialIndex({
  displayTitle,
  items,
  onCommit,
  onFocusChange,
  commitLabel,
  emptyLabel = 'Nothing to explore here yet.',
  emptyActionLabel,
  onEmptyAction,
}: EditorialIndexProps) {
  const { theme } = useTheme();
  const styles = createEditorialIndexStyles(theme);
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const focusedIndexRef = useRef(0);
  const anchorsRef = useRef<number[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(120);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const selected = items[focusedIndex] ?? items[0] ?? null;
  const usable = Math.max(0, viewportHeight - headerHeight);
  const focalY = headerHeight + usable / 2;
  const paddingTop = viewportHeight
    ? Math.max(headerHeight + usable * 0.22, focalY - 36)
    : headerHeight + theme.spacing.xl * 2;
  const paddingBottom = Math.max(
    usable * 0.45,
    viewportHeight - paddingTop - EDITORIAL_INDEX_COLLAPSED_HEIGHT,
  );
  const buttonTop = Math.min(
    Math.max(focalY - EDITORIAL_COMMIT_BUTTON_SIZE / 2, headerHeight + theme.spacing.md),
    Math.max(
      headerHeight + theme.spacing.md,
      viewportHeight - EDITORIAL_COMMIT_BUTTON_SIZE - theme.spacing.lg,
    ),
  );

  useEffect(() => {
    let cancelled = false;

    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (!cancelled) {
        setReduceMotion(enabled);
      }
    });

    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);

    return () => {
      cancelled = true;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const id = items[focusedIndex]?.id;
    if (id) {
      onFocusChange?.(id);
    }
  }, [focusedIndex, items, onFocusChange]);

  const focusStyles = useMemo(() => {
    const slot = EDITORIAL_INDEX_COLLAPSED_HEIGHT;

    return items.map((_, index) => {
      const opacity = scrollY.interpolate({
        inputRange: [
          (index - 2) * slot,
          (index - 1) * slot,
          index * slot,
          (index + 1) * slot,
          (index + 2) * slot,
        ],
        outputRange: [0.62, 0.8, 1, 0.8, 0.62],
        extrapolate: 'clamp',
      });
      const scale = scrollY.interpolate({
        inputRange: [(index - 1) * slot, index * slot, (index + 1) * slot],
        outputRange: [1, 1.16, 1],
        extrapolate: 'clamp',
      });
      const metaOpacity = scrollY.interpolate({
        inputRange: [(index - 1) * slot, index * slot, (index + 1) * slot],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp',
      });

      return { opacity, scale, metaOpacity };
    });
  }, [items, scrollY]);

  const applyFocusedIndex = (next: number) => {
    if (next === focusedIndexRef.current) {
      return;
    }
    focusedIndexRef.current = next;
    setFocusedIndex(next);
  };

  const resolveFromScroll = (y: number) => {
    const anchors = anchorsRef.current;
    if (anchors.length === items.length && Number.isFinite(focalY) && focalY > 0) {
      return resolveFocusedIndexFromAnchors(y, anchors, focalY, focusedIndexRef.current);
    }

    return resolveFocusedIndex(
      y,
      items.length,
      EDITORIAL_INDEX_COLLAPSED_HEIGHT,
      focusedIndexRef.current,
    );
  };

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: true,
    listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      applyFocusedIndex(resolveFromScroll(event.nativeEvent.contentOffset.y));
    },
  });

  const handleItemPress = (index: number) => {
    const item = items[index];
    if (!item) {
      return;
    }

    if (index === focusedIndexRef.current) {
      onCommit?.(item.id);
      return;
    }

    const anchor = anchorsRef.current[index];
    const y =
      Number.isFinite(anchor) && focalY > 0
        ? Math.max(0, anchor - focalY)
        : index * EDITORIAL_INDEX_COLLAPSED_HEIGHT;

    scrollRef.current?.scrollTo({
      y,
      animated: !reduceMotion,
    });
  };

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop,
            paddingBottom,
          },
        ]}
        showsVerticalScrollIndicator={false}
        onLayout={(event) => setViewportHeight(event.nativeEvent.layout.height)}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {items.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyCopy}>{emptyLabel}</Text>
            {onEmptyAction && emptyActionLabel ? (
              <ActionLink label={emptyActionLabel} onPress={onEmptyAction} />
            ) : null}
          </View>
        ) : (
          items.map((item, index) => (
            <EditorialIndexItem
              key={item.id}
              item={item}
              total={items.length}
              selected={index === focusedIndex}
              reduceMotion={reduceMotion}
              opacity={
                reduceMotion ? (index === focusedIndex ? 1 : 0.72) : focusStyles[index].opacity
              }
              scale={reduceMotion ? 1 : focusStyles[index].scale}
              metaOpacity={
                reduceMotion ? (index === focusedIndex ? 1 : 0) : focusStyles[index].metaOpacity
              }
              onPress={() => handleItemPress(index)}
              onAnchorLayout={(y) => {
                anchorsRef.current[index] = y;
              }}
            />
          ))
        )}
      </Animated.ScrollView>

      <View
        style={styles.headlineOverlay}
        pointerEvents="none"
        onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
      >
        {displayTitle.map((line) => (
          <Text key={line} style={styles.headline}>
            {line}
          </Text>
        ))}
      </View>

      {selected && onCommit && viewportHeight > 0 ? (
        <EditorialCommitButton
          top={buttonTop}
          onPress={() => onCommit(selected.id)}
          accessibilityLabel={commitLabel ?? `Explore ${selected.title}`}
        />
      ) : null}
    </View>
  );
}
