import { z } from 'zod';

export const formSchema = z.object({
  provider: z //
    .string()
    .min(1, 'Please select a provider!'),
  cloud: z.object({
    projectID: z //
      .number({ message: 'Please select a cloud project!' }),
    sshKeyID: z //
      .number({ message: 'Please select a SSH key!' }),
  }),
  regionSlug: z //
    .string()
    .min(1, 'Please select a region!'),
  vpcBulk: z.object(
    {
      subnet: z //
        .string()
        .min(1),
      id: z //
        .string()
        .min(1),
    },
    {
      message: 'Please select a VPC!',
    },
  ),
  spec: z.object({
    cpuCore: z //
      .number({ message: 'Please select a CPU core!' })
      .min(2)
      .max(8),
    ramSizeGB: z //
      .number({ message: 'Please select a RAM size!' })
      .min(2)
      .max(16),
    diskSizeGB: z //
      .number({ message: 'Please select a disk size!' })
      .min(20)
      .max(160),
  }),
  login: z.object({
    username: z //
      .string()
      .min(1, 'Username is required')
      .regex(
        /^[A-Za-z][A-Za-z0-9]*$/,
        'Must start with a letter and contain only letters and numbers.',
      ),
    password: z //
      .string()
      .min(8, 'Min. 8 characters are required')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
        'At least one uppercase letter, one lowercase letter, and one number is required.',
      ),
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
