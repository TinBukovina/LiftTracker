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
import { useWindowWidth } from "../../../customHooks/useWindowWidth";
import { useTrainingInstance } from "../customHooks/useTrainingInstances";
import { useCurrentTrainingDayId } from "../customHooks/useCurrentTrainingDayId";

interface LastInputOfInputdataInterfac {
  [key: string]: ValuesInterface;
}

interface ValuesInterface {
  val1: string;
  val2: string;
  index: number;
  startTime: number | null;
}

export interface InputDataInterface {
  id?: string;
  exercise: string;
  values: ValuesInterface[];
}

interface LocalStorageTrainingData {
  inputData: InputDataInterface[];
  trainningDay: string;
  choosenExercises: string[];
}

export default function TrainingDayModule() {
  const { loggedUserId } = useLoggedUserInfo();
  const { addNewToast } = useToast();
  const [selectValue, setSelectValue] = useState<string>("");
  const [choosenExercises, setChoosenExercises] = useState<string[]>([]);

  const [inputData, setInputData] = useState<InputDataInterface[]>([]);

  const { id, trainingDayName } = useParams();
  const { trainingDays, isLoading } = useTrainingDays(id!);
  const { currentTrainingDayId } = useCurrentTrainingDayId();
  const { trainingInstances, isLoading: isLoadingTrainingInstances } =
    useTrainingInstance(currentTrainingDayId!);
  const createTrainingInstance = useCreateTrainingInstance();

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (inputData.length > 0) {
      localStorage.setItem(
        `trainingInputData_${id}`,
        JSON.stringify({
          trainningDay: trainingDayName,
          inputData,
          choosenExercises,
        })
      );
    }
  }, [inputData, choosenExercises, trainingDayName, id]);

  // Start training timer
  useEffect(() => {
    if (localStorage.getItem("trainingStartTime") === null) {
      localStorage.setItem("trainingStartTime", new Date().toISOString());
    }

    const localStorageTrainingDataString = localStorage.getItem(
      `trainingInputData_${id}`
    );

    if (!localStorageTrainingDataString) {
      return;
    }
    const localStorageTrainingData: LocalStorageTrainingData = JSON.parse(
      localStorageTrainingDataString
    );

    if (localStorageTrainingData.trainningDay !== trainingDayName) {
      localStorage.removeItem(`trainingInputData_${id}`);
      return;
    }

    const savedInputData = localStorageTrainingData.inputData;
    const savedChoosenExercises = localStorageTrainingData.choosenExercises;

    if (savedInputData) {
      setInputData(savedInputData);
    }

    if (savedChoosenExercises) {
      setChoosenExercises(savedChoosenExercises);
    }
  }, [id, trainingDayName]);

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

  if (isLoadingExercises || isLoading || isLoadingTrainingInstances)
    return "Loading...";

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
            justifyContent: "start",
          })}
        >
          <div
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",

              padding: "1rem 2rem",
              paddingX: windowWidth > 768 ? "2rem" : "1rem",

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
              mWidth={true}
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
                            startTime: null,
                          },
                        ],
                      },
                    ];
                  });

                  return [...prevChoosenExercises, selectedExerciseName];
                });
              }}
            >
              {windowWidth > 440 ? "Add" : ""}
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
                    paddingX: windowWidth > 768 ? "2rem" : "1rem",

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
                    paddingX: windowWidth > 768 ? "2rem" : "1rem",

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
                    .map((performedExe, i) => {
                      return (
                        <TrainingTableRow
                          startTime={performedExe.startTime || null}
                          secondToLastChild={
                            i === exerciseData.values.length - 2
                          }
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
                                      ...performedExe,
                                      val1: e.target.value,
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
                                      ...performedExe,
                                      val2: e.target.value,
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
                  onClick={() => {
                    console.log(trainingInstances);
                  }}
                  placeholder1={(() => {
                    const sortedTrainingInstance = trainingInstances?.sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    );

                    if (!sortedTrainingInstance) {
                      return "ENTER";
                    }

                    for (const trainingInstance of sortedTrainingInstance) {
                      const find = trainingInstance.exercises.find(
                        (el) => el.name === choosenExerciseName
                      );

                      if (find) {
                        return (
                          find.data.find(
                            (x) =>
                              x.set_order ===
                              lastInputs[choosenExerciseName].index
                          )?.weight || "ENTER"
                        );
                      }
                    }
                    return "ENTER";
                  })()}
                  placeholder2={(() => {
                    const sortedTrainingInstance = trainingInstances?.sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    );

                    if (!sortedTrainingInstance) {
                      return "ENTER";
                    }

                    for (const trainingInstance of sortedTrainingInstance) {
                      const find = trainingInstance.exercises.find(
                        (el) => el.name === choosenExerciseName
                      );

                      if (find) {
                        return (
                          find.data.find(
                            (x) =>
                              x.set_order ===
                              lastInputs[choosenExerciseName].index
                          )?.reps || "ENTER"
                        );
                      }
                    }
                    return "ENTER";
                  })()}
                  startTime={lastInputs[choosenExerciseName].startTime || null}
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
                              ...lastInputs[choosenExerciseName],
                              val1: e.target.value,
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
                              ...lastInputs[choosenExerciseName],
                              val2: e.target.value,
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

                      console.log(choosenInputData);

                      // Setting up startTimer for new performed set
                      const lastSet = choosenInputData.values
                        .sort((a, b) => b.index - a.index)
                        .map((x) => ({
                          ...x,
                          startTime: Date.now(),
                        }))
                        .at(0);

                      console.log(lastSet);

                      if (!lastSet) {
                        return pid;
                      }

                      const filteredInputData = pid.filter(
                        (x) =>
                          x.exercise.toLowerCase() !==
                          choosenExerciseName.toLowerCase()
                      );

                      if (!filteredInputData) {
                        return pid;
                      }

                      return [
                        ...filteredInputData,
                        {
                          ...choosenInputData,
                          values: [
                            ...(choosenInputData?.values.filter(
                              (x) => x.index !== lastSet?.index
                            ) || []),
                            lastSet,
                            {
                              val1: "",
                              val2: "",
                              index: lastInputs[choosenExerciseName].index + 1,
                              startTime: null,
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
                localStorage.removeItem(`trainingInputData_${id}`);
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
