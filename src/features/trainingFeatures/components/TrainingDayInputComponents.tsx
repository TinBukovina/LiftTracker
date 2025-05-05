import React, { useState } from "react";
import { css } from "../../../../styled-system/css";
import Select from "./Select";
import Button from "./Button";
import { useExercises } from "../customHooks/useExercises";
import {
  CreateTrainingSplitInputDataInterface,
  ExerciseInputInterface,
} from "../modules/CreateTrainingSplitModule";
import { closeSvgInfo } from "../../../utils/svgPaths";
import { convertNumberToWeekDay } from "../../../utils/helperFunction";

interface TrainingDayInputComponentsProps {
  exercises: ExerciseInputInterface[];
  name: string;
  setter: React.Dispatch<
    React.SetStateAction<CreateTrainingSplitInputDataInterface>
  >;
  index: number;
}

export default function TrainingDayInputComponents({
  exercises,
  name,
  setter,
  index,
}: TrainingDayInputComponentsProps) {
  const [optionValue, setOptionValue] = useState<string>("");
  const [isRemovingMode, setIsRemovingMode] = useState<boolean>(false);

  const { exercises: exercisesFromDatabase, isLoading } = useExercises();

  if (isLoading) return "Loading...";

  /* console.log(exercisesFromDatabase); */
  exercisesFromDatabase?.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      })}
    >
      <p
        className={css({
          textAlign: "center",
        })}
      >
        {convertNumberToWeekDay(index + 1, false)}
      </p>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",

          padding: "0.5rem",
          width: "15rem",

          backgroundColor: "surface.s0",
          border: "2px solid token(colors.effects.border)",
          borderRadius: "md",
        })}
      >
        <div
          className={css({
            display: "flex",
            gap: "0.5rem",
          })}
        >
          <input
            placeholder="Training day name"
            value={name}
            onChange={(e) =>
              setter((prev) => ({
                ...prev,
                trainingDays: prev.trainingDays.map((el, i) => {
                  if (i === index) {
                    return {
                      ...el,
                      name: e.target.value,
                    };
                  }

                  return el;
                }),
              }))
            }
            className={css({
              flex: "1",

              padding: "0.3rem 1rem",
              width: "100%",

              backgroundColor: "input.bg.form",
              border: "2px solid token(colors.input.border.form)",
              borderRadius: "sm",

              color: "typography.text",

              _focus: {
                outline: "none",
                borderColor: "input.focus.border",
              },

              _hover: {
                outline: "none",
                borderColor: "input.hover.border",
              },
            })}
          />
          <Button
            w="48px"
            svgOn={true}
            svgFunction={closeSvgInfo}
            type={isRemovingMode ? "negative" : "normal"}
            onClick={(e) => {
              e?.preventDefault();

              setIsRemovingMode((prev) => !prev);
            }}
          />
        </div>

        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",

            paddingRight: "0.5rem",
            height: "150px",

            overflow: "auto",

            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "table.scrollBarSecond",
              borderRadius: "4px",
            },
          })}
        >
          {exercises.map((el) => (
            <div
              onClick={() => {
                setter((prev) => ({
                  ...prev,
                  trainingDays: prev.trainingDays.map((x, i) => {
                    if (i === index) {
                      return {
                        ...x,
                        exercises: x.exercises.filter(
                          (y) => y.name.toLowerCase() !== el.name.toLowerCase()
                        ),
                      };
                    }

                    return x;
                  }),
                }));
              }}
              className={css({
                padding: "0.5rem 0.75rem",

                border: !isRemovingMode
                  ? "2px solid white"
                  : "2px solid token(colors.actions.red)",
                borderRadius: "sm",

                cursor: !isRemovingMode ? "default" : "pointer",

                _hover: isRemovingMode
                  ? {
                      backgroundColor: "actions.redLight",

                      color: "typography.textInvert",
                    }
                  : {},
              })}
            >
              {el.name}
            </div>
          ))}
        </div>

        <Select
          options={exercisesFromDatabase
            ?.filter(
              (el) =>
                !exercises.some(
                  (x) => x.name.toLowerCase() === el.name.toLowerCase()
                )
            )
            .map((el) => ({
              label: el.name,
              value: el.name.toLowerCase(),
            }))}
          value={optionValue}
          onChange={setOptionValue}
        />

        <Button
          w="100%"
          onClick={(e) => {
            e?.preventDefault();
            setter((prev) => ({
              ...prev,
              trainingDays: prev.trainingDays.map((el, i) => {
                if (i === index) {
                  return {
                    ...el,
                    exercises: [
                      ...el.exercises,
                      {
                        name: optionValue,
                        id:
                          exercisesFromDatabase?.find(
                            (x) =>
                              x.name.toLowerCase() === optionValue.toLowerCase()
                          )?.id || "",
                      },
                    ],
                  };
                }

                return el;
              }),
            }));
          }}
        >
          Add exercise
        </Button>
      </div>
    </div>
  );
}
