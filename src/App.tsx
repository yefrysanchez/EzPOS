import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/AppRouter'

function App() {


  return (
    <main className='flex lg:flex-row flex-col flex-shrink-0 bg-black h-screen font-inter text-lightGray'>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
