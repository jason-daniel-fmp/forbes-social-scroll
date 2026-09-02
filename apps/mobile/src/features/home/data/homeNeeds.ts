import type { HomeNeedOption } from '@forbes/types';

export const homeNeedOptions: HomeNeedOption[] = [
  {
    id: 'buying',
    shortTitle: 'Buy',
    title: 'Planning to buy a house',
    description: 'Affordability, financing, moving, and settling in — one guided path.',
  },
  {
    id: 'selling',
    shortTitle: 'Sell',
    title: 'Selling your house',
    description: 'Understand your options and what to expect when you sell.',
  },
  {
    id: 'moving',
    shortTitle: 'Move',
    title: 'Moving to a new place',
    description: 'Plan the move, timeline, and settling-in costs.',
  },
  {
    id: 'mortgage',
    shortTitle: 'Mortgage',
    title: 'Best home loans',
    description: 'Compare rates, terms, and what you can afford.',
  },
  {
    id: 'find',
    shortTitle: 'Find',
    title: 'Find a home',
    description: 'Search neighborhoods, listings, and next steps.',
  },
];

export function getHomeNeedOption(need: HomeNeedOption['id']): HomeNeedOption | undefined {
  return homeNeedOptions.find((option) => option.id === need);
}
