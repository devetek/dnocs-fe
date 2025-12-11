import { z } from 'zod';

export const formSchema = z.object({
  name: z //
    .string()
    .min(1)
    .max(15),
  period: z //
    .string()
    .min(1)
    .max(15),
  currency: z //
    .string()
    .min(1)
    .max(15),
  price: z //
    .string()
    .min(1),
  is_public: z //
    .boolean()
    .optional()
    .default(false),
});

export type FormSchema = z.infer<typeof formSchema>;
