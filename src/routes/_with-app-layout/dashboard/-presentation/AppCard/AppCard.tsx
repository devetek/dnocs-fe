import type { JSX } from 'react';

import {
  CheckCircleIcon,
  CircleAlertIcon,
  ClockIcon,
  Settings2Icon,
} from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import IconServer from '@/shared/assets/ico-server.webp';
import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';

import TemplateCardInfo from '../Template/CardInfo';

export default function AppCard(props: AppCardProps) {
  const {
    appName,
    appURL,
    appIconURL,
    machineName,
    statusState,
    statusMessage,
    onClickAppURL,
    onClickDetails,
  } = props;

  const t = useDevetekTranslations();

  let statusIcon: JSX.Element | null = null;

  switch (statusState) {
    case 'check':
      statusIcon = <CheckCircleIcon width={24} height={24} color="#3ecf8e" />;
      break;

    case 'pending':
      statusIcon = <ClockIcon width={24} height={24} color="#a8a7a5" />;
      break;

    case 'progress':
      statusIcon = <ClockIcon width={24} height={24} color="#efb041" />;
      break;

    case 'error':
      statusIcon = <CircleAlertIcon width={24} height={24} color="#ec5b56" />;
  }

  const cnInnerCard = cn('rounded-2xl shadow-xs bg-card w-full', {
    'border-red-500': statusState === 'error',
  });

  return (
    <Card className="rounded-2xl border-none bg-card/65">
      <Card className={cnInnerCard}>
        <div className="h-[224px] p-3 flex flex-col justify-between">
          <TemplateCardInfo
            title={appName}
            desc={appURL}
            iconURL={appIconURL}
            slotStatusIcon={statusIcon}
            slotStatusTooltip={statusMessage}
            onClickDesc={onClickAppURL}
          />

          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant="secondary"
              size="sm"
              onClick={onClickDetails}
            >
              <Settings2Icon width={16} height={16} />
              {t('common.actions.details')}
            </Button>
          </div>
        </div>
      </Card>

      <div className="px-2 py-1 flex items-center gap-[2px]">
        <img className="w-4 h-4" src={IconServer} alt="Server" />

        <p className="text-sm text-primary overflow-hidden text-ellipsis">
          {machineName || (
            <em className="opacity-50">{t('common.terms.unknown')}</em>
          )}
        </p>
      </div>
    </Card>
  );
}

export interface AppCardProps {
  appName: string;
  appURL: string;
  appIconURL: string;
  machineName?: string;
  statusState: 'check' | 'pending' | 'progress' | 'error';
  statusMessage?: string;

  onClickAppURL?: () => void;
  onClickDetails?: () => void;
}
