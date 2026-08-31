import type { FeedItem } from '../../../shared/feed';
import { trendsArticles } from '../data';

/** Trends feed — general articles only, no journey cards. */
export function buildTrendsFeedItems(): FeedItem[] {
  return trendsArticles.map((article) => ({ kind: 'article', article }));
}
