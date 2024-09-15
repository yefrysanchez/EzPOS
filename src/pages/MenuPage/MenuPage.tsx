import { useState } from 'react';
import Category from '../../components/Category/Category'
import ProductSection from '../../components/ProductSection/ProductSection'

const MenuPage = () => {

  const [activeTab, setActiveTab] = useState('Coffee');

  return (
    <div className='h-full lg:w-full flex flex-col bg-black overflow-hidden p-4 lg:px-0 lg:py-4'>
      <Category setActiveTab={setActiveTab}/>
      <ProductSection activeTab={activeTab} />
    </div>
  )
}

export default MenuPage