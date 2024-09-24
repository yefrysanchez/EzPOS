import { FaRegEdit } from "react-icons/fa";
import { products } from "../../dummyData/products";
import { useState } from "react";
import DeleteProductModal from "./DeleteProductModal";
import { AnimatePresence } from "framer-motion";
import EditProductModal from "./EditProductModal";
import { FaTrashCan } from "react-icons/fa6";

const EditDeleteProduct = () => {
  const [allProducts, setAllProducts] = useState(products);
  const [modal, setModal] = useState({ edit: false, delete: false });
  const [prodId, setProdId] = useState<number>(0)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(e.target.value)
    );
    setAllProducts(filteredProducts);
  };

  const handleDelete = (id:number) => {
    setModal({ edit: false, delete: true })
    setProdId(id)
  }

  const handleEdit = (id: number) => {
    setModal({ edit: true, delete: false })
    setProdId(id)
  }

  return (
    <div className="max-w-md">
      <div className="mb-4 flex-shrink-0">
        <input
          onChange={handleSearch}
          placeholder="Search Product"
          className="w-full text-white bg-darkGray p-4 rounded-xl mt-4"
          type="search"
          name="search"
        />
      </div>
      <div className="max-h-[37vh] flex flex-col gap-2 overflow-y-scroll hide-scrollbar-firefox hide-scrollbar-webkit">
        {allProducts.map((p) => (
          <div key={p.id} className="flex items-center border rounded-xl p-4">
            <div className="flex flex-col ">
              <span className="font-bold text-white text-xl">{p.name}</span>
              <span className="text-sm ">${p.price.toFixed(2)}</span>
              <span>{p.category}</span>
            </div>
            <div className="ml-auto flex gap-4 text-xl">
              <button
                onClick={() => handleEdit(p.id)}
                className="active:opacity-70 duration-200"
              >
                <FaRegEdit />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="active:text-red-600 duration-200"
              >
                <FaTrashCan />
              </button>
            </div>
          </div>
        ))}
        <AnimatePresence>
          {modal.delete && <DeleteProductModal setModal={setModal} id={prodId} />}
          {modal.edit && <EditProductModal setModal={setModal} id={prodId} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EditDeleteProduct;
