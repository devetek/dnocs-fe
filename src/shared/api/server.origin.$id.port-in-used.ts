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
		url: `v1/server/origin/${serverId}/port-in-used`,
	};
}

export interface Dto {
	port?: number;
	process_name?: string;
	process_id?: number;
	allow_from?: string;
	state?: string;
}

export function useGet(params: WithApiGetOptions<RecipeParams>) {
	return useApiGet<Dto[]>(recipe(params), params.options);
}
