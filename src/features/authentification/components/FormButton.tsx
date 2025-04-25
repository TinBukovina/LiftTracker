import { ReactNode } from "react";
import { css } from "../../../../styled-system/css";
/* import { FormBtnStyles } from "../styles/StyledComponents";
 */
interface FormButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
}

const FormBtnStyles = {
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

export default function FormButton({
  children,
  isDisabled = false,
}: FormButtonProps) {
  return (
    <button disabled={isDisabled} className={css({ ...FormBtnStyles })}>
      {children}
    </button>
  );
}
