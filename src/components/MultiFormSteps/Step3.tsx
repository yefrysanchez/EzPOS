import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { fade } from "../../animations/animations";
import { useDispatch } from "react-redux";
import {
  backStep,
  login,
  setCategories,
  setEmployees,
  setProducts,
  setStep,
} from "../../store/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Step3 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_BACKEND;

  const { employees, category, products, account } = useSelector(
    (state: RootState) => state.auth
  );

  const goBack = () => {
    dispatch(backStep());
  };

  const handleFinish = async () => {
    setIsLoading(true); // Start loading
    try {
      const res = await fetch(`${url}auth/updateacc/${account?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstLogin: false,
          taxPercentage: 0,
        }),
      });
  
      if (!res.ok) {
        throw new Error("An error occurred.");
      }
  
      const data = await res.json();
  
      // Simulating loading screen effect
      setTimeout(() => {
        dispatch(login(data));
        navigate("/clockin");
      }, 3000);
    } catch (error) {
      console.error(error);
      // Optionally set an error state here to notify the user
    } finally {
      // Reset loading state after the timeout
      setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Match this with the above timeout
    }
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
  };
  const getCategory = async () => {
    try {
      const res = await fetch(`${url}productcategory`);
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
      const data = await res.json();
      dispatch(setCategories(data));
    } catch (error) {
      console.error(error);
    }
  };

  const getProducts = async () => {
    try {
      const res = await fetch(`${url}products`);
      if (!res.ok) {
        throw new Error(`Error Status: ${res.status}`);
      }
      const data = await res.json();
      dispatch(setProducts(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmployees();
    getCategory();
    getProducts();
  }, []);

  return (
    <div className="w-full px-4 pb-4">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            variants={fade}
            initial="initial"
            animate="enter"
            exit="exit"
            className="bg-black z-[999] flex flex-col justify-center items-center fixed h-screen w-full left-0 top-0 right-0 bottom-0"
          >
            <h1 className=" mb-1 text-white animate-pulse text-xl">Loading</h1>
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Review employees */}
      <div className="mb-4 flex flex-col items-center">
        <div className="mb-2">
          <span className="text-center text-black">
            <span className="bg-darkGray text-white py-1 px-2 rounded-lg">
              Admin
            </span>{" "}
            /{" "}
            <span className="bg-purple text-black py-1 px-2 rounded-lg">
              Employees
            </span>{" "}
          </span>
          <button
            onClick={() => dispatch(setStep(1))}
            type="button"
            className="text-xs bg-black py-1 px-4 rounded-lg text-white"
          >
            Edit
          </button>
        </div>
        <div className="bg-lightGray/10 h-24 w-full rounded-lg p-2 overflow-y-scroll hide-scrollbar-webkit hide-scrollbar-firefox">
          <div className="flex gap-2 flex-wrap">
            {employees.map((e) => (
              <div
                key={e.id}
                className={`${
                  e.isAdmin ? "bg-darkGray text-white" : "bg-purple text-black"
                } text-sm w-fit font-bold h-12 rounded-lg p-4 flex items-center gap-2`}
              >
                <span className="capitalize">{e.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Category */}
      <div className="mb-4 flex flex-col items-center">
        <div>
          <span className="text-center text-black">Categories </span>
          <button
            onClick={goBack}
            type="button"
            className="text-xs bg-black py-1 px-4 rounded-lg text-white"
          >
            Edit
          </button>
        </div>
        <div className="bg-lightGray/10 h-24 w-full rounded-lg p-2 overflow-y-scroll hide-scrollbar-webkit hide-scrollbar-firefox">
          <div className="flex gap-2 flex-wrap">
            {category.map((e) => (
              <div
                key={e.id}
                className={`bg-darkGray text-white text-sm w-fit font-bold h-12 rounded-lg p-4 flex items-center gap-2`}
              >
                <span className="capitalize">{e.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Products */}
      <div className="mb-4 flex flex-col items-center">
        <div>
          <span className="text-center text-black">Products </span>
          <button
            onClick={goBack}
            type="button"
            className="text-xs bg-black py-1 px-4 rounded-lg text-white"
          >
            Edit
          </button>
        </div>
        <div className="bg-lightGray/10 h-24 w-full rounded-lg p-2 overflow-y-scroll hide-scrollbar-webkit hide-scrollbar-firefox">
          <div className="flex gap-2 flex-wrap">
            {products.map((e) => (
              <div
                key={e.name}
                className={`bg-darkGray text-white text-sm w-fit font-bold h-12 rounded-lg p-4 flex items-center gap-2`}
              >
                <span className="capitalize">{e.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" flex justify-between mt-auto">
        <button
          onClick={goBack}
          type="button"
          className="bg-black placeholder:text-gray w-28 h-16 p-4 rounded-xl font-bold text-white cursor-pointer"
        >
          Go back
        </button>
        <button
          disabled={isLoading}
          onClick={handleFinish}
          className="bg-black  placeholder:text-gray w-28 h-16 p-4 rounded-xl font-bold text-white cursor-pointer disabled:opacity-60 disabled:cursor-auto"
          type="button"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Step3;
