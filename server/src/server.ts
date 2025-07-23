import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes'; // <-- IMPORT NEW CHAT ROUTES

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes); // <-- USE NEW CHAT ROUTES

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
