import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  FlatList,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type LayoutChangeEvent,
  type ListRenderItem,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { getContinueJourneyContent, getJourneyById } from '@forbes/config';
import { useTheme } from '@forbes/theme';
import { ContinueJourneyCard, JourneyDiscoveryCard, NavBar } from '@forbes/ui';
import type { JourneyId } from '@forbes/types';

import { getFeedItemKey, type FeedItem } from '../feed';
import { clampScrollIndex } from '../feed/scrollIndex';
import {
  loadFeedScrollIndex,
  saveFeedScrollIndex,
  type FeedScrollId,
} from '../feed/scrollPersistence';
import { useJourney } from '../journey';
import { ArticleScreen } from './ArticleScreen';
import { createScrollFeedStyles } from './ScrollFeed.styles';

const NAV_BAR_HEIGHT = 56;

interface ScrollFeedProps {
  feedId: FeedScrollId;
  feedItems: FeedItem[];
  onBack?: () => void;
  backLabel?: string;
  headerExtension?: ReactNode;
  headerExtensionHeight?: number;
}

export function ScrollFeed({
  feedId,
  feedItems,
  onBack,
  backLabel = 'Back',
  headerExtension,
  headerExtensionHeight = 0,
}: ScrollFeedProps) {
  const { theme, toggleTheme } = useTheme();
  const styles = createScrollFeedStyles(theme);
  const { activateJourney, openRecommendedStep, getJourneyState } = useJourney();
  const [containerHeight, setContainerHeight] = useState(0);
  const [isRestoreReady, setIsRestoreReady] = useState(false);
  const listRef = useRef<FlatList<FeedItem>>(null);
  const currentIndexRef = useRef(0);
  const restoreIndexRef = useRef(0);

  const headerInset = NAV_BAR_HEIGHT + headerExtensionHeight;

  useEffect(() => {
    let cancelled = false;

    const timeout = setTimeout(() => {
      if (!cancelled) {
        setIsRestoreReady(true);
      }
    }, 300);

    void loadFeedScrollIndex(feedId).then((index) => {
      if (!cancelled) {
        restoreIndexRef.current = index;
        setIsRestoreReady(true);
        clearTimeout(timeout);
      }
    });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [feedId]);

  useEffect(() => {
    return () => {
      void saveFeedScrollIndex(feedId, currentIndexRef.current);
    };
  }, [feedId]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0) {
      setContainerHeight(height);
    }
  }, []);

  const persistScrollPosition = useCallback(
    (offsetY: number) => {
      if (containerHeight <= 0) {
        return;
      }

      const index = clampScrollIndex(Math.round(offsetY / containerHeight), feedItems.length);
      currentIndexRef.current = index;
      void saveFeedScrollIndex(feedId, index);
    },
    [containerHeight, feedId, feedItems.length],
  );

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      persistScrollPosition(event.nativeEvent.contentOffset.y);
    },
    [persistScrollPosition],
  );

  const themeToggle = useMemo(
    () => (
      <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme} accessibilityRole="button">
        <Text style={styles.themeToggleText}>{theme.label}</Text>
      </TouchableOpacity>
    ),
    [styles.themeToggle, styles.themeToggleText, theme.label, toggleTheme],
  );

  const handleDiscoveryPress = useCallback(
    (journeyId: JourneyId) => {
      void activateJourney(journeyId).then(() => {
        InteractionManager.runAfterInteractions(() => {
          openRecommendedStep(journeyId);
        });
      });
    },
    [activateJourney, openRecommendedStep],
  );

  const handleContinuePress = useCallback(
    (journeyId: JourneyId) => {
      InteractionManager.runAfterInteractions(() => {
        openRecommendedStep(journeyId);
      });
    },
    [openRecommendedStep],
  );

  const renderItem: ListRenderItem<FeedItem> = useCallback(
    ({ item, index }) => {
      const pageStyle = [styles.page, { height: containerHeight }];

      if (item.kind === 'article') {
        return (
          <View style={pageStyle}>
            <ArticleScreen
              article={item.article}
              headerInset={headerInset}
              isLast={index === feedItems.length - 1}
            />
          </View>
        );
      }

      if (item.kind === 'journey-discovery') {
        const journey = getJourneyById(item.journeyId);
        if (!journey || journey.enabled === false) {
          return <View style={pageStyle} />;
        }

        return (
          <View style={[pageStyle, { paddingTop: headerInset }]}>
            <JourneyDiscoveryCard
              content={journey.discovery}
              onPress={() => handleDiscoveryPress(item.journeyId)}
            />
          </View>
        );
      }

      const journey = getJourneyById(item.journeyId);
      const continueContent = getContinueJourneyContent(
        item.journeyId,
        getJourneyState(item.journeyId),
      );
      if (!journey || !continueContent) {
        return <View style={pageStyle} />;
      }

      return (
        <View style={[pageStyle, { paddingTop: headerInset }]}>
          <ContinueJourneyCard
            journeyTitle={journey.title}
            summary={continueContent.summary}
            nextStepTitle={continueContent.nextStepTitle}
            progressItems={continueContent.progressItems}
            contextMessage={continueContent.contextMessage}
            ctaLabel={continueContent.ctaLabel}
            onPress={() => handleContinuePress(item.journeyId)}
          />
        </View>
      );
    },
    [
      containerHeight,
      feedItems.length,
      getJourneyState,
      handleContinuePress,
      handleDiscoveryPress,
      headerInset,
      styles.page,
    ],
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<FeedItem> | null | undefined, index: number) => ({
      length: containerHeight,
      offset: containerHeight * index,
      index,
    }),
    [containerHeight],
  );

  const applyRestoredScroll = useCallback(() => {
    if (containerHeight <= 0 || feedItems.length === 0) {
      return;
    }

    const index = clampScrollIndex(restoreIndexRef.current, feedItems.length);
    currentIndexRef.current = index;

    if (index > 0) {
      listRef.current?.scrollToOffset({
        offset: index * containerHeight,
        animated: false,
      });
    }
  }, [containerHeight, feedItems.length]);

  useEffect(() => {
    if (!isRestoreReady || containerHeight <= 0) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      applyRestoredScroll();
    });

    return () => cancelAnimationFrame(frame);
  }, [applyRestoredScroll, containerHeight, feedItems.length, isRestoreReady]);

  const handleScrollToIndexFailed = useCallback(
    (info: { index: number; averageItemLength: number }) => {
      listRef.current?.scrollToOffset({
        offset: info.averageItemLength * info.index,
        animated: false,
      });
    },
    [],
  );

  if (containerHeight <= 0 || !isRestoreReady) {
    return (
      <View style={styles.container} onLayout={handleLayout}>
        <NavBar onBack={onBack} backLabel={backLabel} rightSlot={themeToggle} />
      </View>
    );
  }

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <FlatList
        ref={listRef}
        style={StyleSheet.absoluteFill}
        data={feedItems}
        keyExtractor={getFeedItemKey}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
      />

      <View style={styles.stickyHeader} pointerEvents="box-none">
        <NavBar onBack={onBack} backLabel={backLabel} rightSlot={themeToggle} />
        {headerExtension}
      </View>
    </View>
  );
}
