import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setProducts } from "../../store/authSlice";
import { RootState } from "../../store/store";
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/animations";
import Loading from "../Loading/Loading";

type PropsType = {
  trigger: boolean,
  setTrigger: (bool:boolean) => void
}

const ProductListMultiForm: React.FC<PropsType> = ({trigger, setTrigger}) => {
  const { products, category } = useSelector((state:RootState) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string| null>(null);
  const url = import.meta.env.VITE_BACKEND;

  const handleRemoveProduct = async (productId:number) => {
    try {
      const res = await fetch(`${url}products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      
    } catch (error) {
      console.error(`Error: ${error}`);
      setError("Failed to remove product.");
    }finally{
      setTrigger(!trigger);
    }
  };

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${url}products`);
      if (!res.ok) {
        throw new Error(`Error Status: ${res.status}`);
      }
      const data = await res.json();
      dispatch(setProducts(data));
    } catch (error) {
      console.error(error);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [trigger]);

  return (
    <div className="bg-lightGray/10 relative p-2 text-white text-start rounded-lg h-32 mb-4 grid grid-cols-2 gap-1 overflow-y-scroll hide-scrollbar-firefox hide-scrollbar-webkit">
      {loading && <div className="text-black absolute inset-0"><Loading /></div>}
      {error && <span className="text-red-500">{error}</span>}
      {products.length < 1 && !loading && !error && <span className="text-black select-none">No Products</span>}
      {products.map((p) => {
        const productCategory = category.find((c) => c.id === p.categoryId);
        return (
          <motion.div
          variants={fadeUp}
          initial="initial"
          animate="enter"
          exit="exit"
            key={p.id}
            className="bg-darkGray overflow-hidden h-24 rounded-lg w-full pl-2 flex justify-between"
          >
            <div className="flex flex-col justify-center h-full w-4/5">
              <span className="text-lg capitalize font-bold text-nowrap whitespace-nowrap text-ellipsis overflow-hidden w-full">
                {p.name}
              </span>
              <span className="text-sm font-light text-nowrap whitespace-nowrap text-ellipsis overflow-hidden w-full">
                {productCategory ? productCategory.name : "Unknown Category"}
              </span>
              <span className="text-sm">${p.price.toFixed(2)}</span>
            </div>
            <button
              className="h-full flex justify-center items-center text-4xl w-1/5 hover:bg-red-600 transition"
              type="button"
              onClick={() => handleRemoveProduct(p.id)}
              aria-label={`Remove ${p.name}`}
            >
              <IoClose />
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProductListMultiForm;
