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

  // Redux ////////////
  const {category} = useSelector((state:RootState) => state.auth)
  ////////////////////

  //to send to the DB
  const [categoryInput, setCategoryInput] = useState("");
  const [productInput, setProductInput] = useState("");
  const [priceInput, setPriceInput] = useState<number>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log({
        category: categoryInput,
        product: productInput,
        price: priceInput,
      });
      setIsAdded(true);
      // Reset input fields
      setCategoryInput("");
      setProductInput("");
      setPriceInput(0);
    } catch (err: unknown) {
      // Type the error as unknown
      if (err instanceof Error) {
        setError(err.message); // Set the error message if it's an instance of Error
      } else {
        setError("An unknown error occurred."); // Handle other types of errors
      }
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
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
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
            <input
              onChange={(e) => setProductInput(e.target.value)}
              placeholder="Product Name"
              className="form-input"
              type="text"
              name="Product Name"
              value={productInput}
              required
            />
            <input
              onChange={(e) => setPriceInput(Number(e.target.value))}
              placeholder="Price"
              className="form-input"
              type="number"
              name="price"
              required
              step={0.01}
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
