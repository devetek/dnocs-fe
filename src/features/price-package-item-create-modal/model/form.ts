import { z } from 'zod';

export const formSchema = z.object({
  priceNameID: z //
    .string(),
  limit: z //
    .string(),
});

export type FormSchema = z.infer<typeof formSchema>;
