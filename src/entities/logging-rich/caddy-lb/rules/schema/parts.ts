import { z } from 'zod';

import { parseUserAgent } from '@/shared/libs/browser/user-agent-parser';

export const requestMethod = z.enum([
  'get',
  'head',
  'post',
  'put',
  'delete',
  'connect',
  'options',
  'trace',
  'patch',
  'unknown',
]);

export type UserAgent = z.output<typeof userAgent>;
export const userAgent = z.string().transform(parseUserAgent);

export type Requester = z.output<typeof requester>;
export const requester = z.object({
  originIp: z.union([z.ipv4(), z.ipv6()]),
  userAgent,
});

export const requestPayload = z.object({
  method: requestMethod.catch('unknown'),
  uriPath: z.string(),
  status: z.number(),
});
