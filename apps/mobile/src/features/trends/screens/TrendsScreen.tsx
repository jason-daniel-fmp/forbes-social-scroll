import { useMemo } from 'react';

import { ScrollFeed } from '../../../shared/screens';
import { buildTrendsFeedItems } from '../feed/buildFeedItems';

interface TrendsScreenProps {
  onBack: () => void;
}

export function TrendsScreen({ onBack }: TrendsScreenProps) {
  const feedItems = useMemo(() => buildTrendsFeedItems(), []);

  return <ScrollFeed feedId="trends" feedItems={feedItems} onBack={onBack} backLabel="Modes" />;
}
