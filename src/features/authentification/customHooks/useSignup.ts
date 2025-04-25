import { useMutation } from "@tanstack/react-query";

import { signup as signupApi } from "../services/apiAuth";
import { useToast } from "../../toasts/ToastContext";
import { useNavigate } from "react-router-dom";

export interface SignupCredentialsInterface {
  email: string;
  password: string;
  fullName: string;
}

export function useSignup() {
  const { addNewToast } = useToast();
  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending,
    reset,
    data,
  } = useMutation({
    mutationFn: async ({
      email,
      password,
      fullName,
    }: SignupCredentialsInterface) => {
      const result = await signupApi({ email, password, fullName });
      return result;
    },
    onSuccess: () => {
      addNewToast("Successfuly created user.", "positive");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      addNewToast("There was an error while signing up.", "negative");
    },
  });

  return { signup, isLodaing: isPending, reset, data };
}
