import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RandomPage from "./pages/RandomPage";
import Login from "./features/authentification/login";
import Signup from "./features/authentification/signup";

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
    element: <AppLayout />,
    children: [
      { index: true, element: <RandomPage /> },
      { path: "/home", element: <RandomPage /> },
      { path: "/analytics", element: <RandomPage /> },
      { path: "/account", element: <RandomPage /> },
      { path: "/settings", element: <RandomPage /> },
      { path: "/info", element: <RandomPage /> },
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
  document.documentElement.classList.add("dark");

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
