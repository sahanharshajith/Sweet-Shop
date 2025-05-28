import React, { useState } from 'react';
import uploadImage from '../assets/upload_area.png';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [image1, setImage1] = useState(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try{
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('bestseller', bestseller);

      image1 && formData.append('image1', image1);

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
      headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data' 
            }
      });

      if(response.data.success){
        toast.success(response.data.message);
        setName('');
        setImage1(false);
        setPrice('');
      }else {
        toast.error(response.data.message);
      }

    }catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 '>
      {/* Upload Image */}
      <div>
        <p className='mb-2'>Upload Images</p>
        <div className='flex gap-2'>
          {[image1].map((img, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img className='w-20' src={img ? URL.createObjectURL(img) : uploadImage} alt="" />
              <input
                type="file"
                id={`image${index + 1}`}
                hidden
                onChange={(e) => {
                  const setter = [setImage1][index];
                  setter(e.target.files[0]);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input
          className='w-full max-w-[500px] px-3 py-2'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Type here'
          required
        />
      </div>

      {/* Category / Price */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select className='w-full px-3 py-2' value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Cupcakes">Cupcakes</option>
            <option value="Cakes">Cakes</option>
            <option value="Desserts">Desserts</option>
            <option value="Cookies">Cookies</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input
            className='w-full px-3 py-2 sm:w-[120px]'
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Price in Rs.'
            required
          />
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className='flex gap-2 mt-2'>
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller(prev => !prev)}
        />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      {/* Submit Button */}
      <button type='submit' className='w-28 py-3 mt-4 bg-blue-600 rounded-md text-white cursor-pointer'>
        Add Product
      </button>
    </form>
  );
};

export default Add;
