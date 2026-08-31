import type { HomeNeedOption } from '@forbes/types';

export const homeNeedOptions: HomeNeedOption[] = [
  {
    id: 'buying',
    title: 'Planning to buy a house',
    description: 'Affordability, financing, moving, and settling in — one guided path.',
  },
  {
    id: 'selling',
    title: 'Selling a home',
    description: 'Understand your options and what to expect when you sell.',
  },
  {
    id: 'renting',
    title: 'Renting a home',
    description: 'Find clarity on budgets, neighborhoods, and next steps.',
  },
];

export function getHomeNeedOption(need: HomeNeedOption['id']): HomeNeedOption | undefined {
  return homeNeedOptions.find((option) => option.id === need);
}
