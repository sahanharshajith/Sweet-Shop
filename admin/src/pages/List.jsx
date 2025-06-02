import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { FiTrash2 } from 'react-icons/fi';

const List = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const [loading, setLoading] = useState(true);
  const [priceMap, setPriceMap] = useState({});

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        const processedProducts = response.data.products.map(product => ({
          ...product,
          image1: Array.isArray(product.image1)
            ? product.image1
            : [product.image1 || '/placeholder.jpg']
        }));

        const priceState = {};
        processedProducts.forEach(p => {
          priceState[p._id] = p.price;
        });

        setPriceMap(priceState);
        setList(processedProducts);
        setFilteredList(processedProducts);

        const uniqueCategories = [
          ...new Set(processedProducts.map(item => item.category).filter(Boolean))
        ];
        setCategories(['All', ...uniqueCategories]);
      } else {
        toast.error(response.data.message || 'Failed to fetch products.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Error fetching products.');
    } finally {
      setLoading(false);
    }
  };

  const updatePrice = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return toast.error('Unauthorized');

    try {
      const res = await axios.put(`${backendUrl}/api/product/update`, {
        id,
        price: priceMap[id]
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        toast.success('Price updated');
        fetchList();
      } else {
        toast.error(res.data.message || 'Failed to update price');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating price');
    }
  };

  const removeProduct = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Unauthorized: Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message || 'Failed to delete product.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error deleting product.');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    let result = selectedCategory === 'All'
      ? [...list]
      : list.filter(item => item.category === selectedCategory);

    if (sortOption === 'priceLow') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHigh') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredList(result);
  }, [selectedCategory, sortOption, list]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <p className='font-bold text-lg'>All Products List</p>

        <div className="flex gap-2">
          <select
            className='px-3 py-1 border rounded text-sm bg-white'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className='px-3 py-1 border rounded text-sm bg-white'
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_2fr_1fr] items-center py-2 px-4 border bg-gray-200 text-sm font-semibold'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price (Edit)</span>
          <span className='text-center'>Action</span>
        </div>

        {loading ? (
          <p className='text-center text-gray-500 py-4'>Loading products...</p>
        ) : filteredList.length === 0 ? (
          <p className='text-center text-gray-500 py-4'>No products in this category.</p>
        ) : (
          filteredList.map((item) => (
            <div
              key={item._id}
              className='grid grid-cols-[1fr_3fr_1fr_2fr_1fr] items-center py-2 px-4 border text-sm'
            >
              <img
                src={item.image1[0] || '/placeholder.jpg'}
                alt={item.name}
                className='w-12 h-12 object-cover rounded-md'
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.jpg';
                }}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceMap[item._id]}
                  onChange={(e) =>
                    setPriceMap(prev => ({ ...prev, [item._id]: e.target.value }))
                  }
                  className="border rounded px-2 py-1 w-24"
                />
                <button
                  onClick={() => updatePrice(item._id)}
                  className="text-green-600 text-sm font-medium hover:underline"
                >
                  Save
                </button>
              </div>
              <div className="text-center">
                <FiTrash2
                  onClick={() => removeProduct(item._id)}
                  className="mx-auto text-red-500 cursor-pointer hover:text-red-700"
                  size={18}
                  title="Delete Product"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default List;
