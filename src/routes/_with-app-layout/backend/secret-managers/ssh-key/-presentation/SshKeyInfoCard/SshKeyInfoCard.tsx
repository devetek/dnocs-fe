import { ClockIcon } from 'lucide-react';

import IconSSH from '@/shared/assets/ico-ssh.svg';
import { Card } from '@/shared/presentation/atoms/Card';

import TemplateCardCta from '../Templates/CardCta';
import TemplateCardInfo from '../Templates/CardInfo';

export default function SshKeyInfoCard(props: SshKeyInfoCardProps) {
  const {
    sshkeyTitle,
    sshKeyDetail,
    lastUpdated,
    onClickDetails,
    onClickDelete,
  } = props;

  const imgTooltip = 'SSH Key';
  const logoSrc: string = IconSSH;

  const additionals = [
    {
      icon: <ClockIcon width={16} height={16} />,
      iconTooltip: 'Last updated',
      text: lastUpdated,
    },
  ];

  return (
    <Card className="h-full flex flex-col justify-between">
      <TemplateCardInfo
        title={sshkeyTitle}
        subtitle={sshKeyDetail}
        logoAreaMain={
          <img className="size-12" src={logoSrc} alt="SSH Key Logo" />
        }
        logoAreaMainTooltip={imgTooltip}
        additionalInfos={additionals}
      />

      <TemplateCardCta
        mainText="Details"
        mainOnClick={onClickDetails}
        additionals={[
          {
            text: 'Delete',
            className: 'text-red-500',
            onClick: onClickDelete,
          },
        ]}
      />
    </Card>
  );
}

export interface SshKeyInfoCardProps {
  sshkeyTitle: string;
  sshKeyDetail?: string;
  sshkeyId: number;
  lastUpdated: string;
  onClickDetails?: () => void;
  onClickHostInfo?: () => void;
  onClickDelete?: () => void;
}
