import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deleteItem } from "../../store/cartSlice";

type CardProductType = {
  product: string;
  price: number;
  quantity: number;
  indexList: number;
  id:number
};

const CartProduct: React.FC<CardProductType> = ({
  product,
  price,
  quantity,
  indexList,
  id
}) => {

  const dispatch: AppDispatch = useDispatch()

  const handleDelete = (id:number) => {
    dispatch(deleteItem(id))
  }

  return (
    <div className="w-full bg-darkGray px-4 py-6 rounded-lg flex justify-between items-center / lg:px-2 lg:py-3 lg:max-h-[60px]">
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-black flex-shrink-0 bg-white text-lg font-bold h-8 w-8 flex items-center justify-center rounded-full / lg:text-sm lg:h-6 lg:w-6 ">
          {indexList}
        </span>
        <span className="text-xl capitalize overflow-hidden text-nowrap whitespace-nowrap text-ellipsis max-w-[170px] / lg:text-sm lg:max-w-[140px]">
          {product}
        </span>
        <span className="text-lightGray text-xl lg:text-sm">x{quantity}</span>
      </div>
      <div className="flex items-center">
        <span className="font-bold text-xl lg:text-sm">
          ${(price * quantity).toFixed(2)}
        </span>
      </div>
      <button onClick={() => handleDelete(id)} type="button" className="text-red-500 cursor-pointer">
        <MdDeleteForever />
      </button>
    </div>
  );
};

export default CartProduct;
