import CategoryBtn from "./CategoryBtn";
import { GiSlicedBread } from "react-icons/gi";
import { PiCoffeeFill } from "react-icons/pi";
import { RiDrinks2Fill } from "react-icons/ri";


const Category = () => {
  return (
    <section className="">
      <div className="mb-4">
        <input
          className="bg-darkGray w-full lg:max-w-[33%] placeholder:text-sm p-2 rounded-lg"
          placeholder="Search"
          type="search"
        />
      </div>
      <div className="flex gap-2">
        <CategoryBtn category="Coffee" icon={PiCoffeeFill} BgColor="bg-green" />
        <CategoryBtn category="Cold Drinks" icon={RiDrinks2Fill} BgColor="bg-pink" />
        <CategoryBtn category="Snacks" icon={GiSlicedBread } BgColor="bg-blue" />
      </div>
    </section>
  );
};

export default Category;
