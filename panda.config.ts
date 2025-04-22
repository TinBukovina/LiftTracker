import { defineConfig } from "@pandacss/dev";
import { breakpoints } from "./design-system/breakpoints";
import { colors } from "./design-system/colors";
import { radii } from "./design-system/radii";
import { spacings } from "./design-system/spacings";
import { textStyles, fontSizes } from "./design-system/typografy";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    breakpoints,
    extend: {
      semanticTokens: {
        colors: colors,
      },
      tokens: {
        radii: radii,
        spacing: spacings,
        fontSizes,
      },
      textStyles: textStyles,
    },
  },

  conditions: {},

  // The output directory for your css system
  outdir: "styled-system",

  jsxFramework: "react",
});
