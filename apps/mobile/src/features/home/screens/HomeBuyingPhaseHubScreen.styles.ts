import { StyleSheet } from 'react-native';

import { homeJourneyCanvas } from '../data/homeJourneyTheme';

export function createHomeBuyingPhaseHubStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: homeJourneyCanvas,
    },
    intro: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 12,
    },
    title: {
      color: '#1E2125',
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 28,
      marginBottom: 6,
    },
    subtitle: {
      color: '#3C5C55',
      fontSize: 15,
      lineHeight: 20,
    },
    collage: {
      flex: 1,
      minHeight: 0,
      paddingHorizontal: 12,
      paddingBottom: 12,
    },
  });
}
