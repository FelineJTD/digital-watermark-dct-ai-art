import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    colors: {
      transparent: "transparent",
      primary: "#FFFF20",
      neutral: {
        900: "#101010",
        800: "#2A2A2A",
        700: "#434343",
        600: "#5C5C5C",
        500: "#757575",
        400: "#8F8F8F",
        300: "#A8A8A8",
        200: "#C2C2C2",
        100: "#DBDBDB",
        50: "#F5F5F5"
      }
    },
    extend: {}
  },
  plugins: []
};
export default config;
