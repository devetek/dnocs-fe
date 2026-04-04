import type { DomainEssentials } from '@/entities/domain/rules/schema';
import type { SchemaCommon } from '@/entities/shared/rules/schema';

export type DomainDeletePayload = DomainEssentials;

export type DomainMigrateOwnershipPayload = DomainEssentials;

export type DomainDetailsPayload = SchemaCommon.UnitId;
