import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./pages/AppLayout";
import Login from "./features/authentification/pages/Login";
import Signup from "./features/authentification/pages/Signup";
import { useToast } from "./features/toasts/ToastContext";
import Toast from "./features/toasts/Toast";
import ProtectRoute from "./features/authentification/modules/ProtectedRoute";
import TrainingPage from "./features/trainingFeatures/pages/TrainingPage";
import NotAvailablePage from "./pages/NotAvailablePage";
import { LoggedUserProvider } from "./features/authentification/context/LoggedUserContext";
import TrainingSplitDaysModule from "./features/trainingFeatures/modules/TrainingSplitDaysModule";
import TrainingSplitModule from "./features/trainingFeatures/modules/TrainingSplitModul";
import TrainingDayModule from "./features/trainingFeatures/modules/TrainingDayModule";
import TrainingDayHistoryModule from "./features/trainingFeatures/modules/TrainingDayHistoryModule";
import CreateTrainingSplitModule from "./features/trainingFeatures/modules/CreateTrainingSplitModule";
import { NavigationProvider } from "./contexts/NavigationContext";
import WeightTrackingPage from "./features/weightTracking/WeightTrackingPage";

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
          <NavigationProvider>
            <AppLayout />
          </NavigationProvider>
        </ProtectRoute>
      </LoggedUserProvider>
    ),
    children: [
      { index: true, element: <TrainingPage /> },
      {
        path: "/trainingSplits",
        element: <TrainingPage />,
        children: [
          {
            index: true,
            element: <TrainingSplitModule />,
          },
          {
            path: ":id",
            element: <TrainingSplitDaysModule />,
          },
          {
            path: ":id/:trainingDayName",
            element: <TrainingDayModule />,
          },
          {
            path: ":id/:trainingDayName/history",
            element: <TrainingDayHistoryModule />,
          },
          { path: "create", element: <CreateTrainingSplitModule /> },
        ],
      },
      { path: "/analytics", element: <NotAvailablePage /> },
      { path: "/trackingWeight", element: <WeightTrackingPage /> },
      { path: "/trackingFood", element: <NotAvailablePage /> },
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
  /* document.documentElement.classList.add("dark"); */

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
            duration={toast.duration}
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
