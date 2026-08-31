import type {
  JourneyDefinition,
  JourneyId,
  JourneyStep,
  JourneyStepProgressLabel,
  UserJourneyState,
} from '@forbes/types';

import { getFirstOpenableStep, getJourneyById, getJourneyStep, isStepOpenable } from './registry';

export function createInitialJourneyState(journeyId: JourneyId): UserJourneyState {
  return {
    journeyId,
    status: 'not-started',
    currentStepId: null,
    openedStepIds: [],
    startedAt: null,
    lastOpenedAt: null,
  };
}

export function startJourney(
  state: UserJourneyState,
  journey: JourneyDefinition,
  now: string = new Date().toISOString(),
): UserJourneyState {
  const firstStep = getFirstOpenableStep(journey);
  if (!firstStep) {
    return state;
  }

  return {
    ...state,
    journeyId: journey.id,
    status: 'active',
    currentStepId: firstStep.id,
    startedAt: now,
    lastOpenedAt: now,
  };
}

export function markStepOpened(
  state: UserJourneyState,
  stepId: string,
  now: string = new Date().toISOString(),
): UserJourneyState {
  const openedStepIds = state.openedStepIds.includes(stepId)
    ? state.openedStepIds
    : [...state.openedStepIds, stepId];

  return {
    ...state,
    status: 'active',
    currentStepId: stepId,
    openedStepIds,
    startedAt: state.startedAt ?? now,
    lastOpenedAt: now,
  };
}

export function getNextOpenableStep(
  journeyId: JourneyId,
  state: UserJourneyState,
): JourneyStep | undefined {
  const journey = getJourneyById(journeyId);
  if (!journey) {
    return undefined;
  }

  const opened = new Set(state.openedStepIds);

  for (const step of journey.steps) {
    if (!isStepOpenable(step)) {
      continue;
    }
    if (!opened.has(step.id)) {
      return step;
    }
  }

  return undefined;
}

export function getRecommendedStep(
  journeyId: JourneyId,
  state: UserJourneyState,
): JourneyStep | undefined {
  if (state.status === 'not-started') {
    const journey = getJourneyById(journeyId);
    return journey ? getFirstOpenableStep(journey) : undefined;
  }

  if (state.currentStepId) {
    const current = getJourneyStep(journeyId, state.currentStepId);
    if (current && isStepOpenable(current) && !state.openedStepIds.includes(current.id)) {
      return current;
    }
  }

  return getNextOpenableStep(journeyId, state);
}

export function getStepProgressLabel(
  step: JourneyStep,
  state: UserJourneyState,
  recommendedStepId: string | null,
): JourneyStepProgressLabel {
  if (!isStepOpenable(step)) {
    return 'upcoming';
  }

  if (state.openedStepIds.includes(step.id)) {
    return 'opened';
  }

  if (recommendedStepId === step.id) {
    return state.openedStepIds.length === 0 ? 'current' : 'next';
  }

  return 'upcoming';
}

export function getJourneyProgressSteps(
  journey: JourneyDefinition,
  state: UserJourneyState,
): Array<{ step: JourneyStep; label: JourneyStepProgressLabel }> {
  const recommended = getRecommendedStep(journey.id, state);
  const recommendedStepId = recommended?.id ?? null;

  return journey.steps
    .filter(isStepOpenable)
    .map((step) => ({
      step,
      label: getStepProgressLabel(step, state, recommendedStepId),
    }));
}
