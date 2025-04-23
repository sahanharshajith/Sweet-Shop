import React from 'react'
import { Routes, Route } from 'react-router-dom' 
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Product from './pages/Product'
import Service from './pages/Service'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/product' element={<Product />} />
        <Route path='/service' element={<Service />} />
      </Routes>
      
    </div>
  )
}

export default App