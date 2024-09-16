import { Outlet } from "react-router-dom";
import OrderSection from "../components/OrderSection/OrderSection";
import Navbar from "../components/Navbar/Navbar";

const MenuLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <OrderSection />
    </>
  );
};

export default MenuLayout;
