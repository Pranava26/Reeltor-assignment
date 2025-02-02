import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js'
import notificationRoutes from './routes/notification.route.js'
import { connectDB } from './lib/db.js';
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    connectDB();
})