import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        default: ''
    },
    mobileNumber: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    availability: {
        start: {
            type: String,
            default: "09:00", // Default start time
        },
        end: {
            type: String,
            default: "17:00", // Default end time
        },
    },
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

export default User;