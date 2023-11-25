import { useState } from 'react'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import './App.css'
import { logo } from './assets'
import { Home,Createpost } from './Pages'
function App() {

  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center border-b border-b-[#e6ebf4] bg-white sm:px-8 px-4 py-4 '  >
        <Link to='/' > 
      <img src={logo} className='w-28 object-contain'/>
        </Link>
        <Link to='/createpost' className='font-inter font-bold px-4 py-2 bg-[#6469ff] text-white rounded-md ' > 
        Create
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-4 bg-[#f9f9fe] min-h-[calc(100vh-73px)] ' > 
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/createpost' element={<Createpost/>} />
      </Routes>
      </main>
        
    </BrowserRouter>
  )
}

export default App
