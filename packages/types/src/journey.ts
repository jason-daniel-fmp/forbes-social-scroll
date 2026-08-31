export type JourneyId = 'home' | 'financial-recovery' | 'business';

export type JourneyStatus = 'not-started' | 'active' | 'completed';

export type JourneyStepType = 'calculator' | 'widget' | 'journey' | 'content' | 'conversion';

/** Native-only progress label — never implies web completion. */
export type JourneyStepProgressLabel = 'not-started' | 'opened' | 'current' | 'next' | 'upcoming';

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  url: string;
  type: JourneyStepType;
  /** Groups steps into a lifecycle phase for progress UI. */
  phaseId?: string;
  /** Optional step ids that must be opened before this step surfaces in the feed. */
  surfaceAfterStepIds?: string[];
  /** When false the step is configured but not yet available to open. */
  enabled?: boolean;
}

export interface JourneyPhase {
  id: string;
  title: string;
  stepIds: string[];
}

export interface JourneyDiscoveryContent {
  title: string;
  description: string;
  ctaLabel: string;
}

export interface JourneyDefinition {
  id: JourneyId;
  title: string;
  description: string;
  discovery: JourneyDiscoveryContent;
  steps: JourneyStep[];
  /** Ordered lifecycle phases for progress rail UI. */
  phases?: JourneyPhase[];
  /** When false the journey exists in config but is not offered in the app yet. */
  enabled?: boolean;
}

export interface UserJourneyState {
  journeyId: JourneyId;
  status: JourneyStatus;
  currentStepId: string | null;
  openedStepIds: string[];
  startedAt: string | null;
  lastOpenedAt: string | null;
}
