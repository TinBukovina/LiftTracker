import IconTemplate from "./IconTemplate";
import { SvgReturnType, menuSvgInfo } from "../../utils/svgPaths";
import { css } from "../../../styled-system/css";
import { useRef, useState } from "react";
import { useNavigation } from "../../contexts/NavigationContext";

export default function NavigationBtn() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const {
    isNavigationVisible,
    toggleNavigation,
    setNavigationSide,
    navigationSide,
  } = useNavigation();

  const svgInfoRef = useRef<SvgReturnType>(menuSvgInfo());

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        toggleNavigation();
      }}
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

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
        width="80%"
        height="80%"
        path={svgInfoRef.current.path}
        viewBox={svgInfoRef.current.viewBox}
      />
    </div>
  );
}
