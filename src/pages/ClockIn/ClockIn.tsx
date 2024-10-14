import { useEffect, useState } from "react";
import ClockInComponent from "../../components/ClockInComponent/ClockInComponent";
import KeyPad from "../../components/KeyPad/KeyPad";
import { EmployeeType } from "../../types/types";
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/animations";
import { RiLogoutBoxLine } from "react-icons/ri";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { logout, setEmployees } from "../../store/authSlice";

const ClockIn = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [user, setUser] = useState<EmployeeType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Redux ///////////////
  const dispatch = useDispatch();
  const { employees } = useSelector((state: RootState) => state.auth);

  const url = import.meta.env.VITE_BACKEND;

  const handleUser = (eUser: EmployeeType) => {
    setIsSelected(true);
    setUser(eUser);
  };

  const handleLogout = () => {
    setIsLoading(true);
    dispatch(logout());
    setIsLoading(false);
  };

  const getEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${url}employees`);
      if (!res.ok) {
        throw new Error(`Error ${res.status}: Unable to fetch employees.`);
      }
      const data = await res.json();
      dispatch(setEmployees(data));
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="flex h-screen w-full">
      <div className="w-full flex flex-col items-center justify-center pb-4">
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="enter"
          className={`${isSelected ? "w-1/2" : "w-full"} p-12 overflow-hidden `}
        >
          <h1 className="font-bold text-white text-4xl text-center mb-8">
            Welcome Back!
          </h1>
          <div className="flex flex-col overflow-y-scroll h-5/6 hide-scrollbar-webkit hide-scrollbar-firefox">
            <>
              {isLoading ? (
                <>
                  <Loading />
                </>
              ) : (
                employees.map((e: EmployeeType) => (
                  <button key={e.name} onClick={() => handleUser(e)}>
                    <ClockInComponent user={e} />
                  </button>
                ))
              )}
            </>
          </div>
        </motion.div>
        <button
          disabled={isLoading}
          onClick={handleLogout}
          className={`flex flex-shrink-0 items-center justify-center gap-2 border ${
            isLoading && "text-white bg-red-600"
          } border-red-600 text-red-600 transition active:text-white active:bg-red-700 h-12 w-full max-w-[300px] rounded-lg`}
          type="button"
        >
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <span>Logout</span>
              <span className="text-2xl">
                <RiLogoutBoxLine />
              </span>
            </>
          )}
        </button>
      </div>
      {isSelected && (
        <div className={`lg:w-1/2 absolute lg:static inset-0 xl:flex-shrink-0`}>
          <KeyPad user={user} setIsSelected={setIsSelected} />
        </div>
      )}
    </div>
  );
};

export default ClockIn;
