import { products } from "../../dummyData/products";

type CategoryBtnType = {
  BgColor: string;
  category: string;
  icon: React.ComponentType; // Use React.ComponentType to type the icon prop
  activeTab: string;
};

const CategoryBtn: React.FC<CategoryBtnType> = ({
  BgColor,
  category,
  icon: Icon,
  activeTab,
}) => {

  
  const items = products.filter((item) => item.category === category);

  return (
    <button
      className={`${
        activeTab === category
          ? BgColor + " text-black"
          : "bg-darkGray text-white"
      } flex-shrink-0 active:scale-95 duration-200  p-4 h-[130px] flex flex-col justify-between w-[150px] max-w-[150px] rounded-xl`}
    >
      <div className="text-3xl">
        <Icon />
      </div>
      <div className="flex flex-col text-start">
        <span className="font-bold text-xl">{category}</span>
        <span
          className={`text-xs ${
            activeTab === category ? "text-gray" : "text-lightGray"
          } `}
        >
          {items.length} Items
        </span>
      </div>
    </button>
  );
};

export default CategoryBtn;
