import { createUser, getUserByEmail, getUserById, passwordMatches } from '../user/user.service.js';
import asyncHandler from '../../middlewares/asyncHandler.js';
import jwt from 'jsonwebtoken';

export const getCurrentUser = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const user = await getUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }
  const safeUser = {
    name: user.name,
    email: user.email,
    cards: user.users_cards
  };
  return res.status(200).json({ user: safeUser});
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso.' });
  }

  const user = await createUser(name, email, password);

  if(!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  const safeUser = {
      name: user.name,
      email: user.email,
  }

  return res.status(201)
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .json({
      safeUser,
      message: 'Usuário criado com sucesso!',
    });
});

export const login = asyncHandler(async (req, res) => {
    if(!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  
    const { email, password } = req.body;
    const FAKE_HASH = "$2b$10$abcdefghijklmnopqrstuv"; //Evitar o attack de user enumeration, mesmo que o email não exista, o bcrypt irá comparar a senha com um hash fake, garantindo que o tempo de resposta seja o mesmo para emails existentes e não existentes.
    
    const cookiesToken = req.cookies.token;

    if (cookiesToken) {
      try {
        const decoded = jwt.verify(cookiesToken, process.env.JWT_SECRET);

        const userFromToken = await getUserById(decoded.id);

        if (!userFromToken) {
          res.clearCookie('token'); // usuário deletado
        } 
      } catch {
        res.clearCookie('token'); // token inválido ou expirado
      }
    }

    const user = await getUserByEmail(email);
    const hash = user?.password || FAKE_HASH;

    const isPasswordValid = await passwordMatches(hash, password);
    if (!user || !isPasswordValid) {
        return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({ message: 'Login realizado com sucesso!' });
});