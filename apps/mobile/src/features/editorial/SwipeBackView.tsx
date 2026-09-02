import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AccessibilityInfo, Animated, Dimensions, PanResponder, StyleSheet } from 'react-native';

interface SwipeBackViewProps {
  onBack: () => void;
  children: ReactNode;
}

export function SwipeBackView({ onBack, children }: SwipeBackViewProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(false);
  const width = Dimensions.get('window').width;

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

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => {
          if (reduceMotion) {
            return false;
          }

          return gesture.dx > 16 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.25;
        },
        onPanResponderMove: (_, gesture) => {
          translateX.setValue(Math.max(0, gesture.dx));
        },
        onPanResponderRelease: (_, gesture) => {
          const shouldComplete = gesture.dx > width * 0.28 || gesture.vx > 0.85;

          Animated.timing(translateX, {
            toValue: shouldComplete ? width : 0,
            duration: 220,
            useNativeDriver: true,
          }).start(({ finished }) => {
            if (finished && shouldComplete) {
              onBack();
              translateX.setValue(0);
            }
          });
        },
        onPanResponderTerminate: () => {
          Animated.timing(translateX, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
          }).start();
        },
      }),
    [onBack, reduceMotion, translateX, width],
  );

  return (
    <Animated.View
      style={[styles.frame, { transform: [{ translateX }] }]}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
  },
});
