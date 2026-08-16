/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f5f7fa',
          100: '#e9edf3',
          200: '#cfd8e3',
          300: '#a7b6c9',
          400: '#7890a9',
          500: '#57708c',
          600: '#435972',
          700: '#37485d',
          800: '#2b3947',
          900: '#141b23',
        },
        cream: {
          50: '#fdfaf5',
          100: '#f7efe1',
          200: '#f0e4cc',
        },
        espresso: {
          900: '#2a2119',
          800: '#3a2f24',
          700: '#4a3c2d',
          600: '#5c4a37',
          400: '#8a7a68',
        },
        terracotta: {
          600: '#b5602f',
          500: '#c1694f',
          400: '#cf7d5f',
          300: '#e2a688',
        },
        gold: {
          400: '#d9b878',
          300: '#e6cc9b',
          200: '#f0ddb8',
        },
      },
    },
  },
  plugins: [],
}
