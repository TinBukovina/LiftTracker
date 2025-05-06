import { ReactNode, useMemo, useState } from "react";
import { css } from "../../../../styled-system/css";
import IconTemplate from "../../secondaryNavigation/IconTemplate";
import { SvgReturnType } from "../../../utils/svgPaths";

interface ButtonProps {
  children?: ReactNode;
  svgOn?: boolean;
  borderClr?: string;
  backgroundClr?: string;
  clr?: string;
  type?: "normal" | "positive" | "negative";
  disabled?: boolean;
  center?: boolean;
  w?: string;
  h?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  svgFunction?: () => SvgReturnType;
}

const BaseBtnStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.25rem",

  padding: "0.5rem 0.75rem",
  minWidth: "3rem",
  width: "fit-content",
  height: "fit-content",

  border: "2px solid transparent",
  borderRadius: "0.5rem",
};
const NormalBtnStyles = {
  backgroundColor: "buttons.bg.normal",
  border: "2px solid token(colors.effects.border)",

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
  border: "2px solid token(colors.actions.borderPositive)",
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
  border: "2px solid token(colors.actions.borderNegative)",
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
const DisabledStyles = {
  backgroundColor: "buttons.bgDisabled.normal",
  cursort: "default",

  _hover: {
    backgroundColor: "buttons.bgDisabled.normal",
    color: "typography.text",
    fill: "typography.text",
  },
};

export default function Button({
  children,
  svgOn = true,
  borderClr = "",
  backgroundClr = "",
  clr = "",
  type = "normal",
  disabled = false,
  center = false,
  w,
  h,
  onClick,
  svgFunction = () => {
    return { path: "", viewBox: "" };
  },
}: ButtonProps) {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const svgInfo = useMemo(() => svgFunction(), [svgFunction]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();

    if (!disabled) {
      setTimeout(() => {
        setIsTouched(true);
      }, 150);
    }
  };

  const handleTouchEnd = () => {
    if (!disabled) {
      setIsTouched(false);
    }
  };

  const btnStyle =
    type === "positive" && !disabled
      ? { ...BaseBtnStyles, ...PositiveBtnStyles }
      : type === "positive" && disabled
        ? { ...BaseBtnStyles, ...DisabledStyles }
        : type === "negative" && !disabled
          ? { ...BaseBtnStyles, ...NegativeBtnStyles }
          : type === "negative" && disabled
            ? { ...BaseBtnStyles, ...DisabledStyles }
            : disabled
              ? { ...BaseBtnStyles, ...DisabledStyles }
              : { ...BaseBtnStyles, ...NormalBtnStyles };

  const inlineStyles = !disabled
    ? {
        color: clr || undefined,
        borderColor: borderClr || undefined,
        backgroundColor: backgroundClr || undefined,
        fill: clr || undefined,
        margin: center ? "0 auto" : "",
        width: !children ? "3rem" : w ? w : "",
        height: !children ? "3rem" : h ? h : "",
      }
    : {};

  return (
    <button
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      className={css({
        ...btnStyle,
        ...(isTouched
          ? {
              "&:hover": {},
            }
          : {}),
      })}
      disabled={disabled}
      style={inlineStyles}
    >
      {svgOn && svgInfo.path != "" ? (
        <span
          className={css({
            paddingTop: "0.1rem",
          })}
        >
          <IconTemplate
            width={!children ? "100%" : "1rem"}
            path={svgInfo.path}
            viewBox={svgInfo.viewBox}
          />
        </span>
      ) : (
        ""
      )}
      {children}
    </button>
  );
}
