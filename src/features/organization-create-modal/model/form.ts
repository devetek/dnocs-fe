import { z } from 'zod';

export const formSchema = z.object({
  name: z //
    .string()
    .min(3)
    .max(100),
  description: z //
    .string()
    .min(5)
    .max(500)
    .optional(),
  status: z //
    .string()
    .min(3)
    .max(15)
    .default('ready'),
  user_id: z //
    .string(),
});

export type FormSchema = z.infer<typeof formSchema>;
