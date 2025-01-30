import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui:{
    themes: ["coffee","dark","light"],
    darkTheme: "coffee",
    base:true,
    styled:true,
    utils:true,
    prefix:"",
    logs:true,
    themeRoot:":root"
  }
} satisfies Config;
