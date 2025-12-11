import { Settings2Icon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import IconServer from '@/shared/assets/ico-server.webp';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';

import TemplateCardInfo from '../Template/CardInfo';

export default function MachineCard(props: MachineCardProps) {
  const { serverName, serverHostAddress, onClickDetails } = props;

  const t = useDevetekTranslations();

  return (
    <Card className="rounded-2xl shadow-xs border-none">
      <Card className="rounded-2xl shadow-xs bg-card w-full">
        <div className="h-[224px] p-3 flex flex-col justify-between">
          <TemplateCardInfo
            title={serverName}
            desc={serverHostAddress}
            iconURL={IconServer}
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
    </Card>
  );
}

interface MachineCardProps {
  serverName: string;
  serverHostAddress: string;
  onClickDetails?: () => void;
}
