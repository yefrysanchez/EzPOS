import EmployeeEditDelete from "./EmployeeEditDelete";
import EmployeeDeleteModal from "./EmployeeDeleteModal";
import EmployeeEditModal from "./EmployeeEditModal";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEmployees } from "../../store/authSlice";
import Loading from "../Loading/Loading";
import AlertError from "../Alerts/AlertError";
import { EmployeeType } from "../../types/types";

type TriggerType = {
  trigger: boolean;
  setTrigger: (bool: boolean) => void;
};

const EditDeleteEmployee: React.FC<TriggerType> = ({ trigger, setTrigger }) => {
  const { employees } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [employeeModal, setEmployeeModal] = useState({
    edit: false,
    delete: false,
  });
  const [allEmployee, setAllEmployee] = useState(employees);
  const [em, setEm] = useState<EmployeeType>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const url = import.meta.env.VITE_BACKEND;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = employees.filter((em) =>
      em.name.toLowerCase().includes(e.target.value)
    );
    setAllEmployee(filtered);
  };

  const getEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${url}employees`);
      if (!res.ok) {
        setIsLoading(false);
        throw new Error(`Error ${res.status}: Unable to fetch employees.`);
      }
      const data = await res.json();
      dispatch(setEmployees(data));
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setError(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, [trigger]);

  useEffect(() => {
    setAllEmployee(employees)
  }, [employees]);

  return (
    <div className="relative mt-4">
      <div className="">
        <input
          onChange={handleChange}
          placeholder="Search Employee"
          className="max-w-md w-full p-4 rounded-xl bg-darkGray"
          type="search"
          name="search"
        />
      </div>
      <div className="h-[45vh] relative mt-4 max-w-md w-full select-none flex flex-col gap-2 overflow-y-scroll hide-scrollbar-firefox hide-scrollbar-webkit">
        {error && <AlertError error={error} />}
        {isLoading && (
          <div className="absolute h-full w-full flex justify-center items-center bg-black/50">
            <Loading />
          </div>
        )}
        {allEmployee.map((e) => (
          <div key={e.id}>
            <EmployeeEditDelete
              setEm={setEm}
              empl={e}
              employeeModal={employeeModal}
              setEmployeeModal={setEmployeeModal}
            />
          </div>
        ))}
        <AnimatePresence>
          {employeeModal.delete && (
            <EmployeeDeleteModal
            em={em}
              trigger={trigger}
              setTrigger={setTrigger}
              setEmployeeModal={setEmployeeModal}
              employeeModal={employeeModal}
            />
          )}
          {employeeModal.edit && (
            <EmployeeEditModal
            em={em}
              trigger={trigger}
              setTrigger={setTrigger}
              setEmployeeModal={setEmployeeModal}
              employeeModal={employeeModal}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EditDeleteEmployee;
