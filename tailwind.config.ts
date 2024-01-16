import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slidein: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideout: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slidedown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideup: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' }
        }
      },
      animation: {
        slidein: 'slidein 0.3s ease-in-out',
        slideout: 'slideout 0.3s ease-in-out',
        slidedown: 'slidedown 0.3s ease-in-out',
        slideup: 'slideup 0.3s ease-in-out'
      },
      colors: {
        'vipps': {
          'default': '#ff5b24',
          'hover': '#f03106',
          'active': '#c72107',
          'bg': '#fff4ec'
        },
        'tihlde': {
          50: '#eff8ff',
          100: '#daeeff',
          200: '#bee2ff',
          300: '#91d1ff',
          400: '#5eb7fc',
          500: '#3897f9',
          600: '#2279ee',
          700: '#1a63db',
          800: '#1c50b1',
          900: '#1c458a',
          950: '#162b55'
        },
        'coral-red': {
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff5050',
          500: '#f83b3b',
          600: '#e51d1d',
          700: '#c11414',
          800: '#a01414',
          900: '#841818',
          950: '#480707'
        },
        'caribbean': {
          50: '#edfcf6',
          100: '#d4f7e7',
          200: '#adedd3',
          300: '#78ddbc',
          400: '#41c69e',
          500: '#22c197',
          600: '#118a6c',
          700: '#0e6e59',
          800: '#0d5848',
          900: '#0c483c',
          950: '#062822'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
export default config
