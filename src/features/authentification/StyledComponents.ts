import { styled } from "../../../styled-system/jsx";

export const InputItem = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
});
export const StyledLabel = styled("label", {
  base: {
    display: "block",
  },
});
export const StyledInput = styled("input", {
  base: {
    padding: "0.5rem 1rem",
    width: "100%",

    backgroundColor: "effects.border",
    borderRadius: "sm",
  },
});
