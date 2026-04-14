import { z } from 'zod';

export const schemaSearchQuery = z.string().optional();
export type SearchQuery = z.output<typeof schemaSearchQuery>;

export const schemaCurrentPage = z.int().min(1).catch(1);
export type CurrentPage = z.output<typeof schemaCurrentPage>;

export const schemaViewMode = z.enum(['auto', 'table', 'grid']);
export type ViewMode = z.output<typeof schemaViewMode>;
