import React, { useState } from "react";
import { css } from "../../../../styled-system/css";
import { NavLink } from "react-router-dom";

import { validateAllInputs } from "../utils/validateInputs";
import { uppercaseFirstLetter } from "../../../utils/helperFunction";
import { useToast } from "../../toasts/ToastContext";
import InputComponent from "../components/InputComponent";
import FormButton from "../components/FormButton";
import { LoginCredentialInteface, useLogin } from "../customHooks/useLogin";
import { useLoggedUserInfo } from "../context/LoggedUserContext";
import Logo from "../../secondaryNavigation/Logo";

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
      value: "test123",
      required: true,
    },
    email: {
      value: "test@gmail.com",
      required: true,
    },
  });
  const [, setInputError] = useState<string>("");
  const { addNewToast } = useToast();
  const { login, isLoading } = useLogin();
  const { setLoggedUserId } = useLoggedUserInfo();

  document.documentElement.classList.toggle(
    "dark",
    JSON.parse(localStorage.getItem("theme_lift_tracker") || "false")
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof LoginFormData], value },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateMessage = validateAllInputs(formData, true);
    if (validateMessage !== "") {
      setInputError(() => {
        addNewToast(
          uppercaseFirstLetter(validateMessage) || "Something went wrong.",
          "negative"
        );

        return uppercaseFirstLetter(validateMessage) || "Something went wrong.";
      });
      return;
    }

    console.log("Form data\n", formData);
    const loginCredentials: LoginCredentialInteface = {
      email: formData.email.value,
      password: formData.password.value,
    };

    login(loginCredentials, {
      onSettled: (data) => {
        setLoggedUserId(data?.user?.id || "");
      },
    });
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

      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",

          marginTop: "-10vh",
          marginX: "auto",
          width: "100%",
          maxWidth: "350px",
        })}
      >
        <p
          className={css({
            marginBottom: "1.5rem",

            color: "typography.text",
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
            placeholder="Email"
            displayLabel={false}
            disabled={isLoading}
          />
          <InputComponent
            label="Password"
            name="password"
            type="password"
            value={formData.password.value}
            setter={handleChange}
            placeholder="Password"
            displayLabel={false}
            disabled={isLoading}
          />

          <FormButton isDisabled={isLoading}>Login</FormButton>
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
                color: "actions.borderPositive",
                cursor: "pointer",

                pointerEvents: isLoading ? "none" : "default",

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
