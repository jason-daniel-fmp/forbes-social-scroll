import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

import { homeJourney } from '@forbes/config';

export type HomeBuyingPhaseId = 'plan' | 'finance' | 'move' | 'settle';

export interface HomeBuyingPhaseTool {
  id: string;
  title: string;
  description: string;
  url: string;
}

export interface HomeBuyingPhaseOption {
  id: HomeBuyingPhaseId;
  title: string;
  subtitle: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  tools: HomeBuyingPhaseTool[];
}

function toolFromHomeStep(stepId: string): HomeBuyingPhaseTool {
  const step = homeJourney.steps.find((item) => item.id === stepId);
  if (!step?.url) {
    throw new Error(`Home buying step "${stepId}" is missing a URL`);
  }

  return {
    id: step.id,
    title: step.title,
    description: step.description,
    url: step.url,
  };
}

export const homeBuyingPhaseOptions: HomeBuyingPhaseOption[] = [
  {
    id: 'plan',
    title: 'Plan',
    subtitle: 'How much house can I afford?',
    icon: 'calculator-outline',
    tools: [toolFromHomeStep('affordability')],
  },
  {
    id: 'finance',
    title: 'Finance',
    subtitle: 'Mortgage & loan calculators',
    icon: 'cash-outline',
    tools: [toolFromHomeStep('mortgage'), toolFromHomeStep('home-loan')],
  },
  {
    id: 'move',
    title: 'Move',
    subtitle: 'Packers & movers plan',
    icon: 'bus-outline',
    tools: [toolFromHomeStep('packers-movers')],
  },
  {
    id: 'settle',
    title: 'Settle In',
    subtitle: 'Home decor inspiration',
    icon: 'color-palette-outline',
    tools: [toolFromHomeStep('home-decor')],
  },
];

export function getHomeBuyingPhaseOption(
  phaseId: HomeBuyingPhaseId,
): HomeBuyingPhaseOption | undefined {
  return homeBuyingPhaseOptions.find((option) => option.id === phaseId);
}

export function getHomeBuyingPhaseTools(phaseId: HomeBuyingPhaseId): HomeBuyingPhaseTool[] {
  return getHomeBuyingPhaseOption(phaseId)?.tools ?? [];
}
