import React, { useState } from "react";
import { bestSellingItems } from "../assets/assets";
import toast, { Toaster } from "react-hot-toast";

const BestSeller = () => {
  const [quantities, setQuantities] = useState({});

  const handleChange = (id, value) => {
    const numberValue = parseInt(value);
    if (numberValue >= 1 || value === "") {
      setQuantities((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleAddToCart = (item) => {
    const quantity = parseInt(quantities[item.id]) || 1;

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("sweetCart")) || [];
    const existingIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...item, quantity });
    }

    localStorage.setItem("sweetCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    setQuantities((prev) => ({ ...prev, [item.id]: "" }));

    toast.success(`${item.name} added to cart!`);
  };

  return (
    <section className="pt-8 pb-12 px-8 bg-[#e4e4e4]">
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />

      <div className="flex justify-center mb-6">
        <h2 className="text-red-600 text-2xl font-semibold border-t border-b border-red-500 inline-block px-4 py-1">
          New Arrivals
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellingItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded shadow text-center hover:shadow-lg transition"
          >
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
                className="bg-green-800 hover:bg-green-200 text-white hover:text-green-800 px-3 py-1 rounded text-lg flex items-center justify-center transition-colors"
              >
                🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSeller;