import { z } from 'zod';

export const formSchema = z.object({
  organization_id: z //
    .string()
    .optional(),
  user_id: z //
    .string(),
  price_package_id: z //
    .string(),
  payment_provider: z //
    .string()
    .optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
