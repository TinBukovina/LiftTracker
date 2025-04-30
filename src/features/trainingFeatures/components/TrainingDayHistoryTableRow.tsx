import { css } from "../../../../styled-system/css";
import { uppercaseFirstLetter } from "../../../utils/helperFunction";
import { TrainingInstsanceCustomInterface } from "../customHooks/useTrainingInstances";

export interface TrainingSplitTableRowProps {
  entity: TrainingInstsanceCustomInterface;
  lastChild?: boolean;
  onClick?: () => void;
}

export default function TrainingDayHistoryTableRow({
  entity,
  lastChild = false,
  onClick,
}: TrainingSplitTableRowProps) {
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

        _hover: {
          backgroundColor: "surface.s0",
        },
      })}
      style={{
        display: "grid",

        gap: "1rem",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <span
        className={css({
          display: "flex",
          gap: "1rem",
        })}
      >
        <span>{uppercaseFirstLetter(entity.name)}:</span>
        {entity.data.map((performance) => (
          <span key={performance.id}>
            {performance.weight} x {performance.reps}
          </span>
        ))}
      </span>
    </div>
  );
}
