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
        secondaryBtn: "#FFF1E61A",
        white500: "#FFFFFF",
        subtitle: "#A4A4A4",
        bgBaseColor: "#00060C",
        borderColor: "#262628",
        inputBgColor: "#57575733",
        transparentBG: "#4D4D4D33",
        pendingBG: "#FEF3C7",
        pendingText: "#92400E",
        earnBG: "#D1FAE5",
        earnText: "#065F46",
        rejectBG: "#FECACA",
        rejectText: "#991B1B",
      },
    },
  },
  plugins: [],
};
