import { useRef, useState, useEffect } from "react";
import { css } from "../../../../styled-system/css";
import { closeSvgInfo } from "../../../utils/svgPaths";
import Button from "./Button";

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
}: TrainingTableRowProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

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
        placeholder="ENTER"
      />

      <input
        value={val2}
        onChange={onChange2}
        className={css({
          padding: "0.5rem 0.75rem",
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
        placeholder="ENTER"
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
