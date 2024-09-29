import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'deep-sapphire': {
          '50': '#ecf6ff',
          '100': '#d4eaff',
          '200': '#b3dcff',
          '300': '#7fc7ff',
          '400': '#42a6ff',
          '500': '#177eff',
          '600': '#005bff',
          '700': '#0043fc',
          '800': '#0236cb',
          '900': '#09349f',
          '950': '#0b205e',
        },
        'dark-slate': {
          '50': 'var(--slate-50)',
          '100': 'var(--slate-100)',
          '200': 'var(--slate-200)',
          '300': 'var(--slate-300)',
          '400': 'var(--slate-400)',
          '500': 'var(--slate-500)',
          '600': 'var(--slate-600)',
          '700': 'var(--slate-700)',
          '800': 'var(--slate-800)',
          '900': 'var(--slate-900)',
          '950': 'var(--slate-950)',
        },
        google: {
          'text-gray': '#3c4043',
          'button-blue': '#1a73e8',
          'button-blue-hover': '#5195ee',
          'button-dark': '#202124',
          'button-dark-hover': '#555658',
          'button-border-light': '#dadce0',
          'logo-blue': '#4285f4',
          'logo-green': '#34a853',
          'logo-yellow': '#fbbc05',
          'logo-red': '#ea4335',
        },
      },
    },
  },
  plugins: [],
};
export default config;
