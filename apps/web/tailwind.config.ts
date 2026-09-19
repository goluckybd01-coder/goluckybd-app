import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], darkMode: 'class',
  theme: { extend: {
    colors: {
      pearl: { 50: '#FAFAF8', 100: '#F5F3EE', 200: '#EBE8E1', 300: '#D7D2C8' },
      charcoal: { 300: '#D2D2D2', 400: '#BEBEBE', 500: '#A0A0A0', 600: '#7F7F7F', 700: '#5F5F5F', 800: '#414141', 900: '#2D2D2D' },
      amethyst: { 300: '#B4A0D2', 400: '#967DBE', 500: '#7B5EA7', 600: '#6E5296', 700: '#5A4182' },
      gold: { 300: '#F0E1A0', 400: '#E1C864', 500: '#D4AF37', 600: '#C3A02D', 700: '#AA8C28' },
      success: { 400: '#34D399', 500: '#10B981' }, warning: { 400: '#FBBF24', 500: '#F59E0B' },
      danger: { 400: '#F87171', 500: '#EF4444' }, info: { 400: '#60A5FA', 500: '#3B82F6' },
      game: { green: '#10B981', red: '#EF4444', violet: '#8B5CF6', orange: '#F97316', blue: '#3B82F6', cyan: '#00F0FF', magenta: '#FF007F', neon: '#00C853' },
      dark: { 900: '#0F1115', 800: '#161920', 700: '#20242E', 600: '#2D323E' },
    },
    fontFamily: { sans: ['Inter', 'Noto Sans Bengali', 'Hind Siliguri', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
    borderRadius: { sm: '8px', md: '12px', lg: '16px', xl: '20px', '2xl': '24px', '3xl': '32px' },
  }}, plugins: [],
};
export default config;
