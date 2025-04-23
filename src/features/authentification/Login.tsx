import React, { useState } from "react";
import { css } from "../../../styled-system/css";
import { NavLink } from "react-router-dom";

import Logo from "../SecondaryNavigation/Logo";
import InputComponent from "./InputComponent";
import FormButton from "./FormButton";

interface FormData {
  password: string;
  email: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    password: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form data\n", formData);
  };

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
          maxWidth: "350px",
        })}
      >
        <p
          className={css({
            marginBottom: "1.5rem",
            fontSize: "h5",
            fontWeight: "semibold",
            textAlign: "center",
          })}
        >
          Login
        </p>

        <form
          onSubmit={handleSubmit}
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          })}
        >
          <InputComponent
            label="Email"
            name="email"
            value={formData.email}
            setter={handleChange}
          />
          <InputComponent
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            setter={handleChange}
          />

          <FormButton>Login</FormButton>
          <div>
            <p
              className={css({
                textAlign: "center",
                color: "typography.link",
              })}
            >
              Don't have an account?
            </p>
            <NavLink
              to="/signup"
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
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

/* <InputItem>
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
          */
