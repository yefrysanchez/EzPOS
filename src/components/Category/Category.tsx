import CategoryBtn from "./CategoryBtn";

import { RootState } from "../../store/store";

import { useSelector } from "react-redux";

type CategoryType = {
  setActiveTab: (tab: number | null) => void;
  activeTab: number | null;
};

const Category: React.FC<CategoryType> = ({ setActiveTab, activeTab }) => {
  const { category } = useSelector((state: RootState) => state.auth);

  return (
    <section className="">
      <div className="mb-4 tracking-tighter">
        <h2 className="text-5xl font-bold text-white">Menu</h2>
      </div>
      <div className="relative flex xl:flex-wrap gap-2 overflow-x-scroll lg:overflow-x-auto hide-scrollbar-webkit  hide-scrollbar-firefox">
        {category.map((c) => (
          <div key={c.id} onClick={() => setActiveTab(c.id)}>
            <CategoryBtn activeTab={activeTab} category={c} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
