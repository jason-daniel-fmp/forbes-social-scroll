import type { JourneyDefinition, JourneyId, JourneyStep } from '@forbes/types';

import { journeyDefinitions } from './definitions';

const journeyById = new Map<JourneyId, JourneyDefinition>(
  journeyDefinitions.map((journey) => [journey.id, journey]),
);

export function getJourneyById(journeyId: JourneyId): JourneyDefinition | undefined {
  return journeyById.get(journeyId);
}

export function getEnabledJourneys(): JourneyDefinition[] {
  return journeyDefinitions.filter((journey) => journey.enabled !== false);
}

export function getJourneyStep(
  journeyId: JourneyId,
  stepId: string,
): JourneyStep | undefined {
  const journey = getJourneyById(journeyId);
  return journey?.steps.find((step) => step.id === stepId);
}

export function isStepOpenable(step: JourneyStep): boolean {
  if (step.enabled === false) {
    return false;
  }
  return step.url.trim().length > 0;
}

export function getFirstOpenableStep(journey: JourneyDefinition): JourneyStep | undefined {
  return journey.steps.find(isStepOpenable);
}
