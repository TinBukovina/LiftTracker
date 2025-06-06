import { css } from "../../../styled-system/css";

interface LogoProps {
  size?: number;
  border?: boolean;
}

export default function Logo({ size, border = false }: LogoProps) {
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        minWidth: {
          base: "130px",
          xs: "230px",
        },
        height: "100%",

        borderRight: border ? "2px solid token(colors.navigation.border)" : "",

        color: "typography.text",
        fontSize: {
          base: "1.5rem",
          xs:
            size === 1
              ? "h1"
              : size === 2
                ? "h2"
                : size === 3
                  ? "h3"
                  : size === 4
                    ? "h4"
                    : size === 6
                      ? "h6"
                      : "h5",
        },

        fontWeight: "semibold",
      })}
    >
      LiftTracker
    </div>
  );
}
