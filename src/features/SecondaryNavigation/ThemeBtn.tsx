import { useRef, useState } from "react";
import { css } from "../../../styled-system/css";
import IconTemplate from "./IconTemplate";
import { sunSvgInfo, svgReturnType } from "../../utils/svgPaths";

export default function ThemeBtn() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const svgInfoRef = useRef<svgReturnType>(sunSvgInfo());

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={css({
        padding: "0.5rem",
        width: "48px",
        height: "48px",

        backgroundColor: !isHovered
          ? "navigationBtnsnavigationBtns.bg"
          : "navigationBtns.bgHover",
        border: "2px solid token(colors.navigationBtns.border)",
        borderRadius: "md",

        cursor: "pointer",
      })}
    >
      <IconTemplate
        path={svgInfoRef.current.path}
        viewBox={svgInfoRef.current.viewBox}
        fill={isHovered ? "#0D1625" : "#f4f4f4"}
      />
    </div>
  );
}
