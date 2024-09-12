import { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const links = ["Menu", "Dashboard", "Setting"];

  const [isOpen, setIsOpen] = useState(false);

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
            <a
            onClick={() => setIsOpen(false)}
              className="hover:bg-darkGray hover:text-white duration-200 p-2 rounded-lg w-4/5 / lg:w-full"
              key={link}
              href="#"
            >
              <li>{link}</li>
            </a>
          ))}
          <a
            className=" hover:text-red-500 w-fit duration-200 p-2 rounded-lg "
            href="#"
          >
            <li>Clock Out</li>
          </a>
        </ul>
      </div>
      {isOpen && <div onClick={() => setIsOpen(false)} className="bg-black/20 z-50 fixed inset-0"></div>}
    </nav>
  );
};

export default Navbar;
