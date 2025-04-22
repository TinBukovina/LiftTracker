import { useRef } from "react";
import { css } from "../../../styled-system/css";
import IconTemplate from "../SecondaryNavigation/IconTemplate";
import NavLink from "./NavLink";
import {
  accountSvgInfo,
  analyticsSvgInfo,
  homeSvgInfo,
  infoSvgInfo,
  loginSvgInfo,
  /* logoutSvgInfo, */
  settingSvgInfo,
  svgReturnType,
} from "../../utils/svgPaths";
import { useLocation } from "react-router-dom";

export default function SideNavigation() {
  const location = useLocation();

  const homeSvgInfoRef = useRef<svgReturnType>(homeSvgInfo());
  const analyticsSvgInfoRef = useRef<svgReturnType>(analyticsSvgInfo());
  const accountSvgInfoRef = useRef<svgReturnType>(accountSvgInfo());
  const settingsSvgInfoRef = useRef<svgReturnType>(settingSvgInfo());
  const infoSvgInfoRef = useRef<svgReturnType>(infoSvgInfo());
  const loginSvgInfoRef = useRef<svgReturnType>(loginSvgInfo());
  /* const logoutSvgInfoRef = useRef<svgReturnType>(logoutSvgInfo()); */

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        padding: "2rem 1rem",
        width: "230px",

        border: "2px solid transparent",
        borderRightColor: "effects.border",
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        })}
      >
        <NavLink to="/home" isActive={location.pathname.includes("home")}>
          <IconTemplate
            width="24"
            height="24"
            path={homeSvgInfoRef.current.path}
            viewBox={homeSvgInfoRef.current.viewBox}
          />
          Home
        </NavLink>
        <NavLink
          to="/analytics"
          isActive={location.pathname.includes("analytics")}
        >
          <IconTemplate
            width="24"
            height="24"
            path={analyticsSvgInfoRef.current.path}
            viewBox={analyticsSvgInfoRef.current.viewBox}
          />
          Analytics
        </NavLink>
        <NavLink to="/account" isActive={location.pathname.includes("account")}>
          <IconTemplate
            width="24"
            height="24"
            path={accountSvgInfoRef.current.path}
            viewBox={accountSvgInfoRef.current.viewBox}
          />
          Account
        </NavLink>
        <NavLink
          to="/settings"
          isActive={location.pathname.includes("settings")}
        >
          <IconTemplate
            width="24"
            height="24"
            path={settingsSvgInfoRef.current.path}
            viewBox={settingsSvgInfoRef.current.viewBox}
          />
          Settings
        </NavLink>
        <NavLink to="/info" isActive={location.pathname.includes("info")}>
          <IconTemplate
            width="24"
            height="24"
            path={infoSvgInfoRef.current.path}
            viewBox={infoSvgInfoRef.current.viewBox}
          />
          Info
        </NavLink>
      </div>
      <div>
        <NavLink to="/login" isActive={location.pathname.includes("login")}>
          <IconTemplate
            width="24"
            height="24"
            path={loginSvgInfoRef.current.path}
            viewBox={loginSvgInfoRef.current.viewBox}
          />
          Login
        </NavLink>
      </div>
    </div>
  );
}
