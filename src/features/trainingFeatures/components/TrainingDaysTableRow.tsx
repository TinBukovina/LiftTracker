import { useNavigate } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import {
  convertNumberToWeekDay,
  formatDate,
  slugifyName,
} from "../../../utils/helperFunction";
import { TrainingDayInterface } from "../types/trainingEntities";
import Button from "./Button";
import { useWindowWidth } from "../../../customHooks/useWindowWidth";

export interface TrainingDayTableRowProps {
  entity: TrainingDayInterface;
  lastChild?: boolean;
  numOfCols?: number;
  onClick?: () => void;
}

export default function TrainingDaysTableRow({
  entity,
  lastChild = false,
  numOfCols = 4,
  onClick,
}: TrainingDayTableRowProps) {
  const navigate = useNavigate();

  const windowWidth = useWindowWidth();

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
        display: "grid",
        gridTemplateColumns: `repeat(${numOfCols}, 2fr)`,
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span>{entity.name}</span>

      {windowWidth > 655 ? (
        <span
          className={css({
            color: "typography.secondaryText",
          })}
        >
          {formatDate(entity.last_trained) || "null"}
        </span>
      ) : (
        ""
      )}

      {windowWidth > 855 ? (
        <span>{convertNumberToWeekDay(entity.day_order)}</span>
      ) : (
        ""
      )}

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
        </span>
      }

      {
        <span
          className={css({
            display: "flex",
            gap: "1rem",
          })}
        >
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
