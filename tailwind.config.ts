import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0070f3",
        background: "var(--background)",
        foreground: "var(--foreground)",
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
          '50': '#f1f5f9',
          '100': '#e2e8f0',
          '200': '#cbd5e1',
          '300': '#94a3b8',
          '400': '#64748b',
          '500': '#475569',
          '600': '#334155',
          '700': '#1e293b',
          '800': '#0f172a',
          '900': '#0a0e1a',
        },
      },
    },
  },
  plugins: [],
};
export default config;
