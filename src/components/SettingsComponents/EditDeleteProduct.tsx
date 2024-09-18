import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { products } from "../../dummyData/products";
import { useState } from "react";

const EditDeleteProduct = () => {

  const [allProducts, setAllProducts] = useState(products)

const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
const filteredProducts = products.filter(p => p.name.toLowerCase().includes(e.target.value))
console.log(e.target.value)
setAllProducts(filteredProducts)
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
      <div className="max-h-[45vh] overflow-y-scroll hide-scrollbar-firefox hide-scrollbar-webkit">
        {allProducts.map((p) => (
          <div key={p.id} className="flex items-center border rounded-xl p-4">
            <div className="flex flex-col ">
              <span className="font-bold text-white text-xl">{p.name}</span>
              <span className="text-sm ">${p.price.toFixed(2)}</span>
              <span>{p.category}</span>
            </div>
            <div className="text-3xl ml-auto">
              <button className="p-4">
                <FaEdit />
              </button>
              <button className="text-red-500 p-1">
                <MdDeleteForever />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditDeleteProduct;
