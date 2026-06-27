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
        /* Amber Brand Design System v3.0 */
        'sequoia-green': 'rgb(27 58 45 / <alpha-value>)',
        'sequoia-green-accent': 'rgb(27 58 45 / <alpha-value>)',
        accent: 'rgb(var(--lp-accent) / <alpha-value>)',
        'green-dark': 'rgb(27 58 45 / <alpha-value>)',
        'sequoia-black': 'rgb(21 40 40 / <alpha-value>)',
        'sequoia-white': 'var(--color-white)',
        'color-bg': 'var(--color-bg)',
        'color-bg-subtle': 'var(--color-bg-subtle)',
        'color-text': 'var(--color-text)',
        'color-text-inverse': 'var(--color-text-inverse)',
        neutral: {
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
          950: 'var(--neutral-950)',
        },
        'blue-bright': 'var(--color-blue-bright)',
        'blue-dark': 'var(--color-blue-dark)',
        purple: 'var(--color-purple)',
        pink: 'var(--color-pink)',
        orange: 'var(--color-orange)',
        yellow: 'var(--color-yellow)',
        'yellow-dark': 'var(--color-yellow-dark)',
        red: 'var(--color-red)',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-inter)', 'var(--font-noto-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-noto-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        brand: '280ms',
        'brand-fast': '200ms',
      },
    },
  },
  plugins: [],
}
export default config
