import { styled } from "../../../../styled-system/jsx";

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

    _disabled: {
      backgroundColor: "buttons.bgDisabled.form",
      cursor: "normal",
      opacity: 0.6,
      _hover: {
        backgroundColor: "buttons.bgDisabled.form",
        border: "2px solid transparent",
      },
    },
  },
});

export const FormBtnStyles = {
  padding: "0.5rem",

  backgroundColor: "buttons.bg.form",
  border: "2px solid transparent",
  borderRadius: "sm",

  color: "buttons.text.form",
  fontWeight: "semibold",
  cursor: "pointer",

  _hover: {
    backgroundColor: "buttons.bgHover.form",
    border: "2px solid token(colors.effects.border)",
    color: "buttons.textHover.form",
  },
  _disabled: {
    backgroundColor: "buttons.bgDisabled.form",
    cursor: "normal",
    opacity: 0.6,
    _hover: {
      backgroundColor: "buttons.bgDisabled.form",
      border: "2px solid transparent",
      color: "buttons.text.form",
    },
  },
};
