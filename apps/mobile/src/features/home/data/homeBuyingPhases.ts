import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type HomeBuyingPhaseId = 'plan' | 'finance' | 'move' | 'settle';

export interface HomeBuyingPhaseOption {
  id: HomeBuyingPhaseId;
  title: string;
  subtitle: string;
  icon: ComponentProps<typeof Ionicons>['name'];
}

export const homeBuyingPhaseOptions: HomeBuyingPhaseOption[] = [
  {
    id: 'plan',
    title: 'Plan',
    subtitle: 'How much house can I afford?',
    icon: 'calculator-outline',
  },
  {
    id: 'finance',
    title: 'Finance',
    subtitle: 'Mortgage & loan calculators',
    icon: 'cash-outline',
  },
  {
    id: 'move',
    title: 'Move',
    subtitle: 'Packers & movers plan',
    icon: 'bus-outline',
  },
  {
    id: 'settle',
    title: 'Settle In',
    subtitle: 'Home decor inspiration',
    icon: 'color-palette-outline',
  },
];

export function getHomeBuyingPhaseOption(
  phaseId: HomeBuyingPhaseId,
): HomeBuyingPhaseOption | undefined {
  return homeBuyingPhaseOptions.find((option) => option.id === phaseId);
}
