import { z } from 'zod';

export type SignUpForm = z.output<typeof schemaSignUpForm>;
export const schemaSignUpForm = z
  .object({
    email: z.email('formErrors.invalidEmailAddress'),
    username: z.string().min(1, 'formErrors.usernameMustBeFilled'),
    password: z.string().min(1, 'formErrors.invalidPassword'),
    confirmPassword: z
      .string()
      .min(1, 'formErrors.confirmPasswordMustBeFilled'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'formErrors.confirmPasswordMismatch',
    path: ['confirmPassword'],
  });
