import { useState } from "react";
import AddProductForm from "./AddProductForm";
import EditDeleteProduct from "./EditDeleteProduct";

const AddProductBtn = () => {
  const [activeTab, setActiveTab] = useState<string>("");

  const tabs = (activeTab: string) => {
    switch (activeTab) {
      case "Add":
        return <AddProductForm />
      case "Edit":
        return <EditDeleteProduct />
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-12 max-w-md overflow-hidden font-bold rounded-xl border lg:max-w-md static left-0 top-0">
        <button onClick={() => setActiveTab("Add")} className={`${activeTab === "Add" && "bg-darkGray text-white"} border-r  w-1/2 duration-200`}>Add</button>
        <button onClick={() => setActiveTab("Edit")} className={`${activeTab === "Edit" && "bg-darkGray text-white"} border-l  w-1/2 duration-200`}>Edit/Delete</button>
      </div>
      <div className="overflow-hidden">
        {tabs(activeTab)}
      </div>
    </div>
  );
};

export default AddProductBtn;
