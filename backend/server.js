import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;

// CORS setup
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

connectDB();
connectCloudinary();

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    message: 'E-commerce API is working',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));