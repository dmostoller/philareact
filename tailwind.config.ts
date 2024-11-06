import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0070f3",
        background: "var(--background)",
        foreground: "var(--foreground)",
        "deep-sapphire": {
          "50": "#ecf6ff",
          "100": "#d4eaff",
          "200": "#b3dcff",
          "300": "#7fc7ff",
          "400": "#42a6ff",
          "500": "#177eff",
          "600": "#005bff",
          "700": "#0043fc",
          "800": "#0236cb",
          "900": "#09349f",
          "950": "#0b205e"
        },
        "dark-slate": {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#737373",
          "600": "#5d5d5d",
          "700": "#4f4f4f",
          "800": "#454545",
          "900": "#3d3d3d",
          "950": "#262626"
        }
      }
    }
  },
  plugins: []
};
export default config;
