import { useEffect, useRef, useState } from "react";
import { css } from "../../../styled-system/css";
import IconTemplate from "./IconTemplate";
import { moonSvgInfo, sunSvgInfo, SvgReturnType } from "../../utils/svgPaths";

export default function ThemeBtn() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("theme_lift_tracker") || "false")
  );
  const sunSvgInfoRef = useRef<SvgReturnType>(sunSvgInfo());
  const moonSvgInfoRef = useRef<SvgReturnType>(moonSvgInfo());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={css({
        padding: "0.5rem",
        width: "48px",
        height: "48px",

        backgroundColor: !isHovered
          ? "navigationBtns.bg"
          : "navigationBtns.bgHover",
        border: "2px solid token(colors.navigationBtns.border)",
        borderRadius: "md",

        fill: !isHovered ? "typography.text" : "typography.textHover",
        color: !isHovered ? "typography.text" : "typography.textHover",
        cursor: "pointer",
      })}
      onClick={() => {
        setIsDarkMode((prev) => {
          const isDarkModeVal = !prev;

          localStorage.setItem(
            "theme_lift_tracker",
            JSON.stringify(isDarkModeVal)
          );

          return isDarkModeVal;
        });
      }}
    >
      {isDarkMode ? (
        <IconTemplate
          path={sunSvgInfoRef.current.path}
          viewBox={sunSvgInfoRef.current.viewBox}
        />
      ) : (
        <IconTemplate
          path={moonSvgInfoRef.current.path}
          viewBox={moonSvgInfoRef.current.viewBox}
        />
      )}
    </div>
  );
}
