import { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { NavBar } from '@forbes/ui';

import {
  CollageExplorer,
  incrementTileClick,
  loadTileClicks,
  scopedClickMap,
  scopedTileId,
  type TileClickMap,
} from '../../../shared/tiles';
import { paletteForHomePhase } from '../data/homeJourneyTheme';
import type { HomeBuyingPhaseId } from '../data/homeBuyingPhases';
import { homeBuyingPhaseOptions } from '../data/homeBuyingPhases';
import { createHomeBuyingPhaseHubStyles } from './HomeBuyingPhaseHubScreen.styles';

const CLICK_SCOPE = 'home-phase';

interface HomeBuyingPhaseHubScreenProps {
  onBack: () => void;
  onSelectPhase: (phaseId: HomeBuyingPhaseId) => void;
}

export function HomeBuyingPhaseHubScreen({ onBack, onSelectPhase }: HomeBuyingPhaseHubScreenProps) {
  const styles = createHomeBuyingPhaseHubStyles();
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

  const tiles = useMemo(
    () =>
      homeBuyingPhaseOptions.map((phase) => ({
        id: phase.id,
        title: phase.title,
        eyebrow: 'Buy',
        palette: paletteForHomePhase(phase.id),
      })),
    [],
  );

  const rankedClicks = useMemo(
    () =>
      scopedClickMap(
        clicks,
        CLICK_SCOPE,
        homeBuyingPhaseOptions.map((phase) => phase.id),
      ),
    [clicks],
  );

  return (
    <View style={styles.container}>
      <NavBar onBack={onBack} backLabel="Goals" />

      <View style={styles.intro}>
        <Text style={styles.title}>Planning to buy a house</Text>
        <Text style={styles.subtitle}>Start wherever you are — pick a phase.</Text>
      </View>

      <View style={styles.collage}>
        {isHydrated ? (
          <CollageExplorer
            tiles={tiles}
            clicks={rankedClicks}
            onSelect={(id) => {
              void incrementTileClick(scopedTileId(CLICK_SCOPE, id)).then((next) => {
                setClicks(next);
                onSelectPhase(id as HomeBuyingPhaseId);
              });
            }}
          />
        ) : null}
      </View>
    </View>
  );
}
