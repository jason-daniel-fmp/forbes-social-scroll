import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

import { createCircleIconButtonStyles } from './CircleIconButton.styles';

interface CircleIconButtonProps {
  backgroundColor: string;
  iconColor?: string;
  size?: number;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export function CircleIconButton({
  backgroundColor,
  iconColor = '#FFFFFF',
  size = 40,
  onPress,
  accessibilityLabel,
}: CircleIconButtonProps) {
  const styles = createCircleIconButtonStyles(size, backgroundColor);
  const icon = (
    <Ionicons
      name="arrow-up"
      size={Math.round(size * 0.42)}
      color={iconColor}
      style={styles.icon}
    />
  );

  if (!onPress) {
    return <View style={styles.circle}>{icon}</View>;
  }

  return (
    <TouchableOpacity
      style={styles.circle}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {icon}
    </TouchableOpacity>
  );
}
