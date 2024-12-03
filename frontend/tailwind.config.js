/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}"],
  theme: {
    extend: {
      colors: {
        'main-color': '#441752',
      },
      animation: {
        slide: "silde 1s ease-in-out forwards",
      },
      keyframes: {
        silde: {
          "0%": {
            width: "30vw",
            opacity: 0,
          },
          "100%": {
            width: "55vw",
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
}

