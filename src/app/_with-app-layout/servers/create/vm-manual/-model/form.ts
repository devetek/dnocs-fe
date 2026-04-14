import { z } from 'zod';

export const formSchema = z.object({
  cloud: z.object({
    provider: z //
      .string({ message: 'Please select a cloud provider!' }),
    sshKeyID: z //
      .number({ message: 'Please select a SSH key!' }),
  }),
  server: z.object({
    address: z //
      .string({ message: 'Please input server public IP v4!' }),
    ssh_port: z //
      .string({ message: 'Please input SSH port (default: 22)!' })
      .min(2)
      .max(8),
    http_port: z //
      .string({ message: 'Please input dPanel agent port (default: 9000)!' })
      .min(2)
      .max(16),
    domain: z //
      .string({ message: 'Please input dPanel agent domain' })
      .optional(),
  }),
  login: z.object({
    default_user: z //
      .string()
      .min(1, { message: 'Username is required' }),
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
