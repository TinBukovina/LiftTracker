import { ReactNode } from "react";
import { css } from "../../../../styled-system/css";
import TableHeader from "../components/TableHeader";

interface TableProps {
  children: ReactNode;
  headers: string[];
  isLastColumnEmpty?: boolean;
  useLeftAlign?: boolean;
}

export default function Table({
  children,
  headers,
  isLastColumnEmpty = false,
  useLeftAlign = false,
}: TableProps) {
  return (
    <div
      className={css({
        flex: "1",
        minHeight: "0",

        display: "flex",
        flexDirection: "column",

        backgroundColor: "surface.s1",
        border: "2px solid token(colors.effects.border)",
        borderRadius: "sm",

        overflow: "hidden",
      })}
    >
      <TableHeader
        numOfCols={headers.length}
        isLastColumnEmpty={isLastColumnEmpty}
        useLeftAlign={useLeftAlign}
      >
        {headers.map((el) => (
          <span key={el}>{el}</span>
        ))}
        {isLastColumnEmpty ? <span></span> : ""}
      </TableHeader>
      <div
        className={css({
          flex: "1",
          minHeight: "0",
          overflow: "auto",
          marginTop: "0.5rem",

          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "surface.s0",
            borderRadius: "4px",
          },
        })}
      >
        {children}
      </div>
    </div>
  );
}
