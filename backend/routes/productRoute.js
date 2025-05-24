import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/productControllers.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Route to add a product with image uploads
productRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 }
  ]),
  addProduct
);

// Route to remove a product
productRouter.post('/remove', adminAuth, removeProduct);

// Route to get a single product by ID
productRouter.post('/single', singleProduct);

// Route to list all products
productRouter.get('/list', listProduct);

export default productRouter;
