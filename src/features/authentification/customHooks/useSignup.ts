import { useMutation } from "@tanstack/react-query";

import { signup as signupApi } from "../services/apiAuth";
import { useToast } from "../../toasts/ToastContext";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const { addNewToast } = useToast();
  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending,
    reset,
    data,
  } = useMutation({
    mutationFn: signupApi,
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
