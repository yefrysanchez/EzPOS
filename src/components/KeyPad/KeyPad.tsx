import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { User } from "../../types/types";
import { useNavigate } from "react-router-dom";

type KeyPadType = {
  setIsSelected: (s: boolean) => void;
  user: User | undefined;
};

const KeyPad: React.FC<KeyPadType> = ({ setIsSelected, user }) => {
  const navigate = useNavigate();

  const keys: (string | null)[] = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    null, "0", "DEL",
  ];
  const [PIN, setPIN] = useState<string[]>([]);

  const handlePIN = (value: string | null) => {
    if (value === "DEL") {
      setPIN((prev) => prev.slice(0, -1));
      return;
    }
    if (PIN.length >= 4) return; // Prevent adding more than 4 digits
    if (value) {
      setPIN((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    const strPIN = PIN.join("");
    if (strPIN === user?.pin) {
      navigate("/menu");
    }
    console.log(PIN);
  }, [PIN, user, navigate]); // Added user and navigate to dependency array

  return (
    <div className="bg-darkGray relative h-full flex flex-col justify-center items-center gap-4">
      <div
        onClick={() => setIsSelected(false)}
        className="absolute right-4 top-4 text-6xl cursor-pointer"
      >
        <IoIosClose />
      </div>

      <div className="text-center">
        <p>Enter your PIN for:</p>
        <p className="text-white font-bold uppercase">{user?.userName}</p>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className={`h-4 w-4 rounded-full ${PIN[index] ? "bg-white" : "bg-gray"} duration-300`}
          ></div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 select-none">
        {keys.map((k, i) => (
          <button
            onClick={() => handlePIN(k)}
            value={k || ""}
            key={i}
            className={`${k === null ? "cursor-auto" : "bg-gray text-2xl flex justify-center items-center active:bg-purple active:text-black duration-200 h-20 w-20 rounded-md"}`}
            disabled={PIN.length >= 4 && k !== "DEL"} // Disable buttons if PIN is full
            aria-label={k ? `Input ${k}` : 'Delete last digit'}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeyPad;
