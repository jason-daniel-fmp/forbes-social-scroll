import type { Theme } from '../theme.types';

import { sharedEditorialTypography, sharedLayout, sharedSpacing, sharedTypography } from './shared';

/**
 * Forbes Advisor SEM 2026 palette, mapped from
 * `mktp-ui-widgets/src/themes/advisor-sem-2026.css` (which also pulls
 * `advisor.css` + `phoenix/phoenix.css`).
 */
export const advisorSem2026Theme: Theme = {
  name: 'advisor-sem-2026',
  label: 'Advisor',
  statusBarStyle: 'dark',
  colors: {
    // --phx-background
    background: '#FFFFFF',
    // --wui-bg-accent
    surface: '#F5F7FF',
    // --phx-fg-heading
    textPrimary: '#1E2125',
    // --wui-summary-table-text-primary
    textSecondary: '#383C43',
    // --wui-summary-table-head-text-color
    textMuted: '#747C80',
    // --wui-primary-button / --wui-sem-color-variant-secondary
    accent: '#35B782',
    // --phx-button-primary-bg on advisor-sem-2026 product cards
    accentMuted: '#0C7663',
    // --wui-fg-link / --wui-expand-button-border
    border: '#3453A7',
    // --wui-mobile-header-border-bottom
    divider: '#E5E5E5',
    kpiCardBackground: '#FFFFFF',
    kpiCardBorder: '#3453A7',
    // --phx-fg-caption
    interactionCount: '#616A76',
    headerBackground: '#FFFFFF',
    headerLogo: '#1E2125',
  },
  typography: sharedTypography,
  editorialTypography: sharedEditorialTypography,
  layout: sharedLayout,
  spacing: sharedSpacing,
};
