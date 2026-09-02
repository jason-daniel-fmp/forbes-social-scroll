import { StyleSheet } from 'react-native';

import { homeJourneyCanvas } from '../data/homeJourneyTheme';

export function createHomeBuyingPhaseToolsStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: homeJourneyCanvas,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 24,
    },
    title: {
      color: '#1E2125',
      fontSize: 26,
      fontWeight: '700',
      marginBottom: 8,
    },
    subtitle: {
      color: '#3C5C55',
      fontSize: 15,
      lineHeight: 22,
      marginBottom: 24,
    },
    options: {
      gap: 12,
    },
  });
}
