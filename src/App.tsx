import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/AppRouter'

function App() {


  return (
    <main className='h-dvh flex lg:flex-row flex-col flex-shrink-0 bg-black font-inter text-lightGray'>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
