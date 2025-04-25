import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "../customHooks/useUser";

interface LoggedUserContextType {
  loggedUserId: string;
  setLoggedUserId: (value: string) => void;
}

const LoggedUserContext = createContext<LoggedUserContextType>({
  loggedUserId: "",
  setLoggedUserId: () => {},
});

interface LoggedUserProps {
  children: ReactNode;
}

export const LoggedUserProvider: React.FC<LoggedUserProps> = ({ children }) => {
  const [loggedUserId, setLoggedUserId] = useState<string>("");

  const { user, isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      setLoggedUserId(user?.id || "");
    } else {
      setLoggedUserId("");
    }
  }, [isAuthenticated, user]);

  if (isLoading) return;

  const contextValue = {
    loggedUserId,
    setLoggedUserId,
  };

  return (
    <LoggedUserContext.Provider value={contextValue}>
      {children}
    </LoggedUserContext.Provider>
  );
};

export const useLoggedUserInfo = () => {
  const context = useContext(LoggedUserContext);

  if (context === null) {
    throw new Error(
      "There was a error while running useUserInfo, LoggedUserContext"
    );
  }

  return context;
};
