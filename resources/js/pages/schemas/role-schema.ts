import { z } from 'zod';

export const roleSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).max(15, { message: 'Name must be at most 15 characters long' }),
});
