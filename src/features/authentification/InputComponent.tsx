import React from "react";
import { InputItem, StyledInput, StyledLabel } from "./StyledComponents";

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
}

export default function InputComponent({
  value,
  setter,
  label,
  name,
  type = "string",
  required = false,
  placeholder = "",
  disabled = false,
  minLength,
  maxLength,
}: InputComponentsProps) {
  return (
    <InputItem>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>

      <StyledInput
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
