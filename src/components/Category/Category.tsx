import CategoryBtn from "./CategoryBtn";
import { GiSlicedBread } from "react-icons/gi";
import { PiCoffeeFill } from "react-icons/pi";
import { RiDrinks2Fill } from "react-icons/ri";

type CategoryType = {
  setActiveTab: (tab: string) => void;
};

const Category: React.FC<CategoryType> = ({ setActiveTab }) => {
  return (
    <section className="">
      <div className="mb-4">
        <input
          className="bg-darkGray w-full lg:max-w-[33%] placeholder:text-sm p-2 rounded-lg"
          placeholder="Search"
          type="search"
        />
      </div>
      <div className="flex gap-2 overflow-x-scroll lg:overflow-x-visible">
        <div onClick={() => setActiveTab("Coffee")}>
          <CategoryBtn
            category="Coffee"
            icon={PiCoffeeFill}
            BgColor="bg-green"
          />
        </div>
        <div onClick={() => setActiveTab("Cold Drinks")}>
          <CategoryBtn
            category="Cold Drinks"
            icon={RiDrinks2Fill}
            BgColor="bg-pink"
          />
        </div>
        <div onClick={() => setActiveTab("Snacks")}>
          <CategoryBtn
            category="Snacks"
            icon={GiSlicedBread}
            BgColor="bg-blue"
          />
        </div>
      </div>
    </section>
  );
};

export default Category;
