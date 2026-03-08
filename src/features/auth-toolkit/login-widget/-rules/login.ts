import { z } from 'zod';

export type LoginTraditional = z.output<typeof schemaLoginTraditional>;
export const schemaLoginTraditional = z.object({
  email: z.email('formErrors.invalidEmailAddress'),
  password: z.string().min(1, 'formErrors.invalidPassword'),
});
