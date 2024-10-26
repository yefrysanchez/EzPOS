import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Stepper = () => {
  const { step } = useSelector((state: RootState) => state.auth);
  const localStep:number = Number(localStorage.getItem("step")) || step
  

  return (
    <ol className="sticky p-4 shadow-sm left-0 top-0 bg-white rounded-lg flex justify-center items-center max-w-xl w-full text-sm text-gray-500 font-medium sm:text-base">
      <li
        className={`${
          localStep >= 1 && "text-black"
        } transition duration-500 flex md:w-full items-center   sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-8`}
      >
        <div className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2 ">
          <span
            className={`${
              localStep >= 1 && "bg-black"
            } transition duration-500 w-6 h-6 border select-none border-indigo-200 rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10`}
          >
            1
          </span>{" "}
          Employee
        </div>
      </li>
      <li
        className={`${
          localStep >= 2 && "text-black"
        } transition duration-500 flex md:w-full items-center   sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-8`}
      >
        <div className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2 ">
          <span
            className={`${
              localStep >= 2 && "bg-black"
            } transition duration-500 w-6 h-6 border select-none border-indigo-200 rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10`}
          >
            2
          </span>{" "}
          Products
        </div>
      </li>
      <li
        className={`${
          localStep >= 3 && "text-black"
        } transition duration-500 flex md:w-fit flex-shrink-0 items-center text-gray-600 `}
      >
        <div className="flex items-center  ">
          <span
            className={`${
              localStep >= 3 && "bg-black"
            } transition duration-500 w-6 h-6 border select-none border-indigo-200 rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10`}
          >
            3
          </span>{" "}
          Review
        </div>
      </li>
    </ol>
  );
};

export default Stepper;
