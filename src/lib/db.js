import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
    } catch (error) {
        console.log('MongoDB connection error:', error);
    }
}