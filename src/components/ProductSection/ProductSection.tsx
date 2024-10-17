import AddProduct from "./AddProduct";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { CategoryType } from "../../types/types";


type ProductSectionType = {
  activeTab: number
}

const ProductSection: React.FC<ProductSectionType> = ({activeTab}) => {

  const { products, category } = useSelector((state: RootState) => state.auth);
  const [findCategory, setCategory] = useState<CategoryType>()

 
  const categories = products.filter(product => product.categoryId === activeTab )

  useEffect(() => {
    const find = category.find(c => c.id === activeTab)
    setCategory(find)
    
  }, [activeTab])
  return (
    <section className="hide-scrollbar-webkit hide-scrollbar-firefox mt-4 h-full flex gap-2 flex-wrap place-content-start overflow-y-scroll max-w-4xl">
      {categories.map((p) => (
        <AddProduct
          key={p.id}
          price={Number(p.price)}
          id={p.id}
          name={p.name}
          category={findCategory ? findCategory.name : "Unavailable"}
        />
      ))}
    </section>
  );
};

export default ProductSection;
