import z from 'zod';

import { SchemaCommon } from '@/entities/shared/rules/schema';

import { formatFileSize } from '../../lib/file-formatter';
import {
  convertOctalFromPermission,
  convertSymbolicFromPermission,
  translateUnixPermission,
} from '../../lib/unix-permission';

export type PermissionUnit = z.output<typeof permissionUnit>;
export const permissionUnit = z.object({
  read: z.boolean(),
  write: z.boolean(),
  execute: z.boolean(),
});

export type PermissionUnitSpecial = z.output<typeof permissionUnitSpecial>;
export const permissionUnitSpecial = z.object({
  setuid: z.boolean(),
  setgid: z.boolean(),
  sticky: z.boolean(),
});

export type Permission = z.output<typeof permission>;
export const permission = z.object({
  owner: permissionUnit,
  group: permissionUnit,
  public: permissionUnit,
  special: permissionUnitSpecial,
});

export const contentBase = z.object({
  name: z.string(),
  timestamp: SchemaCommon.timestamp,
  unixPermission: z.string().transform((rawPermission) => {
    const parsedPermission = () => translateUnixPermission(rawPermission);

    return {
      get detailed() {
        return parsedPermission();
      },
      get octal() {
        return convertOctalFromPermission(parsedPermission());
      },
      get symbolic() {
        return convertSymbolicFromPermission(parsedPermission());
      },
    };
  }),
});

export type ContentFile = z.output<typeof contentFile>;
export const contentFile = z
  .object({
    size: z.number().transform((inBytes) => {
      return {
        inBytes,
        get formatted() {
          return formatFileSize(inBytes);
        },
      };
    }),
  })
  .extend(contentBase.shape);

export type ContentFolder = z.output<typeof contentFolder>;
export const contentFolder = z.object({}).extend(contentBase.shape);
