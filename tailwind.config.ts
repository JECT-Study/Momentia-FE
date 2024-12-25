import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const colors = {
  main: '#6304FF',
  system: {
    error: '#FF2828',
    success: '#3D6EFF',
  },
  black: '#111111',
  white: '#FFFFFF',
  gray: {
    900: '#222222',
    800: '#2B2B2B',
    700: '#616161',
    600: '#757575',
    500: '#9E9E9E',
    400: '#B5B5B5',
    300: '#E0E0E0',
    200: '#EEEEEE',
    100: '#F5F5F5',
    50: '#FAFAFA',
  },
  title: '#FFFFFF',
  subtitle: '#F5F5F5',
  background: {
    base: '#101010',
  },
};

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)'],
      },
      colors,
      spacing: {
        '4.5': '18px',
        '7.5': '30px',
        '15': '60px',
        '78.25': '313px',
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        'custom-dark': {
          extend: 'dark',
          colors: {
            background: colors.background.base,
            foreground: colors.white,
          },
        },
      },
    }),
  ],
} satisfies Config;
