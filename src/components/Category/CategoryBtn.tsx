import { useSelector } from "react-redux";
import { CategoryType } from "../../types/types";
import { RootState } from "../../store/store";

type CategoryBtnType = {

  category: CategoryType;
  activeTab: number | null;
};

const CategoryBtn: React.FC<CategoryBtnType> = ({

  category,
  activeTab,
}) => {

  const {products} = useSelector((state:RootState) => state.auth)
  
  const items = products.filter((item) => item.categoryId === category.id);

  return (
    <button
      className={`${
        activeTab === category.id
          ? "bg-purple text-black"
          : "bg-darkGray text-white"
      } flex-shrink-0 active:scale-95 duration-200  p-4 h-[130px] flex flex-col justify-end w-[150px] max-w-[150px] rounded-xl`}
    >
      
      <div className="flex flex-col text-start">
        <span className="font-bold text-xl capitalize">{category.name}</span>
        <span
          className={`text-xs ${
            activeTab === category.id ? "text-gray" : "text-lightGray"
          } `}
        >
          {items.length} Items
        </span>
      </div>
    </button>
  );
};

export default CategoryBtn;
