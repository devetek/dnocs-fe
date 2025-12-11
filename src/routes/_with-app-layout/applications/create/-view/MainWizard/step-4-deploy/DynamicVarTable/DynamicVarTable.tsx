import { cn } from '@/shared/libs/tailwind/cn';

import { PREDEFINED_CONFIG } from '../../../../-config/predefined_config';
import type { AppSourceMode } from '../../../../-model/store/form.types';

interface Props {
  appSourceMode: AppSourceMode;
  dynamicConfig: Record<string, Record<string, unknown>>;
}

export default function DynamicVarTable(props: Props) {
  const { appSourceMode, dynamicConfig } = props;

  const entries = Object.entries(dynamicConfig);

  return (
    <div className="border rounded-lg min-w-[600px]">
      {entries.map(([key, value], idx) => {
        const cnWrapper = cn(
          'grid grid-cols-[1fr_3fr]',
          idx !== entries.length - 1 && 'border-b',
        );

        const keys = Object.keys(value);

        const groupItem = PREDEFINED_CONFIG[appSourceMode].groups.find(
          (group) => group.group_id === key,
        );

        if (!groupItem) return null;

        return (
          <div className={cnWrapper} key={key}>
            <div className="px-2 py-1">
              <p className="text-sm font-bold">{groupItem.group_name}</p>
              <p className="text-xs">({key})</p>
            </div>

            <div className="border-l">
              {keys.map((kValue, index) => {
                const cnWrapped = cn(
                  'grid grid-cols-[1fr_2fr]',
                  index !== keys.length - 1 && 'border-b',
                );

                const item = groupItem.fields.find(
                  (fItem) => fItem.id === kValue,
                );
                if (!item) return null;

                const secure = item.type === 'input_text_password';

                const stringifiedValues = String(dynamicConfig[key][kValue]);

                return (
                  <div key={`${key}-${value}}`} className={cnWrapped}>
                    <div className="border-r px-2 py-1">
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-xs">({kValue})</p>
                    </div>

                    {!secure ? (
                      <pre className="px-2 py-1 max-h-40 overflow-auto">
                        {stringifiedValues}
                      </pre>
                    ) : (
                      <p className="px-2 py-1 text-sm italic">(hidden)</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
