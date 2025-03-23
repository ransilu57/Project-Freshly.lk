import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import buyerRoutes from './routes/Buyer.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/buyers', buyerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Serve uploads folder statically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Health check / root
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// Custom error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT} → http://localhost:${PORT}`);
});
