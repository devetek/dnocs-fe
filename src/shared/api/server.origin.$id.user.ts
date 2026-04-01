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
		url: `v1/server/origin/${serverId}/user`,
	};
}

export interface Dto {
	username?: string;
	uid?: number;
	gid?: number;
	home?: string;
	shell?: string;
}

export type UserDto = Dto | string;

export function useGet(params: WithApiGetOptions<RecipeParams>) {
	return useApiGet<UserDto[]>(recipe(params), params.options);
}
