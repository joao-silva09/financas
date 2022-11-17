import { lazy } from "react";
import Loadable from "../components/Loadable";
import GuestLayout from "../layout/GuestLayout";

// project import

// render - login
const AuthLogin = Loadable(lazy(() => import("../pages/Login")));
const AuthRegister = Loadable(lazy(() => import("../pages/Register")));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: <GuestLayout />,
  children: [
    {
      path: "login",
      element: <AuthLogin />,
    },
    {
      path: "register",
      element: <AuthRegister />,
    },
  ],
};

export default LoginRoutes;
