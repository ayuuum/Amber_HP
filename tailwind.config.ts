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
        'warm-cream': '#F5EEDF',
        'deep-forest-green': '#1F3326',
        'espresso-brown': '#3A2A1F',
        'warm-amber': '#C49A6C',
        'stone-gray': '#E3E0D6',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-noto-sans)', 'var(--font-inter)', 'sans-serif'], // Unify serif to sans as well just in case
      },
    },
  },
  plugins: [],
}
export default config

