import { Outlet } from "react-router-dom";
import { css } from "../../styled-system/css";

import SecondaryNavigation from "../features/SecondaryNavigation/SecondaryNavigation";
import SideNavigation from "../features/PrimaryNavigation/SideNavigation";
import { Center } from "../../styled-system/jsx";
import { useToast } from "../features/toasts/ToastContext";
import { useEffect } from "react";

export default function AppLayout() {
  const { addNewToast } = useToast();

  useEffect(() => {
    addNewToast("First notification", "positive");
    addNewToast("Second notification", "negative");
    addNewToast("Third notification", "positive");
  }, [addNewToast]);

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
