import { useState } from "react";
import { css } from "../../../styled-system/css";
import Logo from "../SecondaryNavigation/Logo";
import { styled } from "../../../styled-system/jsx";

const StyledInput = styled("input", {
  base: {
    padding: "0.5rem 0.75rem",
    backgroundColor: "effects.border",
    borderRadius: "md",
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

        padding: "3rem 0",
        height: "100vh",

        backgroundColor: "surface.s0",
      })}
    >
      <Logo size={4} />
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <p
          className={css({
            fontSize: "h5",
          })}
        >
          Login
        </p>

        <form
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          })}
        >
          <label>Email</label>
          <StyledInput
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <StyledInput
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
