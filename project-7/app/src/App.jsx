import Dashboard from "./pages/Dashboard/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Support from "./pages/Support/Support";
import TransactionPage from "./pages/Transaction/Transaction";
import Signup from "./pages/Auth/Signup/Signup";
import Signin from "./pages/Auth/Signin/Signin";
import RegisterEmailVerify from "./pages/Auth/RegisterEmailVerify/RegisterEmailVerify";
import RegisterSuccess from "./pages/Auth/RegisterSuccess/RegisterSuccess";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ForgotPasswordSent from "./pages/Auth/ForgotPasswordSent/ForgotPasswordSent";
import ResetPasswordSuccess from "./pages/Auth/ResetPasswordSuccess/ResetPasswordSuccess";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import PrivateRoute from "./components/PrivateRoute";
import AlreadySignin from "./components/AlreadySignin";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/transactions",
    element: (
      <PrivateRoute>
        <TransactionPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/support",
    element: (
      <PrivateRoute>
        <Support />
      </PrivateRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AlreadySignin>
        <Signup />
      </AlreadySignin>
    ),
  },
  {
    path: "/signin",
    element: (
      <AlreadySignin>
        <Signin />
      </AlreadySignin>
    ),
  },
  {
    path: "/register-email-verify/:email",
    element: (
      <AlreadySignin>
        <RegisterEmailVerify />
      </AlreadySignin>
    ),
  },
  {
    path: "/email-verify/:token",
    element: (
      <AlreadySignin>
        <RegisterSuccess />
      </AlreadySignin>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AlreadySignin>
        <ForgotPassword />
      </AlreadySignin>
    ),
  },
  {
    path: "/forgot-success/:email",
    element: (
      <AlreadySignin>
        <ForgotPasswordSent />
      </AlreadySignin>
    ),
  },
  {
    path: "/forgot-password-verify/:token",
    element: (
      <AlreadySignin>
        <ResetPassword />
      </AlreadySignin>
    ),
  },
  {
    path: "/reset-success",
    element: (
      <AlreadySignin>
        <ResetPasswordSuccess />
      </AlreadySignin>
    ),
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
