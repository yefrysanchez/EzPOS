import React, { useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

type AddProductType = {
  name: string,
  price: number,
  category: string
}

const AddProduct: React.FC<AddProductType> = ({name, price, category}) => {
  const [qty, setQty] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    setQty(1);
    setIsAdded(true);
  };

  return (
    <div
      className={`${qty === 0 ? "bg-darkGray" : "bg-purple"} ${
        qty === 0 ? "text-white" : ""
      } duration-200 text-black flex-shrink-0  p-4 h-[130px] select-none flex flex-col w-full max-w-[150px] rounded-xl`}
    >
      <div className="text-xs text-lightGray">
        <span>{category}</span>
      </div>
      <div className="flex flex-col text-start ">
        <span className="font-bold text-base overflow-hidden text-nowrap whitespace-nowrap text-ellipsis">{name}</span>
        <span
          className={`${qty === 0 ? "text-lightGray" : "text-gray"} text-xs `}
        >
          ${price.toFixed(2)}
        </span>
      </div>
      {isAdded && qty > 0 ? (
        <div className="flex justify-evenly items-center mt-auto gap-1">
          <button className="text-4xl" onClick={() => setQty(qty - 1)}>
            <CiSquareMinus />
          </button>
          <span>{qty}</span>
          <button className="text-4xl" onClick={() => setQty(qty + 1)}>
            <CiSquarePlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className="bg-white text-black rounded-full mt-auto text-sm"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default AddProduct;
