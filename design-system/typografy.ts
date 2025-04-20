import { defineTextStyles, Tokens } from "@pandacss/dev";

export const fontSizes: Tokens["fontSizes"] = {
  "2xs": { value: "0.625rem" }, // 10px
  xs: { value: "0.75rem" }, // 12px
  sm: { value: "0.875rem" }, // 14px
  md: { value: "1rem" }, // 16px
  h6: { value: "1.13125rem" }, // 21px
  h5: { value: "1.75rem" }, // 28px
  h4: { value: "2.375rem" }, // 38px
  h3: { value: "3.1875rem" }, // 51px
  h2: { value: "4.1875rem" }, // 67px
  h1: { value: "5.625rem" }, // 90px
};

export const textStyles = defineTextStyles({
  body: {
    medium: {
      value: {
        fontSize: "md",
      },
    },
  },
});
