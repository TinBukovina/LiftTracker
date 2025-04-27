import { css } from "../../../../styled-system/css";
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
import { TrainingSplitInterface } from "../types/trainingEntities";

interface TableProps {
  data: TrainingSplitInterface[];
}

export default function Table({ data }: TableProps) {
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
      <TableHeader />
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
        {data.length
          ? data.map((el) => <TableRow entity={el} />)
          : "There is no data on this user"}
      </div>
    </div>
  );
}
