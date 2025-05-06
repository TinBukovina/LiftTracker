import React, { useEffect, useRef, useState } from "react";
import { css } from "../../../../styled-system/css";
import IconTemplate from "../../secondaryNavigation/IconTemplate";
import { copySvgInfo, SvgReturnType } from "../../../utils/svgPaths";

interface CopyBtnProps {
  textToCopy: string;
}

export default function CopyBtn({ textToCopy }: CopyBtnProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const copySvgInfoRef = useRef<SvgReturnType>(copySvgInfo());
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const themeRef = useRef<boolean>(
    JSON.parse(localStorage.getItem("theme_lift_tracker") || "")
  );

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

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = textToCopy;
    }
  }, [textToCopy]);

  const handleCopy = async () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      if (!textAreaRef.current) {
        console.error("Textarea referenca ne postoji");
        return;
      }

      textAreaRef.current.value = textToCopy;

      textAreaRef.current.style.position = "fixed";
      textAreaRef.current.style.left = "-9999px";
      textAreaRef.current.style.top = "-9999px";

      textAreaRef.current.focus();
      textAreaRef.current.select();
      try {
        const successful = document.execCommand("copy");

        if (successful) {
          setSuccess(true);

          setTimeout(() => {
            setSuccess(null);
          }, 2000);
        } else {
          setSuccess(false);

          setTimeout(() => {
            setSuccess(null);
          }, 2000);
        }
      } catch (err) {
        console.log(err);
        setSuccess(false);

        setTimeout(() => {
          setSuccess(null);
        }, 2000);
      }

      textAreaRef.current.blur();
    } else {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setSuccess(true);

        setTimeout(() => {
          setSuccess(null);
        }, 2000);
      } catch (error) {
        console.log(error);
        setSuccess(false);

        setTimeout(() => {
          setSuccess(null);
        }, 2000);
      }
    }
  };

  return (
    <div>
      {/* Hidden textarea elemnt in for IOS to copy text */}
      <textarea
        ref={textAreaRef}
        defaultValue={textToCopy}
        style={{
          position: "fixed",
          left: "-9999px",
          top: "-9999px",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
          fontSize: "16px",
          width: "100px",
          height: "50px",
        }}
        readOnly
      />

      <div
        onClick={handleCopy}
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
        style={{
          borderColor: success
            ? "#0AA480"
            : success === false
              ? "#D82222"
              : "#27303F",
          fill: success ? "#0AA480" : success === false ? "#D82222" : "",
          backgroundColor:
            success !== null ? (!themeRef.current ? "#FDFDFD" : "#0D1625") : "",
        }}
      >
        <IconTemplate
          path={copySvgInfoRef.current.path}
          viewBox={copySvgInfoRef.current.viewBox}
        />
      </div>
    </div>
  );
}
