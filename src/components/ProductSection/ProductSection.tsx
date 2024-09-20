import AddProduct from "./AddProduct";
import { products } from "../../dummyData/products";


type ProductSectionType = {
  activeTab: string
}

const ProductSection: React.FC<ProductSectionType> = ({activeTab}) => {
 
  const category = products.filter(product => product.category === activeTab )

  return (
    <section className="hide-scrollbar-webkit hide-scrollbar-firefox mt-4 h-full flex gap-2 flex-wrap place-content-start overflow-y-scroll max-w-4xl">
      {category.map((p) => (
        <AddProduct
          key={p.id}
          price={Number(p.price)}
          id={p.id}
          name={p.name}
          category={p.category}
        />
      ))}
    </section>
  );
};

export default ProductSection;
