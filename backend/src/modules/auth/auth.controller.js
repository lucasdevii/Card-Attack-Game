import { createUser } from '../user/user.service.js';
import { registerSchema, loginSchema } from './auth.schema.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    await createUser(username, email, password);
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    // Implement login logic here
    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    next(error);
  }
};