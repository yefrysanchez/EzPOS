import { useState } from "react";
import { IoClose } from "react-icons/io5";

type AddCategoryFormType = {
  categories: string[];
  setCategories: (categories: string[]) => void;
};

const AddCategoryForm: React.FC<AddCategoryFormType> = ({
  categories,
  setCategories,
}) => {
  const [input, setInput] = useState("");

  const handleCategory = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !categories.includes(trimmedInput)) {
      setCategories([...categories, trimmedInput.toLowerCase()]);
      setInput("");
    }
  };

  const removeCategory = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default form submission
      handleCategory();
    }
  };

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
          onClick={handleCategory}
          className="bg-black py-2 px-3 rounded-xl font-bold text-white cursor-pointer"
          type="button"
        >
          Add
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-1">
        {categories.map((category, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-darkGray text-white w-fit p-2 rounded-lg"
          >
            <span className="capitalize">{category}</span>
            <button
              onClick={() => removeCategory(i)}
              type="button"
              aria-label={`Remove ${category}`}
            >
              <IoClose />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCategoryForm;
