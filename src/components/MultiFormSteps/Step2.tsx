import { useState } from "react";
import AlertError from "../Alerts/AlertError";
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/animations";
import CategoryProductTabs from "./CategoryProductTabs";
import AddCategoryForm from "./AddCategoryForm";
import AddProductMultiForm from "./AddProductMultiForm";
import { useDispatch } from "react-redux";
import { backStep, nextStep } from "../../store/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";



const Step2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState("category");

  const [products, setProducts] = useState<string[]>([]);

  const dispatch = useDispatch()
  const {category} = useSelector((state:RootState) => state.auth)

  const goBack = () => {
    dispatch(backStep())
    setProducts([]);
  };

  const handleNext = () => {
    setError(null);
    dispatch(nextStep())
  };

  const tabs = (tab: string) => {
    switch (tab) {
      case "category":
        return <AddCategoryForm />;
      case "products":
        return <AddProductMultiForm />;

      default:
        return null;
    }
  };
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate="enter"
      exit="exit"
      className="flex flex-col text-center text-black mb-4 rounded-lg max-w-md w-full h-full"
    >
      <CategoryProductTabs tab={tab} setTab={setTab} />
      {error && <AlertError error={error} />}

      {tabs(tab)}
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
          disabled={isLoading || category.length < 1 || products.length < 1}
          className="bg-black placeholder:text-gray w-28 h-16 p-4 rounded-xl font-bold text-white cursor-pointer disabled:opacity-60 disabled:cursor-auto"
          type="submit"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default Step2;
