import type {
  JourneyDefinition,
  JourneyPhase,
  JourneyStepProgressLabel,
  UserJourneyState,
} from '@forbes/types';

import { getJourneyProgressSteps } from './state';

export interface JourneyProgressSheetItem {
  stepId: string;
  title: string;
  label: JourneyStepProgressLabel;
}

export interface JourneyProgressSheetPhaseGroup {
  phaseId: string;
  title: string;
  items: JourneyProgressSheetItem[];
}

export function getJourneyProgressSheetPhases(
  journey: JourneyDefinition,
  state: UserJourneyState,
): JourneyProgressSheetPhaseGroup[] {
  if (!journey.phases?.length) {
    return [];
  }

  const progressByStepId = new Map(
    getJourneyProgressSteps(journey, state).map(({ step, label }) => [
      step.id,
      { stepId: step.id, title: step.title, label },
    ]),
  );

  return journey.phases
    .map((phase: JourneyPhase) => ({
      phaseId: phase.id,
      title: phase.title,
      items: phase.stepIds
        .map((stepId) => progressByStepId.get(stepId))
        .filter((item): item is JourneyProgressSheetItem => item !== undefined),
    }))
    .filter((group) => group.items.length > 0);
}
