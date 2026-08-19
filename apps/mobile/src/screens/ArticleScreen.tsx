import { View } from 'react-native';

import { useTheme } from '@forbes/theme';
import { ArticleRow1, ArticleRow2, ArticleRow3, SwipeHint } from '@forbes/ui';
import type { Article } from '@forbes/types';

import { getAuthorAvatar } from '../assets/authorAvatars';
import { createArticleScreenStyles } from './ArticleScreen.styles';

interface ArticleScreenProps {
  article: Article;
  headerInset: number;
  isLast?: boolean;
}

export function ArticleScreen({ article, headerInset, isLast = false }: ArticleScreenProps) {
  const { theme } = useTheme();
  const styles = createArticleScreenStyles(theme);
  const avatarSource = getAuthorAvatar(article.editor.avatarKey);

  return (
    <View style={[styles.screen, { paddingTop: headerInset }]}>
      <View style={styles.body}>
        <ArticleRow1
          title={article.title}
          subtitle={article.subtitle}
          editor={article.editor}
          avatarSource={avatarSource}
        />
        <ArticleRow2 paragraphs={article.paragraphs} interactions={article.interactions} />
        <ArticleRow3 cards={article.cards} />
      </View>
      <SwipeHint message={isLast ? "You're all caught up" : 'Swipe ↑ for next article'} />
    </View>
  );
}
