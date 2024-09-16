import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default NavbarLayout;
