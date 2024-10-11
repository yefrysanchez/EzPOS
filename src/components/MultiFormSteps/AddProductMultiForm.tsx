import { FormEvent, useState } from "react";
import AlertError from "../Alerts/AlertError";
import Loading from "../Loading/Loading";
import ProductListMultiForm from "./ProductListMultiForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const AddProductMultiForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const url = import.meta.env.VITE_BACKEND;

  // Redux ////////////
  const { category } = useSelector((state: RootState) => state.auth);
  ////////////////////

  // to send to the DB
  const [categoryInput, setCategoryInput] = useState("");
  const [productInput, setProductInput] = useState("");
  const [priceInput, setPriceInput] = useState<number | "">(""); // Initialize as an empty string

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors
    console.log(categoryInput, productInput, priceInput)
    try {
      const res = await fetch(`${url}products`, {
         method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId: Number(categoryInput),
          name: productInput,
          price: priceInput,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json(); // Assuming the server returns error details
        throw new Error(errorData.message || `Error status: ${res.status}`);
      }

      setIsAdded(true);
      // Reset input fields
      setCategoryInput("");
      setProductInput("");
      setPriceInput(""); // Reset to an empty string for better UX
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isAdded ? (
        <div className="mt-4 max-w-md">
          <div className="p-4 text-center bg-emerald-400 rounded-xl text-black">
            <p>Product added successfully</p>
          </div>
          <button
            onClick={() => setIsAdded(false)}
            className="w-full mt-4 p-4 text-center bg-darkGray/90 active:bg-gray rounded-xl text-white"
          >
            Add Another Product
          </button>
        </div>
      ) : (
        <>
          {error && <AlertError error={error} />}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 mb-4 max-w-md"
          >
            <select
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              required
              className="form-input"
              name="category"
            >
              <option value="" disabled>
                Select a category
              </option>
              {category.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            <input
              onChange={(e) => setProductInput(e.target.value)}
              placeholder="Product Name"
              className="form-input"
              type="text"
              name="productName"
              value={productInput}
              required
            />
            <input
              onChange={(e) => {
                const value = e.target.value;
                setPriceInput(value === "" ? "" : Number(value)); // Allow empty input
              }}
              placeholder="Price"
              className="form-input"
              type="number"
              name="price"
              required
              step={0.01}
              min={0} // Prevent negative prices
            />

            <button
              className="bg-emerald-600 h-16 cursor-pointer active:bg-emerald-800 p-4 w-full rounded-xl font-bold text-lg text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "Add Product"}
            </button>
          </form>
          <ProductListMultiForm />
        </>
      )}
    </>
  );
};

export default AddProductMultiForm;
