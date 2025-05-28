import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image1: String, // ✅ single image
  bestseller: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now } // ✅ supports sorting by newest
});

const ProductModel = mongoose.models.product || mongoose.model('Product', productSchema);

export default ProductModel;