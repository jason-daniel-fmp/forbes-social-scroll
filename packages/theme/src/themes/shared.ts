import type { ThemeLayout, ThemeSpacing, ThemeTypography } from '../theme.types';

/** Article-feed type scale — kept app-specific, not taken from phoenix headings. */
export const sharedTypography: ThemeTypography = {
  logo: 24,
  title: 22,
  subtitle: 12,
  body: 12,
  label: 9,
  kpiValue: 20,
  kpiLabel: 9,
  interactionIcon: 24,
  interactionCount: 9,
  editorTag: 8,
  editorName: 11,
  editorRole: 9,
  swipeHint: 10,
};

/** Article-feed layout — kept app-specific. */
export const sharedLayout: ThemeLayout = {
  headerFlex: 5,
  row1Flex: 20,
  row2Flex: 50,
  row3Flex: 25,
  row1Col1WidthPercent: 70,
  row1Col2WidthPercent: 30,
  row2Col1WidthPercent: 90,
  row2Col2WidthPercent: 10,
  screenPaddingHorizontal: 16,
  screenPaddingVertical: 8,
};

/**
 * Phoenix spacing tokens used by both source themes
 * (`--phx-spacing-2xs/sm/md/md2|lg/xl`).
 */
export const sharedSpacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};
