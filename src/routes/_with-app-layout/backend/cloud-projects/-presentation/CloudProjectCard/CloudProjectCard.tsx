import { ClockIcon, CloudIcon, TrashIcon } from 'lucide-react';

import IconGoogleCloudPlatform from '@/shared/assets/ico-gcloud.png';
import IconIDCloudHost from '@/shared/assets/ico-idcloudhost.svg';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

const HeroIcon = ({ cloudProvider = '' }) => {
  let src: string | undefined;

  switch (cloudProvider.toLocaleLowerCase()) {
    case 'idcloudhost':
      src = IconIDCloudHost;
      break;

    case 'gcp':
      src = IconGoogleCloudPlatform;
      break;
  }

  if (src) {
    return <img src={src} alt="Cloud Provider" />;
  }

  return <CloudIcon className="w-full h-full" />;
};

export default function CloudProjectCard(props: Props) {
  const {
    projectName,
    cloudProvider,
    lastUpdatedFormatted,
    onClickDelete,
    onClickDetails,
  } = props;

  return (
    <Card>
      <div className="p-2 sm:px-3 border-b flex justify-between gap-1 sm:gap-2 md:gap-6">
        <div className="flex flex-col">
          <h6 className="text-xs font-bold text-black/50 dark:text-white/50">
            PROJECT
          </h6>
          <h3 className="font-bold text-lg break-all">
            {projectName || <em className="opacity-70">Unknown Project</em>}
          </h3>
        </div>

        <Tooltip className="w-12 h-12" message={`Provider: Provider`}>
          <HeroIcon cloudProvider={cloudProvider} />
        </Tooltip>
      </div>

      <div className="p-2 sm:px-3">
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-1">
            <Tooltip message="Last Updated">
              <ClockIcon className="w-4" />
            </Tooltip>
            <p className="text-sm">{lastUpdatedFormatted}</p>
          </div>
        </div>
      </div>

      <div className="p-2 sm:px-3 pt-0 flex gap-1">
        <Button
          className="flex-1"
          size="sm"
          variant="secondary"
          onClick={onClickDetails}
        >
          Details
        </Button>

        <Button
          className="text-red-500"
          size="sm"
          variant="secondary"
          onClick={onClickDelete}
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}

interface Props {
  projectName?: string;
  cloudProvider?: string;
  lastUpdatedFormatted?: string;
  onClickDetails?: () => void;
  onClickDelete?: () => void;
}
