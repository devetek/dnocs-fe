import { HARDCODED_SERVER_MODULES } from '../config/registry';

import type { ServerModule } from './types';

interface GetModuleInfoByOptions {
  id?: string;
  category?: string;
  platform?: string;
}

const filterModuleInfoByPredicate = (options: GetModuleInfoByOptions) => {
  const { id, category, platform } = options;

  return (moduleItem: ServerModule) => {
    if (id && moduleItem.id !== id) {
      return false;
    }

    if (category && !moduleItem.category.find((item) => item === category)) {
      return false;
    }

    if (platform && !moduleItem.platform.find((item) => item === platform)) {
      return false;
    }

    return true;
  };
};

/**
 * Retrieves server module information based on specified criteria.
 *
 * @param {GetModuleInfoByOptions} options - An object containing filtering criteria.
 * @param {string} [options.id] - The ID of the server module to retrieve.
 * @param {string} [options.platform] - The platform of the server module to retrieve.
 */
export function getModuleInfoByFilter(options: GetModuleInfoByOptions) {
  return HARDCODED_SERVER_MODULES.filter(filterModuleInfoByPredicate(options));
}

export function getModuleInfoByFind(options: GetModuleInfoByOptions) {
  return HARDCODED_SERVER_MODULES.find(filterModuleInfoByPredicate(options));
}
