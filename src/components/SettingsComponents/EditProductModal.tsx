import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { fade } from "../../animations/animations";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ProductType } from "../../types/types";
import AlertError from "../Alerts/AlertError";

type DeleteProductModalType = {
  setModal: React.Dispatch<
    React.SetStateAction<{ edit: boolean; delete: boolean }>
  >;
  id: number | undefined;
  trigger: boolean;
  setTrigger: (bool: boolean) => void;
};

const EditProductModal: React.FC<DeleteProductModalType> = ({
  setModal,
  id,
  trigger,
  setTrigger,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { products, category, account } = useSelector(
    (state: RootState) => state.auth
  );

  const [productDetails, setProductDetails] = useState<ProductType | undefined>(
    undefined
  );

  const url = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    setProductDetails(foundProduct);
  }, [products, id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductDetails((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "price" ? parseFloat(value) : value,
          }
        : prev
    );
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (!productDetails)
        throw new Error("Product details are not available.");

      const res = await fetch(`${url}products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: productDetails.name,
          price: productDetails.price,
          categoryId: productDetails.categoryId,
          accountId: account?.id,
        }),
      });
      if (!res.ok) {
        setIsLoading(false);
        throw new Error(`${res.status}`);
      }
      setTrigger(!trigger);
    } catch (error) {
      console.error("Error editing product:", error);
      setErrorMessage("Failed to edit the product. Please try again.");
    } finally {
      setTrigger(!trigger)
      setIsLoading(false);
      setModal({ edit: false, delete: false });
    }
  };

  return (
    <motion.div
      variants={fade}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed backdrop-blur-sm top-0 right-0 left-0 px-4 bottom-0 bg-black/20 border border-darkGray flex justify-center items-center"
    >
      <form
        onSubmit={handleEdit}
        className="w-full flex flex-col gap-2 max-w-md bg-white p-4 rounded-xl text-center"
      >
        <h3 className="text-black font-bold text-2xl">Edit Product</h3>

        {errorMessage && <AlertError error={errorMessage} />}

        <input
          name="name"
          value={productDetails?.name || ""}
          onChange={handleInputChange}
          placeholder="Name"
          className="text-black border border-gray p-2 rounded-lg"
          required
          type="text"
        />

        <select
          name="categoryId"
          value={productDetails?.categoryId || ""}
          onChange={handleInputChange}
          className="text-black border border-gray p-2 rounded-lg capitalize"
          required
        >
          {category.map((c) => (
            <option key={c.id} className="capitalize" value={Number(c.id)}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          name="price"
          value={productDetails?.price || ""}
          onChange={handleInputChange}
          placeholder="Price"
          className="text-black border border-gray p-2 rounded-lg"
          required
          type="number"
          step={0.01}
        />

        <div className="flex mx-auto gap-2">
          <button
            onClick={() => setModal({ edit: false, delete: false })}
            className="rounded-md min-w-[100px] px-6 py-2 bg-lightGray text-white active:bg-gray"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-md min-w-[100px] px-6 py-2 bg-violet-600 text-white active:bg-green-700"
          >
            {isLoading ? <Loading /> : "Edit"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditProductModal;
