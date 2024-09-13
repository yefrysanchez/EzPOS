import Category from '../../components/Category/Category'
import ProductSection from '../../components/ProductSection/ProductSection'

const MenuPage = () => {
  return (
    <div className='h-full lg:w-full flex flex-col bg-black overflow-hidden p-4 lg:px-0 lg:py-4'>
      <Category />
      <ProductSection />
    </div>
  )
}

export default MenuPage