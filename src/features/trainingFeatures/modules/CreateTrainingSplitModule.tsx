import { useState } from "react";
import { css } from "../../../../styled-system/css";
import InputComponent from "../../authentification/components/InputComponent";
import Divider from "../../../components/Divider";
import Button from "../components/Button";
import { leftArrowInfo, rightArrowInfo } from "../../../utils/svgPaths";
import { useToast } from "../../toasts/ToastContext";
import TrainingDayInputComponents from "../components/TrainingDayInputComponents";
import { useLoggedUserInfo } from "../../authentification/context/LoggedUserContext";
import { useCreateTrainingSplit } from "../customHooks/useCreateTrainingSplit";

export interface ExerciseInputInterface {
  name: string;
  id: string;
}

interface TrainingDayInterface {
  name: string;
  exercises: ExerciseInputInterface[];
  dayOrder: number;
}

export interface CreateTrainingSplitInputDataInterface {
  name: string;
  description: string;
  trainingDays: TrainingDayInterface[];
}

type InputStepType = "one" | "two";

export default function CreateTrainingSplitModule() {
  const [inputData, setInputData] =
    useState<CreateTrainingSplitInputDataInterface>({
      name: "",
      description: "",
      trainingDays: [
        {
          name: "",
          exercises: [],
          dayOrder: 1,
        },
        {
          name: "",
          exercises: [],
          dayOrder: 2,
        },
        {
          name: "",
          exercises: [],
          dayOrder: 3,
        },
        {
          name: "",
          exercises: [],
          dayOrder: 4,
        },
        {
          name: "",
          exercises: [],
          dayOrder: 5,
        },
        {
          name: "",
          exercises: [],
          dayOrder: 6,
        },
        {
          name: "",
          exercises: [],
          dayOrder: 7,
        },
      ],
    });
  const [inputStep, setInputStep] = useState<InputStepType>("one");

  const { addNewToast } = useToast();
  const { loggedUserId } = useLoggedUserInfo();
  const createTrainingSplit = useCreateTrainingSplit();

  return (
    <div
      className={css({
        position: "relative",

        flex: "1",
        minHeight: "0",

        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",

        overflow: "hidden",
      })}
    >
      {/* <div
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
            Create training split
          </p>
          <p
            className={css({
              color: "typography.secondaryText",
            })}
          >
            Create your training split
          </p>
        </div>
      </div> */}

      <div
        className={css({
          flex: "1",
          minHeight: "0",

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "end",
          gap: "2rem",

          margin: "0 auto",

          padding: "1rem",
          width: "100%",
          maxWidth: inputStep === "one" ? "400px" : "100%",

          backgroundColor: "surface.s1",
          border: "2px solid token(colors.effects.border)",
          borderRadius: "md",

          overflow: "auto",

          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "table.scrollBar",
            borderRadius: "4px",
          },
        })}
      >
        <form
          className={css({
            width: "100%",
          })}
        >
          {inputStep === "one" ? (
            <>
              <InputComponent
                name="name"
                type="text"
                label="Name"
                value={inputData.name}
                setter={(e) => {
                  setInputData((prev) => ({ ...prev, name: e.target.value }));
                }}
              />

              <Divider value="2rem" />
              <label>Description</label>
              <Divider value="1rem" />
              <textarea
                value={inputData.description}
                onChange={(e) => {
                  setInputData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
                className={css({
                  padding: "0.5rem 0.75rem",
                  width: "100%",
                  minHeight: "5rem",

                  backgroundColor: "input.bg.form",
                  borderRadius: "md",

                  lineHeight: "1.7",
                })}
              />
            </>
          ) : (
            <>
              <p
                className={css({
                  marginBottom: "1rem",

                  fontSize: "h5",
                  textAlign: "center",
                })}
              >
                {inputData.name}
              </p>
              <div
                className={css({
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                  rowGap: "2rem",
                })}
              >
                {[...Array(7).keys()].map((_, index) => (
                  <TrainingDayInputComponents
                    exercises={inputData.trainingDays[index].exercises}
                    name={inputData.trainingDays[index].name}
                    setter={setInputData}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </form>

        <div
          className={css({
            display: "flex",
            justifyContent: "end",
            gap: "1rem",

            backgroundColor: "surface.s1",

            zIndex: "1",
          })}
        >
          {inputStep === "one" ? (
            <Button
              svgOn={true}
              svgFunction={rightArrowInfo}
              onClick={() => {
                if (inputData.name === "") {
                  addNewToast("You need to enter name.", "negative", 2);
                  return;
                }
                setInputStep("two");
              }}
            />
          ) : (
            <>
              <Button
                svgOn={true}
                svgFunction={leftArrowInfo}
                onClick={() => {
                  setInputStep("one");
                }}
              />
              <Button
                h="3rem"
                onClick={() => {
                  if (
                    inputData.trainingDays.filter((el) => el.name !== "")
                      .length <= 0
                  ) {
                    addNewToast(
                      "You need to name at least one training day",
                      "negative",
                      2
                    );
                    return;
                  }

                  if (
                    inputData.trainingDays
                      .filter((el) => el.name !== "")
                      .some((x) => x.exercises.length <= 0)
                  ) {
                    addNewToast(
                      "You need to have at least one exercise in every training day",
                      "negative",
                      2
                    );
                    return;
                  }

                  if (
                    inputData.trainingDays.some(
                      (el) => el.exercises.length > 0 && el.name === ""
                    )
                  ) {
                    addNewToast(
                      "You need to give name to training day if you have exercise(s) in it",
                      "negative",
                      4
                    );
                    return;
                  }

                  const filteredData = {
                    ...inputData,
                    trainingDays: inputData.trainingDays.filter(
                      (el) => el.name !== ""
                    ),
                  };
                  console.log(filteredData);

                  createTrainingSplit.mutate({
                    data: filteredData,
                    userId: loggedUserId,
                  });
                }}
              >
                Finish
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 
 *  position: inputStep === "two" ? "absolute" : "",
            left: "0",
            bottom: "0",

            display: "flex",
            justifyContent: "end",
            gap: "1rem",

            padding: inputStep === "two" ? "1rem" : "",
            width: "100%",

            backgroundColor: "surface.s1",
            border:
              inputStep === "two"
                ? "2px solid token(colors.effects.border)"
                : "",
            borderTop: "none",
            borderBottomLeftRadius: "md",
            borderBottomRightRadius: "md",

            zIndex: "15",
 */
