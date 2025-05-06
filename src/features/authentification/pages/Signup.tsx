import { NavLink } from "react-router-dom";
import React, { useState } from "react";

import { css } from "../../../../styled-system/css";
import {
  checkPasswordStrength,
  validateAllInputs,
} from "../utils/validateInputs";
import { uppercaseFirstLetter } from "../../../utils/helperFunction";
import { useToast } from "../../toasts/ToastContext";
import InputComponent from "../components/InputComponent";
import FormButton from "../components/FormButton";
import {
  SignupCredentialsInterface,
  useSignup,
} from "../customHooks/useSignup";
import Logo from "../../secondaryNavigation/Logo";

export interface SignUpFormData {
  firstName: {
    value: string;
    required: boolean;
  };
  secondName: {
    value: string;
    required: boolean;
  };
  email: {
    value: string;
    required: boolean;
  };
  password: {
    value: string;
    required: boolean;
  };
  repeatPassword: {
    value: string;
    required: boolean;
  };
  [key: string]: {
    value: string;
    required: boolean;
  };
}

export default function Signup() {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: {
      value: "Tin",
      required: true,
    },
    secondName: {
      value: "Bukovina",
      required: false,
    },
    email: {
      value: "pawevix747@asaption.com",
      required: true,
    },
    password: {
      value: "random123!",
      required: true,
    },
    repeatPassword: {
      value: "random123!",
      required: true,
    },
  });
  const [, setInputError] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number | null>(null);

  const { addNewToast } = useToast();
  const { signup } = useSignup();

  document.documentElement.classList.toggle(
    "dark",
    JSON.parse(localStorage.getItem("theme_lift_tracker") || "false")
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }

    setFormData((prevState: SignUpFormData) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof SignUpFormData], value },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateMessage = validateAllInputs(formData);
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

    //console.log("Form data\n", formData);
    const loginCredentials: SignupCredentialsInterface = {
      email: formData.email.value,
      fullName: formData.firstName.value.concat(
        " " + formData.secondName.value
      ),
      password: formData.password.value,
    };

    //console.log(loginCredentials);
    signup(loginCredentials);
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

          marginTop: "-5vh",
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
          Sign up
        </p>

        <form
          onSubmit={handleSubmit}
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          })}
        >
          <div
            className={css({
              display: "flex",
              gap: "1rem",
            })}
          >
            <InputComponent
              label="First name"
              name="firstName"
              value={formData.firstName.value}
              setter={handleChange}
              placeholder="Name"
              displayLabel={false}
            />
            <InputComponent
              label="Second name"
              name="secondName"
              value={formData.secondName.value}
              setter={handleChange}
              placeholder="Surname"
              displayLabel={false}
            />
          </div>
          <InputComponent
            label="Email"
            name="email"
            type="string"
            value={formData.email.value}
            setter={handleChange}
            placeholder="Email"
            displayLabel={false}
          />
          <InputComponent
            label="Password"
            name="password"
            type="password"
            value={formData.password.value}
            setter={handleChange}
            displayPasswordStrength={true}
            passwordStrength={passwordStrength || 0}
            placeholder="Password"
            displayLabel={false}
          />
          <InputComponent
            label="Repeat password"
            name="repeatPassword"
            type="password"
            value={formData.repeatPassword.value}
            setter={handleChange}
            placeholder="Repeat password"
            displayLabel={false}
          />

          <FormButton>Sign up</FormButton>
          <div>
            <p
              className={css({
                textAlign: "center",
                color: "typography.link",
              })}
            >
              Already have an account?
            </p>
            <NavLink
              to="/login"
              className={css({
                display: "block",

                margin: "0 auto",
                width: "fit-content",

                textAlign: "center",
                color: "actions.borderPositive",
                cursor: "pointer",

                _hover: {
                  textDecoration: "underline",
                },
              })}
            >
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
