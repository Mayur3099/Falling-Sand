/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
        '30': 'repeat(30, minmax(0, 1fr))',
        '35': 'repeat(35, minmax(0, 1fr))',
        '40': 'repeat(40, minmax(0, 1fr))',
        '50': 'repeat(50, minmax(0, 1fr))',
        '100': 'repeat(100, minmax(0, 1fr))',

        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      }
    },
  },
  plugins: [],
}

