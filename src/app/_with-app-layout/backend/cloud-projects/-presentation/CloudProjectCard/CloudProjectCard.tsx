import { ClockIcon, CloudIcon, Trash2Icon } from 'lucide-react';

import IconGoogleCloudPlatform from '@/shared/assets/ico-gcloud.png';
import IconIDCloudHost from '@/shared/assets/ico-idcloudhost.svg';
import IconProxmox from '@/shared/assets/ico-proxmox.png';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

const PROVIDER_META: Record<string, { src?: string; label: string }> = {
  idcloudhost: { src: IconIDCloudHost, label: 'IDCloudHost' },
  gcp: { src: IconGoogleCloudPlatform, label: 'Google Cloud' },
  proxmox: { src: IconProxmox, label: 'Proxmox VE' },
};

const HeroIcon = ({ cloudProvider = '' }: { cloudProvider?: string }) => {
  const meta = PROVIDER_META[cloudProvider.toLocaleLowerCase()];

  if (meta?.src) {
    return <img src={meta.src} alt={meta.label} className="w-full h-full object-contain" />;
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

  const providerMeta =
    PROVIDER_META[cloudProvider?.toLocaleLowerCase() ?? ''] ??
    { label: cloudProvider ?? 'Unknown' };

  return (
    <Card className="flex flex-col">
      <div className="p-3 border-b flex justify-between gap-3 items-start">
        <div className="flex flex-col gap-0.5 overflow-hidden">
          <p className="text-xs text-primary/50 font-medium">
            {providerMeta.label}
          </p>
          <h3 className="font-bold text-base break-all line-clamp-2">
            {projectName || (
              <em className="opacity-70">Unknown Project</em>
            )}
          </h3>
        </div>

        <Tooltip
          className="w-10 h-10 shrink-0"
          message={`Provider: ${providerMeta.label}`}
        >
          <HeroIcon cloudProvider={cloudProvider} />
        </Tooltip>
      </div>

      <div className="p-3 flex items-center gap-1.5 text-sm text-primary/60 grow">
        <Tooltip message="Last updated">
          <ClockIcon className="w-3.5 h-3.5 shrink-0" />
        </Tooltip>
        <p className="text-xs">{lastUpdatedFormatted}</p>
      </div>

      <div className="p-2 pt-0 flex gap-1">
        <Button
          className="flex-1"
          size="sm"
          variant="secondary"
          onClick={onClickDetails}
        >
          View Regions
        </Button>

        <Button
          className="text-red-400 hover:text-red-500"
          size="sm"
          variant="secondary"
          onClick={onClickDelete}
        >
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}

interface Props {
  projectName?: string;
  cloudProvider?: string;
  lastUpdatedFormatted: string;
  onClickDelete: () => void;
  onClickDetails: () => void;
}


