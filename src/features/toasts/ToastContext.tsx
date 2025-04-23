// ToastContext.tsx
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ToastStatus } from "./toast";

interface ToastContextType {
  toasts: ToastInterface[];
  addNewToast: (message: string, type: ToastStatus) => void;
  handleToastComplete: (id: number) => void;
  startDisplayingToasts: () => void;
  displayToastsSignal: boolean;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addNewToast: () => {},
  handleToastComplete: () => {},
  startDisplayingToasts: () => {},
  displayToastsSignal: false,
});

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastInterface {
  id: number;
  message: string;
  type: ToastStatus;
  isActive?: boolean;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastInterface[]>([]);
  const [displayToastsSignal, setDisplayToastsSignal] =
    useState<boolean>(false);
  const [activeToastId, setActiveToastId] = useState<number | null>(null);

  const toastIdCounterRef = useRef<number>(0);
  // Help us prevent duplicate toasts when called one after another.
  const pendingMessagesRef = useRef<Set<string>>(new Set());

  const addNewToast = useCallback((message: string, type: ToastStatus) => {
    if (pendingMessagesRef.current.has(message)) {
      return;
    }

    pendingMessagesRef.current.add(message);

    setToasts((prevToasts) => {
      if (prevToasts.some((toast) => toast.message === message)) {
        pendingMessagesRef.current.delete(message);
        return prevToasts;
      }

      const newToastId = toastIdCounterRef.current++;

      pendingMessagesRef.current.delete(message);

      return [
        ...prevToasts,
        {
          id: newToastId,
          message,
          type,
          isActive: activeToastId === null && prevToasts.length === 0,
        },
      ];
    });
  }, []);

  const handleToastComplete = useCallback((id: number) => {
    setToasts((prevToasts) => {
      const updatedToasts = prevToasts.filter((toast) => toast.id !== id);

      // If there are more toasts in the queue, activate the next one
      if (updatedToasts.length > 0) {
        return updatedToasts.map((toast, index) => ({
          ...toast,
          isActive: index === 0,
        }));
      }

      setActiveToastId(null);
      return updatedToasts;
    });
  }, []);

  const startDisplayingToasts = useCallback(() => {
    setDisplayToastsSignal(true);

    setToasts((prevToasts) => {
      if (prevToasts.length > 0) {
        setActiveToastId(prevToasts[0].id);
        return prevToasts.map((toast, index) => ({
          ...toast,
          isActive: index === 0,
        }));
      }
      return prevToasts;
    });
  }, []);

  useEffect(() => {
    if (activeToastId === null && toasts.length > 0 && displayToastsSignal) {
      setActiveToastId(toasts[0].id);
      setToasts((prevToasts) =>
        prevToasts.map((toast, index) => ({
          ...toast,
          isActive: index === 0,
        }))
      );
    }
  }, [activeToastId, toasts, displayToastsSignal]);

  const contextValue: ToastContextType = {
    toasts,
    addNewToast,
    handleToastComplete,
    startDisplayingToasts,
    displayToastsSignal,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "There was an error while running useToast, ToastContext.tsx"
    );
  }

  return context;
};
