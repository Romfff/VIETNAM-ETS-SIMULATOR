/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#151f32',
          950: '#090d16',
        },
        brand: {
          50: '#f0fbf7',
          100: '#dcf6ee',
          200: '#b9edd0',
          300: '#86dfc7',
          400: '#4ecab0',
          500: '#28ae94',
          600: '#1c8c77',
          700: '#197060',
          800: '#17594d',
          850: '#145f4b', // Exact poster header & banner dark pine green
          900: '#114b3c', // Deep forest green replacing harsh black
          950: '#0b3329', // Deepest green
        },
        leaf: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        sage: {
          50: '#f4f9f6',
          100: '#e7f3ec',
          200: '#d2e7dc',
          300: '#b0d4c2',
          400: '#87bca3',
          500: '#64a284',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 10px 20px -5px rgba(15, 23, 42, 0.07), 0 4px 6px -2px rgba(15, 23, 42, 0.03)',
      }
    },
  },
  plugins: [],
}
