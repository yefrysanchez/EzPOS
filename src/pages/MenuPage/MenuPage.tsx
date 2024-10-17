import { useEffect, useState } from "react";
import Category from "../../components/Category/Category";
import ProductSection from "../../components/ProductSection/ProductSection";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clockin } from "../../store/authSlice";
import { EmployeeType } from "../../types/types";
import { getCategory, getProducts } from "../../utils/apiFunctions";

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // for protected route purpose
    const storedClockedEmployee = localStorage.getItem("clocked");
    
    if (storedClockedEmployee) {
      const clockedEmployeeData: EmployeeType = JSON.parse(
        storedClockedEmployee
      );
      dispatch(clockin(clockedEmployeeData));
    } else {
      navigate("/clockin");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    getCategory(dispatch);
    getProducts(dispatch)
  }, [dispatch]);

  return (
    <div className="h-screen lg:w-full flex flex-col bg-black overflow-hidden p-2">
      <Category activeTab={activeTab} setActiveTab={setActiveTab} />
      <ProductSection activeTab={activeTab} />
    </div>
  );
};

export default MenuPage;
