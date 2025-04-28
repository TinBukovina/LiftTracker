import { useParams } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import Table from "./Table";
import { useTrainingDays } from "../customHooks/useTrainingDays";
import TrainingDaysTableRow from "../components/TrainingDaysTableRow";
import { useTrainingSplits } from "../customHooks/useTrainingSplits";

export default function TrainingSplitDaysModule() {
  const { id } = useParams();
  const { trainingDays, isLoading } = useTrainingDays(id!);
  const {
    trainingSplits,
    isLoading: isLoadingTrainingSPlit,
    error,
  } = useTrainingSplits();

  const header = ["Name", "Last trained", "Day", ""];
  const choosenSplit = trainingSplits?.filter((el) => el.id === id).at(0);

  if (isLoading || isLoadingTrainingSPlit) return "Loading...";
  if (error) {
    console.log(error);
    return "There was a error while running useTrainingSPlits.";
  }

  return (
    <div
      className={css({
        flex: "1",
        minHeight: "0",

        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",

        overflow: "hidden",
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <div>
          <p
            className={css({
              fontSize: "h5",
            })}
          >
            {choosenSplit?.name}
          </p>
          <p
            className={css({
              color: "typography.secondaryText",
            })}
          >
            List of your training days in a program
          </p>
        </div>
      </div>

      <Table headers={header} isLastColumnEmpty={false}>
        {trainingDays?.map((el) => (
          <TrainingDaysTableRow key={el.id} entity={el} />
        ))}
      </Table>
    </div>
  );
}
