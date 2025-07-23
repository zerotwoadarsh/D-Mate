import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// This helper function is correct
const generateToken = (id: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // This error will be caught by the try/catch block in the calling function
    throw new Error('JWT_SECRET is not defined in the .env file');
  }
  return jwt.sign({ id }, secret, { expiresIn: '30d' });
};

// The registerUser function is correct, but slightly refactored for clarity
export const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const user = new User({ email, passwordHash: password });
        await user.save();

        if (user) {
            res.status(201).json({ 
                _id: user._id, 
                email: user.email, 
                token: generateToken(user.id) // FIX: Use the 'id' virtual getter
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error: any) {
        console.error('REGISTER ERROR:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
// THIS IS THE REFACTORED AND CORRECTED FUNCTION
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // 1. Find the user by email
        const user = await User.findOne({ email });

        // 2. Check if user exists and if the password is correct
        if (user && (await user.comparePassword(password))) {
            // 3. If both are correct, generate token and send response
            res.status(200).json({
                _id: user._id,
                email: user.email,
                token: generateToken(user.id), // FIX: Use the 'id' virtual getter
            });
        } else {
            // 4. If user or password doesn't match, send an authorization error
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: any) {
        // 5. Catch any other server-side errors and log them
        console.error('LOGIN ERROR:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};