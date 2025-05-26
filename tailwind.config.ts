import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#3C4EF1',
        'light-blue': '#EEF0FF',
        'light-purple': '#F6F7FF',
        'gray-100': '#F9F9F9',
        'gray-200': '#F2F2F2',
        'gray-300': '#E1E1E1',
        'gray-400': '#D0D0D0',
        'gray-500': '#B5B5B5',
        'gray-600': '#ABABAB',
        'gray-700': '#979797',
        'gray-800': '#727272',
        'gray-900': '#616161',
        'status-yellow': '#F3EEBC',
        'status-red': '#F7C5C5',
        'status-green': '#B0E9AF',
        'status-blue': '#CAEAFC',
        'status-gray': '#B8B8B8',
      },
      fontFamily: {
        'switzer': ['Switzer Variable', 'sans-serif'],
        'schibsted': ['Schibsted Grotesk', 'sans-serif'],
        'general-sans': ['General Sans Variable', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config