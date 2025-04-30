import { ReactNode, useEffect } from "react";
import { useUser } from "../customHooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoggedUserInfo } from "../context/LoggedUserContext";

export default function ProtectRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // 1) Load authenticated user
  const { isLoading, isAuthenticated, user } = useUser();
  const { setLoggedUserId } = useLoggedUserInfo();

  useEffect(() => {
    if (location.pathname === "/") navigate("/trainingSplits");

    if (!isAuthenticated && !isLoading) navigate("/login");
    else if (!isLoading) {
      console.log(
        "Setting loggedUserId in protectedRoute.tsx with id: " + user?.id
      );
      setLoggedUserId(user?.id as string);
    }
  }, [isAuthenticated, isLoading, navigate, setLoggedUserId, user]);

  if (isLoading) return "Loading....";

  if (isAuthenticated && !isLoading) return children;
}
