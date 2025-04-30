import { useRef } from "react";
import { css } from "../../../styled-system/css";
import NavLink from "./NavLink";
import {
  accountSvgInfo,
  analyticsSvgInfo,
  homeSvgInfo,
  infoSvgInfo,
  loginSvgInfo,
  logoutSvgInfo,
  settingSvgInfo,
  SvgReturnType,
} from "../../utils/svgPaths";
import { useLocation } from "react-router-dom";
import { useUser } from "../authentification/customHooks/useUser";
import { useLogout } from "../authentification/customHooks/useLogout";
import IconTemplate from "../secondaryNavigation/IconTemplate";
import { navLinks } from "./NavLinksConstants";

export default function SideNavigation() {
  const location = useLocation();

  const { isAuthenticated } = useUser();
  const { logout } = useLogout();

  const homeSvgInfoRef = useRef<SvgReturnType>(homeSvgInfo());
  const analyticsSvgInfoRef = useRef<SvgReturnType>(analyticsSvgInfo());
  const accountSvgInfoRef = useRef<SvgReturnType>(accountSvgInfo());
  const settingsSvgInfoRef = useRef<SvgReturnType>(settingSvgInfo());
  const infoSvgInfoRef = useRef<SvgReturnType>(infoSvgInfo());
  const loginSvgInfoRef = useRef<SvgReturnType>(loginSvgInfo());
  const logoutSvgInfoRef = useRef<SvgReturnType>(logoutSvgInfo());

  const handleLogout = () => {
    logout();
  };
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        padding: "2rem 1rem",
        minWidth: "230px",

        backgroundColor: "navigation.primary",
        border: "2px solid transparent",
        borderRightColor: "navigation.border",
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        })}
      >
        <NavLink
          to={navLinks.trainingSplits}
          isActive={
            location.pathname.includes("trainingSplits") ||
            location.pathname.length === 1
          }
        >
          <IconTemplate
            width="24"
            height="24"
            path={homeSvgInfoRef.current.path}
            viewBox={homeSvgInfoRef.current.viewBox}
          />
          Home
        </NavLink>
        <NavLink
          to={navLinks.analytics}
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
        <NavLink
          to={navLinks.account}
          isActive={location.pathname.includes("account")}
        >
          <IconTemplate
            width="24"
            height="24"
            path={accountSvgInfoRef.current.path}
            viewBox={accountSvgInfoRef.current.viewBox}
          />
          Account
        </NavLink>
        <NavLink
          to={navLinks.settings}
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
        <NavLink
          to={navLinks.info}
          isActive={location.pathname.includes("info")}
        >
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
        <NavLink
          to={navLinks.login}
          handleClick={handleLogout}
          isActive={location.pathname.includes("login")}
        >
          <IconTemplate
            width="24"
            height="24"
            path={
              !isAuthenticated
                ? loginSvgInfoRef.current.path
                : logoutSvgInfoRef.current.path
            }
            viewBox={
              !isAuthenticated
                ? loginSvgInfoRef.current.viewBox
                : logoutSvgInfoRef.current.viewBox
            }
          />
          {isAuthenticated ? "Logout" : "Login"}
        </NavLink>
      </div>
    </div>
  );
}
