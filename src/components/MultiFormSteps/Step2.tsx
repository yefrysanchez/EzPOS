import { useState } from "react";
import AlertError from "../Alerts/AlertError";
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/animations";
import CategoryProductTabs from "./CategoryProductTabs";
import AddCategoryForm from "./AddCategoryForm";
import AddProductMultiForm from "./AddProductMultiForm";

type StepType = {
  setStep: (step: number) => void;
  step: number;
};

const Step2: React.FC<StepType> = ({ setStep, step }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState("category");
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<string[]>([]);

  const goBack = () => {
    setStep(step - 1);
  };

  const handleNext = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 2000);
    setIsLoading(false);
  };

  const tabs = (tab: string) => {
    switch (tab) {
      case "category":
        return (
          <AddCategoryForm
            setCategories={setCategories}
            categories={categories}
          />
        );
      case "products":
        return <AddProductMultiForm categories={categories} />;

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
      <CategoryProductTabs categories={categories} tab={tab} setTab={setTab} />
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
          disabled={isLoading || categories.length < 1 || products.length < 1 }
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
