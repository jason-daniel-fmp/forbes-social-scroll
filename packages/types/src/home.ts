export type HomeNeed = 'buying' | 'selling' | 'renting';

export interface HomeNeedOption {
  id: HomeNeed;
  title: string;
  description: string;
}

export interface HomePreference {
  need: HomeNeed;
  selectedAt: string;
}
