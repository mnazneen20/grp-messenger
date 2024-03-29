/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'grey': '#828282',
        'whitish': '#E0E0E0',
        'black': '#252329',
        'blacker': '#120F13',
        'blackest': '#0B090C',
        'input': '#3C393F',
      },
      boxShadow: {
        'down': '0 2px 2px 0 rgb(0 0 0)'
      }
    },
  },
  plugins: [],
}

