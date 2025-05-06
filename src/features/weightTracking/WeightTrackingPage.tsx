import { useEffect, useState } from "react";
import { css } from "../../../styled-system/css";
import { Box, Flex } from "../../../styled-system/jsx";
import {
  convertKgToLbs,
  ensureISOString,
  formatDate,
  roundNumberToNDecimalPoints,
} from "../../utils/helperFunction";
import {
  closeSvgInfo,
  plusSvgInfo,
  rightArrowInfo,
} from "../../utils/svgPaths";
import { useLoggedUserInfo } from "../authentification/context/LoggedUserContext";
import Button from "../trainingFeatures/components/Button";
import { useCreateUserWeight } from "./useCreateUserWeight";
import { useUserWeights } from "./useUserWeights";
import { useToast } from "../toasts/ToastContext";
import ChartComponent, { DataPointInterface } from "./ChartComponent";
import { useWindowWidth } from "../../customHooks/useWindowWidth";

export default function WeightTrackingPage() {
  const [daylieWeightInput, setDaylieWeightInput] = useState<number | null>(
    null
  );
  const [weightInput, setWeightInput] = useState<number | null>(null);
  const [dateInput, setDateInput] = useState<string | null>(null);
  const [chartData, setChartData] = useState<DataPointInterface[]>([]);
  const [isDisplayedAddWeightSection, setIsDisplayedAddWeidghtSection] =
    useState<boolean>(false);

  const { userWeights } = useUserWeights();
  const createUserWeight = useCreateUserWeight();
  const windowWidth = useWindowWidth();

  const { addNewToast } = useToast();
  const { loggedUserId } = useLoggedUserInfo();

  useEffect(() => {
    const convertedUserWeightToChartData: DataPointInterface[] | null =
      userWeights?.map((el) => ({
        date: el.created_at,
        value: el.weight_kg,
      })) || null;

    if (!convertedUserWeightToChartData) return;

    setChartData(convertedUserWeightToChartData);
  }, [userWeights]);

  const isUserWeighThemselvesToday = userWeights?.find(
    (el) => formatDate(el.created_at) === formatDate(new Date().toISOString())
  );
  return (
    <Flex flexDir={"column"} gap={"1.5rem"} w={"100%"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Box fontSize={"h5"}>Track you weight</Box>
        <Button
          svgOn={true}
          svgFunction={
            !isDisplayedAddWeightSection ? plusSvgInfo : closeSvgInfo
          }
          type={!isDisplayedAddWeightSection ? "positive" : "negative"}
          onClick={() => {
            if (isUserWeighThemselvesToday) {
              setIsDisplayedAddWeidghtSection((prev) => !prev);
            } else {
              addNewToast(
                "You need to weigh yourself today in order to do that.",
                "negative"
              );
            }
          }}
        >
          {windowWidth > 550
            ? !isDisplayedAddWeightSection
              ? "Add weight"
              : "Cancle"
            : ""}
        </Button>
      </Flex>

      {isDisplayedAddWeightSection ? (
        <Flex flexDir={"column"} gap={"0.5rem"}>
          <Flex alignItems={"center"} gap={"1rem"}>
            <Box fontSize={"h6"}>Enter for what date you want enter date:</Box>
            <input
              type="date"
              className={css({
                padding: "0.5rem 0.75rem",
                minWidth: "10rem",
                width: "10vw",
                height: "3rem",

                backgroundColor: "surface.s0",
                border: "2px solid token(colors.input.border.form)",
                borderRadius: "md",

                _focus: {
                  outline: "none",
                  border: "2px solid token(colors.input.border.form)",
                },

                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                  appearance: "none",
                  margin: 0,
                },
              })}
              value={dateInput || ""}
              onChange={(e) => {
                setDateInput(e.target.value);
              }}
            />
          </Flex>
          <Flex alignItems={"center"} gap={"1rem"}>
            <Box fontSize={"h6"}>Enter your weight: </Box>{" "}
            <input
              type="number"
              className={css({
                padding: "0.5rem 0.75rem",
                minWidth: "10rem",
                width: "10vw",
                height: "3rem",

                backgroundColor: "surface.s0",
                border: "2px solid token(colors.input.border.form)",
                borderRadius: "md",

                _focus: {
                  outline: "none",
                  border: "2px solid token(colors.input.border.form)",
                },

                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                  appearance: "none",
                  margin: 0,
                },
              })}
              value={weightInput || ""}
              onChange={(e) => {
                setWeightInput(Number(e.target.value));
              }}
            />
            <Button
              svgOn={true}
              svgFunction={rightArrowInfo}
              onClick={() => {
                if (!dateInput || !weightInput) {
                  addNewToast("You need to enter somethign.", "negative", 2);
                  return;
                }

                const isoDateString = ensureISOString(dateInput);

                createUserWeight.mutate({
                  user_id: loggedUserId,
                  created_at: isoDateString,
                  weight_kg: roundNumberToNDecimalPoints(weightInput, 2),
                  weight_lbs: convertKgToLbs(weightInput),
                });
              }}
            />
          </Flex>
        </Flex>
      ) : (
        ""
      )}

      {!isUserWeighThemselvesToday ? (
        <Flex flexDir={"column"} gap={"0.5rem"}>
          <Box fontSize={"h6"}>You didn't weigh yourself today!</Box>
          <Flex alignItems={"center"} gap={"1rem"}>
            <Box fontSize={"h6"}>Enter your weight: </Box>{" "}
            <input
              type="number"
              className={css({
                padding: "0.5rem 0.75rem",
                minWidth: "10rem",
                width: "10vw",
                height: "3rem",

                backgroundColor: "surface.s0",
                border: "2px solid token(colors.input.border.form)",
                borderRadius: "md",

                _focus: {
                  outline: "none",
                  border: "2px solid token(colors.input.border.form)",
                },

                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                  appearance: "none",
                  margin: 0,
                },
              })}
              value={daylieWeightInput || ""}
              onChange={(e) => {
                setDaylieWeightInput(Number(e.target.value));
              }}
            />
            <Button
              svgOn={true}
              svgFunction={rightArrowInfo}
              onClick={() => {
                if (!daylieWeightInput) {
                  addNewToast("You need to enter somethign.", "negative", 2);
                  return;
                }

                createUserWeight.mutate({
                  user_id: loggedUserId,
                  created_at: new Date().toISOString(),
                  weight_kg: roundNumberToNDecimalPoints(daylieWeightInput, 2),
                  weight_lbs: convertKgToLbs(daylieWeightInput),
                });

                setIsDisplayedAddWeidghtSection(false);
              }}
            />
          </Flex>
        </Flex>
      ) : (
        ""
      )}

      <Flex>
        <ChartComponent
          maxDataPoints={windowWidth > 700 ? 50 : 10}
          yAxisLabel="Weight"
          data={chartData}
          title="You weight"
          color="#0AA480"
        />
      </Flex>
    </Flex>
  );
}
