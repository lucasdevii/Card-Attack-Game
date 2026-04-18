import { z } from 'zod';

export const cardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  damage: z.number().optional(),
  health: z.number().optional(),
  armor: z.number().optional(),
});