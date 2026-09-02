import type { EditorialIndexDocument } from '@forbes/types';

import type { Article } from '@forbes/types';

import type { HomeBuyingPhaseId } from './homeBuyingPhases';
import homeArticlesData from './homeArticles.json';

const homeArticleCount = (homeArticlesData as Article[]).length;

export type HomeEditorialDestination =
  | { kind: 'phase'; phaseId: HomeBuyingPhaseId }
  | { kind: 'placeholder' };

export const homeEditorialDestinations: Record<string, HomeEditorialDestination> = {
  buying: { kind: 'phase', phaseId: 'plan' },
  afford: { kind: 'phase', phaseId: 'plan' },
  mortgages: { kind: 'phase', phaseId: 'finance' },
  moving: { kind: 'phase', phaseId: 'move' },
  selling: { kind: 'placeholder' },
  find: { kind: 'placeholder' },
};

export const homeEditorialIndex: EditorialIndexDocument = {
  id: 'home',
  title: 'Home & Property',
  displayTitle: ['HOME', '& PROPERTY'],
  items: [
    {
      id: 'buying',
      index: 1,
      title: 'Buying a home',
      displayTitle: ['BUYING', 'A HOME'],
      description: 'Listings · Offers · Closing',
      articleCount: homeArticleCount,
      toolCount: 1,
    },
    {
      id: 'afford',
      index: 2,
      title: 'Affording a home',
      displayTitle: ['AFFORDING', 'A HOME'],
      description: 'Budget · Payments · Planning',
      articleCount: homeArticleCount,
      toolCount: 1,
    },
    {
      id: 'mortgages',
      index: 3,
      title: 'Mortgages',
      description: 'Rates · Terms · Calculators',
      toolCount: 2,
    },
    {
      id: 'moving',
      index: 4,
      title: 'Moving',
      description: 'Timeline · Movers · Settling in',
      toolCount: 1,
    },
    {
      id: 'selling',
      index: 5,
      title: 'Selling',
      description: 'Pricing · Timing · Next steps',
    },
    {
      id: 'find',
      index: 6,
      title: 'Find',
      description: 'Neighborhoods · Listings · Search',
    },
  ],
};
