import { useParams } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import Table from "./Table";
import { useTrainingDays } from "../customHooks/useTrainingDays";
import TrainingDaysTableRow from "../components/TrainingDaysTableRow";
import { useTrainingSplits } from "../customHooks/useTrainingSplits";
import { useWindowWidth } from "../../../customHooks/useWindowWidth";

export default function TrainingSplitDaysModule() {
  const { id } = useParams();
  const { trainingDays, isLoading } = useTrainingDays(id!);
  const { trainingSplits, isLoading: isLoadingTrainingSPlit } =
    useTrainingSplits();

  const windowWidth = useWindowWidth();

  const headers =
    windowWidth > 855
      ? ["Name", "Last trained", "Day", "", ""]
      : windowWidth > 655
        ? ["Name", "Last trained", "", ""]
        : ["Name", "", ""];
  const choosenSplit = trainingSplits?.filter((el) => el.id === id).at(0);

  if (isLoading || isLoadingTrainingSPlit) return "Loading...";

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

      <Table headers={headers} isLastColumnEmpty={false}>
        {trainingDays?.map((el) => (
          <TrainingDaysTableRow
            numOfCols={headers.length}
            key={el.id}
            entity={el}
          />
        ))}
      </Table>
    </div>
  );
}
