import type { ActiveAppMode } from '../../../app/types';

export interface ModeOption {
  id: ActiveAppMode;
  eyebrow: string;
  title: string;
  description: string;
}

export const modeOptions: ModeOption[] = [
  {
    id: 'trends',
    eyebrow: 'Forbes',
    title: 'Trends',
    description: 'Scroll the latest stories, insights, and editor picks.',
  },
  {
    id: 'home',
    eyebrow: 'Advisor',
    title: 'Home',
    description: 'Tell us your goal and explore calculators, guides, and next steps.',
  },
  {
    id: 'financial-recovery',
    eyebrow: 'Advisor',
    title: 'Financial Recovery',
    description: 'Understand your debt situation and explore relief options.',
  },
];
