import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: [
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        ...defaultTheme.spacing
      },
    },
    screens: {
      'ipad': '768px',
      'desktop': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },

  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        "primary": "#701a75",
        "primary-content": "#fdf4ff",
        "success": "#047857",
        "accent": "#86198f",
        "base-100": "#F5F5F4",
        "base-200": "#E7E5E4",
        "base-300": "#78716C",
        "base-content": "#1C1917",
        "info": "blue",
        "info-content": "red"
      },
      dark: {
        ...require("daisyui/src/theming/themes")["dark"],
        "primary": "#701a75",
        "primary-content": "#fdf4ff",
        "success": "#10b981",
        "accent": "#a21caf",
        "base-100": "#1C1917",
        "base-200": "#292524",
        "base-300": "#78716C",
        "base-content": "#E7E5E4",
      },
    }],
  },
  plugins: [forms, typography, daisyui, require('tailwindcss-animated')]
}
export default config
