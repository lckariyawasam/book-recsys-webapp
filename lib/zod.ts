import { object, string, z } from "zod"
 
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = object({
  email: string().min(1, 'Email is required').email('Invalid email'),
  password: string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])/, 'Password must contain at least 1 uppercase and 1 lowercase letter'),
  name: string().min(1, 'Name is required'),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
