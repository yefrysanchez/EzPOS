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
import AuthProtected from "../components/ProtectedRoutes/AuthProtected";


export const router = createBrowserRouter([
  {
    index: true,
    element: <AuthProtected><LoginRegisterPage /></AuthProtected>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/newuser",
    element: <AuthProtected><NewUserPage /></AuthProtected>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/clockin",
    element: <AuthProtected><ClockIn /></AuthProtected>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/menu",
    element: <AuthProtected><MenuLayout /></AuthProtected>,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <AuthProtected><MenuPage /></AuthProtected>,
      },
    ],
  },
  {
    element: <NavbarLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/dashboard",
        element: <AuthProtected><DashboardPage /></AuthProtected>,
      },
      {
        path: "/settings",
        element: <AuthProtected><SettingPage /></AuthProtected>,
      },
    ],
  },
]);
