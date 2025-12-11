import { z } from 'zod';

// #region Schema Base Form

export const schemaBaseForm = z.object({
  metaTitle: z //
    .string()
    .min(1, 'Title is required'),

  cloudProvider: z //
    .enum(['IDCloudHost', 'gcp']),
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
