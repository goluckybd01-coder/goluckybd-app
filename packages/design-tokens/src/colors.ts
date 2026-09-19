/**
 * GoLuckyBD Design Tokens — Colors
 * Auto-extracted from Figma file: CjGGIX7QA9z2iXEwOVH4Oe
 */

export const primitives = {
  white: '#FFFFFF',
  pearl: { 50: '#FAFAF8', 100: '#F5F3EE', 200: '#EBE8E1', 300: '#D7D2C8' },
  charcoal: { 900: '#2D2D2D', 800: '#414141', 700: '#5F5F5F', 600: '#7F7F7F', 500: '#A0A0A0', 400: '#BEBEBE', 300: '#D2D2D2' },
  amethyst: { 700: '#5A4182', 600: '#6E5296', 500: '#7B5EA7', 400: '#967DBE', 300: '#B4A0D2' },
  gold: { 700: '#AA8C28', 600: '#C3A02D', 500: '#D4AF37', 400: '#E1C864', 300: '#F0E1A0' },
  success: { 500: '#10B981', 400: '#34D399' },
  warning: { 500: '#F59E0B', 400: '#FBBF24' },
  danger: { 500: '#EF4444', 400: '#F87171' },
  info: { 500: '#3B82F6', 400: '#60A5FA' },
  game: { green: '#10B981', red: '#EF4444', violet: '#8B5CF6', orange: '#F97316', blue: '#3B82F6' },
  dark: { 900: '#0F1115', 800: '#161920', 700: '#20242E', 600: '#2D323E' },
  gaming: { cyan: '#00F0FF', teal: '#22D3EE', magenta: '#FF007F', neon: '#00C853', goldBright: '#FFD700', orangeVivid: '#FFB700', purple: '#8B5CF6', fuschia: '#EF5DA8' },
} as const;

export const lightTheme = {
  background: { primary: primitives.pearl[50], secondary: primitives.pearl[100] },
  surface: { primary: primitives.white, elevated: primitives.white, glass: primitives.pearl[200] },
  border: { subtle: primitives.pearl[300] },
  text: { primary: primitives.charcoal[900], secondary: primitives.charcoal[700], muted: primitives.charcoal[500] },
  accent: { primary: primitives.amethyst[500], secondary: primitives.gold[500] },
  status: { success: primitives.success[500], warning: primitives.warning[500], danger: primitives.danger[500], info: primitives.info[500] },
} as const;

export const darkTheme = {
  background: { primary: primitives.dark[900], secondary: primitives.dark[800] },
  surface: { primary: primitives.dark[700], elevated: primitives.dark[600], glass: primitives.dark[700] },
  border: { subtle: primitives.dark[600] },
  text: { primary: primitives.pearl[50], secondary: primitives.charcoal[400], muted: primitives.charcoal[500] },
  accent: { primary: primitives.amethyst[400], secondary: primitives.gold[400] },
  status: { success: primitives.success[400], warning: primitives.warning[400], danger: primitives.danger[400], info: primitives.info[400] },
} as const;

export type ThemeColors = typeof lightTheme;
