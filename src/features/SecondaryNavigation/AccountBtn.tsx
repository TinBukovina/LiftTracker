import IconTemplate from "./IconTemplate";
import { SvgReturnType, userSvgInfo } from "../../utils/svgPaths";
import { css } from "../../../styled-system/css";
import { useRef, useState } from "react";

export default function AccountBtn() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const svgInfoRef = useRef<SvgReturnType>(userSvgInfo());

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

        fill: !isHovered ? "typography.text" : "typography.textHover",
        color: !isHovered ? "typography.text" : "typography.textHover",
        cursor: "pointer",
      })}
    >
      <IconTemplate
        path={svgInfoRef.current.path}
        viewBox={svgInfoRef.current.viewBox}
      />
    </div>
  );
}
