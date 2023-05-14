/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textGray: "#808191",
        lightGrayColor: "#E4E8EF",
        textPrimary: "#11142D",
        primaryColor: "#475BE8",
        orangeColor: "#FD8539",
        greenColor: "#2ED480",
        purpleColor: "#CFC8FF",
      },
    },
  },
  plugins: [],
};
