import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/porductModel.js'

const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      bestseller // ✅ receive from frontend
    } = req.body;

    const image1 = req.files?.image1?.[0]?.path;

    if (!image1) {
      return res.status(400).json({ success: false, message: 'No image uploaded.' });
    }

    // Upload to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image1, {
      resource_type: 'image'
    });

    // ✅ Build product data with bestseller and createdAt
    const productData = {
      name,
      price: Number(price),
      category,
      image1: uploadedImage.secure_url,
      bestseller: bestseller === 'true' || bestseller === true, // checkbox sends string
      createdAt: new Date()
    };

    const product = new productModel(productData);
    await product.save();

    res.json({
      success: true,
      message: 'Product added successfully',
    });
  } catch (error) {
    console.error('Error in addProduct:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const listProduct = async (req, res) => {
  try {
    // TODO: Fetch products from DB
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error('Error in listProduct:', error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product removed' });
  } catch (error) {
    console.error('Error in removeProduct:', error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error in singleProduct:', error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
