import { ReactNode } from "react";
import { css } from "../../../../styled-system/css";
import TableHeader from "../components/TableHeader";

interface TableProps {
  children: ReactNode;
  headers: string[];
  isLastColumnEmpty?: boolean;
  useLeftAlign?: boolean;
  removeHeader?: boolean;
}

export default function Table({
  children,
  headers,
  isLastColumnEmpty = false,
  useLeftAlign = false,
  removeHeader = false,
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
        borderRadius: "md",

        overflow: "hidden",
      })}
    >
      {headers.length > 0 && !removeHeader ? (
        <TableHeader
          numOfCols={headers.length}
          isLastColumnEmpty={isLastColumnEmpty}
          useLeftAlign={useLeftAlign}
        >
          {headers.map((el) => (
            <span key={Math.random().toString()}>{el}</span>
          ))}
          {isLastColumnEmpty ? <span></span> : ""}
        </TableHeader>
      ) : (
        <span style={{ display: "none" }}></span>
      )}
      <div
        className={css({
          flex: "1",
          minHeight: "0",
          overflow: "auto",
          marginTop: !removeHeader ? "0.5rem" : "0",

          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "table.scrollBar",
            borderRadius: "4px",
          },
        })}
      >
        {children}
      </div>
    </div>
  );
}
