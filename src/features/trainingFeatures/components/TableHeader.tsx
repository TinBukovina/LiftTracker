import { ReactNode } from "react";
import { css } from "../../../../styled-system/css";

interface TableHeaderProps {
  children: ReactNode;
  numOfCols: number;
  isLastColumnEmpty?: boolean;
  useLeftAlign?: boolean;
}

export default function TableHeader({
  children,
  numOfCols,
  isLastColumnEmpty = false,
  useLeftAlign = false,
}: TableHeaderProps) {
  return (
    <div
      className={css({
        position: "sticky",
        top: "0",

        padding: "1rem 2rem",

        backgroundColor: "surface.s1",
        borderBottom: "2px solid token(colors.neutrals.white200)",

        fontSize: "h6",
        fontWeight: "semibold",
        color: "neutrals.white200",
      })}
      style={
        !useLeftAlign
          ? {
              display: "grid",
              gridTemplateColumns: `repeat(${numOfCols}, 2fr) ${isLastColumnEmpty ? "1fr" : ""}`,
              alignItems: "center",
              gap: "1rem",
            }
          : { display: "flex", alignItems: "center", gap: "1.5rem" }
      }
    >
      {children}
    </div>
  );
}
