import { Outlet } from "react-router-dom";
import { css } from "../../../../styled-system/css";

import BreadCrumbs from "../components/BreadCrumbs";

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

      <Outlet />
    </div>
  );
}
