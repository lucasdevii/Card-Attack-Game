import { createUser } from '../user/user.service.js';
import asyncHandler from '../../middlewares/asyncHandler.js';
import { registerSchema, loginSchema } from './auth.schema.js';

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await createUser(name, email, password);
    res.status(201).json({ user: user, message: 'User created successfully!' });
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    res.status(200).json({ message: 'Login successful!' });
};