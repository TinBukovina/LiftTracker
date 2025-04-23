import React, { ReactNode } from "react";
import { css } from "../../../styled-system/css";

interface FormButtonProps {
  children: ReactNode;
}

export default function FormButton({ children }: FormButtonProps) {
  return (
    <button
      className={css({
        marginTop: "0.5rem",
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
      })}
    >
      {children}
    </button>
  );
}
