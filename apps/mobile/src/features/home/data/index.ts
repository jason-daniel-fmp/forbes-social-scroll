import type { Article } from '@forbes/types';

import homeArticlesData from './homeArticles.json';

export const homeArticles: Article[] = homeArticlesData as Article[];

export { homeNeedOptions, getHomeNeedOption } from './homeNeeds';
