import { FiDelete } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

type KeyPadType = {
  setIsSelected: (s:boolean) => void;
}

const KeyPad: React.FC<KeyPadType> = ({setIsSelected}) => {
  return (
    <div className="bg-darkGray relative h-full p-20 flex flex-col justify-center items-center gap-8">
      <div onClick={() => setIsSelected(false)} className="absolute right-4 top-4 text-6xl lg:hidden">
      <IoIosClose />
      </div>

      <p>Enter your PIN</p>
      <div className="flex gap-8">
          {/* create it by applying .split("") method to pin variable that will create an array */}
        <div className="h-4 w-4 bg-white rounded-full"></div>
        <div className="h-4 w-4 bg-white rounded-full"></div>
        <div className="h-4 w-4 bg-gray rounded-full"></div>
        <div className="h-4 w-4 bg-gray rounded-full"></div>
      </div>

      {/* Refactor by using an Array */}
      <div className="flex flex-col gap-4 select-none">
        <div className="text-white text-2xl flex gap-4">
          <button className="bg-gray active:bg-purple active:text-black duration-200 h-20 w-20 rounded-md">1</button>
          <button className="bg-gray active:bg-purple active:text-black duration-200 h-20 w-20 rounded-md">2</button>
          <button className="bg-gray active:bg-purple active:text-black duration-200 h-20 w-20 rounded-md">3</button>
        </div>
        <div className="text-white text-2xl flex gap-4">
          <button className="bg-gray active:bg-purple active:text-black duration-200 h-20 w-20 rounded-md">4</button>
          <button className="bg-gray active:bg-purple active:text-black duration-200 h-20 w-20 rounded-md">5</button>
          <button className="bg-gray active:bg-purple active:text-black duration-200 h-20 w-20 rounded-md">6</button>
        </div>
        <div className="text-white text-2xl flex gap-4">
          <button className="bg-gray active:bg-purple active:text-black duration-200 h-20 w-20 rounded-md">7</button>
          <button className="bg-gray active:bg-purple active:text-black duration-200 h-20 w-20 rounded-md">8</button>
          <button className="bg-gray active:bg-purple active:text-black duration-200 h-20 w-20 rounded-md">9</button>
        </div>
        <div className="text-white text-2xl flex gap-4">
          <div className="h-20 w-20"></div>
          <button className="bg-gray active:bg-purple active:text-black duration-200 h-20 w-20 rounded-md">0</button>
          <button className="active:text-purple duration-200 h-20 w-20 flex justify-center items-center">
            <FiDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyPad;
