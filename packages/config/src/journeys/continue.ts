import type { JourneyId, JourneyStepProgressLabel, UserJourneyState } from '@forbes/types';

import { getJourneyById, getJourneyStep } from './registry';
import { getJourneyProgressSteps, getRecommendedStep } from './state';

export interface ContinueJourneyContent {
  summary: string;
  nextStepTitle: string;
  progressItems: Array<{ title: string; label: JourneyStepProgressLabel }>;
  contextMessage?: string;
  ctaLabel: string;
}

const HOME_STEP_CONTEXT: Partial<
  Record<string, { contextMessage: string; ctaLabel: string }>
> = {
  mortgage: {
    contextMessage: "You've explored affordability. Ready to estimate your monthly payment?",
    ctaLabel: 'Calculate payment',
  },
  'home-loan': {
    contextMessage: "You've looked at mortgage payments. Explore home improvement loan options?",
    ctaLabel: 'Explore loans',
  },
  'packers-movers': {
    contextMessage: "You're financially prepared. Ready to plan your move?",
    ctaLabel: 'Plan my move',
  },
  'home-decor': {
    contextMessage: 'Moving planned? Get inspired for your new space.',
    ctaLabel: 'Browse trends',
  },
};

export function getContinueJourneyContent(
  journeyId: JourneyId,
  state: UserJourneyState,
): ContinueJourneyContent | null {
  const journey = getJourneyById(journeyId);
  const recommended = getRecommendedStep(journeyId, state);

  if (!journey || !recommended || state.status !== 'active') {
    return null;
  }

  const progressItems = getJourneyProgressSteps(journey, state).map(({ step, label }) => ({
    title: step.title,
    label,
  }));

  const defaultSummary =
    journeyId === 'financial-recovery'
      ? "You've started exploring your financial situation."
      : "You're on your home buying journey.";
  const summary = defaultSummary;

  let contextMessage: string | undefined;
  let ctaLabel = 'Continue';

  const homeStepContext = journeyId === 'home' ? HOME_STEP_CONTEXT[recommended.id] : undefined;
  if (homeStepContext) {
    contextMessage = homeStepContext.contextMessage;
    ctaLabel = homeStepContext.ctaLabel;
  }

  if (recommended.id === 'explore-options' && journeyId === 'financial-recovery') {
    contextMessage =
      "You've assessed your situation. Ready to explore debt relief paths that may fit you?";
    ctaLabel = 'Explore my options';
  }

  if (recommended.type === 'journey' && journeyId === 'financial-recovery') {
    ctaLabel = 'Explore my options';
  }

  const lastOpenedStepId = state.openedStepIds[state.openedStepIds.length - 1];
  const lastOpened = lastOpenedStepId ? getJourneyStep(journeyId, lastOpenedStepId) : undefined;
  const summaryWithContext = lastOpened ? `You were exploring: ${lastOpened.title}` : summary;

  return {
    summary: summaryWithContext,
    nextStepTitle: recommended.title,
    progressItems,
    contextMessage,
    ctaLabel,
  };
}
