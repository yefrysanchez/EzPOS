import { FormEvent, useState } from "react";
import AlertSuccess from "../Alerts/AlertSuccess";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AlertError from "../Alerts/AlertError";
import Loading from "../Loading/Loading";

type AddProdtype = {
  trigger: boolean;
  setTrigger: (bool: boolean) => void;
};

const AddProductForm: React.FC<AddProdtype> = ({ trigger, setTrigger }) => {
  const [isAdded, setIsAdded] = useState(false);

  const [price, setPrice] = useState<number | string>("");
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<number | string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const url = import.meta.env.VITE_BACKEND;

  const { category, account } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${url}products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          categoryId,
          accountId: account?.id,
        }),
      });
      if (!res.ok) {
        setIsLoading(false);
        throw new Error(`${res.status}`);
      }
      setName("")
      setPrice("")
      setCategoryId("")
      setIsAdded(true);
    } catch (error) {
      console.error(error);
      setError(`${error}`);
    } finally {
      setIsLoading(false);
      setTrigger(!trigger);
    }
  };

  return (
    <>
      {isAdded ? (
        <div className="mt-4 max-w-md">
          <AlertSuccess alert="Product added successful" />
          <button
            onClick={() => setIsAdded(false)}
            className="w-full p-4 text-center bg-darkGray active:bg-gray rounded-xl text-white"
          >
            Add Another Product
          </button>
        </div>
      ) : (
        <>
          <div className="mt-4 max-w-md">
            {error && <AlertError error={error} />}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 mt-4 max-w-md relative"
          >
            {isLoading && (
              <div className="absolute flex justify-center items-center h-full w-full bg-black/70 rounded-lg">
                <Loading />
              </div>
            )}
            <select
              onChange={(e) => setCategoryId(Number(e.target.value))}
              required
              className="bg-darkGray p-4 w-ful capitalize rounded-xl text-white"
              name="category"
              value={categoryId}
            >
              <option value="" disabled>
                Select a category
              </option>
              {category.map((c) => (
                <option key={c.id} value={c.id} className="capitalize">
                  {c.name}
                </option>
              ))}
            </select>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Product Name"
              className="bg-darkGray p-4 w-full rounded-xl text-white"
              type="text"
              name="Product Name"
              required
            />
            <input
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
              placeholder="Price"
              className="bg-darkGray p-4 w-full rounded-xl text-white"
              type="number"
              name="price"
              required
              step={0.01}
              min={0}
            />

            <input
              disabled={isLoading}
              className="bg-emerald-600 cursor-pointer active:bg-emerald-800 p-4 w-full rounded-xl font-bold text-lg text-white"
              type="submit"
              value="Add Product"
            />
          </form>
        </>
      )}
    </>
  );
};

export default AddProductForm;
