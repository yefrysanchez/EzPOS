import { ChangeEvent, FormEvent, useState } from "react";
import Loading from "../Loading/Loading";
import AlertError from "../Alerts/AlertError";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AlertSuccess from "../Alerts/AlertSuccess";

type TriggerType = {
  trigger: boolean;
  setTrigger: (bool: boolean) => void;
};

const AddEmployee: React.FC<TriggerType> = ({ trigger, setTrigger }) => {
  const { account } = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [PIN, setPIN] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const url = import.meta.env.VITE_BACKEND;

  const handlePin = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const pinVal = e.target.value;
    if (pinVal.length > 4) {
      // Prevent adding more than 4 digits
      setError("PIN can NOT be more than 4 Digits.");
      return;
    }
    setPIN(pinVal);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${url}employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          pin: PIN,
          isAdmin,
          accountId: account?.id,
        }),
      });
      if (!res.ok) {
        setIsLoading(false);
        throw new Error("An error has occured. Please try later.");
      }
    } catch (error) {
      console.error(error);
      setError(`${error}`);
    } finally {
      setTrigger(!trigger);
      setIsLoading(false);
      setIsAdded(true)
    }
  };
  return (
    <>
      {isAdded ? (
        <div className="mt-4 max-w-md text-center">
        <AlertSuccess alert="Employee added successful." />
        <button
          onClick={() => setIsAdded(false)}
          className="w-full p-4 text-center bg-darkGray active:bg-gray rounded-xl text-white"
        >
          Add Another Employee
        </button> </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-h-[300px]  text-white flex flex-col gap-2 max-w-md rounded-xl text-center overflow-y-scroll hide-scrollbar-webkit  hide-scrollbar-firefox"
        >
          {error && <AlertError error={error} />}
          <h3 className="font-bold text-2xl mt-2">Add Employee</h3>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            name="First name"
            placeholder="First Name"
            className="form-input"
            required
            type="text"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            name="Last name"
            placeholder="Last Name"
            className="form-input"
            required
            type="text"
          />
          <input
            name="PIN"
            onChange={handlePin}
            value={PIN}
            placeholder="PIN"
            className="form-input"
            required
            type="number"
          />
          <div className="flex justify-center items-center gap-4 my-2">
            <p>Is this employee an Admin?</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                onChange={(e) => setIsAdmin(e.target.checked)}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-lightGray hover:bg-gray peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
            </label>
          </div>
          <div className="flex mx-auto gap-2">
            <button
              disabled={isLoading}
              name="submit"
              type="submit"
              className="rounded-md min-w-[160px] h-[50px] px-6 py-2 bg-violet-600 text-white active:bg-green-700"
            >
              {isLoading ? <Loading /> : "Add Employee"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddEmployee;
