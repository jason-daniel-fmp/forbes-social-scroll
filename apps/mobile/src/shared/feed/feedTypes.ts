import type { Article, JourneyId } from '@forbes/types';

export type FeedItem =
  | { kind: 'article'; article: Article }
  | { kind: 'journey-discovery'; journeyId: JourneyId }
  | { kind: 'continue-journey'; journeyId: JourneyId };

export function getFeedItemKey(item: FeedItem): string {
  switch (item.kind) {
    case 'article':
      return item.article.id;
    case 'journey-discovery':
    case 'continue-journey':
      return `journey-slot-${item.journeyId}`;
  }
}
