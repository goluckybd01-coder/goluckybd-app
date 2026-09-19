import { lightTheme, darkTheme, typography, spacing, radius, primitives } from '@goluckybd/design-tokens';
import { StyleSheet } from 'react-native';

export type ThemeMode = 'light' | 'dark';
export const getTheme = (mode: ThemeMode) => ({ mode, colors: mode === 'dark' ? darkTheme : lightTheme, primitives, typography, spacing, radius });
export type AppTheme = ReturnType<typeof getTheme>;

export const sectionThemeMap: Record<string, ThemeMode> = {
  games: 'dark', luckyHub: 'dark', vip: 'dark', socialFeed: 'dark', agent: 'dark',
  home: 'light', wallet: 'light', profile: 'light', rewards: 'light',
};

export const shadows = StyleSheet.create({
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 4 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.16, shadowRadius: 16, elevation: 8 },
  glow: { shadowColor: '#7B5EA7', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 },
});
