import dayjs from 'dayjs';
import type z from 'zod';

import { createAdapter } from '@/entities/shared/lib/createAdapter';

import type { KeysOnlyDeep } from '@/shared/libs/types/keys-only';

import type { LoggingRichCaddyLb } from '../rules/schema';
import { schemaLoggingRichCaddyLb } from '../rules/schema';

export const toLoggingRichCaddyLb = createAdapter<string, LoggingRichCaddyLb>(
  (raw) => {
    const parsed = JSON.parse(raw);

    return schemaLoggingRichCaddyLb.parse({
      idGenerated: String(Math.random()),
      timestamp: {
        created: dayjs(new Date(parsed?.ts * 1000)).format(),
        updated: dayjs(new Date(parsed?.ts * 1000)).format(),
      },
      logLevel: 'info',
      requester: {
        originIp: parsed?.request?.remote_ip,
        userAgent: parsed?.request?.headers['User-Agent']?.[0] || '',
      },
      requestPayload: {
        method: String(parsed?.request?.method).toLocaleLowerCase(),
        status: Number(parsed?.status),
        uriPath: parsed?.request?.uri,
      },
    } as KeysOnlyDeep<z.input<typeof schemaLoggingRichCaddyLb>>);
  },
);
