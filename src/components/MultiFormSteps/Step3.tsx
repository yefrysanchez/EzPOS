type Step3Type = {
  step: number;
  setStep: (n: number) => void;
};

const Step3: React.FC<Step3Type> = ({ setStep, step }) => {
  const goBack = () => {
    setStep(step - 1);
  };

  const handleNext = () => {
    setTimeout(() => {
      setStep(2);
    }, 2000);
  };

  return (
    <div className="w-full">
      {/* Review employees */}
      <div className="mb-4 flex flex-col items-center">
        <div>
          <span className="text-center text-black">Admin / Employees </span>
          <button
            onClick={() => setStep(1)}
            type="button"
            className="text-xs bg-black py-1 px-4 rounded-lg text-white"
          >
            Edit
          </button>
        </div>
        <div className="bg-lightGray/10 h-24 w-full rounded-lg p-2 overflow-y-scroll">
          <div className="flex gap-2 flex-wrap">
            {employees.map((e) => (
              <div
                key={e.name}
                className={`${
                  e.role === "admin"
                    ? "bg-darkGray text-white"
                    : "bg-purple text-black"
                } text-sm w-fit font-bold h-16 rounded-lg p-4 flex items-center gap-2`}
              >
                <span className="capitalize">
                  {e.name} {e.lastName}
                </span>
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
            onClick={() => setStep(2)}
            type="button"
            className="text-xs bg-black py-1 px-4 rounded-lg text-white"
          >
            Edit
          </button>
        </div>
        <div className="bg-lightGray/10 h-24 w-full rounded-lg p-2 overflow-y-scroll">
          <div className="flex gap-2 flex-wrap">
            {categories.map((e) => (
              <div
                key={e}
                className={`bg-darkGray text-white text-sm w-fit font-bold h-16 rounded-lg p-4 flex items-center gap-2`}
              >
                <span className="capitalize">{e}</span>
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
            onClick={() => setStep(2)}
            type="button"
            className="text-xs bg-black py-1 px-4 rounded-lg text-white"
          >
            Edit
          </button>
        </div>
        <div className="bg-lightGray/10 h-24 w-full rounded-lg p-2 overflow-y-scroll">
          <div className="flex gap-2 flex-wrap">
            {products.map((e) => (
              <div
                key={e.name}
                className={`bg-darkGray text-white text-sm w-fit font-bold h-16 rounded-lg p-4 flex items-center gap-2`}
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
          onClick={handleNext}
          className="bg-black placeholder:text-gray w-28 h-16 p-4 rounded-xl font-bold text-white cursor-pointer disabled:opacity-60 disabled:cursor-auto"
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;

const categories = ["Coffee", "Cold Drinks", "Snacks"];

const products = [
  {
    id: 7,
    name: "Matcha Latte",
    category: "Coffee",
    price: 4.25,
  },
  {
    id: 8,
    name: "Iced Coffee",
    category: "Cold Drinks",
    price: 3.5,
  },
  {
    id: 9,
    name: "Fruit Smoothie",
    category: "Cold Drinks",
    price: 5.0,
  },
];

const employees = [
  {
    name: "Yefry",
    lastName: "Sanchez",
    pin: "1234",
    hourRate: 18,
    userName: "ysan",
    role: "admin",
  },
  {
    name: "Manuel",
    lastName: "Pena",
    pin: "1234",
    hourRate: 18,
    userName: "mpen",
    role: "employee",
  },
  {
    name: "Juan",
    lastName: "Soto",
    pin: "1234",
    hourRate: 18,
    userName: "jsot",
    role: "employee",
  },
];
