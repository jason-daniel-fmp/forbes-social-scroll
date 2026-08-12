import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type LayoutChangeEvent,
  type ListRenderItem,
} from 'react-native';

import { useTheme } from '@forbes/theme';
import { Header } from '@forbes/ui';
import type { Article } from '@forbes/types';

import { articles } from '../data';
import { ArticleScreen } from './ArticleScreen';
import { createArticleFeedStyles } from './ArticleFeed.styles';

export function ArticleFeed() {
  const { theme, themeName, toggleTheme } = useTheme();
  const styles = createArticleFeedStyles(theme);
  const [containerHeight, setContainerHeight] = useState(0);

  const headerHeight = useMemo(
    () => containerHeight * (theme.layout.headerFlex / 100),
    [containerHeight, theme.layout.headerFlex],
  );

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0) {
      setContainerHeight(height);
    }
  }, []);

  const renderItem: ListRenderItem<Article> = useCallback(
    ({ item, index }) => (
      <View style={[styles.page, { height: containerHeight }]}>
        <ArticleScreen
          article={item}
          headerInset={headerHeight}
          isLast={index === articles.length - 1}
        />
      </View>
    ),
    [containerHeight, headerHeight, styles.page],
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<Article> | null | undefined, index: number) => ({
      length: containerHeight,
      offset: containerHeight * index,
      index,
    }),
    [containerHeight],
  );

  if (containerHeight <= 0) {
    return <View style={styles.container} onLayout={handleLayout} />;
  }

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <FlatList
        style={StyleSheet.absoluteFill}
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews
      />

      <View style={[styles.stickyHeader, { height: headerHeight }]}>
        <Header />
      </View>

      <TouchableOpacity
        style={[styles.themeToggle, { top: headerHeight - 36 }]}
        onPress={toggleTheme}
        accessibilityRole="button"
      >
        <Text style={styles.themeToggleText}>{themeName}</Text>
      </TouchableOpacity>
    </View>
  );
}
