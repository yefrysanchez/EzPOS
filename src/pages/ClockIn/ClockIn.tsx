import { useState } from "react";
import ClockInComponent from "../../components/ClockInComponent/ClockInComponent";
import KeyPad from "../../components/KeyPad/KeyPad";
import { employees } from "../../dummyData/employee";
import { User } from "../../types/types";
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/animations";
import { RiLogoutBoxLine } from "react-icons/ri";
import Loading from "../../components/Loading/Loading";

const ClockIn = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  const handleUser = (eUser: User) => {
    setIsSelected(true);
    setUser(eUser);
  };

  const handleLogout = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000);
  };

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
            {employees.map((e) => (
              <button disabled={isLoading} key={e.name} onClick={() => handleUser(e)}>
                <ClockInComponent user={user} name={e.name} lastName={e.lastName} />
              </button>
            ))}
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
