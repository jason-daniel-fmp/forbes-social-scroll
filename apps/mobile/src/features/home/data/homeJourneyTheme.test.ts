import { describe, expect, it } from 'vitest';

import { isLightTone } from '@forbes/theme';

import { paletteForHomeNeed } from './homeJourneyTheme';

describe('home journey tone palettes', () => {
  it('uses dark text on light tiles and light text on dark tiles', () => {
    for (const need of ['buying', 'selling', 'moving', 'mortgage', 'find'] as const) {
      const palette = paletteForHomeNeed(need);
      const light = isLightTone(palette.background);

      if (light) {
        expect(isLightTone(palette.textPrimary)).toBe(false);
      } else {
        expect(isLightTone(palette.textPrimary)).toBe(true);
      }
    }
  });
});
