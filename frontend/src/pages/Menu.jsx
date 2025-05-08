import { useState } from 'react';
import { menuItems, categories } from '../assets/assets';
import Footer from '../components/Footer';

const FoodMenu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [quantities, setQuantities] = useState({});

  const handleChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    alert(`Added ${quantity} x ${item.name} to cart!`);
  };

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <>
    <div className="max-w-6xl mx-auto px-4 py-8 bg-[#e4e4e4]">
      <div className="text-center mb-8">
        <h2 className="text-red-600 text-2xl font-semibold border-t border-b border-red-500 inline-block px-4 py-1 my-4">
          Food Menu
        </h2>
        <h3 className="text-3xl text-black font-bold">Sweets Items</h3>
      </div>

      <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar">
        <div className="flex space-x-2 mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-amber-500 text-white font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow text-center hover:shadow-lg transition">
            <img
              src={item.image}
              alt={item.name}
              className="h-36 w-auto mx-auto mb-4 object-contain transition-transform hover:scale-105"
            />
            <h3 className="font-bold text-lg mb-1">{item.name}</h3>
            <p className="text-gray-600 mb-2">Rs.{Number(item.price).toFixed(2)}</p>
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

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found in this category</p>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default FoodMenu;
