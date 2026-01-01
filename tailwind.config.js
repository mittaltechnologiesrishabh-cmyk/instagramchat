// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,jsx,ts,tsx}",
//     "./components/**/*.{js,jsx,ts,tsx}",
//     "./app/**/*.{js,jsx,ts,tsx}"
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2755ff",
        secondary: "#00265c",
        black: "#222222",
        grey: "#b1b1b1",
        white: "#ffffff",
        offWHite: "#fbfbfb",
        dividerGrey: "#d2d2d2",
        secondaryNavy: "#92caff",
        greyLight: "#f8f8f8",
        red: "#FF3B30",
        divider: "#fbfbfb",
        bgSkyBlue: "#D2E7FF",
        greyDark: "#444444",
        green: "#12C371",
      },
      backgroundImage: {
        loginBackground: "url('/images/background.png')",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        40: "40px",
        12: "12px",
        14: "14px",
      },
      spacing: {
        13: "3.25rem",
        40: "40px",
        303: "303px",
      },
    },
  },
  plugins: [],
};
