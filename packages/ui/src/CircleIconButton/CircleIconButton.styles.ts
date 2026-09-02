import { StyleSheet } from 'react-native';

export function createCircleIconButtonStyles(size: number, backgroundColor: string) {
  return StyleSheet.create({
    circle: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      transform: [{ rotate: '45deg' }],
    },
  });
}
