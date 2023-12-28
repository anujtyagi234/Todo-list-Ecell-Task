/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        c1: 'rgba(213, 212, 255, 0.65)',
        c2: 'rgba(247, 247, 255, 1)',
        c3: 'rgba(255, 210, 210, 1)',
        c4: 'rgba(245, 255, 216, 1)',
        purple1: 'rgba(172, 167, 213, 1)',
        blue1:'rgba(61, 0, 192, 1)',
      },
      height: {
        '80%': '75vh',
      },
    },
  },
  plugins: [],
}