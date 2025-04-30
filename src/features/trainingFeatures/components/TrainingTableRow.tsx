import { css } from "../../../../styled-system/css";
import { closeSvgInfo } from "../../../utils/svgPaths";
import Button from "./Button";

export interface TrainingTableRowProps {
  lastChild?: boolean;
  val1?: string;
  onChange1?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  val2?: string;
  onChange2?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: <T extends HTMLElement>(e: React.MouseEvent<T>) => void;
  onBtnClick?: () => void;
}

export default function TrainingTableRow({
  lastChild = false,
  val1,
  onChange1,
  val2,
  onChange2,
  onClick,
  onBtnClick,
}: TrainingTableRowProps) {
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
    </div>
  );
}
