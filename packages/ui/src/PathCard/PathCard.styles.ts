import { StyleSheet } from 'react-native';

export function createPathCardStyles(density: 'comfortable' | 'compact') {
  const isCompact = density === 'compact';

  return StyleSheet.create({
    card: {
      borderRadius: isCompact ? 22 : 28,
      paddingHorizontal: isCompact ? 16 : 20,
      paddingVertical: isCompact ? 16 : 22,
      shadowColor: '#1E2125',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 3,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
      marginBottom: isCompact ? 6 : 10,
    },
    copy: {
      flex: 1,
      minWidth: 0,
    },
    eyebrow: {
      fontSize: 11,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      marginBottom: 8,
    },
    title: {
      fontSize: isCompact ? 20 : 26,
      fontWeight: '700',
      lineHeight: isCompact ? 24 : 30,
    },
    description: {
      fontSize: isCompact ? 14 : 15,
      lineHeight: isCompact ? 19 : 21,
      marginBottom: isCompact ? 12 : 18,
    },
  });
}
