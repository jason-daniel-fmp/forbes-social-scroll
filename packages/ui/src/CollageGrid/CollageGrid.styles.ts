import { StyleSheet } from 'react-native';

export function createCollageGridStyles() {
  return StyleSheet.create({
    root: {
      flex: 1,
      minHeight: 0,
      position: 'relative',
    },
    tile: {
      position: 'absolute',
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 12,
      overflow: 'hidden',
    },
  });
}
