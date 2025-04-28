import { useNavigate } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import {
  convertNumberToWeekDay,
  formatDate,
  slugifyName,
} from "../../../utils/helperFunction";
import { TrainingDayInterface } from "../types/trainingEntities";
import Button from "./Button";

export interface TrainingDayTableRowProps {
  entity: TrainingDayInterface;
  lastChild?: boolean;
  onClick?: () => void;
}

export default function TrainingDaysTableRow({
  entity,
  lastChild = false,
  onClick,
}: TrainingDayTableRowProps) {
  const navigate = useNavigate();

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
        color: "neutrals.white200",

        _hover: {
          backgroundColor: "surface.s0",
        },
      })}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(4, 2fr)`,
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span>{entity.name}</span>
      <span
        className={css({
          color: "typography.secondaryText",
        })}
      >
        {formatDate(entity.last_trained) || "null"}
      </span>
      {<span>{convertNumberToWeekDay(entity.day_order)}</span>}
      {
        <span
          className={css({
            display: "flex",
            gap: "1rem",
          })}
        >
          <Button
            onClick={() => {
              navigate(`${slugifyName(entity.name)}/history`);
            }}
          >
            History
          </Button>
          <Button
            onClick={() => {
              navigate(`${slugifyName(entity.name)}`);
            }}
          >
            Start
          </Button>
        </span>
      }
    </div>
  );
}
