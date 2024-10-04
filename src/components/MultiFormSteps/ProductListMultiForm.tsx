import { IoClose } from "react-icons/io5";

const ProductListMultiForm = () => {
  return (
    <div className="bg-lightGray/10 p-2 text-white text-start rounded-lg h-32 mb-4  grid grid-cols-2 gap-1 overflow-y-scroll hide-scrollbar-firefox hide-scrollbar-webkit">
      {prods.length < 1 ? <span className="text-black">No Products</span> : (prods.map((p) => (
        <div
          key={p.id}
          className=" bg-darkGray overflow-hidden h-24 rounded-lg w-full pl-2 flex justify-between"
        >
          <div className="flex flex-col justify-center h-full">
            <span className="text-nowrap whitespace-nowrap text-ellipsis overflow-hidden w-[160px]">
              {p.name}
            </span>
            <span className="text-nowrap whitespace-nowrap text-ellipsis overflow-hidden w-[160px]">
              {p.category}
            </span>
            <span>${p.price.toFixed(2)}</span>
          </div>
          <button
            className="h-full flex justify-center items-center text-4xl w-1/5 hover:bg-red-600 transition"
            type="button"
          >
            <IoClose />
          </button>
        </div>
      )))}
    </div>
  );
};

export default ProductListMultiForm;

const prods = [
  {
    id: 7,
    name: "Matcha Latteeeeeeeeeeeeee",
    category: "Coffee",
    price: 4.25,
  },
  {
    id: 8,
    name: "Iced Coffee",
    category: "Cold Drinks",
    price: 3.5,
  },
  {
    id: 9,
    name: "Fruit Smoothie",
    category: "Cold Drinks",
    price: 5.0,
  },
];
