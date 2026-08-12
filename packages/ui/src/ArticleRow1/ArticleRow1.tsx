import { View, type ImageSourcePropType } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { ArticleEditor } from '@forbes/types';

import { AuthorBlock } from '../AuthorBlock';
import { TitleBlock } from '../TitleBlock';
import { createArticleRow1Styles } from './ArticleRow1.styles';

interface ArticleRow1Props {
  title: string;
  subtitle: string;
  editor: ArticleEditor;
  avatarSource?: ImageSourcePropType;
}

export function ArticleRow1({ title, subtitle, editor, avatarSource }: ArticleRow1Props) {
  const { theme } = useTheme();
  const styles = createArticleRow1Styles(theme);

  return (
    <View style={styles.row}>
      <View style={styles.colTitle}>
        <TitleBlock title={title} subtitle={subtitle} />
      </View>
      <View style={styles.colAuthor}>
        <AuthorBlock name={editor.name} role={editor.role} avatarSource={avatarSource} />
      </View>
    </View>
  );
}
