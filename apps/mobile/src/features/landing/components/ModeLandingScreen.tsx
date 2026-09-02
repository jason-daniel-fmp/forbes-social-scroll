import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import { CollageGrid, CollageTile, Header, type CollageGridPlacement } from '@forbes/ui';

import type { ActiveAppMode } from '../../../app/types';
import { useHomePreference } from '../../home/context';
import { resetDevAppState } from '../../../shared/dev/resetDevAppState';
import { useJourney } from '../../../shared/journey';
import {
  COLLAGE_COLUMNS,
  COLLAGE_ROWS,
  assignCollageSlots,
  incrementTileClick,
  loadTileClicks,
  rankTiles,
  type AssignedCollageSlot,
  type TileClickMap,
} from '../../../shared/tiles';
import { modeOptions, type ModeOption } from '../data/modeOptions';
import { createModeLandingStyles } from './ModeLandingScreen.styles';

interface ModeLandingScreenProps {
  onSelectMode: (mode: ActiveAppMode) => void;
}

function tileDensity(area: number) {
  if (area >= 4) {
    return 'featured' as const;
  }

  if (area >= 2) {
    return 'medium' as const;
  }

  return 'small' as const;
}

export function ModeLandingScreen({ onSelectMode }: ModeLandingScreenProps) {
  const { theme } = useTheme();
  const styles = createModeLandingStyles(theme);
  const { resetAllProgress } = useJourney();
  const { clearPreference } = useHomePreference();
  const [clicks, setClicks] = useState<TileClickMap>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void loadTileClicks().then((loaded) => {
      if (!cancelled) {
        setClicks(loaded);
        setIsHydrated(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const assigned = useMemo(() => assignCollageSlots(rankTiles(modeOptions, clicks)), [clicks]);

  const toPlacement = useCallback(
    (item: AssignedCollageSlot<ModeOption>): CollageGridPlacement => ({
      id: item.tile.id,
      col: item.slot.col,
      row: item.slot.row,
      colSpan: item.slot.colSpan,
      rowSpan: item.slot.rowSpan,
      backgroundColor: item.tile.palette.background,
      accessibilityLabel: `Open ${item.tile.title}`,
      onPress: () => {
        void incrementTileClick(item.tile.id).then((next) => {
          setClicks(next);
          onSelectMode(item.tile.id);
        });
      },
      children: (
        <CollageTile
          eyebrow={item.tile.eyebrow}
          title={item.tile.title}
          palette={item.tile.palette}
          density={tileDensity(item.area)}
        />
      ),
    }),
    [onSelectMode],
  );

  const placements = assigned.placements.map(toPlacement);

  const handleDevReset = () => {
    Alert.alert(
      'Reset app state?',
      'Clears journey progress, home goal selection, feed scroll positions, and tile click weights.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            void resetDevAppState({
              resetJourneyProgress: resetAllProgress,
              clearHomePreference: clearPreference,
            }).then(() => {
              setClicks({});
            });
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header variant="brand" />
      </View>

      <View style={styles.intro}>
        <Text style={styles.kicker}>Your next move</Text>
        <Text style={styles.title}>What would you like to explore?</Text>
      </View>

      <View style={styles.collage}>
        {isHydrated ? (
          <CollageGrid columns={COLLAGE_COLUMNS} rows={COLLAGE_ROWS} placements={placements} />
        ) : null}
      </View>

      {__DEV__ ? (
        <TouchableOpacity
          style={styles.devResetButton}
          onPress={handleDevReset}
          accessibilityRole="button"
          accessibilityLabel="Reset app state for development testing"
        >
          <Text style={styles.devResetLabel}>Reset app state (dev)</Text>
          <Text style={styles.devResetHint}>
            Keep this developer-only control visually separate from the product.
          </Text>
        </TouchableOpacity>
      ) : null}

      <Text style={styles.footer}>Forbes • Informed action</Text>
    </View>
  );
}
