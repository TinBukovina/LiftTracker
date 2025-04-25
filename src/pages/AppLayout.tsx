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
        backgroundColor: "surface.s0",
        color: "typography.text",
      })}
    >
      <SecondaryNavigation />

      <div
        className={css({
          display: "flex",
        })}
      >
        <SideNavigation />
        <div className={css({ padding: "2rem", width: "100%" })}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
