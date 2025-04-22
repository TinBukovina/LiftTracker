import IconTemplate from "./IconTemplate";
import { svgReturnType, userSvgInfo } from "../../utils/svgPaths";
import { css } from "../../../styled-system/css";
import { useRef, useState } from "react";

export default function AccountBtn() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const svgInfoRef = useRef<svgReturnType>(userSvgInfo());

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={css({
        width: "48px",
        height: "48px",
        backgroundColor: !isHovered
          ? "navigationBtns.bg"
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
