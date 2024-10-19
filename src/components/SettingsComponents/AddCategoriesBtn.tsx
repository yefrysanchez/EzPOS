import { AnimatePresence } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { setCategories } from "../../store/authSlice";
import AlertError from "../Alerts/AlertError";
import { ProductType } from "../../types/types";
import Loading from "../Loading/Loading";

const AddCategoriesBtn = () => {
  const url = import.meta.env.VITE_BACKEND;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(false);
  const [input, setInput] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { category, account, products } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const trimmedInput = input.trim();
    if (trimmedInput === "") {
      setError("Category name cannot be empty");
      setIsLoading(false);
      return; // Prevent further execution
    }
    try {
      const res = await fetch(`${url}productcategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedInput,
          accountId: account?.id,
        }),
      });
      if (!res.ok) {
        setIsLoading(false);
        throw new Error(`Response status: ${res.status}`);
      }
      setInput("");
    } catch (error) {
      console.error(error);
      setError(`${error}`);
    } finally {
      setError(null);
      setIsLoading(false);
      setTrigger(!trigger);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    const hasProducts: ProductType | undefined = products.find(
      (p) => p.categoryId === id
    );
    if (hasProducts) {
      setError(`Please delete products under this category first.`);
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch(`${url}productcategory/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        setIsLoading(false);
        throw new Error(`Response status: ${res.status}`);
      }
    } catch (error) {
      console.error(error);
      setError(`${error}`);
    } finally {
      setError(null);
      setIsLoading(false);
      setTrigger(!trigger);
    }
  };

  const getCategory = async () => {
    try {
      const res = await fetch(`${url}productcategory`);
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
      const data = await res.json();
      dispatch(setCategories(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, [trigger]);

  return (
    <div className="flex flex-col gap-2 lg:max-w-md">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Category Name"
          className="form-input mb-2"
          type="text"
        />
        <button
          disabled={isLoading}
          type="submit"
          className="text-white bg-darkGray/60 p-4  rounded-lg"
        >
          Add Category
        </button>
      </form>
      {error && <AlertError error={error} />}
      <div className="max-h-[37vh] relative flex flex-col gap-2 overflow-y-scroll hide-scrollbar-firefox hide-scrollbar-webkit">
        {isLoading && (
          <div className="absolute h-full w-full flex justify-center items-center bg-gray/30 rounded-lg">
            <Loading />
          </div>
        )}
        {category.map((c) => (
          <div key={c.id} className="flex items-center border rounded-xl p-4">
            <div className="flex flex-col ">
              <span className="font-bold text-white text-xl capitalize">
                {c.name}
              </span>
            </div>
            <div className="ml-auto flex gap-4 text-xl">
              <button
                disabled={isLoading}
                onClick={() => handleDelete(c.id)}
                className="active:text-red-600 duration-200"
              >
                <FaTrashCan />
              </button>
            </div>
          </div>
        ))}
        <AnimatePresence>{/* modal */}</AnimatePresence>
      </div>
    </div>
  );
};

export default AddCategoriesBtn;
