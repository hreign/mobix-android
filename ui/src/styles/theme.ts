import type { GlobalThemeOverrides } from 'naive-ui'
import { colorTokens, radiusTokens, fontTokens, shadowTokens } from './tokens'

export function buildThemeOverrides(): GlobalThemeOverrides {
  return {
    common: {
      primaryColor: colorTokens.primary,
      primaryColorHover: colorTokens.primaryHover,
      primaryColorPressed: colorTokens.primaryPressed,
      borderRadius: `${radiusTokens.input}px`,
      fontFamily: fontTokens.fontFamilyBase,
      fontWeightStrong: String(fontTokens.fontWeightBold),
    },
    Card: {
      borderRadius: `${radiusTokens.card}px`,
      color: colorTokens.surface,
      colorEmbedded: colorTokens.surfaceElevated,
      boxShadow: shadowTokens.cardDefault,
    },
    Button: {
      borderRadius: `${radiusTokens.button}px`,
    },
    Input: {
      borderRadius: `${radiusTokens.input}px`,
    },
    List: {
      borderRadius: `${radiusTokens.card}px`,
      color: colorTokens.surface,
    },
    Tag: {
      borderRadius: `${radiusTokens.tag}px`,
    },
    Descriptions: {
      borderRadius: `${radiusTokens.card}px`,
    },
    Menu: {
      borderRadius: `${radiusTokens.button}px`,
      itemColorActive: colorTokens.surfaceElevated,
      itemColorActiveHover: colorTokens.surfaceElevated,
    },
    Layout: {
      color: colorTokens.background,
      headerColor: colorTokens.surface,
    },
    Pagination: {
      itemBorderRadius: `${radiusTokens.button}px`,
    },
    Modal: {
      borderRadius: `${radiusTokens.card}px`,
      boxShadow: shadowTokens.modal,
    },
    Alert: {
      borderRadius: `${radiusTokens.card}px`,
    },
    Empty: {
      iconColor: colorTokens.textSecondary,
      descriptionColor: colorTokens.textSecondary,
    },
    Spin: {
      color: colorTokens.primary,
    },
  }
}
