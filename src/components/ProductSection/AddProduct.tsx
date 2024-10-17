import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { addQty, addToCart, subQty } from "../../store/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type AddProductType = {
  id: number;
  name: string;
  price: number;
  category: string | undefined;
};

const AddProduct: React.FC<AddProductType> = ({
  id,
  name,
  price,
  category,
}) => {



  /// Redux State//////
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  /////////////

  const itemIsinCart = cart.find(item => item.id === id)
  const itemQty = itemIsinCart?.qty || 0 // if qty is undefined will return 0

  const handleAddBtn = (id: number, name: string, price: number) => {
    const item = {
      id,
      name,
      price,
      qty: 1,
      category
    };
    dispatch(addToCart(item));
  
  };

  const handleAddQty = (id: number) => {
    dispatch(addQty(id));
  };

  const handleSubQty = (id: number) => {
    dispatch(subQty(id));
  };

  return (
    <div
      className={`${itemQty === 0 && !itemIsinCart ? "bg-darkGray" : "bg-purple"} ${
        itemQty === 0 && !itemIsinCart ? "text-white" : ""
      } active:scale-95 duration-200 text-black flex-shrink-0  p-4 h-[140px] md:h-[130px] select-none flex flex-col w-full max-w-[150px]  rounded-xl`}
    >
      <div className="text-xs text-lightGray">
        <span>{category}</span>
      </div>
      <div className="flex flex-col text-start ">
        <span className="font-bold capitalize text-base overflow-hidden text-nowrap whitespace-nowrap text-ellipsis">
          {name}
        </span>
        <span
          className={`${itemQty === 0 ? "text-lightGray" : "text-gray"} text-xs `}
        >
          ${price.toFixed(2)}
        </span>
      </div>
      {itemQty  > 0 ? (
        <div className="flex justify-between items-center mt-auto gap-1 w-full">
          <button className="text-4xl" onClick={() => handleSubQty(id)}>
            <CiSquareMinus />
          </button>
          <span>{itemQty}</span>
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
