export interface ThemeColors {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentMuted: string;
  border: string;
  divider: string;
  kpiCardBackground: string;
  kpiCardBorder: string;
  interactionCount: string;
  headerBackground: string;
  headerLogo: string;
}

export interface ThemeTypography {
  logo: number;
  title: number;
  subtitle: number;
  body: number;
  label: number;
  kpiValue: number;
  kpiLabel: number;
  interactionIcon: number;
  interactionCount: number;
  editorTag: number;
  editorName: number;
  editorRole: number;
  swipeHint: number;
}

export interface ThemeLayout {
  headerFlex: number;
  row1Flex: number;
  row2Flex: number;
  row3Flex: number;
  row1Col1WidthPercent: number;
  row1Col2WidthPercent: number;
  row2Col1WidthPercent: number;
  row2Col2WidthPercent: number;
  screenPaddingHorizontal: number;
  screenPaddingVertical: number;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Theme {
  name: 'dark' | 'light';
  colors: ThemeColors;
  typography: ThemeTypography;
  layout: ThemeLayout;
  spacing: ThemeSpacing;
}

export type ThemeName = Theme['name'];
