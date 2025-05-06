import { useParams } from "react-router-dom";
import { css } from "../../../../styled-system/css";

import Table from "./Table";
import { useTrainingDays } from "../customHooks/useTrainingDays";
import {
  convertNumberToWeekDay,
  formatDate,
  unSlugifyName,
  uppercaseFirstLetter,
} from "../../../utils/helperFunction";
import {
  useTrainingInstance,
  UseTrainingInstanceReturnData,
} from "../customHooks/useTrainingInstances";
import TrainingDayHistoryTableRow from "../components/TrainingDayHistoryTableRow";
import Divider from "../../../components/Divider";
import { useWindowWidth } from "../../../customHooks/useWindowWidth";
import CopyBtn from "../components/CopyBtn";
import { TableHeaderStyle } from "../components/TableHeader";
import { Flex } from "../../../../styled-system/jsx";

export default function TrainingDayHistoryModule() {
  const { id, trainingDayName } = useParams();
  const { trainingDays, isLoading } = useTrainingDays(id!);

  const windowWidth = useWindowWidth();

  const choosenTrainingDay = trainingDays
    ?.filter(
      (el) => el.name.toLocaleLowerCase() === unSlugifyName(trainingDayName!)
    )
    .at(0);

  const { trainingInstances, isLoading: isLoadingTrainingInstances } =
    useTrainingInstance(choosenTrainingDay?.id);

  if (isLoading || isLoadingTrainingInstances) return "Loading...";

  trainingInstances?.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getTrainingInstanceDataInTextFormat = (
    trainingInstanceData: UseTrainingInstanceReturnData
  ): string => {
    let output: string = "";

    output += `Date: ${formatDate(trainingInstanceData.date)}\n`;

    for (const exercise of trainingInstanceData.exercises) {
      output += `${uppercaseFirstLetter(exercise.name)}: `;

      let index = 0;
      for (const setPerformance of exercise.data.sort(
        (a, b) => a.set_order! - b.set_order!
      )) {
        if (index !== 0) output += ", ";
        output += `${setPerformance.weight}x${setPerformance.reps}`;
        index++;
      }
      output += "\n";
    }

    return output;
  };

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
              headers={[]}
              removeHeader={true}
            >
              <TableHeaderStyle
                className={css({
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                })}
              >
                <Flex gap={"1rem"}>
                  <span>Date:</span>
                  <span className={css({})}>
                    {windowWidth > 500
                      ? formatDate(el.date)
                      : formatDate(el.date, true)}
                  </span>
                  <span
                    className={css({
                      display: {
                        base: "none",
                        xs: "inline-block",
                      },
                    })}
                  >
                    {convertNumberToWeekDay(
                      choosenTrainingDay?.day_order || 0,
                      false
                    )}
                  </span>
                </Flex>
                <CopyBtn textToCopy={getTrainingInstanceDataInTextFormat(el)} />
              </TableHeaderStyle>
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

/*
Date: 27-03-2025
Incline Bench Press: 100x100, 100x100, 100x100
Cable Crossover: 100x100

*/
