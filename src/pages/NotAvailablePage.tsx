import React from "react";
import NavLink from "../features/primaryNavigation/NavLink";
import { css } from "../../styled-system/css";

export default function NotAvailablePage() {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        gap: "1rem",

        padding: "1rem 15vw",
        width: "100%",
      })}
    >
      <p
        className={css({
          maxWidth: "600px",

          fontSize: "h3",
        })}
      >
        Whoops... this page is not yet available
      </p>
      <NavLink to="/trainingSplits">Go back</NavLink>
    </div>
  );
}
