import { ReactNode, useRef } from "react";
import { css } from "../../../../styled-system/css";
import IconTemplate from "../../secondaryNavigation/IconTemplate";
import { SvgReturnType } from "../../../utils/svgPaths";

interface ButtonProps {
  children: ReactNode;
  svgOn?: boolean;
  borderClr?: string;
  backgroundClr?: string;
  clr?: string;
  type?: "normal" | "positive" | "negative";
  svgFunction?: () => SvgReturnType;
}

const BaseBtnStyles = {
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",

  padding: "0.5rem 0.75rem",
  width: "fit-content",
  height: "fit-content",
};
const NormalBtnStyles = {
  backgroundColor: "buttons.bg.normal",
  border: "2px solid token(colors.effects.border)",
  borderRadius: "0.5rem",

  color: "typography.text",
  cursor: "pointer",
  fill: "typography.text",
  fontWeight: "semibold",

  _hover: {
    backgroundColor: "buttons.bgHover.normal",
    color: "typography.textHover",
    fill: "typography.textHover",
  },
};
const PositiveBtnStyles = {
  backgroundColor: "actions.greenLight",
  border: "2px solid token(colors.actions.green)",
  borderRadius: "0.5rem",

  color: "actions.green",
  cursor: "pointer",
  fill: "actions.green",
  fontWeight: "semibold",

  _hover: {
    backgroundColor: "actions.green",
    color: "actions.greenLight",
    fill: "actions.greenLight",
  },
};
const NegativeBtnStyles = {
  backgroundColor: "actions.redLight",
  border: "2px solid token(colors.actions.red)",
  borderRadius: "0.5rem",

  color: "actions.red",
  cursor: "pointer",
  fill: "actions.red",
  fontWeight: "semibold",

  _hover: {
    backgroundColor: "actions.red",
    color: "actions.redLight",
    fill: "actions.redLight",
  },
};

export default function Button({
  children,
  svgOn = true,
  borderClr = "",
  backgroundClr = "",
  clr = "",
  type = "normal",
  svgFunction = () => {
    return { path: "", viewBox: "" };
  },
}: ButtonProps) {
  const svgInfoRef = useRef<SvgReturnType>(svgFunction());

  const btnStyle =
    type === "positive"
      ? { ...BaseBtnStyles, ...PositiveBtnStyles }
      : type === "negative"
        ? { ...BaseBtnStyles, ...NegativeBtnStyles }
        : { ...BaseBtnStyles, ...NormalBtnStyles };

  return (
    <div
      onClick={() => {
        console.log(svgInfoRef.current);
      }}
      className={css(btnStyle)}
      style={{
        color: clr || undefined,
        borderColor: borderClr || undefined,
        backgroundColor: backgroundClr || undefined,
        fill: clr || undefined,
      }}
    >
      {svgOn && svgInfoRef.current.path != "" ? (
        <span
          className={css({
            paddingTop: "0.1rem",
          })}
        >
          <IconTemplate
            width="1rem"
            path={svgInfoRef.current.path}
            viewBox={svgInfoRef.current.viewBox}
          />
        </span>
      ) : (
        ""
      )}
      {children}
    </div>
  );
}
