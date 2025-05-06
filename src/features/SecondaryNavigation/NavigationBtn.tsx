import IconTemplate from "./IconTemplate";
import { SvgReturnType, menuSvgInfo } from "../../utils/svgPaths";
import { css } from "../../../styled-system/css";
import { useRef, useState } from "react";
import { useNavigation } from "../../contexts/NavigationContext";

export default function NavigationBtn() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const { toggleNavigation } = useNavigation();

  const svgInfoRef = useRef<SvgReturnType>(menuSvgInfo());

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
      onClickCapture={(e) => {
        e.preventDefault();
      }}
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

        fill: isTouched
          ? "typography.textActive"
          : !isHovered
            ? "typography.text"
            : "typography.textHover",
        color: isTouched
          ? "typography.textActive"
          : !isHovered
            ? "typography.text"
            : "typography.textHover",
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
