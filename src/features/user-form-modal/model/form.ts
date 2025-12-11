import { z } from 'zod';

export const formSchema = z.object({
  fullname: z //
    .string(),
  username: z //
    .string()
    .regex(/^[a-zA-Z0-9]+$/, 'Invalid username'),
  email: z //
    .email()
    .optional(),
  id: z //
    .number()
    .optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
