const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
        dark: '#161b22',
        gray: {
          750: '#30363d'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
