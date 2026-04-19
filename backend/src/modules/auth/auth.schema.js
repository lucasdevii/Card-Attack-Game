import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Nome de usuário é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  passwordConfirmation: z.string().min(6, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "As senhas não coincidem",
  path: ["passwordConfirmation"],
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});