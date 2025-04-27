import { css } from "../../../../styled-system/css";
import { formatDate } from "../../../utils/helperFunction";
import { TrainingSplitInterface } from "../types/trainingEntities";
import Button from "./Button";
import StatusCode from "./StatusCode";

interface TableRowProps {
  entity: TrainingSplitInterface;
  lastChild?: boolean;
}

export default function TableRow({ entity, lastChild = false }: TableRowProps) {
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
      <span>{entity.name}</span>
      <span
        className={css({
          color: "typography.secondaryText",
        })}
      >
        {formatDate(entity.created_at)}
      </span>
      {entity.is_active ? (
        <StatusCode type="ongoing" />
      ) : (
        <StatusCode type="finished" />
      )}
      {entity.is_active ? <Button>Finish</Button> : <Button>Activate</Button>}
    </div>
  );
}
