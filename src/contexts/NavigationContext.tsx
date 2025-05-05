import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWindowWidth } from "../customHooks/useWindowWidth";

interface NavigationContextType {
  isNavigationVisible: boolean;
  toggleNavigation: () => void;
  setNavigationVisibility: (visibility: boolean) => void;
  navigationSide: NavigationSide;
  setNavigationSide: React.Dispatch<React.SetStateAction<NavigationSide>>;
}

type NavigationSide = "left" | "right" | null;

const NavigationContext = createContext<NavigationContextType>({
  isNavigationVisible: true,
  toggleNavigation: () => {},
  setNavigationVisibility: () => {},
  navigationSide: null,
  setNavigationSide: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavigationVisible, setIsNavigationVisible] = useState<boolean>(true);
  const [navigationSide, setNavigationSide] = useState<NavigationSide>("left");

  const windowWidth = useWindowWidth();

  const flagRef = useRef<boolean>(windowWidth < 550 ? true : false);

  const toggleNavigation = () => {
    setIsNavigationVisible((prev) => !prev);
  };

  const setNavigationVisibility = (visible: boolean) => {
    setIsNavigationVisible(visible);
  };

  useEffect(() => {
    if (windowWidth < 550 && flagRef.current) {
      console.log("close");
      setIsNavigationVisible(false);
      setNavigationSide("right");

      flagRef.current = false;
    }

    if (windowWidth > 550 && !flagRef.current) {
      console.log("open");
      setIsNavigationVisible(true);
      setNavigationSide("left");

      flagRef.current = true;
    }
  }, [windowWidth]);

  return (
    <NavigationContext.Provider
      value={{
        isNavigationVisible,
        toggleNavigation,
        setNavigationVisibility,
        navigationSide,
        setNavigationSide,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }

  return context;
}
