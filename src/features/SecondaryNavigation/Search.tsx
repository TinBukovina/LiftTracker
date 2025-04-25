import { useRef, useState } from "react";
import { css } from "../../../styled-system/css";
import { searchSvgInfo, SvgReturnType } from "../../utils/svgPaths";
import IconTemplate from "./IconTemplate";

export default function Search() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const svgInfoRef = useRef<SvgReturnType>(searchSvgInfo());

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={css({
        display: "flex",
        gap: "0.75rem",

        padding: "0.5rem 1rem",

        width: "200px",

        backgroundColor: !isHovered ? "search.bg" : "search.hoverBg",
        borderRadius: "sm",
        border: !isHovered
          ? "2px solid transparent"
          : "2px solid token(colors.surface.s3)",

        color: !isHovered ? "search.text" : "black",
        cursor: "pointer",
      })}
    >
      <div
        className={css({
          width: "100%",
          maxWidth: "24px",
        })}
      >
        <IconTemplate
          viewBox={svgInfoRef.current.viewBox}
          path={svgInfoRef.current.path}
          fill={isHovered ? "#0D1625" : "#f4f4f4"}
        />
      </div>

      <input
        type="text"
        placeholder="Search"
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          width: "100%",

          _placeholder: {
            color: !isHovered ? "search.text" : "black",
            fontSize: "md",
          },
          _focus: {
            border: "none",
            outline: "none",
          },
        })}
      />
    </div>
  );
}
