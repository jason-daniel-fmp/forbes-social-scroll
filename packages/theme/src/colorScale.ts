export interface TonePalette {
  background: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  circle: string;
}

const DARK_INK = '#1E2125';
const LIGHT_INK = '#FFFFFF';
const LUMINANCE_THRESHOLD = 0.45;

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 3
    ? normalized.split('').map((part) => part + part).join('')
    : normalized;

  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((channel) => Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, '0'))
    .join('')}`;
}

export function mixHex(base: string, target: string, amount: number): string {
  const from = hexToRgb(base);
  const to = hexToRgb(target);
  const t = Math.max(0, Math.min(1, amount));

  return rgbToHex(
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t,
    from[2] + (to[2] - from[2]) * t,
  );
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const scaled = channel / 255;
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function isLightTone(hex: string): boolean {
  return relativeLuminance(hex) >= LUMINANCE_THRESHOLD;
}

/** Negative amount lightens toward white; positive amount darkens toward near-black. */
export function shiftTone(base: string, amount: number): string {
  if (amount === 0) {
    return base.startsWith('#') ? base.toUpperCase() : `#${base.toUpperCase()}`;
  }

  return amount < 0 ? mixHex(base, '#FFFFFF', Math.abs(amount)) : mixHex(base, '#041F1A', amount);
}

export function paletteFromTone(background: string): TonePalette {
  const light = isLightTone(background);
  const textPrimary = light ? DARK_INK : LIGHT_INK;
  const textSecondary = light ? mixHex(DARK_INK, background, 0.35) : mixHex(LIGHT_INK, background, 0.28);
  const textMuted = light ? mixHex(DARK_INK, background, 0.5) : mixHex(LIGHT_INK, background, 0.42);
  const circle = light ? mixHex(background, DARK_INK, 0.45) : mixHex(background, '#041F1A', 0.35);

  return {
    background,
    textPrimary,
    textSecondary,
    textMuted,
    circle,
  };
}

export function toneScale(base: string, steps: readonly number[]): TonePalette[] {
  return steps.map((step) => paletteFromTone(shiftTone(base, step)));
}
