import React, { useState } from "react";
import { popularItems } from "../assets/assets";

const PopularItems = () => {
  const [quantities, setQuantities] = useState({});

  const handleChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    alert(`Added ${quantity} x ${item.name} to cart!`);
  };

  return (
    <section className="p-8 bg-[#e4e4e4] min-h-screen">
      <div className="flex justify-center mb-6">
          <h2 className="text-red-600 text-2xl font-semibold border-t border-b border-red-500 inline-block px-4 py-1">
          Popular Items
          </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow text-center hover:shadow-lg transition">
            <img
              src={item.image}
              alt={item.name}
              className="h-36 w-auto mx-auto mb-4 object-contain transition-transform hover:scale-105"
            />
            <h3 className="font-bold text-lg mb-1">{item.name}</h3>
            <p className="text-gray-600 mb-2">Rs.{item.price.toFixed(2)}</p>
            <div className="flex items-center justify-center gap-2">
              <input
                type="number"
                min="1"
                placeholder="1"
                value={quantities[item.id] || ""}
                onChange={(e) => handleChange(item.id, e.target.value)}
                className="w-14 border border-gray-300 rounded p-1 text-center"
              />
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-green-800 hover:bg-green-200 px-3 py-1 rounded text-lg"
              >
                🛒
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button onClick={() => window.location.href = '/menu'} 
          class="rounded-md border border-transparent py-2 px-4 flex items-center text-center text-xl transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
          See all items
    
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 ml-1.5">
            <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>

        </button>
      </div>

    </section>
  );
};

export default PopularItems;
