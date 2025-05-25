import React, { useState } from 'react';
import uploadImage from '../assets/upload_area.png';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  

  const handleSizeToggle = (size) => {
    setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try{
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('price', price);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);  
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
      headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data' 
            }
      });

      if(response.data.success){
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
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
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      {/* Upload Image */}
      <div>
        <p className='mb-2'>Upload Images</p>
        <div className='flex gap-2'>
          {[image1, image2, image3, image4].map((img, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img className='w-20' src={img ? URL.createObjectURL(img) : uploadImage} alt="" />
              <input
                type="file"
                id={`image${index + 1}`}
                hidden
                onChange={(e) => {
                  const setter = [setImage1, setImage2, setImage3, setImage4][index];
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

      {/* Description */}
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea
          className='w-full max-w-[500px] px-3 py-2'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Write content here'
          required
        />
      </div>

      {/* Category / Subcategory / Price */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select className='w-full px-3 py-2' value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Sub Category</p>
          <select className='w-full px-3 py-2' value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input
            className='w-full px-3 py-2 sm:w-[120px]'
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Price in $'
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <p
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-1 cursor-pointer ${sizes.includes(size) ? "bg-pink-300" : "bg-slate-200"}`}
            >
              {size}
            </p>
          ))}
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
      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white cursor-pointer'>
        Add Product
      </button>
    </form>
  );
};

export default Add;
