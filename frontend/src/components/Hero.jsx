import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center bg-gradient-to-r bg-[#e4e4e4] shadow-md rounded-lg overflow-hidden">
      
      <div className="w-full sm:w-1/2 flex items-center justify-center py-12 px-6 sm:px-10">
        <div className="text-[#333] text-center sm:text-left max-w-lg">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-snug righteous-regular">
            Your Dessert Specialist
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6">
            Discover Sri Lanka's top cake shop - <span className="text-red-500 font-semibold">Fluffy Delights</span>! We blend tradition with the finest ingredients to craft irresistible local and international sweets. Satisfy your cravings at Fluffy Delights today!
          </p>
          <button 
            onClick={() => window.location.href = '/menu'} 
            className="bg-red-500 hover:bg-red-600 transition text-white font-bold py-3 px-6 rounded-full shadow-md"
          >
            PLACE ORDERS
          </button>
        </div>
      </div>

      <div className="w-full sm:w-1/2">
        <img 
          src={assets.hero_image} 
          alt="Hero Dessert" 
          className="w-130 h-full object-cover rounded-t-lg sm:rounded-none sm:rounded-r-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
