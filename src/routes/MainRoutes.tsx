import { lazy } from "react";
import Loadable from "../components/Loadable";

// project import
import AuthLayout from "../layout/AuthLayout";

const Home = Loadable(lazy(() => import("../pages/Home")));
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const Contas = Loadable(lazy(() => import("../pages/Contas")));
const DividasAtivas = Loadable(lazy(() => import("../pages/Dividas/Ativas")));
const DividasPagas = Loadable(lazy(() => import("../pages/Dividas/Pagas")));
const Objetivos = Loadable(lazy(() => import("../pages/Objetivos")));
const ObjetivosCumpridos = Loadable(
  lazy(() => import("../pages/Objetivos/Cumpridos"))
);
const Operacoes = Loadable(lazy(() => import("../pages/Operacoes")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "contas",
      element: <Contas />,
    },
    {
      path: "operacoes",
      element: <Operacoes />,
    },
    {
      path: "objetivos",
      element: <Objetivos />,
    },
    {
      path: "objetivos/cumpridos",
      element: <ObjetivosCumpridos />,
    },
    {
      path: "dividas/ativas",
      element: <DividasAtivas />,
    },
    {
      path: "dividas/pagas",
      element: <DividasPagas />,
    },
  ],
};

export default MainRoutes;
