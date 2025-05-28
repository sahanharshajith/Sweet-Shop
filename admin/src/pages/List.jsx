import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        // Ensure each product has a valid image array
        const processedProducts = response.data.products.map(product => ({
          ...product,
          image1: Array.isArray(product.image1) ? product.image1 : [product.image1 || '/placeholder.jpg']
        }));
        setList(processedProducts);
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
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
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

  return (
    <>
      <p className='mb-2 font-bold text-lg'>All Products List</p>

      <div className='flex flex-col gap-2'>
        {/* Table Header */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-200 text-sm font-semibold'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-center'>Action</span>
        </div>

        {/* Loading State */}
        {loading ? (
          <p className='text-center text-gray-500 py-4'>Loading products...</p>
        ) : (
          list.map((item) => (
            <div
              key={item._id}
              className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border text-sm'
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
              <p>Rs.{item.price}</p>
              <div
                onClick={() => removeProduct(item._id)}
                className='text-center text-red-500 cursor-pointer text-lg font-bold hover:text-red-700'
              >
                X
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default List;