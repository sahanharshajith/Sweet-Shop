import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// CORS setup - Fixed configuration
const allowedOrigins = [
  'http://localhost:5174', // Your frontend development URL
  'http://localhost:5173', // Common alternative port
  process.env.FRONTEND_PROD_URL, // Your production frontend URL
  'https://sweet-shop-admin-ashen.vercel.app',
  'https://sweet-shop-frontend-one.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Body parser middleware (removed duplicate line)
app.use(express.json({ limit: '10mb' }));

// Database connections
connectDB();
connectCloudinary();

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    message: 'E-commerce API is working',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));