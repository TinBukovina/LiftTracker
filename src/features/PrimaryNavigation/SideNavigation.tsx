import { useEffect, useRef } from "react";
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
import { useNavigation } from "../../contexts/NavigationContext";

export default function SideNavigation() {
  const location = useLocation();

  const { isAuthenticated } = useUser();
  const { logout } = useLogout();
  const { isNavigationVisible, navigationSide } = useNavigation();

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
        display: isNavigationVisible ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "space-between",

        padding: "2rem 1rem",
        minWidth: {
          xs: "50px",
          sm: "130px",
          md: "230px",
        },

        backgroundColor: "navigation.primary",
        border: "2px solid transparent",
        borderRightColor: "navigation.border",

        transition: "all 0.3s ease",

        ...(navigationSide === "right"
          ? {
              borderLeftColor: "navigation.border",
              position: "absolute",
              height: "calc(100dvh - 85px)",
              zIndex: 10,
              width: "230px",
            }
          : {}),
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
          <span
            className={css({
              display:
                navigationSide === "left"
                  ? {
                      base: "none",
                      sm: "inline",
                    }
                  : {},
            })}
          >
            Home
          </span>
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
          <span
            className={css({
              display:
                navigationSide === "left"
                  ? {
                      base: "none",
                      sm: "inline",
                    }
                  : {},
            })}
          >
            Analytics
          </span>
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
          <span
            className={css({
              display:
                navigationSide === "left"
                  ? {
                      base: "none",
                      sm: "inline",
                    }
                  : {},
            })}
          >
            Account
          </span>
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
          <span
            className={css({
              display:
                navigationSide === "left"
                  ? {
                      base: "none",
                      sm: "inline",
                    }
                  : {},
            })}
          >
            Settings
          </span>
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
          <span
            className={css({
              display:
                navigationSide === "left"
                  ? {
                      base: "none",
                      sm: "inline",
                    }
                  : {},
            })}
          >
            Info
          </span>
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
          <span
            className={css({
              display:
                navigationSide === "left"
                  ? {
                      base: "none",
                      sm: "inline",
                    }
                  : {},
            })}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </span>
        </NavLink>
      </div>
    </div>
  );
}
