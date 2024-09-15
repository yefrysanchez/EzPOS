import AddProduct from './AddProduct'
import { products } from '../../dummyData/products'

const ProductSection = () => {
  return (
    <section className='hide-scrollbar-webkit hide-scrollbar-firefox mt-4 h-full flex  gap-2 flex-wrap place-content-start overflow-y-scroll max-w-4xl'>
      {
        products.map(p => (
          <AddProduct key={p.id} price={Number(p.price)} id={p.id} name={p.name} category={p.category} />
        ))
      }
  
    </section>
  )
}

export default ProductSection