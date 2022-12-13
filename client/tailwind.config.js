/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {

      animation: {
        "loading": "pulse ease-in-out 2s 3",
      },

      colors: {
        // twitter : '#1DA1F2',
        // twitterDark:'#1b8cd8',
        // twitterLight:'#9acdf8',
        twitter: "#3360ff",
        twitterDark: "#5c79ff",
        twitterLight: "#ccdeff",
        twitterContrastDark: "#8899a6",
        primaryBgl: "var(--color-primary-light)",
        primaryBgd: "var(--color-primary-dark)",
        primaryContrast: "var(--color-primary-contrast)",
        primaryContrastDark: "var(--color-primary-contrast-dark)",
        primaryHover: "var(--color-primary-hover)",
        primaryHoverDark: "var(--color-primary-hover-dark)",
        secondaryBgl: "var(--color-secondary-light)",
        secondaryBgd: "var(--color-secondary-dark)",
        secondaryHover: "var(--color-secondary-hover)",
        secondaryHoverDark: "var(--color-secondary-hover-dark)",
      },
    },
  },
  plugins: [],
};
