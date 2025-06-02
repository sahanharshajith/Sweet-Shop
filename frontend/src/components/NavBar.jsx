import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('sweetCart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    navigate('/'); // Redirect to home
  };

  return (
    <div className="sticky top-0 z-50 bg-gray-800 text-white backdrop-blur-md shadow-md px-6 sm:px-10 py-4 flex items-center justify-between font-medium">
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='w-20 hover:scale-105 transition-transform duration-200' />
      </Link>

      <ul className='hidden sm:flex gap-6 text-sm'>
        {["/", "/about", "/service", "/menu", "/contact"].map((path, index) => (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) =>
              `hover:text-red-400 transition-colors ${
                isActive ? "text-red-400 font-semibold border-b-2 border-red-400" : ""
              }`
            }
          >
            {["HOME", "ABOUT", "SERVICE", "MENU", "CONTACT"][index]}
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-6'>
        <div className='relative group'>
          <Link to='/authform'>
            <img src={assets.profile_icon} alt="Profile" className='w-6 h-6 cursor-pointer invert' />
          </Link>
          <div className='hidden group-hover:flex absolute right-0 top-8 flex-col gap-2 w-36 py-2 px-4 bg-white shadow-lg text-gray-700 rounded z-10'>
            <Link to='/orders' className='hover:text-black'>Orders</Link>
            <p className='cursor-pointer hover:text-black' onClick={handleLogout}>Logout</p>
          </div>
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} alt="Cart" className='w-6 h-6 cursor-pointer invert' />
          {cartCount > 0 && (
            <span className='absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full'>
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu"
          className='w-6 cursor-pointer sm:hidden invert'
        />
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-800'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/service'>SERVICE</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/menu'>MENU</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/orders'>ORDERS</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/cart'>
            CART {cartCount > 0 && `(${cartCount})`}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
