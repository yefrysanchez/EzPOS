import { useState } from "react";
import EditDeleteEmployee from "./EditDeleteEmployee";
import AddEmployee from "./AddEmployee";


const EmployeeSection = () => {
 

  const [activeTab, setActiveTab] = useState("")
  const [trigger, setTrigger] = useState(false)


  function tabs(tab:string) {
    switch (tab) {
      case "Add":
        return <AddEmployee trigger={trigger} setTrigger={setTrigger} />
      case "Edit/Delete":
        return <EditDeleteEmployee trigger={trigger} setTrigger={setTrigger} />
      default:
        break;
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex h-12 max-w-md overflow-hidden font-bold rounded-xl border lg:max-w-md static left-0 top-0">
        <button
          onClick={() => setActiveTab("Add")}
          className={`${
            activeTab === "Add" && "bg-darkGray text-white"
          } border-r  w-1/2 duration-200`}
        >
          Add Employee
        </button>
        <button
          onClick={() => setActiveTab("Edit/Delete")}
          className={`${
            activeTab === "Edit/Delete" && "bg-darkGray text-white"
          } border-l  w-1/2 duration-200`}
        >
          Edit/Delete
        </button>
      </div>
      <div className="">{tabs(activeTab)}</div>
    </div>
  );
};

export default EmployeeSection;
