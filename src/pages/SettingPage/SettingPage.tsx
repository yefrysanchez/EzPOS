import { useEffect, useState } from "react";
import SettingsBtn from "../../components/SettingsComponents/SettingsBtn";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { PiSealPercentFill } from "react-icons/pi";
import AddProductBtn from "../../components/SettingsComponents/AddProductBtn";
import ChangeTaxForm from "../../components/SettingsComponents/ChangeTaxBtn";
import EmployeeSection from "../../components/SettingsComponents/EmployeeSection";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EmployeeType } from "../../types/types";
import { clockin } from "../../store/authSlice";

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tabs = () => {
    switch (activeTab) {
      case "Add Product":
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
          settingTab="Add Product"
          icon={IoIosAddCircleOutline}
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
