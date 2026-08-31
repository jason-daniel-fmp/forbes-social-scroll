import type { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@forbes/theme';

import { createNavBarStyles } from './NavBar.styles';

interface NavBarProps {
  onBack?: () => void;
  backLabel?: string;
  rightSlot?: ReactNode;
}

export function NavBar({ onBack, backLabel = 'Back', rightSlot }: NavBarProps) {
  const { theme } = useTheme();
  const styles = createNavBarStyles(theme);

  return (
    <View style={styles.bar}>
      <View style={styles.side}>
        {onBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={backLabel}
          >
            <Text style={styles.backButtonText}>← {backLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.center}>
        <Text style={styles.logoText}>Forbes</Text>
      </View>

      <View style={styles.side}>{rightSlot}</View>
    </View>
  );
}
