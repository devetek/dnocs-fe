import { ZodError } from 'zod';

import type { ResponseError } from '../rules/types';

import { AdapterError } from './error';

export function processError(error: unknown): ResponseError {
  if (error instanceof ZodError) {
    const { issues } = error;

    const formattedIssues = issues.map((issue) => {
      const { message, path, code } = issue;

      return `[Zod::${code}] ${message}\n` + `\tat ${path.join('.')}\n`;
    });

    return {
      kind: 'adapter',
      error: new AdapterError(formattedIssues),
    };
  }

  if (error instanceof AdapterError) {
    return {
      kind: 'adapter',
      error,
    };
  }

  return {
    kind: 'general',
    error: error instanceof Error ? error : Error(String(error)),
  };
}
