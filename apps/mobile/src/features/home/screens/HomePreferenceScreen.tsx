import { CategoryIndexScreen } from '../../editorial';
import { homeEditorialIndex } from '../data/homeEditorialIndex';

interface HomePreferenceScreenProps {
  onSelect: (itemId: string) => void;
  onBack: () => void;
}

export function HomePreferenceScreen({ onSelect, onBack }: HomePreferenceScreenProps) {
  return (
    <CategoryIndexScreen document={homeEditorialIndex} onBack={onBack} onCommit={onSelect} />
  );
}
