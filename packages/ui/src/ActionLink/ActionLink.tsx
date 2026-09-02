import { Text, TouchableOpacity, type StyleProp, type TextStyle } from 'react-native';

import { useTheme } from '@forbes/theme';

import { createActionLinkStyles } from './ActionLink.styles';

interface ActionLinkProps {
  label: string;
  onPress?: () => void;
  color?: string;
  size?: 'default' | 'compact';
  trailingArrow?: boolean;
  delayPressIn?: number;
  accessibilityLabel?: string;
  style?: StyleProp<TextStyle>;
}

export function ActionLink({
  label,
  onPress,
  color,
  size = 'default',
  trailingArrow = true,
  delayPressIn,
  accessibilityLabel,
  style,
}: ActionLinkProps) {
  const { theme } = useTheme();
  const styles = createActionLinkStyles(theme, size);
  const text = (
    <Text style={[styles.text, color ? { color } : null, style]}>
      {trailingArrow ? `${label} →` : label}
    </Text>
  );

  if (!onPress) {
    return text;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      delayPressIn={delayPressIn}
      activeOpacity={0.7}
      hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
    >
      {text}
    </TouchableOpacity>
  );
}
