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
      <ProtectRoute>
        <AppLayout />
      </ProtectRoute>
    ),
    children: [
      { index: true, element: <TrainingPage /> },
      { path: "/home", element: <TrainingPage /> },
      { path: "/analytics", element: <TrainingPage /> },
      { path: "/account", element: <TrainingPage /> },
      { path: "/settings", element: <TrainingPage /> },
      { path: "/info", element: <TrainingPage /> },
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
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

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
