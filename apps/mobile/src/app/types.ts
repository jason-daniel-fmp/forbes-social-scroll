export type AppMode =
  | 'landing'
  | 'trends'
  | 'home'
  | 'financial-recovery'
  | 'startup-llc'
  | 'pet-insurance'
  | 'calculators'
  | 'insurance-health-vitals';

export type ActiveAppMode = Exclude<AppMode, 'landing'>;

export const PLACEHOLDER_APP_MODES = [
  'startup-llc',
  'pet-insurance',
  'calculators',
  'insurance-health-vitals',
] as const;

export type PlaceholderAppMode = (typeof PLACEHOLDER_APP_MODES)[number];

export function isPlaceholderAppMode(mode: AppMode): mode is PlaceholderAppMode {
  return PLACEHOLDER_APP_MODES.includes(mode as PlaceholderAppMode);
}
