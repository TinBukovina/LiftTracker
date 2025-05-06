import { useState, useEffect } from "react";
import { css } from "../../../../styled-system/css";
import { closeSvgInfo } from "../../../utils/svgPaths";
import Button from "./Button";
import { useWindowWidth } from "../../../customHooks/useWindowWidth";

export interface TrainingTableRowProps {
  lastChild?: boolean;
  secondToLastChild?: boolean;
  val1?: string;
  onChange1?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  val2?: string;
  onChange2?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: <T extends HTMLElement>(e: React.MouseEvent<T>) => void;
  onBtnClick?: () => void;
  startTime?: number | null;
  placeholder1?: string | number;
  placeholder2?: string | number;
}

export default function TrainingTableRow({
  lastChild = false,
  secondToLastChild = false,
  val1,
  onChange1,
  val2,
  onChange2,
  onClick,
  onBtnClick,
  startTime,
  placeholder1 = "",
  placeholder2 = "",
}: TrainingTableRowProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const windowWidth = useWindowWidth();

  // Set up an interval to update the elapsed time every second
  useEffect(() => {
    if (secondToLastChild) {
      if (!startTime) return;

      console.log(startTime);

      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));

      const intervalId = setInterval(() => {
        const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedSeconds(secondsElapsed);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [secondToLastChild, startTime]);

  return (
    <div
      onClick={onClick}
      className={css({
        padding: "1rem 2rem",
        paddingX: windowWidth > 768 ? "2rem" : "1rem",

        borderBottom: !lastChild
          ? "2px solid token(colors.effects.border)"
          : "",

        fontSize: "md",
        fontWeight: "normal",
        color: "typography.text",
      })}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "1rem",
      }}
    >
      <input
        value={val1}
        onChange={onChange1}
        className={css({
          padding: "0.5rem 0.75rem",
          minWidth: lastChild ? "4.88rem" : "4rem",
          width: "10vw",
          maxWidth: "120px",

          backgroundColor: "surface.s0",
          border: "2px solid token(colors.input.border.form)",
          borderRadius: "md",

          _focus: {
            outline: "none",
            border: "2px solid token(colors.input.border.form)",
          },

          "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
            appearance: "none",
            margin: 0,
          },
        })}
        type="number"
        placeholder={placeholder1 + ""}
      />

      <input
        value={val2}
        onChange={onChange2}
        className={css({
          padding: "0.5rem 0.75rem",
          minWidth: lastChild ? "4.88rem" : "4rem",
          width: "10vw",
          maxWidth: "120px",

          backgroundColor: "surface.s0",
          border: "2px solid token(colors.input.border.form)",
          borderRadius: "md",

          _focus: {
            outline: "none",
            border: "2px solid token(colors.input.border.form)",
          },

          "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
            appearance: "none",
            margin: 0,
          },
        })}
        type="number"
        placeholder={placeholder2 + ""}
      />

      {lastChild ? (
        <Button onClick={onBtnClick}>ENTER</Button>
      ) : (
        <Button
          type="negative"
          svgOn={true}
          svgFunction={closeSvgInfo}
          onClick={onBtnClick}
        ></Button>
      )}

      {secondToLastChild ? (
        <span
          className={css({
            color: "typography.secondaryText",
          })}
        >
          {elapsedSeconds}s
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
