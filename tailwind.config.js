/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      sm: '360px',
      md: '600px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      kanit: ["Kanit", "sans-serif"],
    },
    extend: {
      colors: {
        mainBg: '#14bc90',
        subBg: '#f9f9f9',
      },
      height: {
        'main': '270px',
        'layout': '800px',
        'card': '600px',
        '700': '700px',
      },
      width: {
        'card': '550px',
        '500': '500px',
        '220': '240px',
      },
      borderRadius: {
        'layout': '60px',
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
