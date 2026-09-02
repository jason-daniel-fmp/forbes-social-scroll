export type HomeNeed = 'buying' | 'selling' | 'moving' | 'mortgage' | 'find';

export const HOME_NEEDS: readonly HomeNeed[] = [
  'buying',
  'selling',
  'moving',
  'mortgage',
  'find',
];

export interface HomeNeedOption {
  id: HomeNeed;
  shortTitle: string;
  title: string;
  description: string;
}

export interface HomePreference {
  need: HomeNeed;
  selectedAt: string;
}

export function isHomeNeed(value: unknown): value is HomeNeed {
  return typeof value === 'string' && HOME_NEEDS.includes(value as HomeNeed);
}
