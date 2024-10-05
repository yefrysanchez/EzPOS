import { useState } from 'react';
import Category from '../../components/Category/Category'
import ProductSection from '../../components/ProductSection/ProductSection'

const MenuPage = () => {

  const [activeTab, setActiveTab] = useState("");

  return (
    <div className='h-screen lg:w-full flex flex-col bg-black overflow-hidden p-2'>
      <Category activeTab={activeTab} setActiveTab={setActiveTab}/>
      <ProductSection activeTab={activeTab} />
    </div>
  )
}

export default MenuPage