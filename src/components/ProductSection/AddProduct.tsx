import React, { useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { addQty, addToCart, subQty } from "../../store/cartSlice";

type AddProductType = {
  id: number
  name: string,
  price: number,
  category: string
}

const AddProduct: React.FC<AddProductType> = ({id, name, price, category}) => {
  const [qty, setQty] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

/// Redux State//////
const dispatch = useDispatch()

/////////////


  const handleAddBtn = (id:number, name:string, price:number) => {
    setQty(1);
    const item = {
      id,
      name,
      price,
      qty: 1
    }
    dispatch(addToCart(item))
    setIsAdded(true);
  };
  
  const handleAddQty = (id:number) => {
    setQty(qty + 1)
    dispatch(addQty(id))
  }

  const handleSubQty = (id:number) => {
    setQty(qty - 1)
    dispatch(subQty(id))
  }

  return (
    <div
      className={`${qty === 0 ? "bg-darkGray" : "bg-purple"} ${
        qty === 0 ? "text-white" : ""
      } active:scale-95 duration-200 text-black flex-shrink-0  p-4 h-[130px] select-none flex flex-col w-full max-w-[150px] rounded-xl`}
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
        <div className="flex justify-between items-center mt-auto gap-1 w-full">
          <button className="text-4xl" onClick={() => handleSubQty(id)}>
            <CiSquareMinus />
          </button>
          <span>{qty}</span>
          <button className="text-4xl" onClick={() => handleAddQty(id)}>
            <CiSquarePlus className="" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => handleAddBtn(id, name, price)}
          className="bg-white text-black rounded-full mt-auto text-sm py-1"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default AddProduct;
