import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deleteItem } from "../../store/cartSlice";
import { motion } from "framer-motion";
import { OrderSlice } from "../../animations/animations";

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
    <motion.div variants={OrderSlice} initial="initial" animate="enter" exit="exit" className="w-full bg-darkGray px-4 py-6 rounded-lg flex justify-between items-center / lg:px-2 lg:py-3 lg:max-h-[60px]">
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-black select-none flex-shrink-0 bg-white text-lg font-bold h-8 w-8 flex items-center justify-center rounded-full / lg:text-sm lg:h-6 lg:w-6 ">
          {indexList}
        </span>
        <span className="text-xl capitalize overflow-hidden text-nowrap whitespace-nowrap text-ellipsis max-w-[170px] / lg:text-sm lg:max-w-[140px]">
          {product}
        </span>
        <span className="text-lightGray text-xl lg:text-sm">x{quantity}</span>
      </div>
      <div className="flex items-center w-full justify-end mr-2 lg:mr-4">
        <span className="font-bold text-xl lg:text-sm">
          ${(price * quantity).toFixed(2)}
        </span>
      </div>
      <button onClick={() => handleDelete(id)} type="button" className="text-red-500 cursor-pointer">
        <MdDeleteForever />
      </button>
    </motion.div>
  );
};

export default CartProduct;
