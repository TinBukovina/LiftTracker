import { useState } from "react";
import { css } from "../../../styled-system/css";
import Logo from "../SecondaryNavigation/Logo";
import { styled } from "../../../styled-system/jsx";

const InputItem = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
});
const StyledLabel = styled("label", {
  base: {
    display: "block",
  },
});
const StyledInput = styled("input", {
  base: {
    padding: "0.5rem 1rem",
    width: "100%",

    backgroundColor: "effects.border",
    borderRadius: "sm",
  },
});

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div
      className={css({
        display: "grid",
        gridTemplateRows: "auto 1fr",

        padding: "2rem 1rem",
        height: "100vh",

        backgroundColor: "surface.s0",
      })}
    >
      <Logo size={4} />
      <div
        className={css({
          marginTop: "6rem",
          marginX: "auto",
          width: "100%",
          maxWidth: "400px",
        })}
      >
        <p
          className={css({
            marginBottom: "1.5rem",
            fontSize: "h5",
            textAlign: "center",
          })}
        >
          Login
        </p>

        <form
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          })}
        >
          <InputItem>
            <StyledLabel htmlFor="email">Email</StyledLabel>

            <StyledInput
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputItem>
          <InputItem>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <StyledInput
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputItem>

          <button
            className={css({
              marginTop: "0.5rem",
              padding: "0.5rem",

              backgroundColor: "buttons.bg.form",
              border: "2px solid transparent",
              borderRadius: "sm",

              color: "buttons.text.form",
              fontWeight: "semibold",
              cursor: "pointer",

              _hover: {
                backgroundColor: "buttons.bgHover.form",
                border: "2px solid token(colors.effects.border)",
                color: "buttons.textHover.form",
              },
            })}
          >
            Login
          </button>
          <div>
            <p
              className={css({
                textAlign: "center",
                color: "typography.link",
              })}
            >
              Don't have an account?
            </p>
            <a
              className={css({
                display: "block",

                margin: "0 auto",
                width: "fit-content",

                textAlign: "center",
                color: "actions.green",
                cursor: "pointer",

                _hover: {
                  textDecoration: "underline",
                },
              })}
            >
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
