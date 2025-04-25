import { css } from "../../../../styled-system/css";
import Button from "./Button";
import StatusCode from "./StatusCode";

interface TableRowProps {
  lastChild?: boolean;
}

export default function TableRow({ lastChild = false }: TableRowProps) {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "2fr 2fr 2fr 1fr",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",

        padding: "1rem 2rem",

        borderBottom: !lastChild
          ? "2px solid token(colors.effects.border)"
          : "",

        fontSize: "md",
        fontWeight: "normal",
        color: "neutrals.white200",

        _hover: {
          backgroundColor: "surface.s0",
        },
      })}
    >
      <span>Push/Pull/Legs</span>
      <span
        className={css({
          color: "typography.secondaryText",
        })}
      >
        2025-04-01
      </span>
      <StatusCode type="ongoing" />
      <Button>Finish</Button>
    </div>
  );
}
