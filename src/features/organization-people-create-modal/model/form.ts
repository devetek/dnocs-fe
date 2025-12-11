import { z } from 'zod';

export const formSchema = z.object({
  organization_id: z //
    .string(),
  user_id: z //
    .string(),
});

export type FormSchema = z.infer<typeof formSchema>;
