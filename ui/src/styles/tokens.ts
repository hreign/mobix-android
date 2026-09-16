export interface ColorTokens {
  primary: string
  primaryHover: string
  primaryPressed: string
  background: string
  surface: string
  surfaceElevated: string
  border: string
  textPrimary: string
  textSecondary: string
  textDisabled: string
  success: string
  warning: string
  error: string
  info: string
}

export interface FontTokens {
  fontFamilyBase: string
  fontFamilyMono: string
  fontSizeTitleLg: string
  fontSizeTitle: string
  fontSizeBody: string
  fontSizeCaption: string
  fontWeightBold: number
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
  primary: '#2C7A7B',
  primaryHover: '#23616A',
  primaryPressed: '#1E4F57',
  background: '#F7F5F0',
  surface: '#FFFFFF',
  surfaceElevated: '#FCFAF5',
  border: '#E8E2D6',
  textPrimary: '#2D3748',
  textSecondary: '#718096',
  textDisabled: '#A0AEC0',
  success: '#38A169',
  warning: '#D69E2E',
  error: '#C53030',
  info: '#319795',
}

export const fontTokens: FontTokens = {
  fontFamilyBase: "'PingFang SC', 'Noto Sans SC', system-ui, sans-serif",
  fontFamilyMono: "'JetBrains Mono', 'SF Mono', monospace",
  fontSizeTitleLg: '22px',
  fontSizeTitle: '18px',
  fontSizeBody: '14px',
  fontSizeCaption: '12px',
  fontWeightBold: 600,
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
  card: 12,
  button: 8,
  input: 8,
  tag: 6,
  pill: 999,
}

export const shadowTokens: ShadowTokens = {
  cardDefault: '0 1px 3px rgba(45,55,72,0.08)',
  cardHover: '0 8px 24px rgba(45,55,72,0.12)',
  modal: '0 16px 48px rgba(45,55,72,0.16)',
}

export const motionTokens: MotionTokens = {
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
}
