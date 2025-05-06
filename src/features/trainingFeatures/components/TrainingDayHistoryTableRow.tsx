import { css } from "../../../../styled-system/css";
import { useWindowWidth } from "../../../customHooks/useWindowWidth";
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

        gap: "1rem",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <span className={css({})}>
        <span
          className={css({
            display: windowWidth > 768 ? "inline" : "block",
          })}
        >
          {uppercaseFirstLetter(entity.name)}:{" "}
        </span>
        {entity.data.map((performance, i) => (
          <span
            className={css({ color: "typography.secondaryText" })}
            key={performance.id}
          >
            {performance.weight} x {performance.reps}
            {!(entity.data.length - 1 === i) ? ", " : ""}
          </span>
        ))}
      </span>
    </div>
  );
}
