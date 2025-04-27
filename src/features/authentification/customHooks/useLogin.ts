import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../services/apiAuth";
import { useToast } from "../../toasts/ToastContext";
import { useLoggedUserInfo } from "../context/LoggedUserContext";
import { navLinks } from "../../primaryNavigation/NavLinksConstants";

export interface LoginCredentialInteface {
  email: string;
  password: string;
}

interface AuthError extends Error {
  status?: number;
  code?: string;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { addNewToast } = useToast();
  const { setLoggedUserId } = useLoggedUserInfo();

  const {
    mutate: login,
    isPending,
    reset,
    data,
  } = useMutation({
    mutationFn: ({ email, password }: LoginCredentialInteface) =>
      loginApi({ email, password }),
    onSuccess: (userData) => {
      console.log(userData);
      queryClient.setQueryData(["user"], userData.user);

      console.log(
        "Setting loggedUserId in useLogin, with id: ",
        userData.user.id
      );
      setLoggedUserId(userData.user.id);

      addNewToast("Successfuly logged in.", "positive");
      navigate(navLinks.trainingSplits, { replace: true });
    },
    onError: (err: AuthError) => {
      console.log("Error\n", err);
      if (err.status === 401) {
        addNewToast("Ivalid email or password.", "negative");
      } else if (err.status === 429) {
        addNewToast("Too many attempts. Please try agaain later.", "negative");
      } else {
        addNewToast(
          err.message || "An error occured during login.",
          "negative"
        );
      }
    },
  });

  return {
    login,
    isLoading: isPending,
    reset,
    data,
  };
}
