/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "300px",
      md: "400px",
      lg: "880px",
      tablet: "1024px",
    },
    extend: {
      fontFamily: {
        // =========================== font gucina ===========================
        GucinaBold: "GucinaBold",
        GucinaMedium: "GucinaMedium",
        GucinaRegular: "GucinaRegular",
        GucinaSemiBold: "GucinaSemiBold",

        // Halyard fonts- ----------------
        HalyardDisplayBold: "HalyardDisplayBold",
        HalyardDisplayLight: "HalyardDisplayLight",
        HalyardDisplayMedium: "HalyardDisplayMedium",
        HalyardDisplayRegular: "HalyardDisplayRegular",
        HalyardDisplaySemiBold: "HalyardDisplaySemiBold",
        HalyardMicroBookRegular: "HalyardMicroBookRegular",
        HalyardTextBold: "HalyardTextBold",
        HalyardTextLight: "HalyardTextLight",
        HalyardTextMedium: "HalyardTextMedium",
        HalyardTextRegular: "HalyardTextRegular",
      },
      colors: {
        primaryBtn: "#FD7701",
        white500: "#FFFFFF",
        subtitle: "#A4A4A4",
        bgBaseColor: "#00060C",
      },
    },
  },
  plugins: [],
};
