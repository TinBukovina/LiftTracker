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
  fullName: string;
}

const LoggedUserContext = createContext<LoggedUserContextType>({
  loggedUserId: "",
  setLoggedUserId: () => {},
  fullName: "",
});

interface LoggedUserProps {
  children: ReactNode;
}

export const LoggedUserProvider: React.FC<LoggedUserProps> = ({ children }) => {
  const [loggedUserId, setLoggedUserId] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  const { user, isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      setLoggedUserId(user?.id || "");
      setFullName(user?.user_metadata.fullName);
    } else {
      setLoggedUserId("");
      setFullName("");
    }
  }, [isAuthenticated, user]);

  if (isLoading) return;

  const contextValue = {
    loggedUserId,
    setLoggedUserId,
    fullName,
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
