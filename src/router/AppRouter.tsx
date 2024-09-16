import { createBrowserRouter } from "react-router-dom";
import ClockIn from "../pages/ClockIn/ClockIn";
import MenuPage from "../pages/MenuPage/MenuPage";
import MenuLayout from "../Layout/MenuLayout";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import NavbarLayout from "../Layout/NavbarLayout";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";
import SettingPage from "../pages/SettingPage/SettingPage";

export const router = createBrowserRouter([
  {
    index: true,
    element: <ClockIn />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/menu",
    element: <MenuLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <MenuPage />,
      },
    ],
  },
  {
    path: "/",
    element: <NavbarLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/setting",
        element: <SettingPage />,
      },
    ],
  },
]);
