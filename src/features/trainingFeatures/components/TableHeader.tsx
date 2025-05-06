import { ReactNode } from "react";
import { styled } from "../../../../styled-system/jsx";

interface TableHeaderProps {
  children: ReactNode;
  numOfCols: number;
  isLastColumnEmpty?: boolean;
  useLeftAlign?: boolean;
}

export const TableHeaderStyle = styled("div", {
  base: {
    position: "sticky",
    top: "0",

    padding: "1rem 2rem",

    backgroundColor: "table.header",
    borderBottom: "2px solid token(colors.typography.text)",

    fontSize: "h6",
    fontWeight: "semibold",
    color: "typography.text",
  },
});

export default function TableHeader({
  children,
  numOfCols,
  isLastColumnEmpty = false,
  useLeftAlign = false,
}: TableHeaderProps) {
  return (
    <TableHeaderStyle
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
    </TableHeaderStyle>
  );
}
