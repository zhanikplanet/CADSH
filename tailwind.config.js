/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/**/*.{js,ts,css,scss}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-primeui")],
};
