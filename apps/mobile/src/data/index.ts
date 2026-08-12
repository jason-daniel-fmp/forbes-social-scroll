import type { Article } from '@forbes/types';

import articlesData from './articles.json';

export const articles: Article[] = articlesData as Article[];

export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id);
}
