import { SignUpFormData } from "./Signup";

interface ValidationReturn {
  valid: boolean;
  message: string;
}

export function isEmailValid(email: string): ValidationReturn {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    valid: emailRegex.test(email),
    message: emailRegex.test(email) ? "" : "Please enter a valid email address",
  };
}

export function isPasswordValid(
  passowrd: string,
  repeatPassword: string = ""
): ValidationReturn {
  if (repeatPassword !== "" && passowrd !== repeatPassword) {
    return { valid: false, message: "Passwords do not metch." };
  }

  if (passowrd.length < 8) {
    return {
      valid: false,
      message: "Minimum requiements for password lenght is 8, reccomended 12.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}

export function checkPasswordStrength(password: string): number {
  let score: number = 0;

  // Length check
  if (password.length >= 12) score += 2;
  else if (password.length >= 8) score += 1;

  // Complexity checks
  if (/[A-Z]/.test(password)) score += 1; // Uppercase
  if (/[a-z]/.test(password)) score += 1; // Lowercase
  if (/[0-9]/.test(password)) score += 1; // Numbers
  if (/[^A-Za-z0-9]/.test(password)) score += 1; // Special chars

  // Penalize common patterns
  if (/(.)\1{2,}/.test(password)) score -= 1; // Repeated characters
  if (/^(12345|qwerty|password).*/i.test(password)) score -= 2; // Common beginning

  return Math.max(0, Math.min(5, score));
}

export function checkForEmptyFields(
  formData: SignUpFormData
): ValidationReturn {
  for (const key in formData) {
    const property = formData[key as keyof SignUpFormData];

    if (property.required && property.value === "") {
      return {
        valid: false,
        message: `${[key]} should not be empty.`,
      };
    }
  }

  return {
    valid: true,
    message: "",
  };
}
