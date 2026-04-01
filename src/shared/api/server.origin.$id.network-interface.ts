import { useApiGet } from '@/shared/libs/api-client';
import type {
	GetRequestRecipe,
	WithApiGetOptions,
} from '@/shared/libs/api-client/rules/types';

export interface RecipeParams {
	serverId?: string;
}

export function recipe(params: RecipeParams): GetRequestRecipe {
	const { serverId } = params;

	return {
		url: `v1/server/origin/${serverId}/network-interface`,
	};
}

export interface Dto {
	interface_data?: {
		address?: string;
		ip_v4?: string;
		ip_v6?: string;
		subnet?: string;
	}[];
	interface_name?: string;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
	return useApiGet<Dto[]>(recipe(params), params.options);
}
