import { useNavigate } from "react-router-dom";
import { css } from "../../../../styled-system/css";

import { plusSvgInfo } from "../../../utils/svgPaths";
import Button from "../components/Button";
import { useTrainingSplits } from "../customHooks/useTrainingSplits";
import Table from "./Table";
import TrainingSplitsTableRow from "../components/TrainingSplitsTableRow";

export default function TrainingSplitModule() {
  const navigate = useNavigate();
  const { isLoading, trainingSplits } = useTrainingSplits();

  const headers = ["Name", "Created at", "Status"];

  if (isLoading) return "Loading...";

  console.log(trainingSplits);
  trainingSplits
    ?.sort(
      (a, b) =>
        new Date(b.created_at || "").getTime() -
        new Date(a.created_at || "").getTime()
    )
    .sort((a, b) => {
      if (b.is_active && !a.is_active) {
        return 1;
      } else if (a.is_active && !b.is_active) {
        return -1;
      } else {
        return 0;
      }
    });

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
        <Button
          svgOn={true}
          svgFunction={plusSvgInfo}
          type="positive"
          onClick={() => {
            navigate("create");
          }}
        >
          Create
        </Button>
      </div>

      <Table headers={headers} isLastColumnEmpty={true}>
        {trainingSplits?.length ? (
          trainingSplits.map((el) => (
            <TrainingSplitsTableRow
              key={el.id}
              entity={el}
              onClick={(e) => {
                if (!(e.target instanceof HTMLButtonElement))
                  navigate(el?.id || "");
              }}
            />
          ))
        ) : (
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              height: "100%",

              color: "typography.secondaryText",
              cursor: "default",
              fontSize: "h5",
            })}
          >
            There is no data on this use
          </div>
        )}
      </Table>
    </div>
  );
}
