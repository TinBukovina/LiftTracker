import { useEffect, useRef, useState } from "react";
import { css } from "../../../styled-system/css";
import IconTemplate from "./IconTemplate";
import { moonSvgInfo, sunSvgInfo, SvgReturnType } from "../../utils/svgPaths";

export default function ThemeBtn() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("theme_lift_tracker") || "false")
  );
  const sunSvgInfoRef = useRef<SvgReturnType>(sunSvgInfo());
  const moonSvgInfoRef = useRef<SvgReturnType>(moonSvgInfo());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);

    if (!localStorage.getItem("theme_lift_tracker")) {
      localStorage.setItem("theme_lift_tracker", JSON.stringify(true));
    }
  }, [isDarkMode]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouched(true);

    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsTouched(false);
    }, 100);
  };

  const handleMouseEnter = () => {
    if (!isTouched) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouched) {
      setIsHovered(false);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={css({
        padding: "0.5rem",
        width: "48px",
        height: "48px",

        backgroundColor: !isHovered
          ? "navigationBtns.bg"
          : "navigationBtns.bgHover",
        border: "2px solid token(colors.navigationBtns.border)",
        borderRadius: "md",

        fill: !isTouched
          ? !isHovered
            ? "typography.text"
            : "typography.textHover"
          : "typography.text",
        color: !isTouched
          ? !isHovered
            ? "typography.text"
            : "typography.textHover"
          : "typography.text",
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
