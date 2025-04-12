import { z } from 'zod';

export const roleSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).max(15, { message: 'Name must be at most 15 characters long' }),
});

export const permissionSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).max(30, { message: 'Name must be at most 30 characters long' }),
});

export const assignRoleManagementSchema = z.object({
    id: z.number().optional(),
    permissions: z.array(z.number()).refine((value) => value.some((item) => item), {
        message: 'You have to select at least 1 permission.',
    }),
});

export const assignUserManagementSchema = z.object({
    id: z.number().optional(),
    roles: z.array(z.number()).refine((value) => value.some((item) => item), {
        message: 'You have to select at least 1 role.',
    }),
});
