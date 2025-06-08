import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const FoodMenu = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [quantities, setQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState('default');

  const updateCartCount = useCallback(() => {
    const cart = JSON.parse(localStorage.getItem('sweetCart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, []);

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, [updateCartCount]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/product/list`);
        const fetchedProducts = res.data.products || [];

        const productsWithIds = fetchedProducts.map((product, index) => ({
          ...product,
          id: product.id || `temp-id-${index}`,
        }));

        setProducts(productsWithIds);
        const uniqueCategories = ['All', ...new Set(productsWithIds.map(item => item.category || 'Uncategorized'))];
        setCategories(uniqueCategories.filter(Boolean));
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (id, value) => {
    if (/^\d*$/.test(value)) {
      setQuantities((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleAddToCart = (item) => {
    const quantity = parseInt(quantities[item.id]) || 1;
    if (quantity <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    const currentCart = JSON.parse(localStorage.getItem('sweetCart')) || [];
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex >= 0) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
        image: item.image1,
        quantity: quantity
      });
    }

    localStorage.setItem('sweetCart', JSON.stringify(currentCart));
    updateCartCount();
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    toast.success(`${item.name} added to cart!`);
    setQuantities((prev) => ({ ...prev, [item.id]: "" }));
  };

  const filteredItems = products.filter(item => activeCategory === 'All' || item.category === activeCategory);

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortOption) {
      case 'priceLow': return a.price - b.price;
      case 'priceHigh': return b.price - a.price;
      case 'nameAZ': return a.name.localeCompare(b.name);
      case 'nameZA': return b.name.localeCompare(a.name);
      default: return 0;
    }
  });

  return (
    <>
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-10 bg-gradient-to-br bg-[#a5a5a5] min-h-screen">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-red-600 text-xl sm:text-2xl font-semibold border-t border-b border-red-500 inline-block px-4 py-1 mb-4 sm:mb-6">
            Food Menu
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">Discover our tasty sweets</p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-2 overflow-x-auto hide-scrollbar justify-center md:justify-start">
            {categories.map((category, index) => (
              <button
                key={`category-${category || index}`}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition font-medium shadow ${
                  activeCategory === category
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <select
            className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded bg-white text-xs sm:text-sm shadow mt-2 md:mt-0"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="nameAZ">Name: A-Z</option>
            <option value="nameZA">Name: Z-A</option>
          </select>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8">
          {sortedItems.map((item, index) => (
            <div
              key={`product-${item.id || index}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-3 sm:p-4 flex flex-col items-center text-center"
            >
              <img
                src={item.image1}
                alt={item.name}
                className="h-28 w-auto sm:h-36 object-contain mb-3 sm:mb-4 rounded-md"
              />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-red-600 font-medium mb-2 text-sm sm:text-base">Rs.{Number(item.price).toFixed(2)}</p>
              <div className="flex items-center gap-2 w-full justify-center">
                <input
                  type="number"
                  min="1"
                  placeholder="1"
                  value={quantities[item.id] || ""}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  className="w-12 sm:w-16 border border-gray-300 rounded p-1 text-center text-xs sm:text-sm shadow-sm"
                />
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-green-700 hover:bg-green-600 text-white px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm transition flex items-center gap-1 shadow"
                >
                  🛒 Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found in this category</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FoodMenu;
