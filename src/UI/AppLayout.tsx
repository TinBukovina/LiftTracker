import { Outlet } from "react-router-dom";
import { css } from "../../styled-system/css";

import SecondaryNavigation from "../features/SecondaryNavigation/SecondaryNavigation";
import SideNavigation from "../features/PrimaryNavigation/SideNavigation";
import { Center } from "../../styled-system/jsx";

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
        <Center className={css({ padding: "40px" })}>
          <Outlet />
        </Center>
      </div>
    </div>
  );
}
