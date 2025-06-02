import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

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
        const res = await axios.get('http://localhost:4000/api/product/list');
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
      <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-br from-orange-50 to-pink-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-red-600 tracking-wide mb-2 border-b-2 inline-block border-red-400 px-6 pb-1">
            Food Menu
          </h2>
          <p className="text-xl text-gray-700">Discover our tasty sweets</p>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((category, index) => (
              <button
                key={`category-${category || index}`}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition font-medium shadow ${
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
            className="px-3 py-2 border border-gray-300 rounded bg-white text-sm shadow"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedItems.map((item, index) => (
            <div
              key={`product-${item.id || index}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col items-center text-center"
            >
              <img
                src={item.image1}
                alt={item.name}
                className="h-36 w-auto object-contain mb-4 rounded-md"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-red-600 font-medium mb-2">Rs.{Number(item.price).toFixed(2)}</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  placeholder="1"
                  value={quantities[item.id] || ""}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  className="w-16 border border-gray-300 rounded p-1 text-center text-sm shadow-sm"
                />
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-green-700 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm transition flex items-center gap-1 shadow"
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
