import { ChangeEvent, FormEvent, useState } from "react";
import AlertError from "../Alerts/AlertError";
import Loading from "../Loading/Loading";
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/animations";
import EmployeeBadge from "./EmployeeBadge";

type StepType = {
  setStep: (step: number) => void;
  step: number;
};

type EmployeeType = {
  firstName: string;
  lastName: string;
  pin: string;
  role: string;
};

const Step1: React.FC<StepType> = ({ setStep, step }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [employee, setEmployee] = useState<EmployeeType[]>([]);
  const [role, setRole] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Handle PIN ///////////
  const handlePin = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) {
      return;
    }
    const validatePIN = e.target.value.split("");

    if (validatePIN.length > 4) {
      return;
    }
    setPin(validatePIN.join(""));
  };

  // Handle Submit /////////
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) {
      setError("PIN most contain 4 digits");
      return;
    }
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setIsLoading(false);
      setEmployee([
        ...employee,
        {
          pin,
          firstName,
          lastName,
          role,
        },
      ]);
    }, 1000);
    setPin("");
    setFirstName("");
    setLastName("");
  };

  //handle Role
  const handleRole = (e: ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  //Next BTN /////////
  const handleNext = () => {
    //Validations

    if (employee.length < 1) {
      setError("Please provide at least 1 Admin");
      return;
    }

    setStep(step + 1);
    setError(null);
  };

  return (
    <motion.form
      variants={fadeUp}
      initial="initial"
      animate="enter"
      exit="exit"
      onSubmit={handleSubmit}
      className="flex flex-col text-center text-black mb-4 p-4 rounded-lg max-w-md w-full h-full"
    >
      <h1 className="text-3xl font-bold text-center mb-4 tracking-tighter">
        Employee
      </h1>
      <h2 className="mb-8 text-gray">Please add employees</h2>
      {error && <AlertError error={error} />}
      <div className="h-12 flex items-center ">
        <div className="hover:bg-lightGray/10 w-1/2 py-2 rounded-lg transition ">
          <label className="cursor-pointer" htmlFor="admin">
            Admin{" "}
            <input
              onChange={handleRole}
              className="cursor-pointer"
              type="radio"
              name="role"
              id="admin"
              value={"Admin"}
            />
          </label>
        </div>
        <div className="hover:bg-lightGray/10 w-1/2 py-2 rounded-lg transition ">
          <label onClick={() => { if(employee.length < 1) return setError("Please provide 1 Admin first.") } } className="cursor-pointer" htmlFor="employee">
            Employee{" "}
            <input
            disabled={employee.length < 1}
              onChange={handleRole}
              value={"Employee"}
              required
              className="cursor-pointer"
              type="radio"
              name="role"
              id="employee"
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          className="form-input"
          placeholder="First Name"
          required
          type="text"
        />
        <input
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          className="form-input"
          placeholder="Last Name"
          required
          type="text"
        />
      </div>
      <div className="mb-4">
        <input
          onChange={handlePin}
          className="form-input"
          placeholder="PIN"
          value={pin}
          required
          name="pin"
          type="number"
        />
      </div>
      <button
        disabled={isLoading}
        className="bg-black mt-auto self-end placeholder:text-gray mb-4 p-4 rounded-xl font-bold text-white cursor-pointer"
        type="submit"
      >
        {isLoading ? <Loading /> : "Add"}
      </button>
      <div className="relative bg-lightGray/10 min-h-24 mb-1 rounded-lg p-2">
        {employee.length < 1 ? (
          <span className="text-lightGray absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            No Employees
          </span>
        ) : (
          <div className="flex gap-1 flex-wrap">
            {employee.map((e, i) => (
              <EmployeeBadge
                key={i}
                name={e.firstName}
                last={e.lastName}
                role={e.role}
                employee={employee}
                setEmployee={setEmployee}
                index = {i}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <div className="bg-darkGray w-2 h-2 rounded-full"></div>
          <span className="text-sm">Admin</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-purple w-2 h-2 rounded-full"></div>
          <span className="text-sm">Employee</span>
        </div>
      </div>
      <button
        onClick={handleNext}
        disabled={isLoading}
        className="bg-black mt-auto self-end placeholder:text-gray w-28 h-16 p-4 rounded-xl font-bold text-white cursor-pointer"
        type="button"
      >
        Next
      </button>
    </motion.form>
  );
};

export default Step1;
