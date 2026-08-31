import type { Theme } from '../theme.types';

import { sharedLayout, sharedSpacing, sharedTypography } from './shared';

/**
 * Forbes Health palette, mapped from
 * `mktp-ui-widgets/src/themes/health.css` (which also pulls
 * `health/phoenix.css`).
 */
export const healthTheme: Theme = {
  name: 'health',
  label: 'Health',
  statusBarStyle: 'dark',
  colors: {
    // --phx-background
    background: '#FFFFFF',
    // --wui-secondary-cta-bg / --wui-sem-sticky-phone-number-background-color
    surface: '#F2F5F4',
    // --phx-fg-heading
    textPrimary: '#1E2125',
    // --wui-secondary-cta-label / --phx-button-secondary-text
    textSecondary: '#3C5C55',
    // --phx-fg-caption
    textMuted: '#616A76',
    // --wui-global-color-primary / --phx-bg-brand
    accent: '#657E79',
    // --phx-button-primary-pressed-bg
    accentMuted: '#3C5C55',
    border: '#657E79',
    // --wui-cross-sell-block-background / --phx-bg-brand-subtle
    divider: '#D1E5E1',
    kpiCardBackground: '#FFFFFF',
    kpiCardBorder: '#657E79',
    interactionCount: '#616A76',
    headerBackground: '#FFFFFF',
    headerLogo: '#1E2125',
  },
  typography: sharedTypography,
  layout: sharedLayout,
  spacing: sharedSpacing,
};
