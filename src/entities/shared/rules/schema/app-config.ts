import z from 'zod';

// =============================================================================
//   Config Units
// =============================================================================

export type UnitLanguage = z.output<typeof unitLanguage>;
export const unitLanguage = z.object({
  name: z.string(),
  version: z.string(),
});

export type UnitEnvironmentKV = z.output<typeof unitEnvironmentKV>;
export const unitEnvironmentKV = z.object({
  key: z.string(),
  value: z.string().optional(),
});

export type UnitSteps = z.output<typeof unitStep>;
export const unitStep = z.object({
  name: z.string(),
  command: z.array(z.string()).optional(),
  archive: z.array(z.string()).optional(),
});

// =============================================================================
//   Config Definition
// =============================================================================

export type Lifecycle = z.output<typeof lifecycle>;
export const lifecycle = z.object({
  setup: z.object({
    languages: z.array(unitLanguage),
  }),
  build: z.object({
    steps: z.array(unitStep),
    envs: z.array(unitEnvironmentKV),
  }),
  run: z.object({
    name: z.string(),
    envs: z.array(unitEnvironmentKV),
    port: z.number(),
    command: z.string(),
  }),
});

export type Cicd = z.output<typeof cicd>;
export const cicd = z.object({
  autoDeploy: z.discriminatedUnion('enabled', [
    z.object({
      enabled: z.literal(false),
    }),
    z.object({
      enabled: z.literal(true),
      fromBranch: z.string().optional(),
    }),
  ]),
});
