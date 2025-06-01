import React from 'react'
import {NavLink} from 'react-router-dom'
import Add from '../assets/add_icon.png'
import Order from '../assets/order_icon.png'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-[#e4e4e4]'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink className='flex items-center gap-3 border border-gray-700 border-r-0 px-3 py-2 rounded-l' to = "/add">
                <img className='w-5 h-5' src={Add} alt="" />
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-700 border-r-0 px-3 py-2 rounded-l' to = "/list">
                <img className='w-5 h-5' src={Order} alt="" />
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-700 border-r-0 px-3 py-2 rounded-l' to = "/orders">
                <img className='w-5 h-5' src={Order} alt="" />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  ) 
}

export default Sidebar