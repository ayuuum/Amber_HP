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
        /* Amber Corporation Brand（/75, /10 等の opacity 修飾子を使うため rgb で定義） */
        'sequoia-green': 'rgb(13 92 58 / <alpha-value>)',
        'green-dark': 'rgb(10 28 20 / <alpha-value>)',
        'sequoia-black': 'rgb(27 25 22 / <alpha-value>)',
        'sequoia-white': 'var(--color-white)',
        'color-bg': 'var(--color-bg)',
        'color-bg-subtle': 'var(--color-bg-subtle)',
        'color-text': 'var(--color-text)',
        'color-text-inverse': 'var(--color-text-inverse)',
        'blue-bright': 'var(--color-blue-bright)',
        'blue-dark': 'var(--color-blue-dark)',
        'purple': 'var(--color-purple)',
        'pink': 'var(--color-pink)',
        'orange': 'var(--color-orange)',
        'yellow': 'var(--color-yellow)',
        'yellow-dark': 'var(--color-yellow-dark)',
        'red': 'var(--color-red)',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-inter)', 'var(--font-noto-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-noto-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
