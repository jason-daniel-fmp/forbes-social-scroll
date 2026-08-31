import type { JourneyDefinition, UserJourneyState } from '@forbes/types';

import { getJourneyStep, isStepOpenable } from './registry';

export interface PhaseProgressItem {
  phaseId: string;
  title: string;
  openedCount: number;
  totalCount: number;
  isComplete: boolean;
  isCurrent: boolean;
}

export interface JourneyPhaseProgressSummary {
  phases: PhaseProgressItem[];
  overallOpened: number;
  overallTotal: number;
}

export function getJourneyPhaseProgress(
  journey: JourneyDefinition,
  state: UserJourneyState,
): JourneyPhaseProgressSummary | null {
  if (!journey.phases?.length) {
    return null;
  }

  const opened = new Set(state.openedStepIds);
  let overallOpened = 0;
  let overallTotal = 0;
  let currentPhaseFound = false;

  const phases = journey.phases.map((phase) => {
    const openableStepIds = phase.stepIds.filter((stepId) => {
      const step = getJourneyStep(journey.id, stepId);
      return step && isStepOpenable(step);
    });
    const openedCount = openableStepIds.filter((stepId) => opened.has(stepId)).length;
    const totalCount = openableStepIds.length;

    overallOpened += openedCount;
    overallTotal += totalCount;

    const isComplete = totalCount > 0 && openedCount >= totalCount;
    const isCurrent = !currentPhaseFound && !isComplete;
    if (isCurrent) {
      currentPhaseFound = true;
    }

    return {
      phaseId: phase.id,
      title: phase.title,
      openedCount,
      totalCount,
      isComplete,
      isCurrent,
    };
  });

  return { phases, overallOpened, overallTotal };
}
