/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryBgl: 'var(--color-primary-light)',
        primaryBgd: 'var(--color-primary-dark)',
        primaryContrast: 'var(--color-primary-contrast)',
        primaryContrastDark: 'var(--color-primary-contrast-dark)',
        primaryHover: 'var(--color-primary-hover)',
        primaryHoverDark: 'var(--color-primary-hover-dark)',
        secondaryBgl: 'var(--color-secondary-light)',
        secondaryBgd: 'var(--color-secondary-dark)',
        secondaryHover: 'var(--color-secondary-hover)',
        secondaryHoverDark: 'var(--color-secondary-hover-dark)',
      }
    },
  },
  plugins: [],
}
