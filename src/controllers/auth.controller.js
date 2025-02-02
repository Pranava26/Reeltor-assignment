import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be atleast 6 characters' });
        }

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: 'Email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            password: hashedPassword
        })

        if (newUser) {
            //generate jwt token
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                mobileNumber: newUser.mobileNumber,
                bio: newUser.bio,
                availability: newUser.availability,
            })
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }

    } catch (error) {
        console.log('Error in signup controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            mobileNumber: user.mobileNumber,
            bio: user.bio,
            availability: user.availability,
        })
    } catch (error) {
        console.log('Error in login controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name, bio, availability, mobileNumber } = req.body;
        const userId = req.user._id;

        const updateFields = {};
        if (name) updateFields.name = name;
        if (bio) updateFields.bio = bio;
        if (mobileNumber) updateFields.mobileNumber = mobileNumber;

        if (availability) {
            if (availability.start || availability.end) {
                updateFields.availability = {};
                if (availability.start) updateFields.availability.start = availability.start;
                if (availability.end) updateFields.availability.end = availability.end;
            } else {
                return res.status(400).json({ message: 'Invalid availability format' });
            }
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ updatedUser });

    } catch (error) {
        console.log('Error in update profile', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
