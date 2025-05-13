import { type Config } from 'tailwindcss';
import { type CSSRuleObject } from 'tailwindcss/types/config';

const config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'login-background': 'url(/Blob.svg)',
      },
      colors: {
        background: 'rgb(244,244,244)',
        primary: {
          200: '#17A5CC',
          300: '#0D99FD',
          400: '#028EF2',
          500: '#027bd0',
          600: '#026BB6',
          700: '#025FA2',
          800: '#012F51',
        },

        white: {
          DEFAULT: 'rgb(255, 255, 255)',
          100: 'rgb(255, 255, 255)',
          200: 'rgb(244, 244, 244)',
          300: 'rgb(204, 204, 204)',
        },
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
    }: {
      addUtilities: (
        utilities: Record<string, CSSRuleObject>,
        options?: { respectPrefix?: boolean; respectImportant?: boolean },
      ) => void;
    }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor:
            'rgba(209, 213, 219, var(--scrollbar-opacity)) rgba(156, 163, 175, var(--scrollbar-opacity))',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'white',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(209, 213, 219, var(--scrollbar-opacity))',
            borderRadius: '8px',
            border: '1px solid white',
          },
        },
      };
      addUtilities(newUtilities, {
        respectPrefix: false,
        respectImportant: false,
      });
    },
  ],
} satisfies Config;

export default config;
