import type { DTOs } from '@/shared/api';
import { excludeNully } from '@/shared/libs/browser/typeguards';

export function groupSubmodulesGetVersions(raw?: DTOs.ServiceV1[]) {
  if (!raw) return [];

  return raw
    .map((mod) => {
      const {
        id,
        installer_status: status,
        module: moduleInfo,
        installer_attributes: rawAttributes = {},
      } = mod;

      if (!moduleInfo?.version || !id) return null;

      const attributes: Array<{ label: string; value: string }> =
        Object.entries(rawAttributes).map(([label, value]) => {
          return {
            label,
            value: JSON.stringify(value).replace(/^"/, '').replace(/"$/, ''),
          };
        });

      return {
        id,
        inProgress: status?.toLocaleLowerCase() === 'progress',
        version: moduleInfo.version,
        attributes,
      };
    })
    .filter(excludeNully);
}
