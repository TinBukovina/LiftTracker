import { useEffect, useState } from "react";
import { css } from "../../../../styled-system/css";
import Select, { SelectOption } from "../components/Select";
import Button from "../components/Button";
import { plusSvgInfo } from "../../../utils/svgPaths";
import { useExercisesFromTrainingDay } from "../customHooks/useExercisesFromTrainingDay";
import { useParams } from "react-router-dom";
import { useTrainingDays } from "../customHooks/useTrainingDays";
import {
  unSlugifyName,
  uppercaseFirstLetter,
} from "../../../utils/helperFunction";
import Table from "./Table";
import Divider from "../../../components/Divider";
import TrainingTableRow from "../components/TrainingTableRow";
import { useLoggedUserInfo } from "../../authentification/context/LoggedUserContext";
import { useCreateTrainingInstance } from "../customHooks/useCreateTrainingInstance";
import { CreateTrainingInstanceInterface } from "../types/trainingEntities";
import { useToast } from "../../toasts/ToastContext";

interface LastInputOfInputdataInterfac {
  [key: string]: ValuesInterface;
}

interface ValuesInterface {
  val1: string;
  val2: string;
  index: number;
}

export interface InputDataInterface {
  id?: string;
  exercise: string;
  values: ValuesInterface[];
}

