import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { useTheme } from '@forbes/theme';
import type { ArticleInteractions } from '@forbes/types';

import { formatInteractionCount } from './formatInteractionCount';
import { createInteractionsStyles } from './Interactions.styles';

interface InteractionsProps {
  interactions: ArticleInteractions;
}

interface InteractionItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  count: number;
  isLast?: boolean;
  label: string;
}

function InteractionItem({ icon, count, isLast = false, label }: InteractionItemProps) {
  const { theme } = useTheme();
  const styles = createInteractionsStyles(theme);

  return (
    <View style={[styles.item, isLast && styles.itemLast]} accessibilityLabel={`${label} ${count}`}>
      <Ionicons
        name={icon}
        size={theme.typography.interactionIcon}
        color={theme.colors.textPrimary}
      />
      <Text style={styles.count}>{formatInteractionCount(count)}</Text>
    </View>
  );
}

export function Interactions({ interactions }: InteractionsProps) {
  const { theme } = useTheme();
  const styles = createInteractionsStyles(theme);

  return (
    <View style={styles.rail}>
      <InteractionItem icon="heart-outline" count={interactions.likes} label="Likes" />
      <InteractionItem icon="arrow-redo-outline" count={interactions.shares} label="Shares" />
      <InteractionItem
        icon="bookmark-outline"
        count={interactions.bookmarks}
        label="Bookmarks"
        isLast
      />
    </View>
  );
}
