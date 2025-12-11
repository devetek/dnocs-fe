import { z } from 'zod';

export const PackageDetailSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  currency: z.string().optional(),
  price: z.number().optional(),
  is_public: z.boolean().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type PackageDetail = z.infer<typeof PackageDetailSchema>;
