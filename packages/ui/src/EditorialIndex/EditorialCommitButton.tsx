import { useEffect, useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@forbes/theme';

import { createEditorialIndexStyles } from './EditorialIndex.styles';

interface EditorialCommitButtonProps {
  onPress: () => void;
  accessibilityLabel: string;
  top: number;
}

const BUTTON_SIZE = 48;

export function EditorialCommitButton({
  onPress,
  accessibilityLabel,
  top,
}: EditorialCommitButtonProps) {
  const { theme } = useTheme();
  const styles = createEditorialIndexStyles(theme);
  const scale = useRef(new Animated.Value(1)).current;
  const topValue = useRef(new Animated.Value(top)).current;

  useEffect(() => {
    Animated.timing(topValue, {
      toValue: top,
      duration: 260,
      useNativeDriver: false,
    }).start();
  }, [top, topValue]);

  const animateTo = (value: number) => {
    Animated.timing(scale, {
      toValue: value,
      duration: 90,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View pointerEvents="box-none" style={[styles.commitButtonWrap, { top: topValue }]}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPress={onPress}
          onPressIn={() => animateTo(0.95)}
          onPressOut={() => animateTo(1)}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          style={styles.commitButton}
        >
          <Ionicons
            name="arrow-forward"
            size={Math.round(BUTTON_SIZE * 0.4)}
            color={theme.colors.background}
          />
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

export const EDITORIAL_COMMIT_BUTTON_SIZE = BUTTON_SIZE;
