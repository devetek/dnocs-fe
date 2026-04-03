import { z } from 'zod';

// #region Schema Base Form

export const schemaBaseForm = z.object({
  metaTitle: z //
    .string()
    .min(1, 'Title is required'),

  cloudProvider: z //
    .enum(['IDCloudHost', 'gcp', 'proxmox']),
});

export type SchemaBaseForm = z.infer<typeof schemaBaseForm>;

// #endregion

// #region Schema IDCloudHost Form

export const schemaIDCloudHostForm = z.object({
  token: z //
    .string()
    .min(1, 'Token is required'),
});

export type SchemaIDCloudHostForm = z.infer<typeof schemaIDCloudHostForm>;

// #endregion

// #region Schema GCP Form

export const schemaGcpForm = z.object({
  auth_provider_x509_cert_url: z //
    .string(),

  auth_uri: z //
    .string(),

  client_email: z //
    .string(),

  client_id: z //
    .string(),

  client_x509_cert_url: z //
    .string(),

  private_key: z //
    .string(),

  private_key_id: z //
    .string(),

  project_id: z //
    .string(),

  token_uri: z //
    .string(),

  type: z //
    .string(),

  universe_domain: z //
    .string(),
});

export type SchemaGcpForm = z.infer<typeof schemaGcpForm>;

// #endregion

// #region Schema Proxmox Form

/** Lenient schema — used only by UploadArea to validate file structure. */
export const schemaProxmoxUpload = z.object({
  credential: z.object({
    auth: z.object({
      api_host: z.string(),
      api_user: z.string(),
      api_token_id: z.string(),
      api_token_secret: z.string(),
      api_timeout: z.number().optional(),
    }),
    config: z.object({
      node: z.string(),
      netif: z.record(z.string(), z.string()).optional(),
    }),
    gateway: z.object({ id: z.string() }).optional(),
  }),
});

export type SchemaProxmoxUpload = z.infer<typeof schemaProxmoxUpload>;

/** Strict schema — used as zodResolver for submit-time validation. */
export const schemaProxmoxForm = z.object({
  credential: z.object({
    auth: z.object({
      api_host: z //
        .string()
        .min(1, 'api_host is required'),

      api_user: z //
        .string()
        .min(1, 'api_user is required'),

      api_token_id: z //
        .string()
        .min(1, 'api_token_id is required'),

      api_token_secret: z //
        .string()
        .min(1, 'api_token_secret is required'),

      api_timeout: z //
        .number()
        .optional(),
    }),

    config: z.object({
      node: z //
        .string()
        .min(1, 'node is required'),

      netif: z //
        .record(z.string(), z.string())
        .optional(),
    }),

    gateway: z
      .object({
        id: z.string(),
      })
      .optional(),
  }),

  name: z.string().optional(),

  provider: z.literal('proxmox').optional(),
});

export type SchemaProxmoxForm = z.infer<typeof schemaProxmoxForm>;

// #endregion
