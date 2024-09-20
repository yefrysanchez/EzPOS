import { useState } from "react";
import ClockInComponent from "../../components/ClockInComponent/ClockInComponent";
import KeyPad from "../../components/KeyPad/KeyPad";
import { employees } from "../../dummyData/employee";

const ClockIn = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <div
        className={`${isSelected ? "w-1/2" : "w-full"} p-12 overflow-hidden `}
      >
        <h1 className="font-bold text-white text-4xl text-center mb-8">
          Welcome Back!
        </h1>
        <div className="overflow-y-scroll h-full hide-scrollbar-webkit hide-scrollbar-firefox">
          {employees.map((e) => (
            <div key={e.name} onClick={() => setIsSelected(!isSelected)}>
              <ClockInComponent name={e.name} lastName={e.lastName} />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`${
          isSelected ? "lg:w-1/2 absolute lg:static inset-0" : "hidden"
        }`}
      >
        <KeyPad setIsSelected={setIsSelected} />
      </div>
    </div>
  );
};

export default ClockIn;
