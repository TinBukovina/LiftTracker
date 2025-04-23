import React, { useEffect, useState } from "react";
import { css } from "../../../styled-system/css";
import { NavLink } from "react-router-dom";

import Logo from "../SecondaryNavigation/Logo";
import InputComponent from "./InputComponent";
import FormButton from "./FormButton";
import { validateAllInputs } from "./validateInputs";
import { uppercaseFirstLetter } from "../../utils/helperFunction";
import { useToast } from "../toasts/ToastContext";

interface LoginFormData {
  password: {
    value: string;
    required: boolean;
  };
  email: {
    value: string;
    required: boolean;
  };
  [key: string]: {
    value: string;
    required: boolean;
  };
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    password: {
      value: "",
      required: true,
    },
    email: {
      value: "",
      required: true,
    },
  });
  const [inputError, setInputError] = useState<string>("");

  const { addNewToast } = useToast();

  useEffect(() => {
    addNewToast(`New toast at ${new Date().toLocaleTimeString()}`, "positive");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof LoginFormData], value },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateMessage = validateAllInputs(formData);
    if (validateMessage !== "") {
      setInputError(
        uppercaseFirstLetter(validateMessage) || "Something went wrong."
      );
      return;
    }

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

        overflow: "hidden",
      })}
    >
      <Logo size={4} />

      {/* showToast("Some message", "positive") */}
      {/* <Toast type="negative">{inputError}</Toast> */}
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
            value={formData.email.value}
            setter={handleChange}
          />
          <InputComponent
            label="Password"
            name="password"
            type="password"
            value={formData.password.value}
            setter={handleChange}
          />

          {/* {inputError !== "" ? <p>{inputError}</p> : ""} */}
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
