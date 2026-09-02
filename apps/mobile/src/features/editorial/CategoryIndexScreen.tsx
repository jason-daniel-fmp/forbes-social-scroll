import { View } from 'react-native';

import { useTheme } from '@forbes/theme';
import { EditorialIndex, NavBar } from '@forbes/ui';
import type { EditorialIndexDocument } from '@forbes/types';

import { createCategoryIndexScreenStyles } from './CategoryIndexScreen.styles';
import { SwipeBackView } from './SwipeBackView';

interface CategoryIndexScreenProps {
  document: EditorialIndexDocument;
  onBack: () => void;
  onCommit: (itemId: string) => void;
  backLabel?: string;
}

export function CategoryIndexScreen({
  document,
  onBack,
  onCommit,
  backLabel = 'Modes',
}: CategoryIndexScreenProps) {
  const { theme } = useTheme();
  const styles = createCategoryIndexScreenStyles(theme);

  return (
    <SwipeBackView onBack={onBack}>
      <View style={styles.container}>
        <NavBar onBack={onBack} backLabel={backLabel} />
        <EditorialIndex
          displayTitle={document.displayTitle}
          items={document.items}
          onCommit={onCommit}
        />
      </View>
    </SwipeBackView>
  );
}
