/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        mainOrange: "#F94E30",
        lightOrange: "#fa7862",
        mainGray: "#00000066",
        backGray: "#00000005",
        WhiteSmoke: "#f5f5f5",
        darkRed: "#f83917",
        btnClr: "#FFEEE8",
        pinkClr: "#DC3545",
        mainPink: "#e4ccc5",
        lightPink: "#D0B2A933",
        red: "#bf1650",
        backRed: "#E91429",
        green: "#32CD32",
      },
      fontFamily: {
        ff: ["Avenir", "sans-serif"],
      },
      fontSize: {
        13: "13px",
        16: "16px",
        14: "14px",
        11: "11px",
      },
      borderWidth: {
        1: "1px",
        6: "6px",
      },
      minWidth: {
        300: "300px",
      },
      maxWidth: {
        300: "300px",
      },
      minHeight: {
        75: "75vh",
      },
      height: {
        450: "450px",
        500: "500px",
        75: "75vh",
        161: "161px",
        132: "132px",
      },
      width: {
        250: "250px",
        500: "500px",
        350: "350px",
      },
      spacing: {
        350: "350px",
        104: "104px",
        250: "250px",
        152: "152px",
        120: "120px",
      },
    },
  },
  plugins: [],
};
