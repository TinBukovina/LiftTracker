import { css } from "../../../../styled-system/css";
import { plusSvgInfo } from "../../../utils/svgPaths";
import Button from "../components/Button";
import { useTrainingSplits } from "../customHooks/useTrainingSplits";
import Table from "./Table";

export default function TrainingSplitWindow() {
  const { isLoading, trainingSplits, error } = useTrainingSplits();

  if (isLoading) return "Loading...";
  if (error) {
    console.log(error);
    return "There was a error while running useTrainingSPlits.";
  }

  console.log(trainingSplits);

  trainingSplits?.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
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
            Trainging Split
          </p>
          <p
            className={css({
              color: "typography.secondaryText",
            })}
          >
            List of your training plans and programs
          </p>
        </div>
        <Button svgOn={true} svgFunction={plusSvgInfo} type="positive">
          Create
        </Button>
      </div>

      <Table data={trainingSplits} />
    </div>
  );
}
