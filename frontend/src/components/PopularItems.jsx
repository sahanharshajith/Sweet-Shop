import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const PopularItems = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/product/list');
        const all = res.data.products || [];
        // Sort newest and get top 8
        const sorted = all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);
        
        // Add image fallback handling
        const processedProducts = sorted.map(product => ({
          ...product,
          image: product.image1 || '/placeholder-image.jpg'
        }));
        
        setProducts(processedProducts);
      } catch (err) {
        console.error("Failed to fetch popular items:", err);
        toast.error("Failed to load popular items");
      }
    };
    fetchPopular();
  }, []);

  const handleChange = (id, value) => {
    if (/^\d*$/.test(value)) {
      setQuantities((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleAddToCart = (item) => {
    const quantity = parseInt(quantities[item._id]) || 1;

    if (quantity <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    const currentCart = JSON.parse(localStorage.getItem('sweetCart')) || [];
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem._id === item._id);

    if (existingItemIndex >= 0) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push({
        _id: item._id,
        name: item.name,
        price: parseFloat(item.price),
        image: item.image1,
        quantity: quantity
      });
    }

    localStorage.setItem('sweetCart', JSON.stringify(currentCart));
    toast.success(`${item.name} added to cart!`);
    setQuantities((prev) => ({ ...prev, [item._id]: "" }));
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto px-4 py-8 bg-[#a5a5a5]">
        <div className="text-center mb-8">
          <h2 className="text-red-600 text-2xl font-semibold border-t border-b border-red-500 inline-block px-4 py-1 my-4">
            Popular Items
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow text-center hover:shadow-lg transition">
              <div className="h-36 flex items-center justify-center mb-4">
                <img
                  src={item.image1}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain transition-transform hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </div>
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <p className="text-gray-600 mb-2">Rs.{Number(item.price).toFixed(2)}</p>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="number"
                  min="1"
                  placeholder="1"
                  value={quantities[item._id] || ""}
                  onChange={(e) => handleChange(item._id, e.target.value)}
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
      </div>
    </>
  );
};

export default PopularItems;