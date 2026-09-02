import { advisorSem2026Theme, healthTheme } from '@forbes/theme';
import type { PathCardPalette } from '@forbes/ui';

import type { ActiveAppMode } from '../../../app/types';
import { homePathPalette } from '../../home/data/homeCardPalette';

export interface ModeOption {
  id: ActiveAppMode;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  palette: PathCardPalette;
}

const health = healthTheme.colors;
const advisorSem = advisorSem2026Theme.colors;

const navyPalette: PathCardPalette = {
  background: advisorSem.border,
  textPrimary: '#FFFFFF',
  textSecondary: '#D5DCF0',
  textMuted: '#B7C2E0',
  circle: '#24386F',
};

const sagePalette: PathCardPalette = {
  background: health.accentMuted,
  textPrimary: '#FFFFFF',
  textSecondary: '#D7EFE8',
  textMuted: '#B7D9D0',
  circle: '#27423D',
};

const calculatorPalette: PathCardPalette = {
  background: advisorSem.accent,
  textPrimary: '#FFFFFF',
  textSecondary: '#E8FFF6',
  textMuted: '#D4F5E8',
  circle: advisorSem.accentMuted,
};

const vitalsPalette: PathCardPalette = {
  background: health.accent,
  textPrimary: '#FFFFFF',
  textSecondary: '#E4EEEC',
  textMuted: '#C5D4D1',
  circle: health.accentMuted,
};

/**
 * Landing tiles pull from existing theme palettes plus distinct Advisor/Health surfaces
 * so new stubs never blend into the cream canvas.
 */
export const modeOptions: ModeOption[] = [
  {
    id: 'trends',
    eyebrow: 'Explore',
    title: 'Trends',
    description: 'Latest stories, insights & editor picks.',
    ctaLabel: 'Enter feed',
    palette: {
      background: health.divider,
      textPrimary: health.textPrimary,
      textSecondary: health.textSecondary,
      textMuted: health.textMuted,
      circle: health.accentMuted,
    },
  },
  {
    id: 'home',
    eyebrow: 'Advisor',
    title: 'Home',
    description: 'Buying, affordability, mortgage & moving.',
    ctaLabel: 'Start journey',
    palette: homePathPalette,
  },
  {
    id: 'financial-recovery',
    eyebrow: 'Advisor',
    title: 'Financial Recovery',
    description: 'Understand debt. Explore options. Move forward.',
    ctaLabel: 'Get started',
    palette: {
      background: '#C4A574',
      textPrimary: advisorSem.textPrimary,
      textSecondary: '#4A3F32',
      textMuted: '#6B5C4A',
      circle: advisorSem.textPrimary,
    },
  },
  {
    id: 'startup-llc',
    eyebrow: 'Start-up',
    title: 'LLC',
    description: 'Form and operate a limited liability company.',
    ctaLabel: 'Get started',
    palette: navyPalette,
  },
  {
    id: 'pet-insurance',
    eyebrow: 'Advisor',
    title: 'Pet Insurance',
    description: 'Compare coverage for veterinary care.',
    ctaLabel: 'Explore',
    palette: sagePalette,
  },
  {
    id: 'calculators',
    eyebrow: 'Tools',
    title: 'Calculators',
    description: 'Run the numbers before you decide.',
    ctaLabel: 'Open tools',
    palette: calculatorPalette,
  },
  {
    id: 'insurance-health-vitals',
    eyebrow: 'Health',
    title: 'Insurance Health Vitals',
    description: 'Check the signals that shape coverage.',
    ctaLabel: 'See vitals',
    palette: vitalsPalette,
  },
];

export function getModeOption(id: ActiveAppMode): ModeOption | undefined {
  return modeOptions.find((option) => option.id === id);
}
