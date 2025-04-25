import { css } from "../../../../styled-system/css";
import { plusSvgInfo } from "../../../utils/svgPaths";
import BreadCrumbs from "../components/BreadCrumbs";
import Button from "../components/Button";
import Table from "../modules/Table";

export default function TrainingPage() {
  return (
    <div
      className={css({
        flex: "1",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",

        minHeight: 0,

        overflowY: "auto",

        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "surface.s1",
          borderRadius: "4px",
        },
      })}
    >
      <BreadCrumbs links={["Training split"]} />

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

        <Table></Table>
      </div>
    </div>
  );
}
