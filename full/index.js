import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comments.js';
import { connectDB } from './utils/db.js';
import jobRoutes from './routes/job.route.js';


dotenv.config();

const app = express();

connectDB().then(() => {
  console.log('MongoDB connection successful');
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/kishor', (req, res) => {
  res.send('<h1>Hello, Welcome</h1>');
});

app.use('/kishor', userRoutes);
app.use('/kishor', postRoutes);
app.use('/kishor', commentRoutes);
app.use('/kishor', jobRoutes);
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});