export default function TrainingDayModule() {
  const { loggedUserId } = useLoggedUserInfo();
  const { addNewToast } = useToast();
  const [selectValue, setSelectValue] = useState<string>("");
  const [choosenExercises, setChoosenExercises] = useState<string[]>([]);

  const [inputData, setInputData] = useState<InputDataInterface[]>([]);

  const { id, trainingDayName } = useParams();
  const { trainingDays, isLoading } = useTrainingDays(id!);
  const createTrainingInstance = useCreateTrainingInstance();

  // Start training timer
  useEffect(() => {
    if (localStorage.getItem("trainingStartTime") === null) {
      localStorage.setItem("trainingStartTime", new Date().toISOString());
    }
  }, []);

  const choosenTrainingDay = trainingDays
    ?.filter(
      (el) => el.name.toLocaleLowerCase() === unSlugifyName(trainingDayName!)
    )
    .at(0);

  const { exerciseFromTrainingDay, isLoading: isLoadingExercises } =
    useExercisesFromTrainingDay(choosenTrainingDay?.id || "");

  /* console.log(exerciseFromTrainingDay); */

  const lastInputs: LastInputOfInputdataInterfac = inputData.reduce(
    (acc, el) => ({
      ...acc,
      [`${el.exercise}`]: el.values.sort((a, b) => b.index - a.index).at(0),
    }),
    {}
  );

  if (isLoadingExercises || isLoading) return "Loading...";

  const selectOptions: SelectOption[] | undefined = exerciseFromTrainingDay
    ?.filter(
      (exercise) =>
        !choosenExercises.some(
          (choosenExe) =>
            choosenExe.toLocaleLowerCase() === exercise.name.toLocaleLowerCase()
        )
    )
    .map((filteredExercises) => {
      return {
        value: filteredExercises.name,
        label: filteredExercises.name,
      };
    });

  function getInputDataObjFromExerciseName(
    exerciseName: string
  ): InputDataInterface | undefined {
    return inputData
      .filter((el) => el.exercise.toLowerCase() === exerciseName.toLowerCase())
      .at(0);
  }

  function getExerciseSetWithMaxIndexInInputData(
    exerciseName: string
  ): ValuesInterface | undefined {
    return inputData
      .filter((el) => el.exercise.toLowerCase() === exerciseName.toLowerCase())
      .at(0)
      ?.values.sort((a, b) => b.index - a.index)
      .at(0);
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
      <p
        className={css({
          fontSize: "h5",
        })}
      >
        Training
      </p>

      <div
        className={css({
          position: "relative",

          flex: "1",
          minHeight: "0",
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
        <div
          className={css({
            minHeight: "100%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          })}
        >
          <div
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              padding: "1rem 2rem",

              backgroundColor: "surface.s1",
              border: "2px solid token(colors.effects.border)",
              borderRadius: "md",
            })}
          >
            <Select
              options={selectOptions}
              value={selectValue}
              onChange={(value) => setSelectValue(value)}
              placeholder="Choose an option"
            />

            <Button
              type="positive"
              svgOn={true}
              svgFunction={plusSvgInfo}
              onClick={() => {
                const selectedExerciseName = selectValue.toLowerCase();

                setChoosenExercises((prevChoosenExercises) => {
                  if (
                    prevChoosenExercises.some(
                      (el) => el === selectedExerciseName
                    ) ||
                    selectValue === ""
                  ) {
                    addNewToast("You need to select exercise", "negative", 2);
                    return prevChoosenExercises;
                  }

                  setInputData((prevInputData) => {
                    if (
                      prevInputData.some(
                        (el) =>
                          el.exercise.toLowerCase() === selectedExerciseName
                      )
                    ) {
                      return prevInputData;
                    }

                    return [
                      ...prevInputData,
                      {
                        id: exerciseFromTrainingDay?.find(
                          (el) =>
                            el.name.toLowerCase() ===
                            selectedExerciseName.toLowerCase()
                        )?.id,
                        exercise: selectedExerciseName,
                        values: [
                          ...(prevInputData
                            .filter(
                              (x) =>
                                x.exercise.toLowerCase() ===
                                selectedExerciseName
                            )
                            .at(0)?.values || []),
                          {
                            val1: "",
                            val2: "",
                            index:
                              (getExerciseSetWithMaxIndexInInputData(
                                selectedExerciseName
                              )?.index || 1) - 1,
                          },
                        ],
                      },
                    ];
                  });

                  return [...prevChoosenExercises, selectedExerciseName];
                });
              }}
            >
              Add
            </Button>
          </div>
          <Divider value="2rem" />
          {choosenExercises.map((choosenExerciseName) => (
            <div key={choosenExerciseName}>
              <Table headers={[]}>
                <div
                  className={css({
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "-0.5rem",
                    padding: "1rem 2rem",

                    borderBottom: "2px solid token(colors.typography.text)",
                  })}
                >
                  <span>{uppercaseFirstLetter(choosenExerciseName)}</span>
                  <Button
                    type="negative"
                    onClick={() => {
                      setInputData((prevInputdata) => {
                        setChoosenExercises((prevChoosenExercises) => {
                          return [
                            ...prevChoosenExercises.filter(
                              (x) => x !== choosenExerciseName
                            ),
                          ];
                        });
                        return [
                          ...prevInputdata.filter(
                            (x) =>
                              x.exercise.toLowerCase() !==
                              choosenExerciseName.toLowerCase()
                          ),
                        ];
                      });
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <div
                  className={css({
                    position: "relative",

                    marginTop: "0.5rem",
                    padding: "1rem 2rem",

                    borderBottom: "2px solid token(colors.effects.border)",
                    fontSize: "md",
                    fontWeight: "normal",
                    color: "typography.text",

                    /* _hover: {
                  backgroundColor: "surface.s0",
                }, */
                  })}
                >
                  <span>Weight</span>
                  <span
                    className={css({
                      position: "absolute",
                      left: "172px",
                    })}
                  >
                    Reps
                  </span>
                </div>
                {(() => {
                  const exerciseData =
                    getInputDataObjFromExerciseName(choosenExerciseName);
                  if (!exerciseData) return null;

                  const maxIndex =
                    getExerciseSetWithMaxIndexInInputData(choosenExerciseName)
                      ?.index ?? -1;

                  return exerciseData.values
                    .sort((a, b) => a.index - b.index)
                    .filter((performedExe) => performedExe.index !== maxIndex)
                    .map((performedExe) => {
                      return (
                        <TrainingTableRow
                          key={`row-${choosenExerciseName}-${performedExe.index}`}
                          val1={performedExe.val1}
                          val2={performedExe.val2}
                          onChange1={(e) => {
                            setInputData((prevInputData) => {
                              const rightInput =
                                getInputDataObjFromExerciseName(
                                  choosenExerciseName
                                );
                              if (!rightInput) return prevInputData;

                              const filteredInputData = prevInputData.filter(
                                (pd) =>
                                  pd.exercise.toLowerCase() !==
                                  rightInput.exercise.toLowerCase()
                              );

                              return [
                                ...filteredInputData,
                                {
                                  ...rightInput,

                                  values: [
                                    ...rightInput.values.filter(
                                      (x) => x.index !== performedExe.index
                                    ),
                                    {
                                      val1: e.target.value,
                                      val2: performedExe.val2,
                                      index: performedExe.index,
                                    },
                                  ],
                                },
                              ];
                            });
                          }}
                          onChange2={(e) => {
                            setInputData((prevInputData) => {
                              const rightInput =
                                getInputDataObjFromExerciseName(
                                  choosenExerciseName
                                );
                              if (!rightInput) return prevInputData;

                              const filteredInputData = prevInputData.filter(
                                (pd) =>
                                  pd.exercise.toLowerCase() !==
                                  rightInput.exercise.toLowerCase()
                              );

                              return [
                                ...filteredInputData,
                                {
                                  ...rightInput,
                                  values: [
                                    ...rightInput.values.filter(
                                      (x) => x.index !== performedExe.index
                                    ),
                                    {
                                      val1: performedExe.val1,
                                      val2: e.target.value,
                                      index: performedExe.index,
                                    },
                                  ],
                                },
                              ];
                            });
                          }}
                          onBtnClick={() => {
                            setInputData((pid) => {
                              const choosenInputData =
                                getInputDataObjFromExerciseName(
                                  choosenExerciseName
                                );

                              if (!choosenInputData) {
                                return pid;
                              }

                              const filteredInputData = pid.filter(
                                (x) =>
                                  x.exercise.toLowerCase() !==
                                  choosenExerciseName.toLowerCase()
                              );

                              return [
                                ...filteredInputData,
                                {
                                  ...choosenInputData,
                                  values: [
                                    ...(choosenInputData?.values.filter(
                                      (x) => x.index !== performedExe.index
                                    ) || []),
                                  ],
                                },
                              ];
                            });
                          }}
                        />
                      );
                    });
                })()}
                <TrainingTableRow
                  lastChild={true}
                  key={`${choosenExerciseName}-entering-row`}
                  val1={lastInputs[choosenExerciseName]?.val1}
                  val2={lastInputs[choosenExerciseName]?.val2}
                  onChange1={(e) => {
                    setInputData((prevInputData) => {
                      const rightInput =
                        getInputDataObjFromExerciseName(choosenExerciseName);

                      if (!rightInput) {
                        return prevInputData;
                      }

                      const filteredInputData = prevInputData.filter(
                        (pd) =>
                          pd.exercise.toLowerCase() !==
                          rightInput.exercise.toLowerCase()
                      );

                      return [
                        ...filteredInputData,
                        {
                          ...rightInput,
                          values: [
                            ...rightInput.values.filter(
                              (x) =>
                                x.index !==
                                  lastInputs[choosenExerciseName]?.index || 0
                            ),
                            {
                              val1: e.target.value,
                              val2: lastInputs[choosenExerciseName]?.val2 || "",
                              index:
                                lastInputs[choosenExerciseName]?.index || 0,
                            },
                          ],
                        },
                      ];
                    });
                  }}
                  onChange2={(e) => {
                    setInputData((prevInputData) => {
                      const rightInput =
                        getInputDataObjFromExerciseName(choosenExerciseName);

                      if (!rightInput) {
                        return prevInputData;
                      }

                      const filteredInputData = prevInputData.filter(
                        (pd) =>
                          pd.exercise.toLowerCase() !==
                          rightInput.exercise.toLowerCase()
                      );

                      return [
                        ...filteredInputData,
                        {
                          ...rightInput,
                          values: [
                            ...rightInput.values.filter(
                              (x) =>
                                x.index !==
                                lastInputs[choosenExerciseName].index
                            ),
                            {
                              val1: lastInputs[choosenExerciseName]?.val1 || "",
                              val2: e.target.value,
                              index:
                                lastInputs[choosenExerciseName]?.index || 0,
                            },
                          ],
                        },
                      ];
                    });
                  }}
                  onBtnClick={() => {
                    setInputData((pid) => {
                      if (
                        lastInputs[choosenExerciseName].val1 === "" ||
                        lastInputs[choosenExerciseName].val2 === ""
                      ) {
                        addNewToast("You need to fill input.", "negative", 2);
                        return pid;
                      }

                      const choosenInputData =
                        getInputDataObjFromExerciseName(choosenExerciseName);

                      if (!choosenInputData) {
                        return pid;
                      }

                      const filteredInputData = pid.filter(
                        (x) =>
                          x.exercise.toLowerCase() !==
                          choosenExerciseName.toLowerCase()
                      );

                      return [
                        ...filteredInputData,
                        {
                          ...choosenInputData,
                          values: [
                            ...(choosenInputData?.values || []),
                            {
                              val1: "",
                              val2: "",
                              index: lastInputs[choosenExerciseName].index + 1,
                            },
                          ],
                        },
                      ];
                    });
                  }}
                />{" "}
              </Table>
              <Divider value="2rem" />
            </div>
          ))}

          <div
            className={css({
              position: "sticky",
              bottom: "0",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              paddingTop: "1rem",
              width: "100%",

              backgroundColor: "surface.s0",

              zIndex: "10",
            })}
          >
            <Button
              onClick={() => {
                const startTimeString =
                  localStorage.getItem("trainingStartTime");

                const filteredInputData: InputDataInterface[] = inputData.map(
                  (el) => ({
                    ...el,
                    values: el.values
                      .filter((x) => x.val1 !== "" && x.val2 !== "")
                      .sort((a, b) => a.index - b.index)
                      .map((x, newIndex) => ({
                        ...x,
                        index: newIndex,
                      })),
                  })
                );

                if (filteredInputData.length <= 0) {
                  addNewToast("You need to add some exercises.", "negative", 2);
                  return;
                }

                if (filteredInputData.some((el) => el.values.length <= 0)) {
                  addNewToast(
                    "You need to have some sets inputed in exercises.",
                    "negative",
                    2
                  );

                  return;
                }

                const createTrainingInstanceData: CreateTrainingInstanceInterface =
                  {
                    user_id: loggedUserId,
                    training_day_id: choosenTrainingDay?.id || "",
                    date: new Date().toISOString(),
                    start_time: startTimeString
                      ? new Date(startTimeString).toISOString()
                      : null,
                    end_time: new Date().toISOString(),
                    notes: "",
                    rating: 5,
                    is_completed: true,
                  };

                const data = {
                  trainingInstanceData: createTrainingInstanceData,
                  performedExercisesAndSets: filteredInputData,
                };
                console.log(data);

                createTrainingInstance.mutate(data);
                localStorage.removeItem("trainingStartTime");
              }}
            >
              Finish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
