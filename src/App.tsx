import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./features/authentification/pages/Login";
import Signup from "./features/authentification/pages/Signup";
import { useToast } from "./features/toasts/ToastContext";
import Toast from "./features/toasts/Toast";
import ProtectRoute from "./features/authentification/modules/ProtectedRoute";
import TrainingPage from "./features/trainingFeatures/pages/TrainingPage";
import NotAvailablePage from "./pages/NotAvailablePage";
import TrainingSplitWindow from "./features/trainingFeatures/modules/TrainingSplitModul";
import { LoggedUserProvider } from "./features/authentification/context/LoggedUserContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoggedUserProvider>
        <ProtectRoute>
          <AppLayout />
        </ProtectRoute>
      </LoggedUserProvider>
    ),
    children: [
      { index: true, element: <TrainingPage /> },
      {
        path: "/trainingSplits",
        element: <TrainingPage />,
        children: [
          { index: true, element: <TrainingSplitWindow /> },
          { path: ":id", element: <NotAvailablePage /> },
        ],
      },
      { path: "/analytics", element: <NotAvailablePage /> },
      { path: "/account", element: <NotAvailablePage /> },
      { path: "/settings", element: <NotAvailablePage /> },
      { path: "/info", element: <NotAvailablePage /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  const { toasts, handleToastComplete } = useToast();
  document.documentElement.classList.add("dark");

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            id={toast.id}
            onComplete={handleToastComplete}
            isActive={toast.isActive}
          >
            {toast.message}
          </Toast>
        ))}
        <RouterProvider router={router} />
      </>
    </QueryClientProvider>
  );
}

export default App;
