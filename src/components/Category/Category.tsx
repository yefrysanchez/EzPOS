import CategoryBtn from "./CategoryBtn";
import { GiSlicedBread } from "react-icons/gi";
import { PiCoffeeFill } from "react-icons/pi";
import { RiDrinks2Fill } from "react-icons/ri";

type CategoryType = {
  setActiveTab: (tab: string) => void;
  activeTab: string;
};

const Category: React.FC<CategoryType> = ({ setActiveTab, activeTab }) => {

  return (
    <section className="">
      <div className="mb-4 tracking-tighter">
        <h2 className="text-5xl font-bold text-white">Menu</h2>
      </div>
      <div className="relative flex xl:flex-wrap gap-2 overflow-x-scroll lg:overflow-x-auto hide-scrollbar-webkit  hide-scrollbar-firefox">
        <div onClick={() => setActiveTab("Coffee")}>
          <CategoryBtn
            activeTab={activeTab}
            category="Coffee"
            icon={PiCoffeeFill}
            BgColor="bg-green"
          />
        </div>
        <div onClick={() => setActiveTab("Cold Drinks")}>
          <CategoryBtn
            activeTab={activeTab}
            category="Cold Drinks"
            icon={RiDrinks2Fill}
            BgColor="bg-pink"
          />
        </div>
        <div onClick={() => setActiveTab("Snacks")}>
          <CategoryBtn
            activeTab={activeTab}
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
