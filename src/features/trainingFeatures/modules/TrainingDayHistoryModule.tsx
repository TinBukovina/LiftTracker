import { useParams } from "react-router-dom";
import { css } from "../../../../styled-system/css";

import Table from "./Table";
import { useTrainingDays } from "../customHooks/useTrainingDays";
import {
  convertNumberToWeekDay,
  formatDate,
  unSlugifyName,
} from "../../../utils/helperFunction";
import { useTrainingInstance } from "../customHooks/useTrainingInstances";
import TrainingDayHistoryTableRow from "../components/TrainingDayHistoryTableRow";

export default function TrainingDayHistoryModule() {
  const { id, trainingDayName } = useParams();
  const { trainingDays, isLoading } = useTrainingDays(id!);

  const choosenTrainingDay = trainingDays
    ?.filter(
      (el) => el.name.toLocaleLowerCase() === unSlugifyName(trainingDayName!)
    )
    .at(0);

  const { trainingInstances, isLoading: isLoadingTrainingInstances } =
    useTrainingInstance(choosenTrainingDay?.id);

  if (isLoading || isLoadingTrainingInstances) return "Loading...";

  console.log(trainingInstances);

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
            History
          </p>
          <p
            className={css({
              color: "typography.secondaryText",
            })}
          >
            History of all performances in this day
          </p>
        </div>
      </div>

      {trainingInstances?.map((el) => (
        <Table
          key={`${el.date}${el.exercises.length}`}
          headers={[
            "Date:",
            `${formatDate(el.date)}`,
            `${convertNumberToWeekDay(choosenTrainingDay?.day_order || 0, false)}`,
          ]}
          useLeftAlign={true}
        >
          {el.exercises.map((exe) => (
            <TrainingDayHistoryTableRow key={exe.name} entity={exe} />
          ))}
        </Table>
      ))}
    </div>
  );
}
