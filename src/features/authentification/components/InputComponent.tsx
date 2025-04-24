import React from "react";
import {
  InputItem,
  StyledInput,
  StyledLabel,
} from "../styles/StyledComponents";
import { css } from "../../../../styled-system/css";

interface InputComponentsProps {
  value: string;
  setter: (value: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;

  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;

  displayPasswordStrength?: boolean;
  passwordStrength?: number;
  displayLabel?: boolean;
}

export default function InputComponent({
  value,
  setter,
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
  disabled = false,
  minLength,
  maxLength,

  displayPasswordStrength = false,
  passwordStrength = 0,
  displayLabel = true,
}: InputComponentsProps) {
  return (
    <InputItem>
      {displayLabel ? <StyledLabel htmlFor={label}>{label}</StyledLabel> : ""}

      <StyledInput
        className={css({
          border: "2px solid transparent",
          outline: displayPasswordStrength ? "none" : "default",

          _focus: {
            border:
              type === "password" && displayPasswordStrength
                ? passwordStrength < 3
                  ? "2px solid red"
                  : passwordStrength < 5
                    ? "2px solid yellow"
                    : "2px solid green"
                : "2px solid transparent",
          },
        })}
        type={type}
        id={label}
        name={name}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={setter}
      />
    </InputItem>
  );
}
