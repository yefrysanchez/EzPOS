import './App.css'
import Navbar from './components/Navbar/Navbar'
import OrderSection from './components/OrderSection/OrderSection'
import MenuPage from './pages/MenuPage/MenuPage'

function App() {


  return (
    <main className='flex lg:flex-row flex-col flex-shrink-0 bg-black h-screen font-inter text-lightGray'>
      <Navbar />
      <MenuPage />
      <OrderSection />
    </main>
  )
}

export default App
