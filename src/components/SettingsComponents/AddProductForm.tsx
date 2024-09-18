import { FormEvent, useState } from "react";

const AddProductForm = () => {
  const [isAdded, setIsAdded] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsAdded(true);
  };

  return (
    <>
      {isAdded ? (
        <div className="mt-4 max-w-md">
          <div className="p-4 text-center bg-emerald-400 rounded-xl text-black">
            <p>Product added successful</p>
          </div>
          <button
            onClick={() => setIsAdded(false)}
            className="w-full mt-4 p-4 text-center bg-darkGray active:bg-gray rounded-xl text-white"
          >
            Add Another Product
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 mt-4 max-w-md"
        >
          <select
            required
            className="bg-darkGray p-4 w-full rounded-xl text-white"
            name="category"
          >
            <option value="Coffee">Coffee</option>
            <option value="Cold Drinks">Cold Drinks</option>
            <option value="Snacks">Snacks</option>
          </select>
          <input
            placeholder="Product Name"
            className="bg-darkGray p-4 w-full rounded-xl text-white"
            type="text"
            name="Product Name"
            required
          />
          <input
            placeholder="Price"
            className="bg-darkGray p-4 w-full rounded-xl text-white"
            type="number"
            name="price"
            required
          />

          <input
            className="bg-emerald-600 cursor-pointer active:bg-emerald-800 p-4 w-full rounded-xl font-bold text-lg text-white"
            type="submit"
            value="Add Product"
          />
        </form>
      )}
    </>
  );
};

export default AddProductForm;
