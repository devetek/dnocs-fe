import { z } from 'zod';

export const formSchema = z.object({
  userInfo: z.object({
    username: z //
      .string()
      .min(1, 'Name is required')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Name can only contain letters, numbers, and underscores',
      ),

    password: z //
      .string()
      .min(8, 'Min. 8 characters are required'),
  }),

  engine: z //
    .string()
    .min(1, 'Please select an engine!'),

  connection: z //
    .string()
    .min(1, 'Please select a connection!'),

  resourceID: z //
    .string()
    .min(1, 'Please select a resource!'),
});

export type FormSchema = z.infer<typeof formSchema>;
