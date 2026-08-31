import { useMemo } from 'react';

import { ScrollFeed } from '../../../shared/screens';
import { useJourney } from '../../../shared/journey';
import { buildFinancialRecoveryFeedItems } from '../feed/buildFeedItems';

interface FinancialRecoveryScreenProps {
  onBack: () => void;
}

export function FinancialRecoveryScreen({ onBack }: FinancialRecoveryScreenProps) {
  const { states, isHydrated } = useJourney();
  const feedItems = useMemo(() => buildFinancialRecoveryFeedItems(states), [states]);

  if (!isHydrated) {
    return null;
  }

  return (
    <ScrollFeed
      feedId="financial-recovery"
      feedItems={feedItems}
      onBack={onBack}
      backLabel="Modes"
    />
  );
}
