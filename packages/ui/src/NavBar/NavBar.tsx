import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';

import { ActionLink } from '../ActionLink';
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
          <ActionLink
            label={`← ${backLabel}`}
            onPress={onBack}
            color={theme.colors.textPrimary}
            size="compact"
            trailingArrow={false}
            accessibilityLabel={backLabel}
          />
        ) : null}
      </View>

      <View style={styles.center}>
        <Text style={styles.logoText}>Forbes</Text>
      </View>

      <View style={styles.sideRight}>{rightSlot}</View>
    </View>
  );
}
