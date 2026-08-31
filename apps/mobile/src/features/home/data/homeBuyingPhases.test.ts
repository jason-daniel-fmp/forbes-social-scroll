import { describe, expect, it } from 'vitest';

import { homeBuyingPhaseOptions, getHomeBuyingPhaseTools } from './homeBuyingPhases';

describe('home buying phase tools', () => {
  it('maps every buying phase to at least one https tool', () => {
    for (const phase of homeBuyingPhaseOptions) {
      const tools = getHomeBuyingPhaseTools(phase.id);
      expect(tools.length).toBeGreaterThan(0);
      for (const tool of tools) {
        expect(tool.url.startsWith('https://www.forbes.com/')).toBe(true);
      }
    }
  });

  it('opens Plan to the affordability calculator', () => {
    const tools = getHomeBuyingPhaseTools('plan');
    expect(tools).toHaveLength(1);
    expect(tools[0]?.id).toBe('affordability');
  });

  it('lists both Finance calculators', () => {
    const tools = getHomeBuyingPhaseTools('finance');
    expect(tools.map((tool) => tool.id)).toEqual(['mortgage', 'home-loan']);
  });
});
