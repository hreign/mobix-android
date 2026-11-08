export interface ColorTokens {
  primary: string
  primaryHover: string
  primaryPressed: string
  primarySoft: string
  background: string
  surface: string
  surfaceElevated: string
  border: string
  borderStrong: string
  textPrimary: string
  textSecondary: string
  textDisabled: string
  success: string
  successSoft: string
  warning: string
  warningSoft: string
  error: string
  errorSoft: string
  info: string
  infoSoft: string
  overlay: string
}

export interface FontTokens {
  fontFamilyBase: string
  fontFamilyMono: string
  fontSizeDisplay: string
  fontSizeTitleLg: string
  fontSizeTitle: string
  fontSizeBody: string
  fontSizeCaption: string
  fontWeightBold: number
  fontWeightSemibold: number
  fontWeightMedium: number
  fontWeightRegular: number
}

export interface SpacingTokens {
  base: number
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  xxl: number
}

export interface RadiusTokens {
  card: number
  button: number
  input: number
  tag: number
  pill: number
}

export interface ShadowTokens {
  cardDefault: string
  cardHover: string
  modal: string
}

export interface MotionTokens {
  fast: string
  normal: string
  slow: string
  ease: string
}

export const colorTokens: ColorTokens = {
  primary: '#0F766E',
  primaryHover: '#0D9488',
  primaryPressed: '#115E59',
  primarySoft: '#F0FDFA',
  background: '#F4F6F8',
  surface: '#FFFFFF',
  surfaceElevated: '#F8FAFC',
  border: '#E2E8F0',
  borderStrong: '#CBD5E1',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textDisabled: '#94A3B8',
  success: '#059669',
  successSoft: '#ECFDF5',
  warning: '#D97706',
  warningSoft: '#FFFBEB',
  error: '#DC2626',
  errorSoft: '#FEF2F2',
  info: '#0EA5E9',
  infoSoft: '#F0F9FF',
  overlay: 'rgba(15, 23, 42, 0.45)',
}

export const fontTokens: FontTokens = {
  fontFamilyBase: "'Inter', 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif",
  fontFamilyMono: "'JetBrains Mono', 'SF Mono', ui-monospace, monospace",
  fontSizeDisplay: '40px',
  fontSizeTitleLg: '26px',
  fontSizeTitle: '20px',
  fontSizeBody: '14px',
  fontSizeCaption: '12px',
  fontWeightBold: 700,
  fontWeightSemibold: 600,
  fontWeightMedium: 500,
  fontWeightRegular: 400,
}

export const spacingTokens: SpacingTokens = {
  base: 4,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const radiusTokens: RadiusTokens = {
  card: 18,
  button: 10,
  input: 10,
  tag: 999,
  pill: 999,
}

export const shadowTokens: ShadowTokens = {
  cardDefault: '0 1px 2px rgba(15,23,42,0.04), 0 12px 32px -24px rgba(15,23,42,0.24)',
  cardHover: '0 1px 2px rgba(15,23,42,0.04), 0 12px 32px -24px rgba(15,23,42,0.24)',
  modal: '0 24px 64px -16px rgba(15,23,42,0.38)',
}

export const motionTokens: MotionTokens = {
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
}