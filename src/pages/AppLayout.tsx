import { Outlet } from "react-router-dom";
import { css } from "../../styled-system/css";

import SecondaryNavigation from "../features/secondaryNavigation/SecondaryNavigation";
import SideNavigation from "../features/primaryNavigation/SideNavigation";

export default function AppLayout() {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateRows: "85px auto",
        height: "100vh",
        maxHeight: "100vh",
        backgroundColor: "surface.s0",
        color: "typography.text",
        overflow: "hidden",
      })}
    >
      <SecondaryNavigation />

      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          overflow: "hidden",
        })}
      >
        <SideNavigation />
        <div
          className={css({
            display: "flex",
            padding: "2rem",
            overflow: "hidden",
          })}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
