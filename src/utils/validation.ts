import { z } from 'zod';

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email format'),
    password: z
        .string()
        .min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Signup form validation schema
 */
export const signupSchema = z.object({
    username: z
        .string()
        .min(1, 'Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must not exceed 30 characters'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email format'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * Task form validation schema
 */
export const taskSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(100, 'Title must not exceed 100 characters'),
    description: z
        .string()
        .min(1, 'Description is required')
        .max(500, 'Description must not exceed 500 characters'),
});

export type TaskFormData = z.infer<typeof taskSchema>;
