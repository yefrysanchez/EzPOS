import { useEffect, useState } from "react";
import SettingsBtn from "../../components/SettingsComponents/SettingsBtn";
import { FaUserGroup } from "react-icons/fa6";
import { PiSealPercentFill } from "react-icons/pi";
import AddProductBtn from "../../components/SettingsComponents/AddProductBtn";
import ChangeTaxForm from "../../components/SettingsComponents/ChangeTaxBtn";
import EmployeeSection from "../../components/SettingsComponents/EmployeeSection";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EmployeeType } from "../../types/types";
import { clockin } from "../../store/authSlice";
import { TbCategoryPlus } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import AddCategoriesBtn from "../../components/SettingsComponents/AddCategoriesBtn";
import { getCategory, getProducts } from "../../utils/apiFunctions";

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tabs = () => {
    switch (activeTab) {
      case "Categories":
        return <AddCategoriesBtn />;
      case "Products":
        return <AddProductBtn />;
      case "Tax":
        return <ChangeTaxForm />;
      case "Employee":
        return <EmployeeSection />;
      default:
        return "";
    }
  };

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
    <section className="h-screen w-full bg-black flex flex-col p-2">
      <div className="mb-4">
        <h2 className="text-5xl font-bold text-white tracking-tighter">
          Settings
        </h2>
      </div>
      <div className="flex-shrink-0  flex gap-2 overflow-x-scroll hide-scrollbar-webkit hide-scrollbar-firefox mb-4">
        <SettingsBtn
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          settingTab="Categories"
          icon={TbCategoryPlus}
        />
        <SettingsBtn
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          settingTab="Products"
          icon={AiOutlineProduct}
        />
        <SettingsBtn
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          settingTab="Employee"
          icon={FaUserGroup}
        />
        <SettingsBtn
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          settingTab="Tax"
          icon={PiSealPercentFill}
        />
      </div>
      <div className="">{tabs()}</div>
    </section>
  );
};

export default SettingPage;
