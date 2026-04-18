import { createUser } from '../user/user.service.js';
import asyncHandler from '../../middlewares/asyncHandler.js';
import { registerSchema, loginSchema } from './auth.schema.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    const passwordHashed = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS || 10));
    const user = await createUser(name, email, passwordHashed);

    const token = jwt.sign({ email: email, id: user.id,  }, process.env.JWT_SECRET);

    const safeUser = {
        name: user.name,
        email: user.email,
    }

    return res.status(201)
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expiresIn: '7d',
      })
      .json({
        safeUser,
        message: 'User created successfully!',
      });
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    return res.status(200).json({ message: 'Login successful!' });
};