import type { JourneyDefinition, JourneyId, JourneyStep, UserJourneyState } from '@forbes/types';

import { getJourneyById, getJourneyStep, isStepOpenable } from './registry';
import { getRecommendedStep } from './state';

export function canSurfaceStep(
  journey: JourneyDefinition,
  step: JourneyStep,
  state: UserJourneyState,
): boolean {
  if (step.surfaceAfterStepIds?.length) {
    for (const requiredStepId of step.surfaceAfterStepIds) {
      if (!state.openedStepIds.includes(requiredStepId)) {
        return false;
      }
    }
  }

  if (!journey.phases?.length || !step.phaseId) {
    return true;
  }

  const phaseIndex = journey.phases.findIndex((phase) => phase.stepIds.includes(step.id));
  if (phaseIndex <= 0) {
    return true;
  }

  for (let index = 0; index < phaseIndex; index += 1) {
    const phase = journey.phases[index];
    for (const stepId of phase.stepIds) {
      const phaseStep = getJourneyStep(journey.id, stepId);
      if (phaseStep && isStepOpenable(phaseStep) && !state.openedStepIds.includes(stepId)) {
        return false;
      }
    }
  }

  return true;
}

export function getSurfaceableRecommendedStep(
  journeyId: JourneyId,
  state: UserJourneyState,
): JourneyStep | undefined {
  const journey = getJourneyById(journeyId);
  const recommended = getRecommendedStep(journeyId, state);

  if (!journey || !recommended) {
    return undefined;
  }

  if (!canSurfaceStep(journey, recommended, state)) {
    return undefined;
  }

  return recommended;
}

export function shouldSurfaceJourneyInFeed(journeyId: JourneyId, state: UserJourneyState): boolean {
  if (state.status === 'not-started') {
    return true;
  }

  if (state.status !== 'active') {
    return false;
  }

  return getSurfaceableRecommendedStep(journeyId, state) !== undefined;
}
