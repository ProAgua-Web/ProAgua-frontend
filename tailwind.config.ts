import type { Config } from "tailwindcss";

/*
--clr-primary-900: 205 98% 41%;
--clr-primary-800: 205, 100%, 36%;

--primary-red: rgb(226, 3, 44);
--secundary-red: rgb(252, 27, 68);

--primary-green: rgb(13, 186, 21);
--secundary-green: rgb(46, 188, 94);

--primary-white: rgb(255, 255, 255);
--secundary-white: rgb(244, 244, 244);
--tertiary-white: rgb(204, 204, 204);

--primary-gray: rgb(90, 108, 121);
--primary-black: rgb(0, 0, 0);

--neutral: var(--primary-white);

--background-color: var(--secundary-white);
--header-color: var(--clr-primary-900);

--header-height: 64px;
--header-bg: #027bd0;
--navbar-header-bg: #006dba;
--navbar-bg: #ededed;
*/

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "login-background": "url(/Blob.svg)",
      },
      colors: {
        background: "rgb(244,244,244)",
        primary: {
          300: "#0D99FD",
          400: "#028EF2",
          500: "#027bd0",
          600: "#026BB6",
          700: "#025FA2",
          800: "#012F51",
        },

        white: {
          DEFAULT: "rgb(255, 255, 255)",
          100: "rgb(255, 255, 255)",
          200: "rgb(244, 244, 244)",
          300: "rgb(204, 204, 204)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
