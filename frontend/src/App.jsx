import React from 'react'
import { Routes, Route } from 'react-router-dom' 
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import AuthForm from './components/AuthForm'
import Menu from './pages/Menu'
import Product from './pages/Product'
import Service from './pages/Service'
import NavBar from './components/NavBar'
import OurTeam from './components/OurTeam'
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/authform' element={<AuthForm />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/product' element={<Product />} />
        <Route path='/ourteam' element={<OurTeam />} />
        <Route path='/service' element={<Service />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      
    </div>
  )
}

export default App