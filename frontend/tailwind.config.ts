import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      // backgroundImage: {
      //   'dark-children-bg': "url('/public/dark-children')",
      //   'footer-texture': "url('/img/footer-texture.png')",
      // },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
      },
      fontSize: {
        ...defaultTheme.spacing
      },
    },
    screens: {
      'small': '1px',
      'ipad': '768px',
      'desktop': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },

  content: [
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
        "info": "#bfdbfe",
        "info-content": "#172554",
        "--rounded-box": "0.5rem", // border radius rounded-box utility class, used in card and other large boxes
        "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
        "--rounded-badge": "0.5rem", // border radius rounded-badge utility class, used in badges and similar
        "--animation-btn": "0.25s", // duration of animation when you click on button
        "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
        "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
        "--border-btn": "1px", // border width of buttons
        "--tab-border": "1px", // border width of tabs
        "--tab-radius": "0.5rem", // border radius of tabs
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
        "info": "#3b82f6",
        "info-content": "#bfdbfe",
        "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
        "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
        "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
        "--animation-btn": "0.25s", // duration of animation when you click on button
        "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
        "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
        "--border-btn": "1px", // border width of buttons
        "--tab-border": "1px", // border width of tabs
        "--tab-radius": "0.5rem", // border radius of tabs
      },
    }],
  },
  plugins: [forms, typography, daisyui, require('tailwindcss-animated')]
}
export default config
