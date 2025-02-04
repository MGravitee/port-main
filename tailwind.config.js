const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/icons/**/*.{js,ts,jsx,tsx}',
      './src/darkmode/**/*.{js,ts,jsx,tsx}',
      "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        "my-theme": {
          extend: "dark", // <- inheriting default values from dark theme
          colors: {
            background: "#020205",
            foreground: "#FAFAFA",
            primary: {
              50: "#3B096C",
              100: "#520F83",
              200: "#7318A2",
              300: "#9823C2",
              400: "#c031e2",
              500: "#DD62ED",
              600: "#F182F6",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#c636d9",
              DEFAULT: "#DD62ED",
              foreground: "#FAFAFA",
            },
            focus: "#F182F6",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
