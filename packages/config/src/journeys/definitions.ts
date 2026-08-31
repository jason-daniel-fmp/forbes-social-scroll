import type { JourneyDefinition } from '@forbes/types';

import { homeJourney } from './definitions/home-buying';
import { placeholderUrl } from './placeholders';

export { HOME_BUYING_URLS, homeBuyingPhases, homeJourney } from './definitions/home-buying';

export const financialRecoveryJourney: JourneyDefinition = {
  id: 'financial-recovery',
  title: 'Financial Recovery Journey',
  description: 'Understand your debt situation and explore relief options.',
  enabled: true,
  discovery: {
    title: 'Feeling overwhelmed by debt?',
    description: 'Start by understanding your situation.',
    ctaLabel: 'See where I stand',
  },
  steps: [
    {
      id: 'debt-assessment',
      title: 'Assess your debt situation',
      description: 'Open the debt assessment calculator.',
      url: placeholderUrl('financial-recovery/debt-assessment'),
      type: 'calculator',
    },
    {
      id: 'explore-options',
      title: 'Explore your available options',
      description: 'Review debt relief paths that may fit your situation.',
      url: placeholderUrl('financial-recovery/debt-options'),
      type: 'journey',
    },
    {
      id: 'conversion',
      title: 'Connect with a debt relief partner',
      description: 'Higher-intent conversion experience.',
      url: '',
      type: 'conversion',
      enabled: false,
    },
  ],
};

/** Configured for a later phase — not enabled in the app yet. */
export const businessJourney: JourneyDefinition = {
  id: 'business',
  title: 'Business / LLC Journey',
  description: 'Explore starting a business and forming an LLC.',
  enabled: false,
  discovery: {
    title: 'Thinking about starting a business?',
    description: "We'll help you figure out your next step.",
    ctaLabel: 'Explore starting a business',
  },
  steps: [
    {
      id: 'explore',
      title: 'Explore business structure options',
      description: 'Learn about LLCs and other structures.',
      url: placeholderUrl('business/structure-explorer'),
      type: 'widget',
    },
    {
      id: 'understand-llc',
      title: 'Understand LLC basics',
      description: 'Review what forming an LLC involves.',
      url: placeholderUrl('business/llc-information'),
      type: 'journey',
    },
    {
      id: 'start-llc',
      title: 'Start your LLC journey',
      description: 'Higher-intent LLC formation experience.',
      url: placeholderUrl('business/llc-journey'),
      type: 'journey',
    },
    {
      id: 'conversion',
      title: 'Business formation conversion',
      description: 'Higher-intent conversion experience.',
      url: '',
      type: 'conversion',
      enabled: false,
    },
  ],
};

export const journeyDefinitions: JourneyDefinition[] = [
  homeJourney,
  financialRecoveryJourney,
  businessJourney,
];
