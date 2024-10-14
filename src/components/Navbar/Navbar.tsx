import { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clockin, clockout } from "../../store/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Navbar = () => {
  const links = ["menu", "dashboard", "settings"];

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function capitalize(string: string): string {
    if (string.length === 0) return string; // Handle empty string
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const dispatch = useDispatch();
  const { clockedEmployee } = useSelector((state: RootState) => state.auth);
  // Check local storage for account data on component mount
  useEffect(() => {
    const storedClockedEmployee = localStorage.getItem("clocked");
    if (storedClockedEmployee) {
      const clockedEmployeeData = JSON.parse(storedClockedEmployee);
      dispatch(clockin(clockedEmployeeData));
    }
  }, [dispatch]);

  return (
    <nav className={`relative  h-16 /  lg:h-screen w-full lg:max-w-[230px]`}>
      <button className="text-3xl text-white flex items-center h-full pl-3 / lg:hidden">
        <HiMenuAlt2 onClick={() => setIsOpen(true)} />
      </button>
      <div
        className={`${
          isOpen ? "fixed" : "hidden"
        } left-0 top-0 h-screen w-3/4 bg-black z-50  / lg:w-full lg:block`}
      >
        <div className="text-white flex justify-between p-4 mb-4">
          <div className={`text-4xl font-bold tracking-tighter / lg:text-3xl`}>
            <h1>EzPOS</h1>
          </div>
          <button className="text-5xl lg:hidden">
            <IoClose onClick={() => setIsOpen(false)} />
          </button>
        </div>
        <ul className="text-2xl grid gap-4 px-4 / lg:w-full lg:text-xl">
          {links.map((link) => (
            <NavLink
              to={`/${link}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-darkGray text-white" : ""
                } hover:bg-darkGray hover:text-white duration-200 p-2 rounded-lg w-4/5 lg:w-full ${
                  !clockedEmployee?.isAdmin &&
                  (link === "dashboard" || link === "settings") &&
                  "hidden"
                }`
              }
              key={link}
            >
              <li>{capitalize(link)}</li>
            </NavLink>
          ))}

          <li
            onClick={() => {
              dispatch(clockout());
              navigate("/");
            }}
            className="text-red-500 border select-none cursor-pointer active:bg-red-500 active:text-black duration-200 p-2 rounded-lg "
          >
            Clock Out
          </li>
        </ul>
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="bg-black/20 z-40 fixed inset-0 backdrop-blur-sm"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
