export const fontFamily = {
  primary: 'Inter',
  mono: 'JetBrains Mono',
  bangla: 'Inter, "Noto Sans Bengali", "Hind Siliguri", sans-serif',
} as const;

export const fontWeight = { regular: '400', medium: '500', semiBold: '600', bold: '700' } as const;

export const typography = {
  display: { fontFamily: fontFamily.primary, fontWeight: fontWeight.bold, fontSize: 40, lineHeight: 48, letterSpacing: -1.2 },
  h1: { fontFamily: fontFamily.primary, fontWeight: fontWeight.bold, fontSize: 32, lineHeight: 40, letterSpacing: -0.8 },
  h2: { fontFamily: fontFamily.primary, fontWeight: fontWeight.semiBold, fontSize: 24, lineHeight: 32, letterSpacing: -0.5 },
  h3: { fontFamily: fontFamily.primary, fontWeight: fontWeight.semiBold, fontSize: 20, lineHeight: 28, letterSpacing: -0.3 },
  title: { fontFamily: fontFamily.primary, fontWeight: fontWeight.medium, fontSize: 17, lineHeight: 24, letterSpacing: -0.2 },
  body: { fontFamily: fontFamily.primary, fontWeight: fontWeight.regular, fontSize: 15, lineHeight: 22, letterSpacing: 0 },
  bodySmall: { fontFamily: fontFamily.primary, fontWeight: fontWeight.regular, fontSize: 13, lineHeight: 18, letterSpacing: 0 },
  caption: { fontFamily: fontFamily.primary, fontWeight: fontWeight.medium, fontSize: 11, lineHeight: 16, letterSpacing: 0.2 },
  numericLarge: { fontFamily: fontFamily.primary, fontWeight: fontWeight.bold, fontSize: 36, lineHeight: 44, letterSpacing: -0.5 },
  numericMedium: { fontFamily: fontFamily.primary, fontWeight: fontWeight.semiBold, fontSize: 20, lineHeight: 28, letterSpacing: 0 },
  numericSmall: { fontFamily: fontFamily.primary, fontWeight: fontWeight.medium, fontSize: 14, lineHeight: 20, letterSpacing: 0.2 },
} as const;

export type TypographyStyle = typeof typography;
export type TypographyKey = keyof TypographyStyle;
