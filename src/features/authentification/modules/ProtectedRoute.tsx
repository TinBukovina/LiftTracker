import { ReactNode, useEffect } from "react";
import { useUser } from "../customHooks/useUser";
import { useNavigate } from "react-router-dom";

export default function ProtectRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  // 1) Load authenticated user
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return "Loading....";

  if (isAuthenticated) return children;
}
