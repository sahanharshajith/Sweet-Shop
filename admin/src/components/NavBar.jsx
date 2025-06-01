import React from 'react';
import logo from '../assets/fluffy_delights_logo.png';

const NavBar = ({ setToken }) => {
  return (
    <div className='flex items-center justify-between bg-gray-800 text-white px-[4%] py-3 shadow-md'>
      <div className='flex items-center gap-3'>
        <img className='w-[max(50px,7%)] h-auto' src={logo} alt="Fluffy Delights Logo" />
        <h1 className='text-lg sm:text-xl font-semibold'>Fluffy Delights Admin Dashboard</h1>
      </div>
      <button
        onClick={() => setToken('')}
        className='bg-blue-800 hover:bg-blue-500 transition-colors px-5 py-2 rounded-full text-sm font-medium'
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
