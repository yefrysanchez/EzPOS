import { useState } from "react";
import { employees } from "../../dummyData/employee";
import EmployeeEditDelete from "./EmployeeEditDelete";
import EmployeeDeleteModal from "./EmployeeDeleteModal";
import EmployeeEditModal from "./EmployeeEditModal";
import { AnimatePresence } from "framer-motion";

const EmployeeSection = () => {
  const [employeeModal, setEmployeeModal] = useState({
    edit: false,
    delete: false,
  });

  const [allEmployee, setAllEmployee] = useState(employees);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = employees.filter(
      (em) =>
        em.name.toLowerCase().includes(e.target.value) ||
        em.lastName.toLowerCase().includes(e.target.value)
    );
    setAllEmployee(filtered);
  };

  return (
    <div className="relative">
      <div className="">
        <input
          onChange={handleChange}
          placeholder="Search Employee"
          className="max-w-md w-full p-4 rounded-xl bg-darkGray"
          type="search"
          name="search"
        />
      </div>
      <div className="h-[45vh] mt-4 max-w-md w-full select-none flex flex-col gap-2 overflow-y-scroll hide-scrollbar-firefox hide-scrollbar-webkit">
        {allEmployee.map((e) => (
          <div key={e.userName}>
            <EmployeeEditDelete
              key={e.name}
              name={e.name}
              lastName={e.lastName}
              employeeModal={employeeModal}
              setEmployeeModal={setEmployeeModal}
            />
            <AnimatePresence>
              {employeeModal.delete && (
                <EmployeeDeleteModal
                  setEmployeeModal={setEmployeeModal}
                  employeeModal={employeeModal}
                />
              )}
              {employeeModal.edit && (
                <EmployeeEditModal
                  setEmployeeModal={setEmployeeModal}
                  employeeModal={employeeModal}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeSection;
