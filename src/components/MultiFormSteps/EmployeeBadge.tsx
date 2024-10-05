import React from "react";
import { IoClose } from "react-icons/io5";

type EmployeeBadgeType = {
  name: string;
  last: string;
  isAdmin: boolean;
  employee: EmployeeType[];
  setEmployee: (employee: EmployeeType[]) => void 
  index: number;
};

type EmployeeType = {
    firstName: string;
    lastName: string;
    pin: string;
    isAdmin: boolean;
   
  };

const EmployeeBadge: React.FC<EmployeeBadgeType> = ({ name, last, isAdmin, employee , setEmployee, index }) => {
  


  const handleDelete = () => {
    const deleteEmployee = employee.filter((_,i) => i !== index)
    setEmployee(deleteEmployee)
  }
  
    return (
    <div
      className={`${
        isAdmin ? "bg-darkGray text-white" : "bg-purple text-black"
      }  text-sm w-fit font-bold py-1 px-2 rounded-full flex items-center gap-2`}
    >
      <span className="capitalize">
        {name.trim()} {last.trim()}
      </span>
      <span onClick={handleDelete} className="text-red-200 cursor-pointer">
      <IoClose />
      </span>
    </div>
  );
};

export default EmployeeBadge;
