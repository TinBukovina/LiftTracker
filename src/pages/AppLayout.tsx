import { Outlet } from "react-router-dom";
import { css } from "../../styled-system/css";

import SecondaryNavigation from "../features/secondaryNavigation/SecondaryNavigation";
import SideNavigation from "../features/primaryNavigation/SideNavigation";
import { useNavigation } from "../contexts/NavigationContext";

export default function AppLayout() {
  const { navigationSide, isNavigationVisible, closeNavigation } =
    useNavigation();

  return (
    <div
      className={css({
        display: "grid",
        gridTemplateRows: "85px auto",

        height: "100dvh",
        maxHeight: "100vh",

        backgroundColor: "surface.s0",

        color: "typography.text",
        overflow: "hidden",
      })}
    >
      <SecondaryNavigation />

      <div
        className={css({
          display: "flex",
          flexDirection: navigationSide === "left" ? "row" : "row-reverse",
          overflow: "hidden",
        })}
      >
        <SideNavigation />
        <div
          onClick={() => {
            closeNavigation();
          }}
          className={css({
            display:
              navigationSide === "right"
                ? isNavigationVisible
                  ? "block"
                  : "none"
                : "none",

            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",

            zIndex: "5",
          })}
        ></div>
        <div
          className={css({
            flex: "1",

            display: "flex",
            padding: {
              base: "1rem",
              xs: "2rem",
            },
            paddingY: "2rem",
            overflow: "hidden",
          })}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
