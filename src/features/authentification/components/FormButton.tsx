import { ReactNode } from "react";
import { css } from "../../../../styled-system/css";
import { FormBtnStyles } from "../styles/StyledComponents";

interface FormButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
}

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
