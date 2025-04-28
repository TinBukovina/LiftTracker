import { Outlet, useLocation, useParams } from "react-router-dom";
import { css } from "../../../../styled-system/css";

import BreadCrumbs from "../components/BreadCrumbs";

export default function TrainingPage() {
  const { id, trainingDayName } = useParams();
  const location = useLocation();

  const breadCrumbsLinks = ["Training split"];
  if (id) {
    breadCrumbsLinks.push("Training day");
  }

  if (trainingDayName !== "" && trainingDayName) {
    if (location.pathname.includes("history")) {
      breadCrumbsLinks.push("History");
    } else {
      console.log("Uslo je");
      breadCrumbsLinks.push("Training");
    }
  }

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
      <BreadCrumbs links={breadCrumbsLinks} />

      <Outlet />
    </div>
  );
}
