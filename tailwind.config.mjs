import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        moonstone: "#25A5B4",
        silver: "#CCCCCC",
        battleShipGray: "#999999",
        davyGray: "#4D4D4D",
        eerieBlack: "#1A1A1A",
        delftBlue: "#3D3D5D",
        kobicha: "#5D3615",
        russianViolet: "#3f175f",
        faluRed: "#882A2A",
        shamrockGreen: "#059448",
        darkBlue: "#0C0D34",
        secondaryCyan: "#AEC7ED",
        lightOrange: "#FBE2DF",
        lightPurple: "#E5D6EB",
        lightYellow: "#EFDB88",
        lightGreen: "#C9E9E4",
        customBlue: "#1D1F2C",
        customGray: "#667085",
        customGreen: "#009448",
        lightBlue: "#0770AD",
        iconGray: "#A3A9B6",
        lightGray: "#585B5E",
        grayishWhite: "#F8F7FB",
        yellow: "#F3B95A",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
