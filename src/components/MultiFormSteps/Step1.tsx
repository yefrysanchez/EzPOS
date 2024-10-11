import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import AlertError from "../Alerts/AlertError";
import Loading from "../Loading/Loading";
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/animations";
import EmployeeBadge from "./EmployeeBadge";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { nextStep, setEmployees } from "../../store/authSlice";




const Step1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [trigger, setTrigger] = useState(false);
  const url = import.meta.env.VITE_BACKEND;


  const { employees, account } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const resetForm = () => {
    setPin("");
    setFirstName("");
    setLastName("");
    setIsAdmin(false);
  };

  const handlePin = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setPin(value);
    }
  };

  const handleRole = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(e.target.checked);
  };

  const validateForm = () => {
    if (pin.length !== 4) {
      setError("PIN must contain 4 digits");
      return false;
    }
    if (!employees.some((e) => e.isAdmin) && !isAdmin) {
      setError("Please create at least 1 admin first.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${url}employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          isAdmin,
          accountId: account?.id
        })
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status}: Unable to create employees.`);
      }
      
    } catch (e) {
      setError((e as Error).message || "An unexpected error occurred.");
    } finally {
      resetForm();
      setTrigger(!trigger)
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (employees.length < 1) {
      setError("Please provide at least 1 Admin.");
      return;
    }
    setError(null);
    dispatch(nextStep())
  };

  const getEmployees = async () => {

    try {
      const res = await fetch(`${url}employees`);
      if (!res.ok) {
        throw new Error(`Error ${res.status}: Unable to fetch employees.`);
      }
      const data = await res.json();

      dispatch(setEmployees(data));
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  }

  useEffect(() => {
    getEmployees();
  }, [trigger]);

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
      <div className="h-12 flex items-center justify-center">
        <label className="cursor-pointer" htmlFor="admin">
          is Admin?{" "}
          <input
            onChange={handleRole}
            className="cursor-pointer"
            type="checkbox"
            name="role"
            id="admin"
            value={"Admin"}
            checked={isAdmin}
          />
        </label>
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
        className="bg-black mt-auto self-end placeholder:text-gray h-16 mb-4 p-4 rounded-xl font-bold text-white cursor-pointer"
        type="submit"
      >
        {isLoading ? <Loading /> : "Add"}
      </button>
      <div className="relative bg-lightGray/10 min-h-24 mb-1 rounded-lg p-2">
        {employees.length < 1 ? (
          <span className="text-lightGray absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            No Employees
          </span>
        ) : (
          <div className="flex gap-1 flex-wrap">
            {employees.map((e) => (
              <EmployeeBadge
                key={e.id}
                name={e.name}
                isAdmin={e.isAdmin}
                id={e.id}
                setError={setError}
                setTrigger={setTrigger}
                trigger={trigger}
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
