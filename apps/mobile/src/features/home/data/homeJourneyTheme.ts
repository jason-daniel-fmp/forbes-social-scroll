import { advisorSem2026Theme, toneScale } from '@forbes/theme';
import type { PathCardPalette } from '@forbes/ui';
import type { HomeNeed } from '@forbes/types';

import type { HomeBuyingPhaseId } from './homeBuyingPhases';

/** Advisor SEM dark green — the Home journey base. */
export const HOME_BASE_COLOR = advisorSem2026Theme.colors.accentMuted;

const NEED_TONE_STEPS = [-0.72, -0.42, 0, 0.28, 0.48] as const;
const PHASE_TONE_STEPS = [-0.55, -0.22, 0.12, 0.4] as const;
const TOOL_TONE_STEPS = [-0.6, -0.28, 0.08, 0.36] as const;

const needPalettes = toneScale(HOME_BASE_COLOR, NEED_TONE_STEPS) as PathCardPalette[];
const phasePalettes = toneScale(HOME_BASE_COLOR, PHASE_TONE_STEPS) as PathCardPalette[];
const toolPalettes = toneScale(HOME_BASE_COLOR, TOOL_TONE_STEPS) as PathCardPalette[];

const NEED_TONE_INDEX: Record<HomeNeed, number> = {
  buying: 2,
  selling: 1,
  moving: 3,
  mortgage: 0,
  find: 4,
};

const PHASE_TONE_INDEX: Record<HomeBuyingPhaseId, number> = {
  plan: 0,
  finance: 1,
  move: 2,
  settle: 3,
};

export const homePathPalette: PathCardPalette = needPalettes[NEED_TONE_INDEX.buying];

export const homeJourneyCanvas = '#E7F3EF';

export function paletteForHomeNeed(need: HomeNeed): PathCardPalette {
  return needPalettes[NEED_TONE_INDEX[need]];
}

export function paletteForHomePhase(phaseId: HomeBuyingPhaseId): PathCardPalette {
  return phasePalettes[PHASE_TONE_INDEX[phaseId]];
}

export function paletteForHomeTool(index: number): PathCardPalette {
  return toolPalettes[Math.abs(index) % toolPalettes.length];
}
