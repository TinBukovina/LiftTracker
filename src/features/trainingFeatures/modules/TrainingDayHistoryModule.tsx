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
import Divider from "../../../components/Divider";

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
  trainingInstances?.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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

      <div
        className={css({
          paddingRight: "1rem",
          overflow: "auto",

          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "surface.s2",
            borderRadius: "4px",
          },
        })}
      >
        {trainingInstances?.map((el) => (
          <div key={el.date}>
            <Table
              key={`${el.date}${el.exercises.length}`}
              headers={[
                "Date:",
                `${formatDate(el.date)}`,
                `${convertNumberToWeekDay(choosenTrainingDay?.day_order || 0, false)}`,
              ]}
              useLeftAlign={true}
            >
              {el.exercises.map((exe, index) =>
                index === el.exercises.length - 1 ? (
                  <TrainingDayHistoryTableRow
                    key={`${exe.name}${el.date}`}
                    entity={exe}
                    lastChild={true}
                  />
                ) : (
                  <TrainingDayHistoryTableRow
                    key={`${exe.name}${el.date}`}
                    entity={exe}
                  />
                )
              )}
            </Table>
            <Divider value="1.5rem" />
          </div>
        ))}
      </div>
    </div>
  );
}
