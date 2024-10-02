import { createBrowserRouter } from "react-router-dom";
import ClockIn from "../pages/ClockIn/ClockIn";
import MenuPage from "../pages/MenuPage/MenuPage";
import MenuLayout from "../Layout/MenuLayout";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import NavbarLayout from "../Layout/NavbarLayout";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import SettingPage from "../pages/SettingPage/SettingPage";
import LoginRegisterPage from "../pages/LoginRegisterPage/LoginRegisterPage";
import NewUserPage from "../pages/NewUserPage/NewUserPage";

export const router = createBrowserRouter([
  {
    index: true,
    element: <LoginRegisterPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/newuser",
    element: <NewUserPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/clockin",
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
    element: <NavbarLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/settings",
        element: <SettingPage />,
      },
    ],
  },
]);
