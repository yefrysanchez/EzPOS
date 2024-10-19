import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setCategories } from "../../store/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Loading from "../Loading/Loading";

const AddCategoryForm = () => {
  const [input, setInput] = useState("");

  const [trigger, setTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const url = import.meta.env.VITE_BACKEND;

  // Redux /////////////////
  const dispatch = useDispatch();
  const { account, category } = useSelector((state: RootState) => state.auth);
  /////////////////////////

  const handleCategory = async () => {
    const trimmedInput = input.trim();
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
      setTrigger(!trigger);
    }
  };

  const removeCategory = async (id: number) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
      setTrigger(!trigger);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default form submission
      handleCategory();
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
    <div className="mb-4 relative">
      <input
        onKeyDown={handleKeyDown}
        onChange={(e) => setInput(e.target.value)}
        className="form-input mb-2"
        placeholder="Product Category"
        required
        type="text"
        value={input}
      />
      <div className="flex justify-end">
        <button
          disabled={isLoading}
          onClick={handleCategory}
          className="bg-black py-2 px-3 rounded-xl font-bold text-white cursor-pointer"
          type="button"
        >
          Add
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-1 relative p-4 bg-lightGray/10 min-h-12 max-h-16 overflow-y-scroll rounded-lg">
        {isLoading && (
          <div className="bg-lightGray/40 absolute inset-0 rounded-lg flex justify-center">
            <Loading />
          </div>
        )}
        {category.length < 1 ? (
          <span className="my-auto text-darkGray">No categories</span>
        ) : (
          category.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-2 bg-darkGray text-white w-fit p-2 rounded-lg"
            >
              <span className="capitalize">{category.name}</span>
              <button
                disabled={isLoading}
                onClick={() => removeCategory(category.id)}
                type="button"
                aria-label={`Remove ${category}`}
              >
                <IoClose color="red" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddCategoryForm;
