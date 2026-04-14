import { CircleArrowDownIcon } from 'lucide-react';

import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

export default function ModuleHero(props: Props) {
  const { moduleIcon, moduleName, moduleDescription, isInstalled } = props;

  return (
    <div className="flex gap-2 lg:gap-4 flex-col md:flex-row mb-4">
      <div className="w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 shrink-0 p-2 bg-background rounded-md flex items-center justify-center">
        <img className="object-fill" src={moduleIcon} alt="Module Logo" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-start justify-between gap-1">
          <h4 className="text-md md:text-lg lg:text-xl font-bold">
            {moduleName}
          </h4>

          {isInstalled && (
            <Tooltip message="Installed">
              <CircleArrowDownIcon className="w-6 h-6 text-green-500" />
            </Tooltip>
          )}
        </div>
        <p className="text-xs md:text-sm line-clamp-3">{moduleDescription}</p>
      </div>
    </div>
  );
}

interface Props {
  moduleIcon: string;
  moduleName: string;
  moduleDescription: string;
  isInstalled?: boolean;
}
